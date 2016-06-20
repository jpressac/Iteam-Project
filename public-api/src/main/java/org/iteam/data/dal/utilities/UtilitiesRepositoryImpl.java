package org.iteam.data.dal.utilities;

import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.iteam.configuration.ExternalConfigurationProperties;
import org.iteam.data.dal.client.ElasticsearchClient;
import org.iteam.data.model.Nationalities;
import org.iteam.services.utils.JSONUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

public class UtilitiesRepositoryImpl implements UtilitiesRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(UtilitiesRepositoryImpl.class);

	private static final String NATIONALITIES_ID = "nationalities";

	private ElasticsearchClient elasticsearchClient;
	private ExternalConfigurationProperties configuration;

	@Override
	public boolean insertNationalities(Nationalities nationalities) {

		String data = JSONUtils.ObjectToJSON(nationalities);

		IndexResponse indexResponse = elasticsearchClient.insertData(data, configuration.getElasticsearchIndexUtility(),
				configuration.getElasticsearchIndexTypeUtility(), NATIONALITIES_ID);

		if (indexResponse != null && indexResponse.isCreated()) {
			LOGGER.info("Nationalities created");
			return true;
		}

		LOGGER.warn("Nationalities cannot be created - Nationalities: '{}'", nationalities.toString());
		return false;

	}

	@Override
	public Nationalities getNationalities() {

		GetResponse response = elasticsearchClient.getDocument(configuration.getElasticsearchIndexUtility(),
				configuration.getElasticsearchIndexTypeUtility(), NATIONALITIES_ID);

		if (response != null && response.isExists()) {

			Nationalities nationalities = (Nationalities) JSONUtils.JSONToObject(response.getSourceAsString(),
					Nationalities.class);

			LOGGER.debug("Nationalities retrieve successfully - '{}'", nationalities.toString());

			return nationalities;
		}

		LOGGER.warn("Nationalities cannot be retrieved");

		return null;
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
