package org.iteam.data.dal.client;

import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.QueryBuilder;

/**
 * Interface for all the request to elasticsearch
 *
 */
public interface ElasticsearchClient {

	/**
	 * Insert a new document.
	 * 
	 * @param data,
	 *            the data to insert.
	 * @param index,
	 *            the index name.
	 * @param type,
	 *            the type name.
	 * @param id,
	 *            the document id.
	 * @return an index response with the information about the request.
	 */
	public IndexResponse insertData(String data, String index, String type, String id);

	/**
	 * Modify an specific document.
	 * 
	 * @param data,
	 *            the new data, could be entire new data or some fields.
	 * @param index,
	 *            the index name.
	 * @param type,
	 *            the type name.
	 * @param id,
	 *            the id of the document to modify.
	 * @return an index response with the information about the request.
	 */
	public IndexResponse modifyData(String data, String index, String type, String id);

	/**
	 * Delete in a logical way some document
	 * 
	 * @param data,
	 *            the new data, could be entire new data or some fields.
	 * @param index,
	 *            the index name.
	 * @param type,
	 *            the type name.
	 * @param id,
	 *            the id of the document to delete.
	 * @return an index response with the information about the request.
	 */
	public IndexResponse logicalDelete(String data, String index, String type, String id);

	/**
	 * Verify the existence of an specific document
	 * 
	 * @param index,
	 *            the index name.
	 * @param type,
	 *            the type name.
	 * @param userName,
	 *            the id of the document to check.
	 * @return a get response with the information about the document.
	 */
	public GetResponse checkUser(String index, String type, String userName);

	/**
	 * Search for documents, given an index, a type and a query.
	 * 
	 * @param index,
	 *            the index name.
	 * @param type,
	 *            the type name.
	 * @param queryBuilder,
	 *            the query for filtering documents.
	 * @return a search response with the information of all the documents that
	 *         match the search.
	 */
	public SearchResponse search(String index, String type, QueryBuilder queryBuilder);

}
