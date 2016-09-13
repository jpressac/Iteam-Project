package org.iteam.data.dal.meeting;

import java.util.Date;

import org.assertj.core.util.Lists;
import org.elasticsearch.ElasticsearchException;
import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.model.Idea;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.Meeting;
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

	private Meeting meeting;
	private boolean success;

	private IdeasDTO ideas;
	private String meetingData;
	private String meetingId;

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
	public void saveIdeasFail() {
		givenIdeas();
		givenAnElasticsearchClientBulkResponse(true);
		whenSaveIdeasIsCalled();
		thenCheckStatus(false);
	}

	@Test
	public void saveMeetingInfoSuccess() {
		givenMeetingData();
		givenAMeetingId();
		givenAnElasticsearchIndexResponse();
		whenSaveMeetingInfoIsCalled();
		thenVerifyMeetingInfoIsCalled(1);
	}

	@Test
	public void saveMeetingInfoFail() {
		givenMeetingData();
		givenAMeetingId();
		givenAnElasticsearchIndexResponseFailure();
		whenSaveMeetingInfoIsCalled();
		thenVerifyMeetingInfoIsCalled(6);
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

	private void thenVerifyMeetingInfoIsCalled(int times) {
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
