package org.iteam.services.logging;

import java.security.MessageDigest;

import javax.xml.bind.DatatypeConverter;

import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.iteam.configuration.ExternalConfigurationProperties;
import org.iteam.data.dal.client.ElasticsearchClient;
import org.iteam.data.model.User;
import org.iteam.exceptions.HashingException;
import org.iteam.services.utils.JSONUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoggingServiceImpl implements LoggingService {

	private static final Logger LOGGER = LoggerFactory.getLogger(LoggingServiceImpl.class);

	private static final String SHA256_ALGORITHM = "SHA-256";
	private static final String UTF8_ENCODING = "UTF-8";
	private static final String USER_NAME_FIELD = "userName";
	private static final String PASSWORD_FIELD = "password";
	private static final String LOGICAL_DELETE_FIELD = "logicalDelete";

	private ElasticsearchClient elasticsearchClient;
	private ExternalConfigurationProperties configuration;

	@Override
	public User getUser(String userName, String password) {

		String hashPassword = getSha256Hash(password);

		BoolQueryBuilder query = QueryBuilders.boolQuery();
		query.must(QueryBuilders.termQuery(USER_NAME_FIELD, userName))
				.must(QueryBuilders.termQuery(PASSWORD_FIELD, hashPassword))
				.must(QueryBuilders.termQuery(LOGICAL_DELETE_FIELD, false));

		SearchResponse response = elasticsearchClient.search(configuration.getElasticsearchIndexUserName(),
				configuration.getElasticsearchIndexUserTypeName(), query);

		if (response.getHits().getTotalHits() != 0) {
			return (User) JSONUtils.JSONToObject(response.getHits().getAt(0).getSourceAsString(), User.class);
		}
		return null;
	}

	@Override
	public boolean setUser(User user) {

		user.setLogicalDelete(false);

		String data = JSONUtils.ObjectToJSON(user);

		IndexResponse indexResponse = elasticsearchClient.insertData(data,
				configuration.getElasticsearchIndexUserName(), configuration.getElasticsearchIndexUserTypeName(),
				user.getUserName());

		if (indexResponse.isCreated() && indexResponse != null) {
			LOGGER.info("User created");
			return true;
		}

		LOGGER.warn("User cannot be created - User: '{}'", user.toString());
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

	@Override
	public boolean modifyUser(User user) {

		String data = JSONUtils.ObjectToJSON(user);

		IndexResponse indexResponse = elasticsearchClient.modifyData(data,
				configuration.getElasticsearchIndexUserName(), configuration.getElasticsearchIndexUserTypeName(),
				user.getUserName());

		if (indexResponse.isCreated() && indexResponse != null) {
			LOGGER.info("User modified");
			return true;
		}

		LOGGER.warn("User cannot be modified - User: '{}'", user.toString());
		return false;
	}

	@Override
	public boolean logicalDelete(User user) {

		String data = JSONUtils.ObjectToJSON(user);

		IndexResponse indexResponse = elasticsearchClient.logicalDelete(data,
				configuration.getElasticsearchIndexUserName(), configuration.getElasticsearchIndexUserTypeName(),
				user.getUserName());

		if (indexResponse.isCreated() && indexResponse != null) {
			LOGGER.info("User deleted");
			return true;
		}

		LOGGER.warn("User cannot be deleted - User: '{}'", user.toString());
		return false;
	}

	private String getSha256Hash(String data) {

		try {
			MessageDigest mDigest = MessageDigest.getInstance(SHA256_ALGORITHM);
			byte[] dataBytes = mDigest.digest(data.getBytes(UTF8_ENCODING));
			return DatatypeConverter.printHexBinary(dataBytes);

		} catch (Exception e) {
			LOGGER.error("Error while hashing user password - Error: ", e);
			throw new HashingException(e);
		}
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
