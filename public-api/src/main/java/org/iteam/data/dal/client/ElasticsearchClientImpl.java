package org.iteam.data.dal.client;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.List;

import javax.annotation.PostConstruct;

import org.elasticsearch.action.bulk.BulkRequestBuilder;
import org.elasticsearch.action.bulk.BulkResponse;
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
import org.elasticsearch.search.sort.SortBuilder;
import org.iteam.configuration.ExternalConfigurationProperties;
import org.iteam.exceptions.ElasticsearchClientException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

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

        return insert(index, type, id, data).setRefresh(true).execute().actionGet();
    }

    @Override
    public IndexResponse insertData(String data, String index, String type) {
        return insertData(data, index, type, null);
    }

    @Override
    public BulkResponse insertData(List<String> data, String index, String type) {

        BulkRequestBuilder insertBulk = client.prepareBulk();

        data.forEach((dataToInsert) -> {
            insertBulk.add(insert(index, type, null, dataToInsert));
        });

        return insertBulk.execute().actionGet();
    }

    @Override
    public SearchResponse search(String index, QueryBuilder queryBuilder, SortBuilder sort) {
        return search(index, queryBuilder, null, SIZE_RESPONSE, sort);
    }

    @Override
    public SearchResponse search(String index, QueryBuilder queryBuilder) {
        return search(index, queryBuilder, null, SIZE_RESPONSE, null);
    }

    @Override
    public SearchResponse search(String index, QueryBuilder queryBuilder, AbstractAggregationBuilder aggregationBuilder,
            Integer size) {
        return search(index, queryBuilder, aggregationBuilder, SIZE_RESPONSE, null);
    }

    @Override
    public SearchResponse search(String index, QueryBuilder queryBuilder, AbstractAggregationBuilder aggregationBuilder,
            Integer size, SortBuilder sort) {

        SearchRequestBuilder search = client.prepareSearch();

        search.setIndices(index);

        if(!ObjectUtils.isEmpty(queryBuilder)) {
            search.setQuery(queryBuilder);
        }

        if(!ObjectUtils.isEmpty(aggregationBuilder)) {
            search.addAggregation(aggregationBuilder);
        }

        if(!ObjectUtils.isEmpty(size)) {
            search.setSize(size);
        }

        if(!ObjectUtils.isEmpty(sort)) {
            search.addSort(sort);
        }

        return search.execute().actionGet();
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

    private IndexRequestBuilder insert(String index, String type, String id, String data) {
        IndexRequestBuilder indexRequest = client.prepareIndex();
        indexRequest.setIndex(index).setType(type);

        if(!ObjectUtils.isEmpty(id)) {
            indexRequest.setId(id);
        }

        return indexRequest.setSource(data);
    }

    @Autowired
    private void setConfiguration(ExternalConfigurationProperties configuration) {
        this.configuration = configuration;
    }
}
