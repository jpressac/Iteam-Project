package org.iteam.configuration;

import java.net.UnknownHostException;

import org.iteam.exceptions.MongodbException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import com.mongodb.DB;
import com.mongodb.MongoClient;

/**
 * Handles Mongo configuration and others methods;
 */
@Configuration
public class MongoConfiguration {
	private static final Logger LOGGER = LoggerFactory.getLogger(MongoConfiguration.class);

	private ExternalConfigurationProperties externalConfigurationProperties;
	private MongoClient client;

	/**
	 * Initialize mongo client.
	 * 
	 * @return a mongo client instance.
	 */
	public MongoClient getClient() {
		try {
			client = new MongoClient(externalConfigurationProperties.getMongoHost(),
					externalConfigurationProperties.getMongoPort());

			return client;
		} catch (UnknownHostException e) {
			LOGGER.error("Error while opening mongo database - Error: '{}' ", e.getMessage());
			throw new MongodbException(e);
		}
	}

	/**
	 * Get the database.
	 * 
	 * @param databaseName,
	 *            the name of the database
	 * @return the instance of the database.
	 */
	public DB getDatabase(String databaseName) {
		return client.getDB(databaseName);
	}

	/**
	 * Get the database.
	 * 
	 * @return the instance of the database.
	 */
	public DB getDatabase() {
		return client.getDB(externalConfigurationProperties.getMongoDbName());
	}

	@Autowired
	private void setExternalConfigurationProperties(ExternalConfigurationProperties externalConfigurationProperties) {
		this.externalConfigurationProperties = externalConfigurationProperties;
	}

}
