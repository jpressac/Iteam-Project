package org.iteam.data.dal.client;

import java.net.InetAddress;
import java.net.UnknownHostException;

import javax.annotation.PostConstruct;

import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexRequestBuilder;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequestBuilder;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.search.aggregations.AbstractAggregationBuilder;
import org.iteam.configuration.ExternalConfigurationProperties;
import org.iteam.exceptions.ElasticsearchClientException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.thymeleaf.util.StringUtils;

@Repository
public class ElasticsearchClientImpl implements ElasticsearchClient {

	private static final Logger LOGGER = LoggerFactory.getLogger(ElasticsearchClientImpl.class);

	private static final String ELASTICSEARCH_CLUSTER_NAME_PROP = "cluster.name";
	private static final Integer SIZE_RESPONSE = 10000;

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
			throw new ElasticsearchClientException(e);
		}
	}

	@Override
	public IndexResponse insertData(String data, String index, String type, String id) {

		IndexRequestBuilder indexRequest = client.prepareIndex();
		indexRequest.setIndex(index).setType(type);

		if (id != null || !StringUtils.isEmpty(id)) {
			indexRequest.setId(id);
		}

		return indexRequest.setSource(data).execute().actionGet();
	}

	@Override
	public IndexResponse insertData(String data, String index, String type) {
		return insertData(data, index, type, null);
	}

	@Override
	public SearchResponse search(String index, String type, QueryBuilder queryBuilder) {
		return search(index, type, queryBuilder, null, SIZE_RESPONSE);
	}

	@Override
	public SearchResponse search(String index, String type, QueryBuilder queryBuilder,
			AbstractAggregationBuilder aggregationBuilder, Integer size) {

		SearchRequestBuilder response = client.prepareSearch();

		response.setIndices(index).setTypes(type);

		if (queryBuilder != null) {
			response.setQuery(queryBuilder);
		}

		if (aggregationBuilder != null) {
			response.addAggregation(aggregationBuilder);
		}

		if (size != null) {
			response.setSize(size);
		}

		return response.execute().actionGet();
	}

	/*
	 * curl -XHEAD --dump-header - localhost:9200/index/type/doc(non-Javadoc)
	 * This request doesn't return a document body, just 200 or 404
	 * 
	 * @see
	 * org.iteam.data.dal.client.ElasticsearchClient#checkUser(java.lang.String,
	 * java.lang.String)
	 */
	@Override
	public GetResponse getDocument(String index, String type, String id) {
		return client.prepareGet(index, type, id).execute().actionGet();
	}

	@Override
	public UpdateResponse modifyData(String data, String index, String type, String id) {
		return client.prepareUpdate().setIndex(index).setType(type).setId(id).setDoc(data).execute().actionGet();
	}

	@Override
	public DeleteResponse delete(String index, String type, String id) {
		return client.prepareDelete(index, type, id).execute().actionGet();
	}

	@Override
	public UpdateResponse logicalDelete(String data, String index, String type, String id) {
		return modifyData(data, index, type, id);
	}

	@Autowired
	private void setConfiguration(ExternalConfigurationProperties configuration) {
		this.configuration = configuration;
	}
}
