package org.iteam.data.dal.team;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.iteam.configuration.StringUtilities;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.dto.Filter;
import org.iteam.data.dto.Meeting;
import org.iteam.data.dto.Team;
import org.iteam.data.dto.UserDTO;
import org.iteam.data.model.FilterList;
import org.iteam.data.model.TeamModel;
import org.iteam.data.model.TeamUserModel;
import org.iteam.services.utils.JSONUtils;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TeamRepositoryImpl implements TeamRepository {

    private static final Logger LOGGER = LoggerFactory.getLogger(TeamRepositoryImpl.class);

    private static final String OWNER_NAME_FIELD = "ownerName";
    private static final String LOGICAL_DELETE_FIELD = "logicalDelete";
    private static final String TEAM_NAME_FIELD = "name";
    private static final String TEAM_MEMBERS_FIELD = "members";
    private static final String USER_USERNAME_FIELD = "username";
    private static final String BORN_DATE_FIELD = "bornDate";
    private static final String SCORING_FIELD = "score";

    private ElasticsearchClientImpl elasticsearchClient;

    @Override
    public boolean putTeam(Team team) {

        // adds creation Date time epoch-millis
        team.setCreationDate(DateTime.now().getMillis());
        String data = JSONUtils.ObjectToJSON(team);

        IndexResponse response = elasticsearchClient.insertData(data, StringUtilities.INDEX_TEAM,
                StringUtilities.INDEX_TYPE_TEAM, UUID.randomUUID().toString());

        if (response.isCreated()) {
            LOGGER.info("Team successfully created");
            return true;
        }
        LOGGER.warn("The team could not be created");
        return false;
    }

    @Override
    public boolean deleteTeam(String ownerName, String teamName) {

        BoolQueryBuilder query = QueryBuilders.boolQuery();

        query.must(QueryBuilders.termQuery(OWNER_NAME_FIELD, ownerName))
                .must(QueryBuilders.termQuery(TEAM_NAME_FIELD, teamName));

        SearchResponse searchResponse = elasticsearchClient.search(StringUtilities.INDEX_TEAM, query);

        DeleteResponse deleteResponse = null;

        if (searchResponse.getHits().getTotalHits() == 1) {
            deleteResponse = elasticsearchClient.delete(StringUtilities.INDEX_TEAM, StringUtilities.INDEX_TYPE_TEAM,
                    searchResponse.getHits().getAt(0).getId());
        }

        if (deleteResponse != null && deleteResponse.isFound()) {
            LOGGER.info("Team was successfully deleted");
            return true;
        }

        LOGGER.warn("Team could not be deleted");
        return false;
    }

    @Override
    public List<UserDTO> filterToCreateTeam(FilterList filterList) {

        List<UserDTO> userList = new ArrayList<>();

        SearchResponse response = elasticsearchClient.search(StringUtilities.INDEX_USER,
                applyFiltersToQuery(filterList));
        if (response != null) {
            for (SearchHit hit : response.getHits()) {
                UserDTO user = (UserDTO) JSONUtils.JSONToObject(hit.getSourceAsString(), UserDTO.class);
                userList.add(user);
            }
        }

        return userList;
    }

    @Override
    public List<TeamModel> getTeams(String ownerName) {
        BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
        queryBuilder.must(QueryBuilders.termQuery(OWNER_NAME_FIELD, ownerName));

        SearchResponse response = elasticsearchClient.search(StringUtilities.INDEX_TEAM, queryBuilder);

        List<TeamModel> teamList = new ArrayList<>();

        if (response != null) {
            for (SearchHit hit : response.getHits()) {
                teamList.add(
                        new TeamModel(hit.getId(), (Team) JSONUtils.JSONToObject(hit.getSourceAsString(), Team.class)));
            }
        }
        return teamList;
    }

    private QueryBuilder applyFiltersToQuery(FilterList filterList) {
        BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();

        for (Filter filter : filterList.getFilters()) {

            if (filter.getField().equals("Age")) {

                Long from = new DateTime().minusYears(Integer.parseInt((filter.getValues().get(0)))).getMillis();
                Long to = new DateTime().minusYears(Integer.parseInt((filter.getValues().get(1)))).getMillis();

                queryBuilder.should(QueryBuilders.rangeQuery(BORN_DATE_FIELD).to(from).from(to));
            }

            if (filter.getField().equals("Scoring")) {

                Long from = new DateTime().minusYears(Integer.parseInt((filter.getValues().get(0)))).getMillis();
                Long to = new DateTime().minusYears(Integer.parseInt((filter.getValues().get(1)))).getMillis();

                queryBuilder.should(QueryBuilders.rangeQuery(SCORING_FIELD).to(to).from(from));
            }

            if (filter.getField().equals("Profession") || filter.getField().equals("Nationality")) {
                queryBuilder.should(QueryBuilders.termsQuery(filter.getField(), filter.getValues().get(0)));
            }
        }

        queryBuilder.must(QueryBuilders.termQuery(LOGICAL_DELETE_FIELD, false));
        return queryBuilder.minimumNumberShouldMatch(1);

    }

    @Override
    public List<String> getTeamByUser(String username) {
        LOGGER.info("Getting teams by user: '{}'", username);

        SearchResponse response = elasticsearchClient.search(StringUtilities.INDEX_TEAM,
                QueryBuilders.termQuery(TEAM_MEMBERS_FIELD, username));

        List<String> teamList = new ArrayList<>();

        if (response != null) {
            for (SearchHit hit : response.getHits()) {
                LOGGER.debug("User '{}' teams: '{}'", username, hit.getSourceAsString());
                teamList.add(hit.getId());
                LOGGER.debug("teams: " + hit.getId());
            }
        }
        return teamList;

    }

    @Override
    public TeamUserModel getTeamUsersByMeeting(String meetingId) {
        LOGGER.info("Retrieving team id for meeting '{}'", meetingId);

        GetResponse meetingResponse = elasticsearchClient.getDocument(StringUtilities.INDEX_MEETING,
                StringUtilities.INDEX_TYPE_MEETING, meetingId);

        TeamUserModel teamUserModel = new TeamUserModel();

        if (meetingResponse.isExists()) {
            Meeting meeting = (Meeting) JSONUtils.JSONToObject(meetingResponse.getSourceAsString(), Meeting.class);

            LOGGER.debug("Meeting retrieved '{}'", meeting.toString());

            GetResponse teamResponse = elasticsearchClient.getDocument(StringUtilities.INDEX_TEAM,
                    StringUtilities.INDEX_TYPE_TEAM, meeting.getTeamName());

            if (teamResponse.isExists()) {

                LOGGER.debug("Team retrieved '{}'", teamResponse.toString());

                Team team = (Team) JSONUtils.JSONToObject(teamResponse.getSourceAsString(), Team.class);

                teamUserModel.setTeamId(team.getName());

                BoolQueryBuilder query = QueryBuilders.boolQuery();

                query.should(QueryBuilders.termsQuery(USER_USERNAME_FIELD, team.getMembers()));

                // This could change in the future.
                query.minimumNumberShouldMatch(1);

                SearchResponse response = elasticsearchClient.search(StringUtilities.INDEX_USER, query);

                List<UserDTO> usersList = new ArrayList<>();

                if (response.getHits().getTotalHits() > 0) {

                    for (SearchHit hit : response.getHits()) {

                        UserDTO user = (UserDTO) JSONUtils.JSONToObject(hit.getSourceAsString(), UserDTO.class);

                        usersList.add(user);
                    }
                }

                teamUserModel.setTeamUsers(usersList);
            }
        }

        return teamUserModel;
    }

    @Override
    public boolean checkTeamNameExistent(String teamName, String teamOwner) {

        BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();

        queryBuilder.must(QueryBuilders.termQuery(OWNER_NAME_FIELD, teamOwner));
        queryBuilder.must(QueryBuilders.termQuery(TEAM_NAME_FIELD, teamName));

        SearchResponse response = elasticsearchClient.search(StringUtilities.INDEX_TEAM, queryBuilder);

        return response.getHits().getTotalHits() > 0;
    }

    @Autowired
    private void setElasticsearchClient(ElasticsearchClientImpl elasticsearchClient) {
        this.elasticsearchClient = elasticsearchClient;
    }
}
