package org.iteam.services.meeting;

import org.iteam.data.dal.meeting.MeetingRepositoryImpl;
import org.iteam.data.model.InfoMeeting;
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

public class MeetingServiceImplTest {

	@InjectMocks
	private MeetingServiceImpl underTest;

	@Mock
	private MeetingRepositoryImpl meetingRepositoryImpl;

	private InfoMeeting infoMeeting;
	private Meeting meeting;

	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void createMeetingSuccess() {
		givenAMeeting();
		givenAMeetingRepository("meetingId-123456");
		whenCreateMeetingIsCalled();
		thenMeetingWasCreated();
	}

	@Test
	public void createMeetingNotSuccess() {
		givenAMeeting();
		givenAMeetingRepository(null);
		whenCreateMeetingIsCalled();
		thenMeetingWasntCreated();
	}

	private void thenMeetingWasntCreated() {
		Assert.assertNull(infoMeeting.getTeam());
		Assert.assertNull(infoMeeting.getProgramDate());
		Assert.assertNull(infoMeeting.getTopic());
		Assert.assertNull(infoMeeting.getDescription());
		Assert.assertNull(infoMeeting.getMeetingId());
	}

	private void givenAMeeting() {
		meeting = new Meeting();
		meeting.setProgrammedDate("defaultDate");
		meeting.setDescription("description");
		meeting.setTeam(new Team());
		meeting.setTopic("testingMeeting");
	}

	private void thenMeetingWasCreated() {
		Assert.assertNotNull(infoMeeting.getTeam());
		Assert.assertNotNull(infoMeeting.getProgramDate());
		Assert.assertNotNull(infoMeeting.getTopic());
		Assert.assertNotNull(infoMeeting.getDescription());
		Assert.assertNotNull(infoMeeting.getMeetingId());
	}

	private void whenCreateMeetingIsCalled() {
		infoMeeting = underTest.createMeeting(meeting);
	}

	private void givenAMeetingRepository(String meetingId) {
		Mockito.when(meetingRepositoryImpl.createMeeting(meeting)).thenReturn(meetingId);

		ReflectionTestUtils.setField(underTest, "meetingRepositoryImpl", meetingRepositoryImpl);
	}

}
