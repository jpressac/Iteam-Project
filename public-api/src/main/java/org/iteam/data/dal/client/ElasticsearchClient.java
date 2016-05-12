package org.iteam.data.dal.client;

import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.QueryBuilder;

public interface ElasticsearchClient {

	public IndexResponse insertData(String data, String index, String type);

	public SearchResponse search(String index, String type, QueryBuilder queryBuilder);

}
