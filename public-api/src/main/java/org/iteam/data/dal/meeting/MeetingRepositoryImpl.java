package org.iteam.data.dal.meeting;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.elasticsearch.ElasticsearchException;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.IndexNotFoundException;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.sort.SortBuilders;
import org.elasticsearch.search.sort.SortOrder;
import org.iteam.configuration.StringUtilities;
import org.iteam.data.dal.client.ElasticsearchClient;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.dal.team.TeamRepository;
import org.iteam.data.dto.Idea;
import org.iteam.data.dto.Meeting;
import org.iteam.data.dto.ViewedMeeting;
import org.iteam.data.model.BiFieldModel;
import org.iteam.data.model.D3CollapseTreeModel;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.MeetingUsers;
import org.iteam.data.model.TeamUserModel;
import org.iteam.services.utils.JSONUtils;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;

@Repository
public class MeetingRepositoryImpl implements MeetingRepository {

    private static final Logger LOGGER = LoggerFactory.getLogger(MeetingRepositoryImpl.class);

    private ElasticsearchClient elasticsearchClientImpl;
    private TeamRepository teamRepository;

    private static final String IDEA_MEETING_ID_FIELD = "meetingId";
    private static final String MEETING_TEAM_NAME_FIELD = "teamName";
    private static final String MEETING_STATE_NAME_FIELD = "ended";
    private static final String MEETING_OWNER_NAME_FIELD = "ownerName";
    private static final String PROGRAMMED_DATE_FIELD = "programmedDate";
    private static final String MEETING_VIEWED_USERS = "viewedUsers";
    private static final String MEETING_NOT_VIEWED_USERS = "users";
    private static final int MAX_RETRIES = 5;
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    @Override
    public boolean createMeeting(Meeting meeting) {
        LOGGER.info("Creating new meeting");
        LOGGER.debug("Meeting: '{}'", meeting.toString());

        meeting.setMeetingId(UUID.randomUUID().toString());
        meeting.setCreationDate(DateTime.now().getMillis());
        DateTime date = new DateTime(meeting.getProgrammedDate());
        meeting.setProgrammedDate(date.withZone(DateTimeZone.UTC).getMillis());
        String data = JSONUtils.ObjectToJSON(meeting);

        IndexResponse response = elasticsearchClientImpl.insertData(data, StringUtilities.INDEX_MEETING,
                StringUtilities.INDEX_TYPE_MEETING, meeting.getMeetingId());

        if (!response.isCreated()) {
            LOGGER.error("The meeting couldn't be created - Meeting: '{}'", meeting.toString());
            return false;
        }

        return true;

    }

    @Override
    public boolean updateMeeting(Meeting updatedMeeting) {
        LOGGER.info("Updating meeting");
        LOGGER.debug("Meeting: '{}'", updatedMeeting.toString());

        if (!ObjectUtils.isEmpty(updatedMeeting.getProgrammedDate())) {
            DateTime date = new DateTime(updatedMeeting.getProgrammedDate());
            updatedMeeting.setProgrammedDate(date.withZone(DateTimeZone.UTC).getMillis());
        }

        String data = JSONUtils.ObjectToJSON(updatedMeeting);

        elasticsearchClientImpl.modifyData(data, StringUtilities.INDEX_MEETING, StringUtilities.INDEX_TYPE_MEETING,
                updatedMeeting.getMeetingId());

        // LOGGER.error("The meeting couldn't be updated - Meeting: '{}'",
        // updatedMeeting.toString());

        return true;
    }

    @Override
    public void saveIdeas(IdeasDTO ideas) {

        // TODO:check if it's necessary set the insertion date to each idea.
        List<String> dataToInsert = new ArrayList<>();

        ideas.getIdeas().forEach((idea) -> {
            dataToInsert.add(JSONUtils.ObjectToJSON(idea));
        });

        // TODO: we need to make it async, so if the ideas cannot be save we
        // can't delete the index meetingInfo,
        // could we implement a retry politic.
        if (!dataToInsert.isEmpty()) {
            elasticsearchClientImpl.insertData(dataToInsert, StringUtilities.INDEX_IDEAS,
                    StringUtilities.INDEX_TYPE_IDEAS);
            LOGGER.info("Inserting new ideas in meeting info");
            LOGGER.debug("Ideas: '{}'", ideas.toString());
            // TODO: maybe this is not the best way to get the meeting id, try
            // meeting id by parameters.
            elasticsearchClientImpl.delete(StringUtilities.INDEX_MEETING_INFO, StringUtilities.INDEX_TYPE_MEETING_INFO,
                    ideas.getIdeas().get(0).getMeetingId());
        }

    }

    @Override
    public D3CollapseTreeModel generateBasicReportByRanking(String meetingId, List<String> tags) {
        LOGGER.debug("Generating report by tag and ranking for meeting: '{}'", meetingId);

        String topic = getMeetingTopic(meetingId);

        if (!ObjectUtils.isEmpty(topic)) {
            return createRankingTree(tags, getIdeasGivenMeetingId(meetingId), new D3CollapseTreeModel(topic));
        }
        return null;
    }

    @Override
    public D3CollapseTreeModel generateBasicReportByTag(String meetingId, List<String> tags) {

        LOGGER.debug("Generating report by tag for meeting: '{}'", meetingId);

        String topic = getMeetingTopic(meetingId);

        if (!ObjectUtils.isEmpty(topic)) {
            return createTagTree(tags, getIdeasGivenMeetingId(meetingId), new D3CollapseTreeModel(topic));
        }
        return null;
    }

    @Override
    public D3CollapseTreeModel generateBasicReportByUser(String meetingId, List<String> users, List<String> tags) {

        LOGGER.debug("Generating report by user for meeting: '{}'", meetingId);

        String topic = getMeetingTopic(meetingId);

        if (!ObjectUtils.isEmpty(topic)) {

            return createUserTree(users, tags, getIdeasGivenMeetingId(meetingId), new D3CollapseTreeModel(topic));
        }
        return null;

    }

    @Override
    public List<Meeting> getMeetingUser(String username) {
        LOGGER.info("Getting meeting by user: '{}'", username);

        SearchResponse response = elasticsearchClientImpl.search(StringUtilities.INDEX_MEETING,
                QueryBuilders.termQuery(MEETING_TEAM_NAME_FIELD, username),
                SortBuilders.fieldSort(PROGRAMMED_DATE_FIELD).order(SortOrder.ASC));

        List<Meeting> meetingList = new ArrayList<>();

        LOGGER.debug("meetings retrieved: ", response.getHits().getTotalHits());

        for (SearchHit hit : response.getHits()) {

            LOGGER.debug("User '{}' meeting: '{}'", username, hit.getSourceAsString());

            meetingList.add((Meeting) JSONUtils.JSONToObject(hit.getSourceAsString(), Meeting.class));
        }

        LOGGER.debug("User '{}' list of meetings: '{}'", username, meetingList.toString());

        return meetingList;
    }

    @Override
    public List<Meeting> getMeetingsByState(String username) {
        LOGGER.info("Getting all ended meetings");
        List<Meeting> meetings = new ArrayList<>();

        BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
        queryBuilder.must(QueryBuilders.termQuery(MEETING_OWNER_NAME_FIELD, username))
                .must(QueryBuilders.existsQuery(MEETING_STATE_NAME_FIELD));

        SearchResponse response = elasticsearchClientImpl.search(StringUtilities.INDEX_MEETING, queryBuilder,
                SortBuilders.fieldSort(PROGRAMMED_DATE_FIELD).order(SortOrder.DESC));

        if (response.getHits().getTotalHits() > 0) {

            for (SearchHit hit : response.getHits()) {
                meetings.add((Meeting) JSONUtils.JSONToObject(hit.getSourceAsString(), Meeting.class));
            }
        }
        return meetings;
    }

    @Override
    public List<Meeting> getMeetingByTeamName(List<String> teamName) {
        List<Meeting> meetingList = new ArrayList<>();
        LOGGER.info("Getting meeting for teams: '{}'", teamName.toString());

        SearchResponse response = elasticsearchClientImpl.search(StringUtilities.INDEX_MEETING,
                QueryBuilders.termsQuery(MEETING_TEAM_NAME_FIELD, teamName),
                SortBuilders.fieldSort(PROGRAMMED_DATE_FIELD).order(SortOrder.ASC));

        for (SearchHit hit : response.getHits()) {

            Meeting meeting = (Meeting) JSONUtils.JSONToObject(hit.getSourceAsString(), Meeting.class);
            meetingList.add(meeting);

            LOGGER.debug("Meetings: " + meeting.getMeetingId());
        }

        LOGGER.info("Successfully retrrieve meetings: '{}'", response.getHits().getTotalHits());

        return meetingList;
    }

    @Override
    public void saveMeetingInfo(String data, String meetingId) {
        int count = 0;
        saveInfoRetry(count, data, meetingId);
    }

    @Override
    public String getMeetingInfo(String meetingId) {

        GetResponse response = elasticsearchClientImpl.getDocument(StringUtilities.INDEX_MEETING_INFO,
                StringUtilities.INDEX_TYPE_MEETING_INFO, meetingId);

        if (response.isExists()) {
            return response.getSourceAsString();
        } else {
            LOGGER.warn("No notes were shared yet");
            return null;
        }

    }

    @Override
    public void saveMeetingUsers(String users, String meetingId) {
        int count = 0;
        saveUsersRetry(count, users, meetingId);

    }

    @Override
    public MeetingUsers getConnectedUsers(String meetingId) {
        MeetingUsers usersList = new MeetingUsers();

        try {
            GetResponse response = elasticsearchClientImpl.getDocument(StringUtilities.INDEX_MEETING_INFO,
                    StringUtilities.INDEX_TYPE_MEETING_INFO_USERS, meetingId);

            if (response.isExists()) {
                usersList = (MeetingUsers) JSONUtils.JSONToObject(response.getSourceAsString(), MeetingUsers.class);
            }
        } catch (IndexNotFoundException exception) {
            LOGGER.warn("The meetinginfo index wasn't created yet");
        }

        return usersList;
    }

    @Override
    public void saveMeetingInfoByUserPersonalBoard(String meetingId, String info) {

        try {
            JsonNode node = OBJECT_MAPPER.readTree(info);
            String username = node.at("/username").asText();
            String infoToSave = node.at("/info").toString();

            elasticsearchClientImpl.insertData(infoToSave, StringUtilities.INDEX_MEETING_INFO, username, meetingId);

            LOGGER.info("Meeting info updated pseronal board - Meeting: '{}', username: '{}'", meetingId, username);

        } catch (IOException e) {
            LOGGER.error("JSON cannot be parsed, personal board ideas were broken - info: '{}'", info);
        }

    }

    @Override
    public String getMeetingInfoByUserPersonalBoard(String meetingId, String username) {
        try {
            GetResponse response = elasticsearchClientImpl.getDocument(StringUtilities.INDEX_MEETING_INFO, username,
                    meetingId);

            return response.getSourceAsString();
        } catch (IndexNotFoundException e) {
            LOGGER.warn("No such index yet - for retrieving the persoanl information '{}'",
                    String.format("%s_%s", username, meetingId));
        }

        return null;
    }

    @SuppressWarnings("unchecked")
    @Override
    public void removeIdeaFromCachePersonalBoard(String meetingId, String info) {

        try {
            JsonNode node = OBJECT_MAPPER.readTree(info);
            String username = node.at("/username").asText();
            String id = node.at("/id").asText();

            GetResponse getResponse = elasticsearchClientImpl.getDocument(StringUtilities.INDEX_MEETING_INFO, username,
                    meetingId);

            Map<String, Object> notesMapCache = new HashMap<>();

            if (getResponse.isExists()) {
                notesMapCache = (Map<String, Object>) JSONUtils.JSONToObject(getResponse.getSourceAsString(),
                        HashMap.class);

                notesMapCache.remove(id);

                String dataCache = JSONUtils.ObjectToJSON(notesMapCache);

                elasticsearchClientImpl.insertData(dataCache, StringUtilities.INDEX_MEETING_INFO,
                        StringUtilities.INDEX_TYPE_MEETING_INFO, meetingId);

                LOGGER.info("Meeting info personal board updated, removed idea - Meeting: '{}', username: '{}'",
                        meetingId, username);
            }

        } catch (IOException e) {
            LOGGER.error("The idea: '{}' for the meeting: '{}', couldn't be deleted", info, meetingId);
        }
    }

    @SuppressWarnings("unchecked")
    @Override
    public void updateSharedBoardCache(String meetingId, String info) {

        Idea idea = (Idea) JSONUtils.JSONToObject(info, Idea.class);

        GetResponse getResponse = elasticsearchClientImpl.getDocument(StringUtilities.INDEX_MEETING_INFO,
                StringUtilities.INDEX_TYPE_MEETING_INFO, meetingId);

        if (getResponse.isExists()) {
            Map<String, Object> notesMapCache = (Map<String, Object>) JSONUtils
                    .JSONToObject(getResponse.getSourceAsString(), HashMap.class);

            if (!ObjectUtils.isEmpty(notesMapCache.get(idea.getId()))) {
                notesMapCache.put(idea.getId(), idea);
            }

            String dataCache = JSONUtils.ObjectToJSON(notesMapCache);

            insertOrUpdateMeetingInfo(meetingId, dataCache);
        }
    }

    @SuppressWarnings("unchecked")
    @Override
    public void removeIdeasFromCacheSharedBoard(String meetingId, String info) {

        GetResponse getResponse = elasticsearchClientImpl.getDocument(StringUtilities.INDEX_MEETING_INFO,
                StringUtilities.INDEX_TYPE_MEETING_INFO, meetingId);

        try {
            JsonNode node = OBJECT_MAPPER.readTree(info);

            String id = node.get("id").asText();

            if (getResponse.isExists()) {
                Map<String, Object> notesMapCache = (Map<String, Object>) JSONUtils
                        .JSONToObject(getResponse.getSourceAsString(), HashMap.class);

                notesMapCache.remove(id);

                String dataCache = JSONUtils.ObjectToJSON(notesMapCache);

                insertOrUpdateMeetingInfo(meetingId, dataCache);
            }

        } catch (IOException e) {
            LOGGER.error("Cannot retrive the id of the idea to be deleted from the shared board - meeting: '{}'",
                    meetingId);
        }

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

    private void saveUsersRetry(int count, String user, String meetingId) {
        MeetingUsers connectedUsers = getConnectedUsers(meetingId);

        if (!connectedUsers.getUsers().contains(user)) {
            connectedUsers.addUser(user);
        } else {
            connectedUsers.getUsers().remove(user);
        }
        try {
            elasticsearchClientImpl.insertData(JSONUtils.ObjectToJSON(connectedUsers),
                    StringUtilities.INDEX_MEETING_INFO, StringUtilities.INDEX_TYPE_MEETING_INFO_USERS, meetingId);
            LOGGER.info("Meeting connected users updated - Meeting: '{}'", meetingId);
        } catch (ElasticsearchException e) {
            LOGGER.error("Failed to update meeting connected users - Retry '{}'", count);
            if (MAX_RETRIES > count) {
                saveUsersRetry(count += 1, user, meetingId);
            }
        }
    }

    private void insertOrUpdateMeetingInfo(String meetingId, String info) {

        elasticsearchClientImpl.insertData(info, StringUtilities.INDEX_MEETING_INFO,
                StringUtilities.INDEX_TYPE_MEETING_INFO, meetingId);

        LOGGER.info("Meeting info updated - Meeting: '{}'", meetingId);
    }

    @SuppressWarnings("unchecked")
    private void saveInfoRetry(int count, String data, String meetingId) {

        HashMap<String, Object> notesMap = (HashMap<String, Object>) JSONUtils.JSONToObject(data, HashMap.class);

        GetResponse getResponse = elasticsearchClientImpl.getDocument(StringUtilities.INDEX_MEETING_INFO,
                StringUtilities.INDEX_TYPE_MEETING_INFO, meetingId);

        Map<String, Object> notesMapCache = new HashMap<>();

        if (getResponse.isExists()) {
            notesMapCache = (Map<String, Object>) JSONUtils.JSONToObject(getResponse.getSourceAsString(),
                    HashMap.class);
        }

        notesMapCache.putAll(notesMap);

        String dataCache = JSONUtils.ObjectToJSON(notesMapCache);

        try {
            insertOrUpdateMeetingInfo(meetingId, dataCache);
            LOGGER.info("Meeting info updated - Meeting: '{}'", meetingId);
        } catch (ElasticsearchException e) {
            LOGGER.error("Failed to update meeting info - Retry '{}'", count);
            if (MAX_RETRIES > count) {
                saveInfoRetry(count += 1, data, meetingId);
            }
        }
    }

    private String getMeetingTopic(String meetingId) {
        GetResponse meetingResponse = elasticsearchClientImpl.getDocument(StringUtilities.INDEX_MEETING,
                StringUtilities.INDEX_TYPE_MEETING, meetingId);

        String topic = null;

        if (meetingResponse.isExists()) {
            JsonNode meetingNode;
            try {
                meetingNode = OBJECT_MAPPER.readTree(meetingResponse.getSourceAsString());

                topic = meetingNode.at("/topic").asText();

            } catch (IOException e) {
                LOGGER.error("Failed to obtain the topic from the meeting:'{}' - cannot get back the results",
                        meetingId);
            }

        }
        return topic;
    }

    private List<Idea> getIdeasGivenMeetingId(String meetingId) {

        BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
        queryBuilder.must(QueryBuilders.termQuery(IDEA_MEETING_ID_FIELD, meetingId));

        SearchResponse response = elasticsearchClientImpl.search(StringUtilities.INDEX_IDEAS, queryBuilder);

        List<Idea> ideasList = new ArrayList<>();

        if (response.getHits().getTotalHits() > 0) {
            for (SearchHit hit : response.getHits()) {
                ideasList.add((Idea) JSONUtils.JSONToObject(hit.getSourceAsString(), Idea.class));
            }
        }

        return ideasList;
    }

    @Autowired
    private void setElasticsearchClientImpl(ElasticsearchClientImpl elasticsearchClientImpl) {
        this.elasticsearchClientImpl = elasticsearchClientImpl;
    }

    @Autowired
    private void setTeamUserImpl(TeamRepository teamRepositoryImpl) {
        this.teamRepository = teamRepositoryImpl;
    }

    @Override
    public boolean createMeetingViewed(Meeting meeting) {
        String id = meeting.getMeetingId();
        TeamUserModel teamUserModel = teamRepository.getTeamUsersByMeeting(id);
        List<String> userNames = new ArrayList<String>();

        teamUserModel.getTeamUsers().forEach((user) -> {
            userNames.add(user.getUsername());
        });

        LOGGER.info("Creating meeting viewed users");
        LOGGER.debug("Users: '{}'", teamUserModel.toString());

        ViewedMeeting viewedMeeting = new ViewedMeeting();
        viewedMeeting.setUsers(userNames);
        viewedMeeting.setMeetingTopic(meeting.getTopic());
        String data = JSONUtils.ObjectToJSON(viewedMeeting);

        IndexResponse response = elasticsearchClientImpl.insertData(data, StringUtilities.INDEX_MEETING_VIEWED_USERS,
                StringUtilities.INDEX_TYPE_MEETING_VIEWED_USERS, meeting.getMeetingId());

        if (!response.isCreated()) {
            LOGGER.error("The meeting couldn't be created - Meeting: '{}'", meeting.toString());
            return false;
        }

        return true;

    }

    @Override
    public List<ViewedMeeting> getMeetingsNotViewed(String username) {
        LOGGER.info("Get meeting not viewed by user");
        LOGGER.debug("User: '{}'", username);
        List<ViewedMeeting> meetingsName = new ArrayList<>();

        BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
        queryBuilder.must(QueryBuilders.termQuery(MEETING_NOT_VIEWED_USERS, username))
                .mustNot(QueryBuilders.termQuery(MEETING_VIEWED_USERS, username));

        SearchResponse response = elasticsearchClientImpl.search(StringUtilities.INDEX_MEETING_VIEWED_USERS,
                queryBuilder);

        if (response.getHits().getTotalHits() > 0) {
            for (SearchHit hit : response.getHits()) {
                ViewedMeeting meeting = (ViewedMeeting) JSONUtils.JSONToObject(hit.getSourceAsString(),
                        ViewedMeeting.class);
                meeting.setMeetingId(hit.getId());
                meetingsName.add(meeting);
            }
        }
        return meetingsName;
    }

    @Override
    public void updateMeetingViewedByUser(List<ViewedMeeting> meetingsViewedByUser, String username) {
        List<BiFieldModel> dataToUpdate = new ArrayList<>();

        meetingsViewedByUser.forEach((meeting) -> {
            List<String> viewedUsers = meeting.getViewedUsers();
            viewedUsers.add(username);

            BiFieldModel<List<String>> meetingToUpdate = new BiFieldModel<List<String>>(meeting.getMeetingId(),
                    viewedUsers);
            dataToUpdate.add(meetingToUpdate);
        });

        elasticsearchClientImpl.updateNew(dataToUpdate, StringUtilities.INDEX_MEETING_VIEWED_USERS,
                StringUtilities.INDEX_TYPE_MEETING_VIEWED_USERS);

    }

}
