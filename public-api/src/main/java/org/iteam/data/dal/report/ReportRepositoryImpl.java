package org.iteam.data.dal.report;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.iteam.configuration.StringUtilities;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.dal.meeting.MeetingRepository;
import org.iteam.data.dal.meeting.MeetingRepositoryImpl;
import org.iteam.data.dto.Idea;
import org.iteam.data.model.D3CollapseTreeModel;
import org.iteam.services.utils.JSONUtils;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.CollectionType;
import com.google.common.collect.Lists;

@Repository
public class ReportRepositoryImpl implements ReportRepository {

    private static final Logger LOGGER = LoggerFactory.getLogger(MeetingRepositoryImpl.class);
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    private static final String IDEA_MEETING_ID_FIELD = "meetingId";
    private static final String SECRET_KEY = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJbXCJcXFwiaG9sYVwiLFwianVhblxcXCJcIl0iLCJleHAiOjE0ODY4NDU3MjB9.nkxRPrQZFsteOLzR6ZGzPCliaoWr7tAC-CrZavfMsdIcxmQaoN9o_htd6tIAwzv8GnC1sjWnLXm-j0kqXBmQZg";

    private ElasticsearchClientImpl elasticsearchClientImpl;
    private MeetingRepository meetingRepositoryImpl;

    @Override
    public String generateSharedReport(List<String> meetingIds) {

        try {

            DateTime expirationDate = new DateTime().plusMonths(1);

            return JWT.create().withSubject(OBJECT_MAPPER.writeValueAsString(meetingIds))
                    .withExpiresAt(new Date(expirationDate.getMillis())).sign(Algorithm.HMAC512(SECRET_KEY));
        } catch (JsonProcessingException | IllegalArgumentException | JWTCreationException
                | UnsupportedEncodingException e) {
            LOGGER.error("Token generation failed");
        }

        return null;
    }

    @Override
    public D3CollapseTreeModel getSharedReport(String token) {

        try {

            JWTVerifier verifier = JWT.require(Algorithm.HMAC512(SECRET_KEY)).build();
            JWT jwt = (JWT) verifier.verify(token);

            JWT jwtDecoded = JWT.decode(jwt.getToken());
            String tokenPayload = jwtDecoded.getSubject();

            CollectionType jacksonList = OBJECT_MAPPER.getTypeFactory().constructCollectionType(List.class,
                    String.class);

            List<String> meetingIds = OBJECT_MAPPER.readValue(tokenPayload, jacksonList);

            LOGGER.info("MeetingIds from token {}", meetingIds.toString());

            return generateReportByMeeting(meetingIds, "shared report");

        } catch (IOException | JWTVerificationException | IllegalArgumentException e) {
            LOGGER.error("Error while trying to verify or decode report token ", e);
        }
        return new D3CollapseTreeModel("Shared report", Lists.newArrayList(new D3CollapseTreeModel("no data")));
    }

    @Override
    public D3CollapseTreeModel generateReportByMeeting(List<String> meetingIds, String reportName) {

        BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();

        queryBuilder.must(QueryBuilders.termsQuery(IDEA_MEETING_ID_FIELD, meetingIds));

        SearchResponse response = elasticsearchClientImpl.search(StringUtilities.INDEX_IDEAS, queryBuilder);

        if (response.getHits().getTotalHits() > 0) {

            Set<String> tags = new HashSet<>();
            List<Idea> ideas = new ArrayList<>();

            for (SearchHit hit : response.getHits()) {
                Idea idea = (Idea) JSONUtils.JSONToObject(hit.getSourceAsString(), Idea.class);
                tags.add(idea.getTag());
                ideas.add(idea);
            }

            return createTagTree(tags.stream().collect(Collectors.toList()), ideas,
                    new D3CollapseTreeModel(reportName));
        }
        return new D3CollapseTreeModel(reportName, Lists.newArrayList(new D3CollapseTreeModel("no data")));
    }

    @Override
    public D3CollapseTreeModel generateReportByMixIdea(List<Idea> ideas) {

        Set<String> tags = new HashSet<>();

        for (Idea idea : ideas) {
            tags.add(idea.getTag());
        }
        return createTagTree(tags.stream().collect(Collectors.toList()), ideas, new D3CollapseTreeModel("Mix Ideas"));
    }

    @Override
    public D3CollapseTreeModel generateBasicReportByRanking(String meetingId, List<String> tags) {
        LOGGER.debug("Generating report by tag and ranking for meeting: '{}'", meetingId);

        String topic = meetingRepositoryImpl.getMeetingTopic(meetingId);

        if (!ObjectUtils.isEmpty(topic)) {
            return createRankingTree(tags, meetingRepositoryImpl.getIdeasGivenMeetingId(meetingId),
                    new D3CollapseTreeModel(topic));
        }
        return new D3CollapseTreeModel("By Ranking", Lists.newArrayList(new D3CollapseTreeModel("no data")));
    }

    @Override
    public D3CollapseTreeModel generateBasicReportByTag(String meetingId, List<String> tags) {

        LOGGER.debug("Generating report by tag for meeting: '{}'", meetingId);

        String topic = meetingRepositoryImpl.getMeetingTopic(meetingId);

        if (!ObjectUtils.isEmpty(topic)) {
            return createTagTree(tags, meetingRepositoryImpl.getIdeasGivenMeetingId(meetingId),
                    new D3CollapseTreeModel(topic));
        }
        return new D3CollapseTreeModel("By Tag", Lists.newArrayList(new D3CollapseTreeModel("no data")));
    }

    @Override
    public D3CollapseTreeModel generateBasicReportByUser(String meetingId, List<String> users, List<String> tags) {

        LOGGER.debug("Generating report by user for meeting: '{}'", meetingId);

        String topic = meetingRepositoryImpl.getMeetingTopic(meetingId);

        if (!ObjectUtils.isEmpty(topic)) {

            return createUserTree(users, tags, meetingRepositoryImpl.getIdeasGivenMeetingId(meetingId),
                    new D3CollapseTreeModel(topic));
        }
        return new D3CollapseTreeModel("By User", Lists.newArrayList(new D3CollapseTreeModel("no data")));

    }

    private D3CollapseTreeModel createUserTree(List<String> users, List<String> tags, List<Idea> ideasList,
            D3CollapseTreeModel treeModel) {

        for (String user : users) {
            List<Idea> ideasByUser = ideasList.stream().filter(u -> user.equals(u.getUsername()))
                    .collect(Collectors.toList());

            treeModel.add(createTagTree(tags, ideasByUser, new D3CollapseTreeModel(user)));
        }

        return treeModel;
    }

    private D3CollapseTreeModel createTagTree(List<String> tags, List<Idea> ideasList, D3CollapseTreeModel treeModel) {

        for (String tag : tags) {

            List<D3CollapseTreeModel> treeModelTag = new ArrayList<>();

            for (Idea idea : ideasList) {

                if (tag.equals(idea.getTag())) {
                    treeModelTag.add(new D3CollapseTreeModel(idea.getTitle(),
                            Lists.newArrayList(new D3CollapseTreeModel(idea.getComments()))));
                }
            }

            treeModel.add(new D3CollapseTreeModel(tag, treeModelTag));
        }

        return treeModel;
    }

    private D3CollapseTreeModel createRankingTree(List<String> tags, List<Idea> ideasList,
            D3CollapseTreeModel treeModel) {

        for (String tag : tags) {

            List<D3CollapseTreeModel> treeModelTag = new ArrayList<>();

            for (Idea idea : ideasList) {

                if (tag.equals(idea.getTag())) {
                    treeModelTag.add(new D3CollapseTreeModel(idea.getTitle(), idea.getRanking(), "#D6BA33"));
                }
            }

            treeModel.add(new D3CollapseTreeModel(tag, treeModelTag));
        }

        return treeModel;
    }

    @Autowired
    public void setElasticsearchClientImpl(ElasticsearchClientImpl elasticsearchClientImpl) {
        this.elasticsearchClientImpl = elasticsearchClientImpl;
    }

    @Autowired
    public void setMeetingRepositoryImpl(MeetingRepository meetingRepositoryImpl) {
        this.meetingRepositoryImpl = meetingRepositoryImpl;
    }

}
