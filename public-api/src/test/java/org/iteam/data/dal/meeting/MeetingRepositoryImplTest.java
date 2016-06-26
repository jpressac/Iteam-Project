package org.iteam.data.dal.meeting;

import org.elasticsearch.action.index.IndexResponse;
import org.iteam.configuration.ExternalConfigurationProperties;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.model.Meeting;
import org.iteam.data.model.Team;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.util.ReflectionTestUtils;

public class MeetingRepositoryImplTest {

	@InjectMocks
	private MeetingRepositoryImpl underTest;

	@Mock
	private ElasticsearchClientImpl elasticsearchClient;

	@Mock
	private ExternalConfigurationProperties configuration;

	private Meeting meeting;
	private String meetingId;

	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void saveMeetingSuccess() {
		givenAMeeting();
		givenAnExternalConfiguration();
		givenAnElasticsearchIndexResponseOK();
		whenCreateMeetingIsCalled();
		thenMeetingWasCreated();
	}

	@Test
	public void saveMeetingNotSuccess() {
		givenAMeeting();
		givenAnExternalConfiguration();
		givenAnElasticsearchIndexResponseFailure();
		whenCreateMeetingIsCalled();
		thenMeetingWasntCreated();
	}

	private void thenMeetingWasntCreated() {
		Assert.assertNull(meetingId);
	}

	private void givenAnElasticsearchIndexResponseFailure() {
		IndexResponse response = Mockito.mock(IndexResponse.class);
		Mockito.when(response.isCreated()).thenReturn(false);

		Mockito.when(elasticsearchClient.insertData(Mockito.anyString(), Mockito.anyString(), Mockito.anyString()))
				.thenReturn(response, (IndexResponse[]) null);

		ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClient);
	}

	private void givenAnExternalConfiguration() {
		Mockito.when(configuration.getElasticsearchIndexTypeMeeting()).thenReturn("metadata");
		Mockito.when(configuration.getElasticsearchIndexMeeting()).thenReturn("metadata");

		ReflectionTestUtils.setField(underTest, "configuration", configuration);
	}

	private void thenMeetingWasCreated() {
		Assert.assertNotNull(meetingId);
	}

	private void whenCreateMeetingIsCalled() {
		meetingId = underTest.createMeeting(meeting);
	}

	private void givenAnElasticsearchIndexResponseOK() {

		IndexResponse response = Mockito.mock(IndexResponse.class);
		Mockito.when(response.isCreated()).thenReturn(true);
		Mockito.when(response.getId()).thenReturn("meetingId-123456");

		Mockito.when(elasticsearchClient.insertData(Mockito.anyString(), Mockito.anyString(), Mockito.anyString()))
				.thenReturn(response);

		ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClient);
	}

	private void givenAMeeting() {
		meeting = new Meeting();
		meeting.setProgrammedDate("defaultDate");
		meeting.setDescription("description");
		meeting.setTeam(new Team());
		meeting.setTopic("testingMeeting");
	}

}
