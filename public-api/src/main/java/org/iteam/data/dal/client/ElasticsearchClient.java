package org.iteam.data.dal.client;

import java.util.List;

import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.search.aggregations.AbstractAggregationBuilder;
import org.elasticsearch.search.sort.SortBuilder;
import org.iteam.data.model.BiFieldModel;

/**
 * Interface for all the request to elasticsearch
 *
 */
public interface ElasticsearchClient {

    /**
     * Insert a new document.
     * 
     * @param data
     *            the data to insert.
     * @param index
     *            the index name.
     * @param type
     *            the type name.
     * @param id
     *            the document id.
     * @return an index response with the information about the request.
     */
    public IndexResponse insertData(String data, String index, String type, String id);

    /**
     * Insert a new document with a random id.
     * 
     * @param data
     *            the data to insert.
     * @param index
     *            the index name.
     * @param type
     *            the type name.
     * @return an index response with the information about the request.
     */
    public IndexResponse insertData(String data, String index, String type);

    /**
     * Insert a multiple documents with a random id.
     * 
     * @param data
     *            the data to insert.
     * @param index
     *            the index name.
     * @param type
     *            the type name.
     * @return the information of the bulk request.
     */
    public BulkResponse insertData(List<String> data, String index, String type);

    /**
     * Modify an specific document.
     * 
     * @param data
     *            the new data, could be entire new data or some fields.
     * @param index
     *            the index name.
     * @param type
     *            the type name.
     * @param id
     *            the id of the document to modify.
     * @return an update response with the information about the request.
     */
    public UpdateResponse modifyData(String data, String index, String type, String id);

    /**
     * Delete in a logical way some document
     * 
     * @param data
     *            the new data, could be entire new data or some fields.
     * @param index
     *            the index name.
     * @param type
     *            the type name.
     * @param id
     *            the id of the document to delete.
     * @return an index response with the information about the request.
     */
    public UpdateResponse logicalDelete(String data, String index, String type, String id);

    /**
     * Verify the existence of an specific document
     * 
     * @param index
     *            the index name.
     * @param type
     *            the type name.
     * @param id
     *            the id of the document to check.
     * @return a get response with the information about the document.
     */
    public GetResponse getDocument(String index, String type, String id);

    /**
     * Search for documents, given an index, a type and a query.
     * 
     * @param index
     *            the index name.
     * @param queryBuilder
     *            the query for filtering documents.
     * @param sort
     *            the sort order of the return results.
     * @return a search response with the information of all the documents that
     *         match the search.
     */
    public SearchResponse search(String index, QueryBuilder queryBuilder, SortBuilder sort, Integer size, Integer from);

    /**
     * Search for documents, given an index, a type and a query.
     * 
     * @param index
     *            the index name.
     * @param queryBuilder
     *            the query for filtering documents.
     * @return a search response with the information of all the documents that
     *         match the search.
     */
    public SearchResponse search(String index, QueryBuilder queryBuilder, Integer size, Integer from);

    /**
     * Search for documents, given an index, a type, a query and an aggregation.
     * 
     * @param index
     *            the index name.
     * @param queryBuilder
     *            the query for filtering documents.
     * @param aggregationBuilder,
     *            the aggregation for grouping.
     * @param size
     *            limit the response query.
     * @param sort
     *            the sort order of the return results.
     * @return a search response with the information of all the documents that
     *         match the search.
     */
    public SearchResponse search(String index, QueryBuilder queryBuilder, AbstractAggregationBuilder aggregationBuilder,
            Integer size, Integer from, SortBuilder sort);

    /**
     * Search for documents, given an index, a type, a query and an aggregation.
     * 
     * @param index
     *            the index name.
     * @param queryBuilder
     *            the query for filtering documents.
     * @param aggregationBuilder,
     *            the aggregation for grouping.
     * @param size
     *            limit the response query.
     * @return a search response with the information of all the documents that
     *         match the search.
     */
    public SearchResponse search(String index, QueryBuilder queryBuilder, AbstractAggregationBuilder aggregationBuilder,
            Integer size);

    public DeleteResponse delete(String index, String type, String id);

    public BulkResponse updateNew(List<BiFieldModel> data, String index, String type);

    public BulkResponse updateScore(List<BiFieldModel> data, String index, String type);

    public SearchResponse search(String index, QueryBuilder queryBuilder, SortBuilder sort);

    public SearchResponse search(String index, QueryBuilder queryBuilder);
}
