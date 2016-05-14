package org.iteam.services.logging;

import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.iteam.configuration.ExternalConfigurationProperties;
import org.iteam.data.dal.client.ElasticsearchClient;
import org.iteam.data.model.User;
import org.iteam.exceptions.UserExistanceException;
import org.iteam.services.utils.JSONUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class LoggingServiceImpl implements LoggingService {

	private static final Logger LOGGER = LoggerFactory.getLogger(LoggingServiceImpl.class);

	private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

	private ElasticsearchClient elasticsearchClient;
	private ExternalConfigurationProperties configuration;

	@Override
	public User getUser(String userName, String password) {

		if (checkUserExistance(userName)) {

			BoolQueryBuilder query = QueryBuilders.boolQuery();
			query.must(QueryBuilders.termQuery("userName", userName))
					.must(QueryBuilders.termQuery("password", password));

			SearchResponse response = elasticsearchClient.search(configuration.getElasticsearchIndexUserName(),
					configuration.getElasticsearchIndexUserTypeName(), query);

			return (User) JSONUtils.JSONToObject(response.getHits().getAt(0).getSourceAsString(), User.class);

		} else {
			throw new UserExistanceException();
		}
	}

	@Override
	public boolean setUser(User user) {
		String data = JSONUtils.ObjectToJSON(user);

		IndexResponse indexResponse = elasticsearchClient.insertData(data,
				configuration.getElasticsearchIndexUserName(), configuration.getElasticsearchIndexUserTypeName(),
				user.getUserName());

		if (indexResponse.isCreated() && indexResponse != null) {
			LOGGER.info("User created");
			return true;
		}

		LOGGER.info("User cannot be created - User: '{}'", user.toString());
		return false;
	}

	@Override
	public boolean checkUserExistance(String userName) {
		GetResponse response = elasticsearchClient.checkUser(configuration.getElasticsearchIndexUserName(),
				configuration.getElasticsearchIndexUserTypeName(), userName);

		if (response.isExists()) {
			return true;
		}
		return false;
	}

	@Autowired
	private void setElasticsearchClient(ElasticsearchClient elasticsearchClient) {
		this.elasticsearchClient = elasticsearchClient;
	}

	@Autowired
	private void setConfiguration(ExternalConfigurationProperties configuration) {
		this.configuration = configuration;
	}
}
