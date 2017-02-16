
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
import org.elasticsearch.search.sort.SortBuilder;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.dto.Idea;
import org.iteam.data.dto.Meeting;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.MeetingUsers;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
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
    private static final String IDEA_REPRESENTATION = "{\"id\":\"546-45695-4564\", \"username\":\"jpressac\"}";
    private static final String TOPIC_NAME = "juan topic";
    private static final String MEETING_USER_RESPONSE = "{\"users\":[\"juan\", \"juandos\"]}";

    private Meeting meeting;
    private boolean success;
    private IdeasDTO ideas;
    private String meetingData;
    private String meetingId;
    private String meetingInfo;
    private List<Meeting> meetingList;
    private List<Idea> ideasList;
    private String meetingTopic;
    private MeetingUsers meetingUsers;

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
        thenVerifyInsertAndDeleteDataCalls(1);
    }

    @SuppressWarnings("unchecked")
    private void thenVerifyInsertAndDeleteDataCalls(int times) {
        Mockito.verify(elasticsearchClientImpl, Mockito.times(times)).insertData(Mockito.anyList(), Mockito.anyString(),
                Mockito.anyString());

        Mockito.verify(elasticsearchClientImpl, Mockito.times(times)).delete(Mockito.anyString(), Mockito.anyString(),
                Mockito.anyString());
    }

    @Test
    public void saveMeetingInfoSuccess() {
        givenMeetingData();
        givenAMeetingId();
        givenAGetResponse(false);
        givenAnElasticsearchIndexResponse();
        whenSaveMeetingInfoIsCalled();
        thenVerifySaveMeetingInfoIsCalled(1);
    }

    @Test
    public void saveMeetingInfoFail() {
        givenMeetingData();
        givenAMeetingId();
        givenAGetResponse(true);
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
    public void getScheduledMeetings() {
        givenAnElasticsearchRepositoryToLookForMeetings(1);
        whenGetMeetingByTokenIsCalled("someToken", 10, 10, false);
        thenVerifySearchMeetingByTokenIsCalled(1);
    }

    @Test
    public void getScheduledMeetingEnded() {
        givenAnElasticsearchRepositoryToLookForMeetings(1);
        whenGetMeetingByTokenIsCalled("someToken", 10, 10, true);
        thenVerifySearchMeetingByTokenIsCalled(1);
    }

    @Test
    public void getScheduledMeetingNoTokenEnded() {
        givenAnElasticsearchRepositoryToLookForMeetings(1);
        whenGetMeetingByTokenIsCalled(null, 10, 10, true);
        thenVerifySearchMeetingByTokenIsCalled(1);
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

    @Test
    public void updateMeetingSuccess() {
        givenAnElasticsearchSearchMeetings(1);
        givenAnElasticsearchBulkUpdate(false);
        whenUpdateEndedMeetingIsCalled();
        thenVerifyUpdateMeetingsCalls(1, 1);
    }

    @Test
    public void updateMeetingSuccessNoDataToUpdate() {
        givenAnElasticsearchSearchMeetings(0);
        givenAnElasticsearchBulkUpdate(false);
        whenUpdateEndedMeetingIsCalled();
        thenVerifyUpdateMeetingsCalls(1, 0);
    }

    @Test
    public void updateMeetingFailure() {
        givenAnElasticsearchSearchMeetings(1);
        givenAnElasticsearchBulkUpdate(true);
        whenUpdateEndedMeetingIsCalled();
        thenVerifyUpdateMeetingsCalls(1, 1);
    }

    @Test
    public void getIdeasGivenMeetingIdSuccess() {
        givenAMeetingId();
        givenAnElasticsaerchSearchForIdeas(1);
        whenIdeasGivenMeetingIdIsCalled();
        thenVerifySearchCalls(1);
        thenVerifySizeList(1);
    }

    @Test
    public void getIdeaGivenMeetingIdNoData() {
        givenAMeetingId();
        givenAnElasticsaerchSearchForIdeas(0);
        whenIdeasGivenMeetingIdIsCalled();
        thenVerifySearchCalls(1);
        thenVerifySizeList(0);
    }

    @Test
    public void getMeetingTopicSuccess() {
        givenAMeetingId();
        givenAGetDocumentResponse(String.format("{\"topic\":\"%s\"}", TOPIC_NAME), true);
        whenGetMeetingTopicIsCalled();
        thenVerifyGetDocumentCalls();
        thenVerifyTopicName();
    }

    @Test
    public void getMeetingTopicNoSuchMeeting() {
        givenAMeetingId();
        givenAGetDocumentResponse(String.format("{\"topic\":\"%s\"}", TOPIC_NAME), false);
        whenGetMeetingTopicIsCalled();
        thenVerifyGetDocumentCalls();
        thenVerifyTopicIsNull();
    }

    @Ignore
    public void removeIdeasFromCacheSharedBoardSuccess() {
        // TODO: copy and paste ideas from logs to do this test
    }

    @Ignore
    public void removeIdeasFromCacheSharedBoardNoDocument() {
        // TODO: copy and paste ideas from logs to do this test
    }

    @Ignore
    public void removeIdeasFromCachePersonalBoardSuccess() {
        // TODO: copy and paste ideas from logs to do this test
    }

    @Ignore
    public void removeIdeasFromCachePersonalBoardNoDocument() {
        // TODO: copy and paste ideas from logs to do this test
    }

    @Test
    public void getConnectedUsersSuccess() {
        givenAMeetingId();
        givenAGetDocumentResponse(MEETING_USER_RESPONSE, true);
        whenGetConnectedUsersIsCalled();
        thenVerifyGetDocumentCalls();
        thenVerifySizeUserList(2);

    }

    @Test
    public void getConnectedUserNoUsers() {
        givenAMeetingId();
        givenAGetDocumentResponse("", false);
        whenGetConnectedUsersIsCalled();
        thenVerifyGetDocumentCalls();
        thenVerifySizeUserList(0);
    }

    /* THEN */

    private void thenVerifySizeUserList(int size) {
        Assert.assertEquals(size, meetingUsers.getUsers().size());
    }

    private void thenVerifyTopicName() {
        Assert.assertEquals(TOPIC_NAME, meetingTopic);
    }

    private void thenVerifyGetDocumentCalls() {
        Mockito.verify(elasticsearchClientImpl, Mockito.times(1)).getDocument(Mockito.anyString(), Mockito.anyString(),
                Mockito.eq(meetingId));
    }

    private void thenVerifyTopicIsNull() {
        Assert.assertNull(meetingTopic);
    }

    private void thenVerifySizeList(int size) {
        Assert.assertEquals(ideasList.size(), size);
    }

    private void thenVerifySearchCalls(int times) {
        Mockito.verify(elasticsearchClientImpl, Mockito.times(times)).search(Mockito.anyString(), Mockito.anyObject());
    }

    @SuppressWarnings("unchecked")
    private void thenVerifyUpdateMeetingsCalls(int timesSearch, int timesUpdate) {
        Mockito.verify(elasticsearchClientImpl, Mockito.times(timesSearch)).search(Mockito.anyString(),
                Mockito.anyObject(), (SortBuilder) Mockito.anyObject());
        Mockito.verify(elasticsearchClientImpl, Mockito.times(timesUpdate)).bulkUpdate(Mockito.anyList(),
                Mockito.anyString(), Mockito.anyString());
    }

    private void thenVerifySearchMeetingByTokenIsCalled(int times) {
        Mockito.verify(elasticsearchClientImpl, Mockito.times(times)).search(Mockito.anyString(), Mockito.anyObject(),
                Mockito.anyInt(), Mockito.anyInt());
    }

    private void thenVerifyElasticsearchMeetingByUserCalls(int times) {
        Mockito.verify(elasticsearchClientImpl, Mockito.times(times)).search(Mockito.anyString(), Mockito.anyObject(),
                (SortBuilder) Mockito.anyObject());
    }

    private void thenRetriveMeetings(int meetingSize) {
        Assert.assertEquals(meetingSize, meetingList.size());
    }

    private void thenCheckInfoIsEmpty() {
        Assert.assertNull(meetingInfo);
    }

    private void thenCheckInfoReceived() {
        Assert.assertNotNull(meetingInfo);

    }

    private void thenVerifyGetMeetingInfoIsCalled() {
        Mockito.verify(elasticsearchClientImpl, Mockito.times(1)).getDocument(Mockito.anyString(), Mockito.anyString(),
                Mockito.anyString());

    }

    private void thenVerifySaveMeetingInfoIsCalled(int times) {
        Mockito.verify(elasticsearchClientImpl, Mockito.times(times)).insertData(Mockito.anyString(),
                Mockito.anyString(), Mockito.anyString(), Mockito.anyString());
    }

    private void thenCheckStatus(boolean status) {
        Assert.assertEquals(status, success);
    }

    /* WHEN */

    private void whenGetConnectedUsersIsCalled() {
        meetingUsers = underTest.getConnectedUsers(meetingId);
    }

    private void whenGetMeetingTopicIsCalled() {
        meetingTopic = underTest.getMeetingTopic(meetingId);
    }

    private void whenIdeasGivenMeetingIdIsCalled() {
        ideasList = underTest.getIdeasGivenMeetingId(meetingId);
    }

    private void whenUpdateEndedMeetingIsCalled() {
        underTest.updateEndedMeetings();
    }

    private void whenGetMeetingByTokenIsCalled(String token, int offset, int limit, boolean ended) {
        underTest.getMeetingsByToken("someUsername", token, offset, limit, ended);
    }

    private void whenGetMettingByTeamIsCalled() {
        meetingList = underTest.getMeetingByTeamName(Lists.newArrayList("test", "test-iteam"));
    }

    private void whenGetMeetingInfoIsCalled() {
        meetingInfo = underTest.getMeetingInfo(meetingId);
    }

    private void whenSaveMeetingInfoIsCalled() {
        underTest.saveMeetingInfo(meetingData, meetingId);
    }

    private void whenSaveIdeasIsCalled() {
        underTest.saveIdeas(ideas);
    }

    private void whenCreateMeetingIsCalled() {
        success = underTest.createMeeting(meeting);
    }

    /* GIVEN */

    private void givenAGetDocumentResponse(String docRepsonse, boolean exists) {
        GetResponse response = Mockito.mock(GetResponse.class);

        Mockito.when(response.getSourceAsString()).thenReturn(docRepsonse);
        Mockito.when(response.isExists()).thenReturn(exists);

        Mockito.when(
                elasticsearchClientImpl.getDocument(Mockito.anyString(), Mockito.anyString(), Mockito.eq(meetingId)))
                .thenReturn(response);

    }

    private void givenAnElasticsaerchSearchForIdeas(long totalHits) {
        SearchResponse response = Mockito.mock(SearchResponse.class);

        SearchHits hits = Mockito.mock(SearchHits.class);
        SearchHit hit = Mockito.mock(SearchHit.class);

        @SuppressWarnings("unchecked")
        Iterator<SearchHit> iterator = Mockito.mock(Iterator.class);

        Mockito.when(hits.iterator()).thenReturn(iterator);
        Mockito.when(iterator.hasNext()).thenReturn(true, false);
        Mockito.when(iterator.next()).thenReturn(hit);
        Mockito.when(hits.getTotalHits()).thenReturn(totalHits);
        Mockito.when(hit.getSourceAsString()).thenReturn(IDEA_REPRESENTATION);

        Mockito.when(response.getHits()).thenReturn(hits);

        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject())).thenReturn(response);

    }

    @SuppressWarnings("unchecked")
    private void givenAnElasticsearchBulkUpdate(boolean hasFailures) {
        BulkResponse response = Mockito.mock(BulkResponse.class);

        Mockito.when(response.hasFailures()).thenReturn(hasFailures);

        Mockito.when(elasticsearchClientImpl.bulkUpdate(Mockito.anyList(), Mockito.anyString(), Mockito.anyString()))
                .thenReturn(response);
    }

    private void givenAnElasticsearchSearchMeetings(long totalHits) {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        SearchHits hits = Mockito.mock(SearchHits.class);
        SearchHit hit = Mockito.mock(SearchHit.class);

        @SuppressWarnings("unchecked")
        Iterator<SearchHit> iterator = Mockito.mock(Iterator.class);

        Mockito.when(hits.iterator()).thenReturn(iterator);
        Mockito.when(iterator.hasNext()).thenReturn(true, false);
        Mockito.when(iterator.next()).thenReturn(hit);
        Mockito.when(hits.getTotalHits()).thenReturn(totalHits);

        Mockito.when(response.getHits()).thenReturn(hits);

        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject(),
                (SortBuilder) Mockito.anyObject())).thenReturn(response);

    }

    private void givenAnElasticsearchRepositoryToLookForMeetings(long totalHits) {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        SearchHits hits = Mockito.mock(SearchHits.class);
        SearchHit hit = Mockito.mock(SearchHit.class);

        @SuppressWarnings("unchecked")
        Iterator<SearchHit> iterator = Mockito.mock(Iterator.class);

        Mockito.when(hits.getTotalHits()).thenReturn(totalHits);
        Mockito.when(hits.iterator()).thenReturn(iterator);
        Mockito.when(iterator.hasNext()).thenReturn(true, false);
        Mockito.when(iterator.next()).thenReturn(hit);
        Mockito.when(hit.getSourceAsString()).thenReturn(MEETING_REPRESENTATION);

        Mockito.when(response.getHits()).thenReturn(hits);

        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject(), Mockito.anyInt(),
                Mockito.anyInt())).thenReturn(response);

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

        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject(),
                (SortBuilder) Mockito.anyObject())).thenReturn(response);

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

        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject(),
                (SortBuilder) Mockito.anyObject())).thenReturn(response);

    }

    private void givenAnElasticsearchGetResponseFailure() {
        GetResponse response = Mockito.mock(GetResponse.class);

        Mockito.when(response.isExists()).thenReturn(false);

        Mockito.when(elasticsearchClientImpl.getDocument(Mockito.anyString(), Mockito.anyString(), Mockito.anyString()))
                .thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClientImpl", elasticsearchClientImpl);

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

    private void givenAnElasticsearchIndexResponse() {

        IndexResponse response = Mockito.mock(IndexResponse.class);

        Mockito.when(elasticsearchClientImpl.insertData(Mockito.anyString(), Mockito.anyString(), Mockito.anyString(),
                Mockito.anyString())).thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClientImpl", elasticsearchClientImpl);

    }

    private void givenMeetingData() {
        meetingData = "{}";

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

    private void givenAnElasticsearchClient(boolean created) {
        IndexResponse response = Mockito.mock(IndexResponse.class);

        Mockito.when(response.isCreated()).thenReturn(created);

        Mockito.when(elasticsearchClientImpl.insertData(Mockito.anyString(), Mockito.anyString(), Mockito.anyString(),
                Mockito.anyString())).thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClientImpl", elasticsearchClientImpl);
    }

    private void givenAGetResponse(boolean exists) {
        GetResponse response = Mockito.mock(GetResponse.class);

        Mockito.when(response.isExists()).thenReturn(exists);
        Mockito.when(response.getSourceAsString()).thenReturn("{\"topic\":\"this is a response\"}");

        Mockito.when(elasticsearchClientImpl.getDocument(Mockito.anyString(), Mockito.anyString(), Mockito.anyString()))
                .thenReturn(response);
    }

    private void givenAMeeting() {
        meeting = new Meeting();
    }
}
