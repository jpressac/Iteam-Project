package org.iteam.services.logging;

import java.io.IOException;

import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.iteam.configuration.ExternalConfigurationProperties;
import org.iteam.data.dal.client.ElasticsearchClient;
import org.iteam.data.model.User;
import org.iteam.exceptions.JsonConvertException;
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
	public User getUser(String userName) {
		QueryBuilder query = QueryBuilders.termQuery("userName", userName);
		SearchResponse response = elasticsearchClient.search(configuration.getElasticsearchIndexUserName(),
				configuration.getElasticsearchIndexUserTypeName(), query);
		return null;
	}

	@Override
	public boolean setUser(User user) {
		try {
			String data = OBJECT_MAPPER.writeValueAsString(user);

			IndexResponse indexResponse = elasticsearchClient.insertData(data,
					configuration.getElasticsearchIndexUserName(), configuration.getElasticsearchIndexUserTypeName());

			if (indexResponse.isCreated() && indexResponse != null) {
				LOGGER.info("User created");
				return true;
			}
		} catch (IOException e) {
			LOGGER.error("Cannot convert User to JSON Error: '{}'", e.getMessage());
			throw new JsonConvertException(e);
		}

		LOGGER.info("User cannot be created - User: '{}'", user.toString());
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
