package org.iteam.data.dal.meeting;

import java.util.Date;
import java.util.Iterator;
import java.util.List;

import org.assertj.core.util.Lists;
import org.elasticsearch.ElasticsearchException;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.dto.Idea;
import org.iteam.data.dto.Meeting;
import org.iteam.data.model.IdeasDTO;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.util.ReflectionTestUtils;

import com.fasterxml.jackson.databind.util.ISO8601DateFormat;

public class MeetingRepositoryImplTest {

    @InjectMocks
    private MeetingRepositoryImpl underTest;

    @Mock
    private ElasticsearchClientImpl elasticsearchClientImpl;

    private static final String MEETING_REPRESENTATION = "{\"topic\":\"test\",\"meetingId\":\"1234-456-789\",\"creationDate\":\"12345678987\",\"programmedDate\":\"123456789987\", \"ownerName\":\"test-iteam\", \"teamName\":\"123-456-987\", \"description\":\"es un test\"}";

    private Meeting meeting;
    private boolean success;

    private IdeasDTO ideas;
    private String meetingData;
    private String meetingId;
    private String meetingInfo;

    private List<Meeting> meetingList;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void createMeetingSuccess() {
        givenAMeeting();
        givenAnElasticsearchClient(true);
        whenCreateMeetingIsCalled();
        thenCheckStatus(true);
    }

    @Test
    public void createMeetingFailure() {
        givenAMeeting();
        givenAnElasticsearchClient(false);
        whenCreateMeetingIsCalled();
        thenCheckStatus(false);
    }

    @Test
    public void saveIdeasSuccess() {
        givenIdeas();
        givenAnElasticsearchClientBulkResponse(false);
        whenSaveIdeasIsCalled();
        thenCheckStatus(true);
    }

    @Test
    public void saveMeetingInfoSuccess() {
        givenMeetingData();
        givenAMeetingId();
        givenAnElasticsearchIndexResponse();
        whenSaveMeetingInfoIsCalled();
        thenVerifySaveMeetingInfoIsCalled(1);
    }

    @Test
    public void saveMeetingInfoFail() {
        givenMeetingData();
        givenAMeetingId();
        givenAnElasticsearchIndexResponseFailure();
        whenSaveMeetingInfoIsCalled();
        thenVerifySaveMeetingInfoIsCalled(6);
    }

    @Test
    public void getMeetingInfoSuccess() {
        givenAMeetingId();
        givenAnElasticsearchGetResponse();
        whenGetMeetingInfoIsCalled();
        thenVerifyGetMeetingInfoIsCalled();
        thenCheckInfoReceived();
    }

    @Test
    public void getMeetingInfoFail() {
        givenAMeetingId();
        givenAnElasticsearchGetResponseFailure();
        whenGetMeetingInfoIsCalled();
        thenVerifyGetMeetingInfoIsCalled();
        thenCheckInfoIsEmpty();
    }

    @Test
    public void getMeetingByUserSuccess() {
        givenAnElasticsearchGetMeetingUserSuccess();
        whenGetMettingByUserIsCalled();
        thenRetriveMeetings(1);
        thenVerifyElasticsearchMeetingByUserCalls(1);
    }

    @Test
    public void getMeetingByUserNoMeeting() {
        givenAnElasticsearchGetMeetingUserEmpty();
        whenGetMettingByUserIsCalled();
        thenRetriveMeetings(0);
        thenVerifyElasticsearchMeetingByUserCalls(1);
    }

    @Test
    public void getMeetingByTeamNoMeetings() {
        givenAnElasticsearchGetMeetingUserEmpty();
        whenGetMettingByTeamIsCalled();
        thenRetriveMeetings(0);
        thenVerifyElasticsearchMeetingByUserCalls(1);
    }

    @Test
    public void getMeetingByTeamSuccess() {
        givenAnElasticsearchGetMeetingUserSuccess();
        whenGetMettingByTeamIsCalled();
        thenRetriveMeetings(1);
        thenVerifyElasticsearchMeetingByUserCalls(1);
    }

    private void whenGetMettingByTeamIsCalled() {
        meetingList = underTest.getMeetingByTeamName(Lists.newArrayList("test", "test-iteam"));
    }

    private void givenAnElasticsearchGetMeetingUserEmpty() {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        SearchHits searchHits = Mockito.mock(SearchHits.class);

        @SuppressWarnings("unchecked")
        Iterator<SearchHit> iterator = Mockito.mock(Iterator.class);

        Mockito.when(response.getHits()).thenReturn(searchHits);
        Mockito.when(searchHits.getTotalHits()).thenReturn(2l);
        Mockito.when(searchHits.iterator()).thenReturn(iterator);
        Mockito.when(iterator.hasNext()).thenReturn(false);

        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject(), Mockito.anyObject()))
                .thenReturn(response);

    }

    private void thenVerifyElasticsearchMeetingByUserCalls(int times) {
        Mockito.verify(elasticsearchClientImpl, Mockito.times(times)).search(Mockito.anyString(), Mockito.anyObject(),
                Mockito.anyObject());
    }

    private void thenRetriveMeetings(int meetingSize) {
        Assert.assertEquals(meetingSize, meetingList.size());
    }

    private void whenGetMettingByUserIsCalled() {
        meetingList = underTest.getMeetingUser("test");
    }

    private void givenAnElasticsearchGetMeetingUserSuccess() {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        SearchHits searchHits = Mockito.mock(SearchHits.class);
        SearchHit hit = Mockito.mock(SearchHit.class);

        @SuppressWarnings("unchecked")
        Iterator<SearchHit> iterator = Mockito.mock(Iterator.class);

        Mockito.when(response.getHits()).thenReturn(searchHits);
        Mockito.when(searchHits.getTotalHits()).thenReturn(2l);
        Mockito.when(searchHits.iterator()).thenReturn(iterator);
        Mockito.when(iterator.hasNext()).thenReturn(true, false);
        Mockito.when(iterator.next()).thenReturn(hit);
        Mockito.when(hit.getSourceAsString()).thenReturn(MEETING_REPRESENTATION);

        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject(), Mockito.anyObject()))
                .thenReturn(response);

    }

    private void thenCheckInfoIsEmpty() {
        Assert.assertNull(meetingInfo);
    }

    private void givenAnElasticsearchGetResponseFailure() {
        GetResponse response = Mockito.mock(GetResponse.class);

        Mockito.when(response.isExists()).thenReturn(false);

        Mockito.when(elasticsearchClientImpl.getDocument(Mockito.anyString(), Mockito.anyString(), Mockito.anyString()))
                .thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClientImpl", elasticsearchClientImpl);

    }

    private void thenCheckInfoReceived() {
        Assert.assertNotNull(meetingInfo);

    }

    private void thenVerifyGetMeetingInfoIsCalled() {
        Mockito.verify(elasticsearchClientImpl, Mockito.times(1)).getDocument(Mockito.anyString(), Mockito.anyString(),
                Mockito.anyString());

    }

    private void whenGetMeetingInfoIsCalled() {
        meetingInfo = underTest.getMeetingInfo(meetingId);
    }

    private void givenAnElasticsearchGetResponse() {

        GetResponse response = Mockito.mock(GetResponse.class);

        Mockito.when(response.isExists()).thenReturn(true);
        Mockito.when(response.getSourceAsString()).thenReturn("meeting info being returned");

        Mockito.when(elasticsearchClientImpl.getDocument(Mockito.anyString(), Mockito.anyString(), Mockito.anyString()))
                .thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClientImpl", elasticsearchClientImpl);
    }

    private void givenAnElasticsearchIndexResponseFailure() {
        ElasticsearchException exception = Mockito.mock(ElasticsearchException.class);

        Mockito.when(elasticsearchClientImpl.insertData(Mockito.anyString(), Mockito.anyString(), Mockito.anyString(),
                Mockito.anyString())).thenThrow(exception, exception, exception, exception, exception);

        ReflectionTestUtils.setField(underTest, "elasticsearchClientImpl", elasticsearchClientImpl);
    }

    private void givenAMeetingId() {
        meetingId = "13";
    }

    private void thenVerifySaveMeetingInfoIsCalled(int times) {
        Mockito.verify(elasticsearchClientImpl, Mockito.times(times)).insertData(Mockito.anyString(),
                Mockito.anyString(), Mockito.anyString(), Mockito.anyString());
    }

    private void whenSaveMeetingInfoIsCalled() {
        underTest.saveMeetingInfo(meetingData, meetingId);
    }

    private void givenAnElasticsearchIndexResponse() {
        IndexResponse response = Mockito.mock(IndexResponse.class);

        Mockito.when(elasticsearchClientImpl.insertData(Mockito.anyString(), Mockito.anyString(), Mockito.anyString(),
                Mockito.anyString())).thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClientImpl", elasticsearchClientImpl);

    }

    private void givenMeetingData() {
        meetingData = "Notes";

    }

    private void whenSaveIdeasIsCalled() {
        success = underTest.saveIdeas(ideas);
    }

    @SuppressWarnings("unchecked")
    private void givenAnElasticsearchClientBulkResponse(boolean fail) {
        BulkResponse response = Mockito.mock(BulkResponse.class);

        Mockito.when(response.hasFailures()).thenReturn(fail);

        Mockito.when(elasticsearchClientImpl.insertData(Mockito.anyList(), Mockito.anyString(), Mockito.anyString()))
                .thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClientImpl", elasticsearchClientImpl);
    }

    private void givenIdeas() {
        ideas = new IdeasDTO(Lists.newArrayList(new Idea(), new Idea()), new ISO8601DateFormat().format(new Date()));
    }

    private void thenCheckStatus(boolean status) {
        Assert.assertEquals(status, success);
    }

    private void whenCreateMeetingIsCalled() {
        success = underTest.createMeeting(meeting);
    }

    private void givenAnElasticsearchClient(boolean created) {
        IndexResponse response = Mockito.mock(IndexResponse.class);

        Mockito.when(response.isCreated()).thenReturn(created);

        Mockito.when(elasticsearchClientImpl.insertData(Mockito.anyString(), Mockito.anyString(), Mockito.anyString()))
                .thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClientImpl", elasticsearchClientImpl);
    }

    private void givenAMeeting() {
        meeting = new Meeting();
    }
}
