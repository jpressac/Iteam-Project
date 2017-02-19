package org.iteam.data.dal.meeting;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.elasticsearch.ElasticsearchException;
import org.elasticsearch.action.bulk.BulkResponse;
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
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.MeetingUsers;
import org.iteam.data.model.PaginationModel;
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
    private static final String MEETING_TOPIC = "topic";
    private static final String MEETING_VIEWED_USERS = "viewedUsers";
    private static final String MEETING_NOT_VIEWED_USERS = "users";
    private static final int MAX_RETRIES = 5;
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    private static final String MEETING_HAS_ENDED = "{\"ended\": true }";

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
    public void updateMeeting(Meeting updatedMeeting) {
        LOGGER.info("Updating meeting");
        LOGGER.debug("Meeting: '{}'", updatedMeeting.toString());

        String data = JSONUtils.ObjectToJSON(updatedMeeting);

        // we can't know for sure if elasticsearch has updated the document or
        // not.
        elasticsearchClientImpl.modifyData(data, StringUtilities.INDEX_MEETING, StringUtilities.INDEX_TYPE_MEETING,
                updatedMeeting.getMeetingId());
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

    @Override
    public String getMeetingTopic(String meetingId) {
        GetResponse meetingResponse = elasticsearchClientImpl.getDocument(StringUtilities.INDEX_MEETING,
                StringUtilities.INDEX_TYPE_MEETING, meetingId);

        String topic = null;

        if (meetingResponse.isExists()) {
            try {
                JsonNode meetingNode = OBJECT_MAPPER.readTree(meetingResponse.getSourceAsString());

                topic = meetingNode.at("/topic").asText();

            } catch (IOException e) {
                LOGGER.error("Failed to obtain the topic from the meeting:'{}' - cannot get back the results",
                        meetingId);
            }

        }
        return topic;
    }

    @Override
    public List<Idea> getIdeasGivenMeetingId(String meetingId) {

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

    @Override
    public void updateEndedMeetings() {
        LOGGER.info("Updating ended meetings");

        @SuppressWarnings("rawtypes")
        List<BiFieldModel<String>> meetingsToUpdate = new ArrayList<BiFieldModel<String>>();

        BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
        queryBuilder.mustNot(QueryBuilders.existsQuery(MEETING_STATE_NAME_FIELD))
                .must(QueryBuilders.rangeQuery(PROGRAMMED_DATE_FIELD).to(DateTime.now().getMillis()));

        SearchResponse response = elasticsearchClientImpl.search(StringUtilities.INDEX_MEETING, queryBuilder,
                SortBuilders.fieldSort(PROGRAMMED_DATE_FIELD).order(SortOrder.DESC));

        if (response.getHits().getTotalHits() > 0) {

            for (SearchHit hit : response.getHits()) {

                @SuppressWarnings({ "rawtypes", "unchecked" })
                BiFieldModel meetingToUpdate = new BiFieldModel(hit.getId(), MEETING_HAS_ENDED);
                meetingsToUpdate.add(meetingToUpdate);
            }
            if (!ObjectUtils.isEmpty(meetingsToUpdate)) {

                BulkResponse bulkResponse = elasticsearchClientImpl.bulkUpdate(meetingsToUpdate,
                        StringUtilities.INDEX_MEETING, StringUtilities.INDEX_TYPE_MEETING);

                if (bulkResponse.hasFailures()) {
                    LOGGER.error("Error while performing bulk - {}", bulkResponse.buildFailureMessage());
                }
            }
        }

    }

    @Override
    public PaginationModel<Meeting> getMeetingsByToken(String username, String token, int from, int size,
            boolean ended) {

        BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
        queryBuilder.must(QueryBuilders.termQuery(MEETING_OWNER_NAME_FIELD, username));

        // Add token search
        if (!ObjectUtils.isEmpty(token)) {
            queryBuilder.must(QueryBuilders.matchQuery(MEETING_TOPIC, token));
        }

        // Define if the meetings is ended or not.
        if (ended) {
            queryBuilder.must(QueryBuilders.existsQuery(MEETING_STATE_NAME_FIELD));
        } else {
            queryBuilder.mustNot(QueryBuilders.existsQuery(MEETING_STATE_NAME_FIELD));
        }

        SearchResponse response = elasticsearchClientImpl.search(StringUtilities.INDEX_MEETING, queryBuilder, size,
                from);

        List<Meeting> meetings = new ArrayList<>();

        if (response.getHits().getTotalHits() > 0) {
            for (SearchHit hit : response.getHits()) {
                meetings.add((Meeting) JSONUtils.JSONToObject(hit.getSourceAsString(), Meeting.class));
            }

        }
        return new PaginationModel<>(response.getHits().getTotalHits(), meetings);
    }

    @Override
    public PaginationModel<Meeting> getMeetingsByToken(String username, int from, int size, boolean ended) {
        return getMeetingsByToken(username, null, from, size, ended);
    }

    @Override
    public List<ViewedMeeting> getMeetingsNotViewed(String username) {
        LOGGER.info("Get meeting not viewed by user");
        LOGGER.debug("User: '{}'", username);

        List<ViewedMeeting> meetingsName = new ArrayList<>();

        BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
        queryBuilder.must(QueryBuilders.termQuery(MEETING_NOT_VIEWED_USERS, username))
                .mustNot(QueryBuilders.termQuery(MEETING_VIEWED_USERS, username));

        try {
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
        } catch (IndexNotFoundException e) {
            LOGGER.error("Index not found - while try to retrieve meetings viewed information ", e);
        }
        return meetingsName;
    }

    @Override
    public void updateMeetingViewedByUser(List<ViewedMeeting> meetingsViewedByUser, String username) {
        @SuppressWarnings("rawtypes")
        List<BiFieldModel<String>> dataToUpdate = new ArrayList<>();

        if (!ObjectUtils.isEmpty(meetingsViewedByUser)) {
            meetingsViewedByUser.forEach((meeting) -> {

                // ViewedUser is a Set, for instance there is no need to check
                // if
                // exists or not the user, and there never be a repeated user.
                meeting.getViewedUsers().add(username);

                BiFieldModel<String> meetingToUpdate = new BiFieldModel<String>(meeting.getMeetingId(),
                        JSONUtils.ObjectToJSON(meeting));

                dataToUpdate.add(meetingToUpdate);
            });

            elasticsearchClientImpl.bulkUpdate(dataToUpdate, StringUtilities.INDEX_MEETING_VIEWED_USERS,
                    StringUtilities.INDEX_TYPE_MEETING_VIEWED_USERS);
        }

    }

    @Override
    public void updateMeetingViewed(Meeting updatedMeeting) {
        LOGGER.info("Updating meeting viewed");

        ViewedMeeting data = new ViewedMeeting();

        data.getViewedUsers().add(updatedMeeting.getOwnerName());

        data.setMeetingTopic(updatedMeeting.getTopic());
        data.setTime(updatedMeeting.getProgrammedDate());

        elasticsearchClientImpl.modifyData(JSONUtils.ObjectToJSON(data), StringUtilities.INDEX_MEETING_VIEWED_USERS,
                StringUtilities.INDEX_TYPE_MEETING_VIEWED_USERS, updatedMeeting.getMeetingId());

    }

    @Override
    public boolean createMeetingViewed(Meeting meeting) {

        String id = meeting.getMeetingId();
        TeamUserModel teamUserModel = teamRepository.getTeamUsersByMeeting(id);

        ViewedMeeting viewedMeeting = new ViewedMeeting();

        viewedMeeting.setMeetingTopic(meeting.getTopic());
        viewedMeeting.setTime(meeting.getProgrammedDate());
        viewedMeeting.setMeetingId(meeting.getMeetingId());
        viewedMeeting.getViewedUsers().add(meeting.getOwnerName());

        teamUserModel.getTeamUsers().forEach((user) -> {
            viewedMeeting.getUsers().add(user.getUsername());
        });

        LOGGER.info("Creating meeting viewed users");
        LOGGER.debug("Users: '{}'", teamUserModel.toString());

        String data = JSONUtils.ObjectToJSON(viewedMeeting);

        IndexResponse response = elasticsearchClientImpl.insertData(data, StringUtilities.INDEX_MEETING_VIEWED_USERS,
                StringUtilities.INDEX_TYPE_MEETING_VIEWED_USERS, meeting.getMeetingId());

        if (!response.isCreated()) {
            LOGGER.error("The meeting couldn't be created - Meeting: '{}'", meeting.toString());
            return false;
        }

        return true;

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

    @Autowired
    public void setTeamRepository(TeamRepository teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Autowired
    private void setElasticsearchClientImpl(ElasticsearchClientImpl elasticsearchClientImpl) {
        this.elasticsearchClientImpl = elasticsearchClientImpl;
    }
}
