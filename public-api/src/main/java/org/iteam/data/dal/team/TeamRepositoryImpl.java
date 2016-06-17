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
import org.iteam.configuration.ExternalConfigurationProperties;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.model.Filter;
import org.iteam.data.model.FilterList;
import org.iteam.data.model.Team;
import org.iteam.data.model.User;
import org.iteam.services.utils.JSONUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class TeamRepositoryImpl implements TeamRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(TeamRepositoryImpl.class);

	private ElasticsearchClientImpl elasticsearchClient;
	private ExternalConfigurationProperties configuration;
	private static final String OWNER_NAME_FIELD = "ownerName";
	private static final String TEAM_NAME_FIELD = "teamName";

	@Override
	public boolean putTeam(Team team) {

		String data = JSONUtils.ObjectToJSON(team);

		IndexResponse response = elasticsearchClient.insertData(data, configuration.getElasticsaerchIndexTeam(),
				configuration.getElasticsaerchIndexTypeTeam());

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

		SearchResponse searchResponse = elasticsearchClient.search(configuration.getElasticsaerchIndexTeam(),
				configuration.getElasticsaerchIndexTypeTeam(), query);

		DeleteResponse deleteResponse = null;

		if (searchResponse.getHits().getTotalHits() == 1) {
			deleteResponse = elasticsearchClient.delete(configuration.getElasticsaerchIndexTeam(),
					configuration.getElasticsaerchIndexTypeTeam(), searchResponse.getHits().getAt(0).getId());
		}

		if (deleteResponse != null && deleteResponse.isFound()) {
			LOGGER.info("Team was successfully deleted");
			return true;
		}

		LOGGER.warn("Team could not be deleted");
		return false;
	}

	@Override
	public List<User> filterToCreateTeam(FilterList filterList) {

		List<User> userList = new ArrayList<>();

		SearchResponse response = elasticsearchClient.search(configuration.getElasticsearchIndexUserName(),
				configuration.getElasticsearchIndexUserTypeName(), applyFiltersToQuery(filterList));
		if (response != null) {
			for (SearchHit hit : response.getHits()) {
				User user = (User) JSONUtils.JSONToObject(hit.getSourceAsString(), User.class);
				userList.add(user);
			}
		}

		return userList;
	}

	private QueryBuilder applyFiltersToQuery(FilterList filterList) {
		BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();

		for (Filter filter : filterList.getFilters()) {
			queryBuilder.should(QueryBuilders.termQuery(filter.getField(), filter.getValues()));
		}

		return queryBuilder.minimumNumberShouldMatch(1);

	}

	@Autowired
	private void setElasticsearchClient(ElasticsearchClientImpl elasticsearchClient) {
		this.elasticsearchClient = elasticsearchClient;
	}

	@Autowired
	private void setConfiguration(ExternalConfigurationProperties configuration) {
		this.configuration = configuration;
	}
}
