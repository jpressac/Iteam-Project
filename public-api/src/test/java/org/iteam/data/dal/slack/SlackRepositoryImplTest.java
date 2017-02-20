package org.iteam.data.dal.slack;

import java.io.IOException;

import org.iteam.data.dal.team.TeamRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.github.seratch.jslack.Slack;
import com.github.seratch.jslack.api.methods.MethodsClient;
import com.github.seratch.jslack.api.methods.SlackApiException;
import com.github.seratch.jslack.api.methods.response.chat.ChatPostMessageResponse;
import com.github.seratch.jslack.api.methods.response.groups.GroupsCreateResponse;
import com.github.seratch.jslack.api.methods.response.pins.PinsAddResponse;
import com.github.seratch.jslack.api.model.Group;

public class SlackRepositoryImplTest {

    @InjectMocks
    private SlackRepositoryImpl underTest;

    @Mock
    private TeamRepository teamRepositoryImpl;

    @Mock
    private Slack slack;

    private static final String TIMESTAMP_CHAT_POST_MESSAGE = "this is a date";
    private static final String TIMESTAMP_CHAT_POST_MESSAGE_EMPTY = "";
    private static final String TIMESTAMP_CHAT_POST_MESSAGE_NULL = null;

    private String meetingTopic;

    private String teamId;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void createAndInviteToMeetingGroupSuccess() throws IOException, SlackApiException {
        givenAMeetingTopic();
        givenATeamId();
        givenSlackCreteGroupMock("This is an id");
        givenSlackChatResponseMock(TIMESTAMP_CHAT_POST_MESSAGE);
        givenSlackPinResponseMock();
        // givenSlackInviteResponseMock();
        // whenCreateAndInviteToMeetingIsCalled();
        // thenVerifyCreateGroupCalls(1);
        // thenVerifyInviteAndPinCalls(1);
    }

    private void givenSlackChatResponseMock(String timestampResponse) throws IOException, SlackApiException {
        ChatPostMessageResponse response = Mockito.mock(ChatPostMessageResponse.class);
        MethodsClient methods = Mockito.mock(MethodsClient.class);

        Mockito.when(response.getTs()).thenReturn(timestampResponse);

        Mockito.when(methods.chatPostMessage(Mockito.anyObject())).thenReturn(response);

        Mockito.when(slack.methods()).thenReturn(methods);
    }

    private void givenSlackPinResponseMock() throws IOException, SlackApiException {
        PinsAddResponse response = Mockito.mock(PinsAddResponse.class);
        MethodsClient methods = Mockito.mock(MethodsClient.class);

        Mockito.when(response.toString()).thenReturn("pinned successfuly");

        Mockito.when(methods.pinsAdd(Mockito.anyObject())).thenReturn(response);

        Mockito.when(slack.methods()).thenReturn(methods);
    }

    private void givenSlackCreteGroupMock(String groupId) throws IOException, SlackApiException {
        GroupsCreateResponse response = Mockito.mock(GroupsCreateResponse.class);
        MethodsClient methods = Mockito.mock(MethodsClient.class);
        Group group = Mockito.mock(Group.class);

        Mockito.when(group.getId()).thenReturn(groupId);
        Mockito.when(response.getGroup()).thenReturn(group);
        Mockito.when(methods.groupsCreate(Mockito.anyObject())).thenReturn(response);

        Mockito.when(slack.methods()).thenReturn(methods);
    }

    private void givenATeamId() {
        teamId = "team-5465-id";
    }

    private void givenAMeetingTopic() {
        meetingTopic = "Test-topic";
    }

}
