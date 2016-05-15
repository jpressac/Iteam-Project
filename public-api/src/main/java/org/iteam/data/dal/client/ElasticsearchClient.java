package org.iteam.data.dal.client;

import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.QueryBuilder;

public interface ElasticsearchClient {

	public IndexResponse insertData(String data, String index, String type, String id);

	public IndexResponse modifyData(String data, String index, String type, String id);

	public IndexResponse logicalDelete(String data, String index, String type, String id);

	public GetResponse checkUser(String index, String type, String userName);

	public SearchResponse search(String index, String type, QueryBuilder queryBuilder);

}
