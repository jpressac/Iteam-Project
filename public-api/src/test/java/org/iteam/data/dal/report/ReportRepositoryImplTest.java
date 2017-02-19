package org.iteam.data.dal.report;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.dal.meeting.MeetingRepositoryImpl;
import org.iteam.data.dto.Idea;
import org.iteam.data.model.D3CollapseTreeModel;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.google.common.collect.Lists;

public class ReportRepositoryImplTest {

    @InjectMocks
    private ReportRepositoryImpl underTest;

    @Mock
    private MeetingRepositoryImpl meetinRepositoryImpl;

    @Mock
    private ElasticsearchClientImpl elasticsearchClientImpl;

    private static final String IDEA_REPRESENTATION = "{\"id\":\"asdfasdf-asdfasdf\", \"username\":\"juan\", \"tag\":\"test\", \"title\":\"juan test\"}";

    private ArrayList<String> meetingIds;

    private D3CollapseTreeModel report;

    private String meetingId;

    private ArrayList<String> tags;

    private ArrayList<String> users;

    private String reportName;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void generateReportByMeetingSuccess() {
        givenAReportName();
        givenAListOfMeetingIds();
        givenAnElasticsearchResponse(IDEA_REPRESENTATION, 1);
        whenGenerateReportByMeetingIsCalled();
        thenVerifyD3Model();
    }

    @Test
    public void generateReportByMeetingSuccessNoIdeas() {
        givenAReportName();
        givenAListOfMeetingIds();
        givenAnElasticsearchResponse(IDEA_REPRESENTATION, 0);
        whenGenerateReportByMeetingIsCalled();
        thenVerifyD3ModelNoIdeas();
    }

    @Test
    public void generateReportByTagSuccess() {
        givenAMeetingId();
        givenAListOfTags();
        givenAMeetingRepositoryImpl("topic");
        whenGenerateBasicReportByTagIsCalled();
        thenVerifyD3ModelByTag();
    }

    @Test
    public void generateReportByTagNoMeeting() {
        givenAMeetingId();
        givenAListOfTags();
        givenAMeetingRepositoryImpl("");
        whenGenerateBasicReportByTagIsCalled();
        thenVerifyMinimunD3Model("By Tag");

    }

    @Test
    public void generateReportByUserSuccess() {
        givenAMeetingId();
        givenAListOfTags();
        givenAListOfUsers();
        givenAMeetingRepositoryImpl("topic");
        whenGenerateBasicReportByUserIsCalled();
        thenVerifyD3ModelByUser();
    }

    @Test
    public void generateReportByUserNoUsers() {
        givenAMeetingId();
        givenAListOfTags();
        givenAListOfUsers();
        givenAMeetingRepositoryImpl("");
        whenGenerateBasicReportByUserIsCalled();
        thenVerifyMinimunD3Model("By User");
    }

    @Test
    public void generateReportByRankingSuccess() {
        givenAMeetingId();
        givenAListOfTags();
        givenAMeetingRepositoryImpl("topic");
        whenGenerateBasicReportByRankingIsCalled();
        thenVerifyD3ModelRanking();
    }

    @Test
    public void generateReportByRankingNoIdeas() {
        givenAMeetingId();
        givenAListOfTags();
        givenAMeetingRepositoryImpl("");
        whenGenerateBasicReportByRankingIsCalled();
        thenVerifyMinimunD3Model("By Ranking");
    }

    /* THEN */
    private void thenVerifyD3ModelRanking() {
        Assert.assertEquals("topic", report.getName());
        Assert.assertEquals("test", report.getChildren().get(0).getName());
        Assert.assertEquals("test2", report.getChildren().get(1).getName());
        Assert.assertEquals("test3", report.getChildren().get(2).getName());
        Assert.assertEquals(new Integer(5), report.getChildren().get(0).getChildren().get(0).getValue());
        Assert.assertEquals(new Integer(10), report.getChildren().get(1).getChildren().get(0).getValue());
        Assert.assertEquals(new Integer(60), report.getChildren().get(2).getChildren().get(0).getValue());
    }

    private void thenVerifyD3ModelByUser() {
        Assert.assertEquals("topic", report.getName());
        Assert.assertEquals("juan", report.getChildren().get(0).getName());
        Assert.assertEquals("juan2", report.getChildren().get(1).getName());
        Assert.assertEquals("test", report.getChildren().get(0).getChildren().get(0).getName());
        Assert.assertEquals("test2", report.getChildren().get(0).getChildren().get(1).getName());
        Assert.assertEquals("test3", report.getChildren().get(0).getChildren().get(2).getName());
        Assert.assertEquals("test", report.getChildren().get(1).getChildren().get(0).getName());
        Assert.assertEquals("test2", report.getChildren().get(1).getChildren().get(1).getName());
        Assert.assertEquals("test3", report.getChildren().get(1).getChildren().get(2).getName());
        Assert.assertEquals("juan test",
                report.getChildren().get(0).getChildren().get(0).getChildren().get(0).getName());
        Assert.assertEquals("juan test2",
                report.getChildren().get(0).getChildren().get(1).getChildren().get(0).getName());
        Assert.assertEquals("juan test3",
                report.getChildren().get(1).getChildren().get(2).getChildren().get(0).getName());
    }

    private void thenVerifyD3ModelNoIdeas() {
        Assert.assertEquals(reportName, report.getName());
    }

    private void thenVerifyD3Model() {
        Assert.assertEquals(reportName, report.getName());
        Assert.assertEquals("test", report.getChildren().get(0).getName());
        Assert.assertEquals("juan test", report.getChildren().get(0).getChildren().get(0).getName());
    }

    private void thenVerifyMinimunD3Model(String byTag) {
        Assert.assertEquals(byTag, report.getName());
    }

    private void thenVerifyD3ModelByTag() {
        Assert.assertEquals("topic", report.getName());
        Assert.assertEquals("test", report.getChildren().get(0).getName());
        Assert.assertEquals("test2", report.getChildren().get(1).getName());
        Assert.assertEquals("test3", report.getChildren().get(2).getName());
        Assert.assertEquals("juan test", report.getChildren().get(0).getChildren().get(0).getName());
        Assert.assertEquals("juan test2", report.getChildren().get(1).getChildren().get(0).getName());
        Assert.assertEquals("juan test3", report.getChildren().get(2).getChildren().get(0).getName());
    }

    /* WHEN */

    private void whenGenerateBasicReportByRankingIsCalled() {
        report = underTest.generateBasicReportByRanking(meetingId, tags);
    }

    private void whenGenerateBasicReportByUserIsCalled() {
        report = underTest.generateBasicReportByUser(meetingId, users, tags);
    }

    private void whenGenerateReportByMeetingIsCalled() {
        report = underTest.generateReportByMeeting(meetingIds, reportName);
    }

    private void whenGenerateBasicReportByTagIsCalled() {
        report = underTest.generateBasicReportByTag(meetingId, tags);
    }

    /* GIVEN */

    private void givenAReportName() {
        reportName = "test report";
    }

    private void givenAMeetingRepositoryImpl(String topic) {

        // Idea for tag test
        Idea idea1 = new Idea();
        idea1.setTag("test");
        idea1.setTitle("juan test");
        idea1.setUsername("juan");
        idea1.setRanking(5);

        // Idea for tag test2
        Idea idea2 = new Idea();
        idea2.setTag("test2");
        idea2.setTitle("juan test2");
        idea2.setUsername("juan");
        idea2.setRanking(10);

        // Idea for tag test3
        Idea idea3 = new Idea();
        idea3.setTag("test3");
        idea3.setTitle("juan test3");
        idea3.setUsername("juan2");
        idea3.setRanking(60);

        List<Idea> ideasList = new ArrayList<>();
        ideasList.add(idea1);
        ideasList.add(idea2);
        ideasList.add(idea3);

        Mockito.when(meetinRepositoryImpl.getMeetingTopic(meetingId)).thenReturn(topic);

        Mockito.when(meetinRepositoryImpl.getIdeasGivenMeetingId(meetingId)).thenReturn(ideasList);

    }

    private void givenAListOfUsers() {
        users = Lists.newArrayList("juan", "juan2");
    }

    private void givenAListOfTags() {
        tags = Lists.newArrayList("test", "test2", "test3");
    }

    private void givenAMeetingId() {
        meetingId = "asdfa-asdfasdf";
    }

    private void givenAnElasticsearchResponse(String idea, long totalHits) {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        SearchHits searchHits = Mockito.mock(SearchHits.class);
        SearchHit hit = Mockito.mock(SearchHit.class);

        @SuppressWarnings("unchecked")
        Iterator<SearchHit> iterator = Mockito.mock(Iterator.class);

        Mockito.when(response.getHits()).thenReturn(searchHits);
        Mockito.when(searchHits.getTotalHits()).thenReturn(totalHits);
        Mockito.when(searchHits.iterator()).thenReturn(iterator);
        Mockito.when(iterator.hasNext()).thenReturn(true, false);
        Mockito.when(iterator.next()).thenReturn(hit);
        Mockito.when(hit.getSourceAsString()).thenReturn(idea);

        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject())).thenReturn(response);

    }

    private void givenAListOfMeetingIds() {
        meetingIds = Lists.newArrayList("54654-87987-98798", "54654-98798-98789");
    }

}
