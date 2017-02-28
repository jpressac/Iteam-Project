package org.iteam.data.dal.metrics;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
import org.iteam.data.dto.Team;
import org.iteam.data.dto.Timeframe;
import org.iteam.data.model.GoogleChartModel;
import org.iteam.services.utils.JSONUtils;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

@Repository
public class MetricsRepositoryImpl implements MetricsRepository {

    private ElasticsearchClient elasticsearchClientImpl;

    @Override
    public GoogleChartModel getHistogramIdeasByMeeting(Timeframe timeframe) {

        List<GoogleChartDTO> chartInfoList = getAggregationByMeetingIdIdeas(timeframe);

        // Get the ids of all meetings.
        List<String> documentIdList = chartInfoList.parallelStream().map(GoogleChartDTO::getLabelChart)
                .collect(Collectors.toList());

        // Get the information about the meeting (topic) and create the Google
        // Chart Model
        MultiGetResponse multiGetResponse = elasticsearchClientImpl.multiGet(StringUtilities.INDEX_MEETING,
                StringUtilities.INDEX_TYPE_MEETING, documentIdList);

        return new GoogleChartModel(createModelWithMeetingInformation(chartInfoList, multiGetResponse));

    }

    @Override
    public GoogleChartModel getPieChartMeetingByOwner(Timeframe timeframe) {

        // Generate timeframe query for filtering
        QueryBuilder queryBuilder = getQueryTimefram("programmedDate", timeframe);

        // Aggregation to get all the meetings by owner
        AbstractAggregationBuilder aggreagtionBuilder = AggregationBuilders.terms("meetingsByOwner").field("ownerName")
                .size(0);

        SearchResponse response = elasticsearchClientImpl.search(StringUtilities.INDEX_MEETING, queryBuilder,
                aggreagtionBuilder, 1);

        Terms term = response.getAggregations().get("meetingsByOwner");

        List<Bucket> bucketList = term.getBuckets();
        List<GoogleChartDTO> chartInformation = new ArrayList<>();

        for (Bucket bucket : bucketList) {
            chartInformation.add(new GoogleChartDTO(bucket.getKeyAsString(), bucket.getDocCount()));
        }

        return new GoogleChartModel(chartInformation);

    }

    @Override
    public GoogleChartModel getPieChartIdeasByTeam(Timeframe timeframe) {

        List<GoogleChartDTO> chartInfoList = getAggregationByMeetingIdIdeas(timeframe);

        // Get the ids of all meetings.
        List<String> documentIdList = chartInfoList.parallelStream().map(GoogleChartDTO::getLabelChart)
                .collect(Collectors.toList());

        // Get the information about the meeting (topic) and create the Google
        // Chart Model
        MultiGetResponse multiGetResponse = elasticsearchClientImpl.multiGet(StringUtilities.INDEX_MEETING,
                StringUtilities.INDEX_TYPE_MEETING, documentIdList);

        // Get the information about the ideas by team.
        Map<String, Long> ideasByTeam = getIdeasByTeam(multiGetResponse, chartInfoList);

        // Map the hashMap to a list.
        List<GoogleChartDTO> ideasByTeamInformation = ideasByTeam.entrySet().parallelStream()
                .map((entry) -> new GoogleChartDTO(entry.getKey(), entry.getValue())).collect(Collectors.toList());

        // Get the ids of all teams.
        List<String> teamIds = ideasByTeamInformation.parallelStream().map(chart -> chart.getLabelChart())
                .collect(Collectors.toList());

        // Get the information about the teams.
        MultiGetResponse multiGetResponseTeams = elasticsearchClientImpl.multiGet(StringUtilities.INDEX_TEAM,
                StringUtilities.INDEX_TYPE_TEAM, teamIds);

        // Generate the final model team.
        List<GoogleChartDTO> ideasByTeamModel = getIdeasTeamInfo(multiGetResponseTeams, ideasByTeamInformation);

        return new GoogleChartModel(ideasByTeamModel);
    }

    private List<GoogleChartDTO> getIdeasTeamInfo(MultiGetResponse response, List<GoogleChartDTO> ideasByTeamInfo) {

        List<GoogleChartDTO> ideasByTeamInformation = new ArrayList<>();

        for (MultiGetItemResponse responseItem : response.getResponses()) {

            Team team = (Team) JSONUtils.JSONToObject(responseItem.getResponse().getSourceAsString(), Team.class);

            for (GoogleChartDTO chart : ideasByTeamInfo) {
                if (chart.getLabelChart().equals(responseItem.getId())) {
                    ideasByTeamInformation.add(new GoogleChartDTO(team.getName(), chart.getAmount()));
                }
            }
        }

        return ideasByTeamInformation;
    }

    private Map<String, Long> getIdeasByTeam(MultiGetResponse response, List<GoogleChartDTO> chartInformation) {

        Map<String, Long> ideasByTeam = new HashMap<>();

        // FIXME: please try to do it in another way.
        for (MultiGetItemResponse item : response.getResponses()) {

            Meeting meeting = (Meeting) JSONUtils.JSONToObject(item.getResponse().getSourceAsString(), Meeting.class);

            for (GoogleChartDTO chartInfo : chartInformation) {

                if (chartInfo.getLabelChart().equals(meeting.getMeetingId())) {

                    if (!ObjectUtils.isEmpty(ideasByTeam.get(meeting.getTeamName()))) {
                        ideasByTeam.put(meeting.getTeamName(),
                                ideasByTeam.get(meeting.getTeamName()) + chartInfo.getAmount());
                    } else {
                        ideasByTeam.put(meeting.getTeamName(), chartInfo.getAmount());
                    }

                }
            }
        }

        return ideasByTeam;

    }

    private List<GoogleChartDTO> getAggregationByMeetingIdIdeas(Timeframe timeframe) {

        // Generate timeframe query for filtering
        QueryBuilder queryBuilder = getQueryTimefram("insertionDate", timeframe);

        // Group by meetingId, this has to be done to get all the meetings
        // Involved in that timeframe, the size zero means no limit for the
        // aggregation
        AbstractAggregationBuilder aggregationBuilder = AggregationBuilders.terms("ideasByMeeting").field("meetingId")
                .size(0);

        SearchResponse response = elasticsearchClientImpl.search(StringUtilities.INDEX_IDEAS, null, aggregationBuilder,
                0);

        // Get the list of meeting ids with the amount of ideas by meeting
        List<GoogleChartDTO> chartInfoList = getIdeasByMeeting(response);

        return chartInfoList;
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

        DateTime from = new DateTime();

        switch (timeframe) {
        case ONE_DAY:
            queryBuilder.must(QueryBuilders.rangeQuery(dateField).from(from.minusDays(1).getMillis()));
            break;

        case ONE_WEEK:
            queryBuilder.must(QueryBuilders.rangeQuery(dateField).from(from.minusDays(7).getMillis()));
            break;

        case ONE_MONTH:
            queryBuilder.must(QueryBuilders.rangeQuery(dateField).from(from.minusMonths(1).getMillis()));
            break;

        case ONE_YEAR:
            queryBuilder.must(QueryBuilders.rangeQuery(dateField).from(from.minusYears(1).getMillis()));
            break;
        }
        return queryBuilder;

    }

    @Autowired
    public void setElasticsearchClientImpl(ElasticsearchClient elasticsearchClientImpl) {
        this.elasticsearchClientImpl = elasticsearchClientImpl;
    }
}
