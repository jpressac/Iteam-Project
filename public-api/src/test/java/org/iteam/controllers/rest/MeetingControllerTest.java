package org.iteam.controllers.rest;

import java.util.Date;
import java.util.List;

import org.iteam.data.dto.Idea;
import org.iteam.data.dto.Meeting;
import org.iteam.data.model.IdeasDTO;
import org.iteam.services.meeting.MeetingServiceImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;

import com.fasterxml.jackson.databind.util.ISO8601DateFormat;
import com.google.common.collect.Lists;

public class MeetingControllerTest {

    @InjectMocks
    private MeetingController underTest;

    @Mock
    private MeetingServiceImpl meetingServiceImpl;

    private Meeting meeting;

    private ResponseEntity<Void> response;

    private IdeasDTO ideas;
    private List<String> userList;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void createMeetingSuccess() {
        givenQueryCreateMeetingParameters();
        givenAMeetingService(true);
        whenCreateMeetingIsCalled();
        thenCheckStatus(HttpStatus.OK);
    }

    @Test
    public void createMeetingFail() {
        givenQueryCreateMeetingParameters();
        givenAMeetingService(false);
        whenCreateMeetingIsCalled();
        thenCheckStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Test
    public void saveIdeasSuccess() {
        givenIdeas();
        givenAMeetingService(true);
        whenSaveIdeasIsCalled();
        thenCheckStatus(HttpStatus.NO_CONTENT);
    }

    private void whenSaveIdeasIsCalled() {
        response = underTest.saveIdeas(ideas, userList);
    }

    private void givenIdeas() {
        ideas = new IdeasDTO(Lists.newArrayList(new Idea()), new ISO8601DateFormat().format(new Date()));
    }

    private void thenCheckStatus(HttpStatus status) {
        Assert.assertEquals(response.getStatusCode(), status);
    }

    private void whenCreateMeetingIsCalled() {
        response = underTest.createMeeting(meeting);
    }

    private void givenAMeetingService(boolean created) {
        Mockito.when(meetingServiceImpl.createMeeting(Mockito.anyObject())).thenReturn(created);
        ReflectionTestUtils.setField(underTest, "meetingServiceImpl", meetingServiceImpl);
    }

    private void givenQueryCreateMeetingParameters() {
        meeting = new Meeting();
    }

}
