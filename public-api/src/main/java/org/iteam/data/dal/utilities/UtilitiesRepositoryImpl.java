package org.iteam.data.dal.utilities;

import java.util.ArrayList;
import java.util.List;

import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.search.aggregations.AbstractAggregationBuilder;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms.Bucket;
import org.elasticsearch.search.aggregations.bucket.terms.Terms.Order;
import org.iteam.configuration.StringUtilities;
import org.iteam.data.dal.client.ElasticsearchClient;
import org.iteam.data.dto.Nationalities;
import org.iteam.services.utils.JSONUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UtilitiesRepositoryImpl implements UtilitiesRepository {

    private static final Logger LOGGER = LoggerFactory.getLogger(UtilitiesRepositoryImpl.class);

    private static final String NATIONALITIES_ID = "nationalities";
    private static final String PROFESSION_FIELD = "profession";

    private ElasticsearchClient elasticsearchClient;

    @Override
    public boolean insertNationalities(Nationalities nationalities) {

        String data = JSONUtils.ObjectToJSON(nationalities);

        IndexResponse indexResponse = elasticsearchClient.insertData(data, StringUtilities.INDEX_UTILITY,
                StringUtilities.INDEX_TYPE_UTILITY, NATIONALITIES_ID);

        if (indexResponse != null && indexResponse.isCreated()) {
            LOGGER.info("Nationalities created");
            return true;
        }

        LOGGER.warn("Nationalities cannot be created - Nationalities: '{}'", nationalities.toString());
        return false;

    }

    @Override
    public Nationalities getNationalities() {

        GetResponse response = elasticsearchClient.getDocument(StringUtilities.INDEX_UTILITY,
                StringUtilities.INDEX_TYPE_UTILITY, NATIONALITIES_ID);

        if (response != null && response.isExists()) {

            Nationalities nationalities = (Nationalities) JSONUtils.JSONToObject(response.getSourceAsString(),
                    Nationalities.class);

            LOGGER.debug("Nationalities retrieve successfully - '{}'", nationalities.toString());

            return nationalities;
        }

        LOGGER.warn("Nationalities cannot be retrieved");

        return null;
    }

    @Override
    public List<String> getProfessions() {

        List<String> professionsList = new ArrayList<>();

        AbstractAggregationBuilder agrgregationBuilder = AggregationBuilders.terms("professionAgg")
                .field(PROFESSION_FIELD).order(Order.term(true));

        SearchResponse response = elasticsearchClient.search(StringUtilities.INDEX_USER, agrgregationBuilder, 0);

        if (response != null) {
            Terms term = response.getAggregations().get("professionAgg");
            List<Bucket> buckets = term.getBuckets();

            buckets.forEach(b -> {
                professionsList.add(b.getKeyAsString());
            });
        }

        LOGGER.debug("Professions list: '{}'", professionsList.toString());

        return professionsList;
    }

    @Autowired
    private void setElasticsearchClient(ElasticsearchClient elasticsearchClient) {
        this.elasticsearchClient = elasticsearchClient;
    }
}
