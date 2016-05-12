package org.iteam.data.dal.client;

import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.annotation.PostConstruct;

import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.index.query.QueryBuilder;
import org.iteam.configuration.ExternalConfigurationProperties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class ElasticsearchClientImpl implements ElasticsearchClient {

	private static final Logger LOGGER = LoggerFactory.getLogger(ElasticsearchClientImpl.class);

	private static final String ELASTICSEARCH_CLUSTER_NAME_PROP = "cluster.name";

	private Client client;
	private ExternalConfigurationProperties configuration;

	@PostConstruct
	private void init() {
		Settings settings = Settings.settingsBuilder()
				.put(ELASTICSEARCH_CLUSTER_NAME_PROP, configuration.getElasticsearchClusterName())
				.put("client.transport.sniff", true).build();

		try {
			client = TransportClient.builder().settings(settings).build().addTransportAddress(
					new InetSocketTransportAddress(InetAddress.getByName(configuration.getElasticsearchHost()),
							configuration.getElasticsearchPort()));
		} catch (UnknownHostException e) {
			LOGGER.error("Unexpected exception while initializing Elastic Search client: ", e);
		}
	}

	@Override
	public IndexResponse insertData(String data, String index, String type) {
		return client.prepareIndex(index, type).setSource(data).execute().actionGet();
	}

	@Override
	public SearchResponse search(String index, String type, QueryBuilder queryBuilder) {
		return client.prepareSearch(index, type).setQuery(queryBuilder).execute().actionGet();
	}

	@Autowired
	private void setConfiguration(ExternalConfigurationProperties configuration) {
		this.configuration = configuration;
	}

}
