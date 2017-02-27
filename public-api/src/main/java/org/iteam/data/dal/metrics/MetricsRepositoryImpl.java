package org.iteam.data.dal.metrics;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.get.MultiGetItemResponse;
import org.elasticsearch.action.get.MultiGetResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.aggregations.AbstractAggregationBuilder;
import org.elasticsearch.search.aggregations.AggregationBuilders;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms.Bucket;
import org.iteam.configuration.StringUtilities;
import org.iteam.data.dal.client.ElasticsearchClient;
import org.iteam.data.dto.GoogleChartDTO;
import org.iteam.data.dto.Meeting;
import org.iteam.data.dto.Timeframe;
import org.iteam.data.model.GoogleChartModel;
import org.iteam.services.utils.JSONUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

@Repository
public class MetricsRepositoryImpl implements MetricsRepository {

    private ElasticsearchClient elasticsearchClientImpl;

    @Override
    public GoogleChartModel getHistogramIdeasByMeeting(Timeframe timeframe) {

        // Generate timeframe query for filtering
        QueryBuilder queryBuilder = getQueryTimefram("insertionDate", timeframe);

        // Group by meetingId, this has to be done to get all the meetings
        // Involved in that timeframe, the size zero means no limit for the
        // aggregation
        AbstractAggregationBuilder aggregationBuilder = AggregationBuilders.terms("ideasByMeeting").field("meetingId")
                .size(0);

        SearchResponse response = elasticsearchClientImpl.search(StringUtilities.INDEX_IDEAS, queryBuilder,
                aggregationBuilder, 0);

        // Get the list of meeting ids with the amount of ideas by meeting
        List<GoogleChartDTO> chartInfoList = getIdeasByMeeting(response);

        // Get the ids of all meetings.
        List<String> documentIdList = chartInfoList.parallelStream().map(GoogleChartDTO::getLabelChart)
                .collect(Collectors.toList());

        // Get the information about the meeting (topic) and create the Google
        // Chart Model
        MultiGetResponse multiGetResponse = elasticsearchClientImpl.multiGet(documentIdList);

        return new GoogleChartModel(createModelWithMeetingInformation(chartInfoList, multiGetResponse));

    }

    @Override
    public GoogleChartModel getPieChartMeetingByOwner(Timeframe timeframe) {

        // Generate timeframe query for filtering
        QueryBuilder queryBuilder = getQueryTimefram("programmedDate", timeframe);

        // Aggregation to get all the meetings by owner
        AbstractAggregationBuilder aggreagtionBuilder = AggregationBuilders.terms("meetingsByOwner").field("ownerName")
                .size(0);

        SearchResponse response = elasticsearchClientImpl.search(StringUtilities.INDEX_MEETING, null,
                aggreagtionBuilder, 1);

        Terms term = response.getAggregations().get("meetingsByOwner");

        List<Bucket> bucketList = term.getBuckets();
        List<GoogleChartDTO> chartInformation = new ArrayList<>();

        for (Bucket bucket : bucketList) {
            chartInformation.add(new GoogleChartDTO(bucket.getKeyAsString(), bucket.getDocCount()));
        }

        return new GoogleChartModel(chartInformation);

    }

    private List<GoogleChartDTO> createModelWithMeetingInformation(List<GoogleChartDTO> chartInfoList,
            MultiGetResponse multiGetResponse) {

        List<GoogleChartDTO> chartData = new ArrayList<>();

        for (MultiGetItemResponse multiGet : multiGetResponse.getResponses()) {

            if (!ObjectUtils.isEmpty(multiGet.getResponse())) {
                GetResponse response = multiGet.getResponse();

                Meeting meeting = (Meeting) JSONUtils.JSONToObject(response.getSourceAsString(), Meeting.class);

                for (GoogleChartDTO chartInformation : chartInfoList) {
                    if (chartInformation.getLabelChart().equals(meeting.getMeetingId())) {
                        chartData.add(new GoogleChartDTO(meeting.getTopic(), chartInformation.getAmount()));
                    }
                }
            }
        }

        return chartData;
    }

    private List<GoogleChartDTO> getIdeasByMeeting(SearchResponse response) {

        Terms term = response.getAggregations().get("ideasByMeeting");
        List<Bucket> bucketList = term.getBuckets();
        List<GoogleChartDTO> meetingIdList = new ArrayList<>();

        for (Bucket bucket : bucketList) {
            meetingIdList.add(new GoogleChartDTO(bucket.getKeyAsString(), bucket.getDocCount()));
        }

        return meetingIdList;
    }

    private QueryBuilder getQueryTimefram(String dateField, Timeframe timeframe) {
        BoolQueryBuilder queryBuilder = QueryBuilders.boolQuery();

        switch (timeframe) {
        case ONE_DAY:
            queryBuilder.must(QueryBuilders.rangeQuery(dateField).from("now-1d"));
            break;

        case ONE_WEEK:
            queryBuilder.must(QueryBuilders.rangeQuery(dateField).from("now-7d"));
            break;

        case ONE_MONTH:
            queryBuilder.must(QueryBuilders.rangeQuery(dateField).from("now-1M"));
            break;

        case ONE_YEAR:
            queryBuilder.must(QueryBuilders.rangeQuery(dateField).from("now-1y"));
            break;
        }
        return queryBuilder;

    }

    @Autowired
    public void setElasticsearchClientImpl(ElasticsearchClient elasticsearchClientImpl) {
        this.elasticsearchClientImpl = elasticsearchClientImpl;
    }
}
