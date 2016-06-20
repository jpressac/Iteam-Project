package org.iteam.data.dal.user;

import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.iteam.configuration.ExternalConfigurationProperties;
import org.iteam.data.dal.client.ElasticsearchClient;
import org.iteam.data.model.User;
import org.iteam.services.utils.JSONUtils;
import org.joda.time.DateTime;
import org.joda.time.DateTimeZone;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepsoitory {

	private static final Logger LOGGER = LoggerFactory.getLogger(UserRepositoryImpl.class);
	private static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

	private static final String USER_NAME_FIELD = "username";
	private static final String LOGICAL_DELETE_FIELD = "logicalDelete";

	private ElasticsearchClient elasticsearchClient;
	private ExternalConfigurationProperties configuration;

	@Override
	public User getUser(String username) {

		BoolQueryBuilder query = QueryBuilders.boolQuery();
		query.must(QueryBuilders.termQuery(USER_NAME_FIELD, username))
				.must(QueryBuilders.termQuery(LOGICAL_DELETE_FIELD, false));

		SearchResponse response = elasticsearchClient.search(configuration.getElasticsearchIndexUserName(),
				configuration.getElasticsearchIndexUserTypeName(), query);

		if (response != null && response.getHits().getTotalHits() == 1) {
			return (User) JSONUtils.JSONToObject(response.getHits().getAt(0).getSourceAsString(), User.class);
		}
		return null;
	}

	@Override
	public boolean setUser(User user) {

		user.setPassword(PASSWORD_ENCODER.encode(user.getPassword()));

		DateTime dateTime = new DateTime().withZoneRetainFields(DateTimeZone.UTC);
		user.setInsertionDate(dateTime.toString());

		String data = JSONUtils.ObjectToJSON(user);

		IndexResponse indexResponse = elasticsearchClient.insertData(data,
				configuration.getElasticsearchIndexUserName(), configuration.getElasticsearchIndexUserTypeName(),
				user.getUsername());

		if (indexResponse != null && indexResponse.isCreated()) {
			LOGGER.info("User created");
			return true;
		}

		LOGGER.warn("User cannot be created - User: '{}'", user.toString());
		return false;
	}

	@Override
	public boolean checkUserExistance(String username) {

		GetResponse response = elasticsearchClient.getDocument(configuration.getElasticsearchIndexUserName(),
				configuration.getElasticsearchIndexUserTypeName(), username);

		if (response != null && response.isExists()) {
			return true;
		}
		return false;
	}

	@Override
	public boolean modifyUser(String doc, String username) {

		// TODO: verify how to validate update response.
		elasticsearchClient.modifyData(doc, configuration.getElasticsearchIndexUserName(),
				configuration.getElasticsearchIndexUserTypeName(), username);

		LOGGER.info("User modified");
		return true;
	}

	@Override
	public boolean logicalDelete(String doc, String username) {

		// TODO: verify how to validate update response.
		elasticsearchClient.logicalDelete(doc, configuration.getElasticsearchIndexUserName(),
				configuration.getElasticsearchIndexUserTypeName(), username);
		LOGGER.info("User deleted");
		return true;
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
