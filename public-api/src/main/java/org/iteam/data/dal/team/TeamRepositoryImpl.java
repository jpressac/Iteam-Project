package org.iteam.data.dal.team;

import java.util.ArrayList;
import java.util.List;

import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.iteam.configuration.StringUtilities;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.model.Filter;
import org.iteam.data.model.FilterList;
import org.iteam.data.model.Team;
import org.iteam.data.model.UserDTO;
import org.iteam.services.utils.JSONUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TeamRepositoryImpl implements TeamRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(TeamRepositoryImpl.class);

	private ElasticsearchClientImpl elasticsearchClient;
	private static final String OWNER_NAME_FIELD = "ownerName";
	private static final String LOGICAL_DELETE_FIELD = "logicalDelete";
	private static final String TEAM_NAME_FIELD = "name";
	private static final String TEAM_MEMBERS_FIELD = "members";

	@Override
	public boolean putTeam(Team team) {

		String data = JSONUtils.ObjectToJSON(team);

		IndexResponse response = elasticsearchClient.insertData(data, StringUtilities.INDEX_TEAM,
				StringUtilities.INDEX_TYPE_TEAM);

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
	public List<Team> getTeams(String ownerName) {
		BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();
		queryBuilder.must(QueryBuilders.termQuery(OWNER_NAME_FIELD, ownerName));

		SearchResponse response = elasticsearchClient.search(StringUtilities.INDEX_TEAM, queryBuilder);

		List<Team> teamList = new ArrayList<>();

		if (response != null) {
			for (SearchHit hit : response.getHits()) {
				teamList.add((Team) JSONUtils.JSONToObject(hit.getSourceAsString(), Team.class));
			}
		}

		return teamList;
	}

	private QueryBuilder applyFiltersToQuery(FilterList filterList) {
		BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();

		for (Filter filter : filterList.getFilters()) {
			queryBuilder.should(QueryBuilders.termsQuery(filter.getField(), filter.getValues()));
		}

		queryBuilder.must(QueryBuilders.termQuery(LOGICAL_DELETE_FIELD, false));
		return queryBuilder.minimumNumberShouldMatch(1);

	}

	@Override
	public List<String> getTeamByUser(String username) {
		LOGGER.info("Getting teams by user: '{}'", username);

		SearchResponse response = elasticsearchClient.search(StringUtilities.INDEX_MEETING,
				QueryBuilders.termQuery(TEAM_MEMBERS_FIELD, username));

		List<String> teamList = new ArrayList<>();
		LOGGER.info("teams: ", response.toString());

		if (response != null) {
			for (SearchHit hit : response.getHits()) {
				LOGGER.debug("User '{}' teams: '{}'", username, hit.getSourceAsString());
				Team team = (Team) JSONUtils.JSONToObject(hit.getSourceAsString(), Team.class);
				teamList.add(team.getName());
			}
		}
		LOGGER.debug("User '{}' list of teams: '{}'", username, teamList.toString());

		return teamList;

	}

	@Autowired
	private void setElasticsearchClient(ElasticsearchClientImpl elasticsearchClient) {
		this.elasticsearchClient = elasticsearchClient;
	}
}
