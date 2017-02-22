package org.iteam.data.dal.slack;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.assertj.core.util.Lists;
import org.iteam.data.dal.team.TeamRepositoryImpl;
import org.iteam.data.dto.Meeting;
import org.iteam.data.dto.UserDTO;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import com.github.seratch.jslack.Slack;
import com.github.seratch.jslack.api.methods.MethodsClient;
import com.github.seratch.jslack.api.methods.SlackApiException;
import com.github.seratch.jslack.api.methods.request.chat.ChatPostMessageRequest;
import com.github.seratch.jslack.api.methods.request.groups.GroupsInviteRequest;
import com.github.seratch.jslack.api.methods.request.pins.PinsAddRequest;
import com.github.seratch.jslack.api.methods.response.chat.ChatPostMessageResponse;
import com.github.seratch.jslack.api.methods.response.groups.GroupsCreateResponse;
import com.github.seratch.jslack.api.methods.response.groups.GroupsInviteResponse;
import com.github.seratch.jslack.api.methods.response.pins.PinsAddResponse;
import com.github.seratch.jslack.api.methods.response.users.UsersListResponse;
import com.github.seratch.jslack.api.model.Group;
import com.github.seratch.jslack.api.model.User;
import com.github.seratch.jslack.api.model.User.Profile;

public class SlackRepositoryImplTest {

    @InjectMocks
    private SlackRepositoryImpl underTest;

    @Mock
    private TeamRepositoryImpl teamRepositoryImpl;

    @Mock
    private Slack slack;

    private static final String TIMESTAMP_CHAT_POST_MESSAGE = "this is a date";
    private static final String TIMESTAMP_CHAT_POST_MESSAGE_EMPTY = "";
    private static final String TIMESTAMP_CHAT_POST_MESSAGE_NULL = null;

    private String meetingTopic;
    private String teamId;
    private String teamToken;
    private List<String> users;
    private List<UserDTO> userList;
    private List<User> slackUserList;

    private String channelName;

    private String message;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void getUserSlackIdsSuccess() throws IOException, SlackApiException {
        givenAToken();
        givenAMeetingTopic();
        givenATeamId();
        givenAListOfUserDTO();
        givenAListOfSlackUsers("this@mail.com");
        givenATeamRepository(userList);
        givenSlackUserData(slackUserList);
        whenGetUserSlackIdsIsCalled();
        thenVerifyCalls(1);
        thenVerifyUsers(1);
    }

    @Test
    public void getUserSlackIdsEmptyUserIteam() throws IOException, SlackApiException {
        givenAToken();
        givenAMeetingTopic();
        givenATeamId();
        givenAListOfSlackUsers("this@mail.com");
        givenATeamRepository(Lists.emptyList());
        givenSlackUserData(slackUserList);
        whenGetUserSlackIdsIsCalled();
        thenVerifyCalls(1);
        thenVerifyUsers(0);
    }

    @Test
    public void getUserSlackIdsNullUserIteam() throws IOException, SlackApiException {
        givenAToken();
        givenAMeetingTopic();
        givenATeamId();
        givenAListOfSlackUsers("this@mail.com");
        givenATeamRepository(null);
        givenSlackUserData(slackUserList);
        whenGetUserSlackIdsIsCalled();
        thenVerifyCalls(1);
        thenVerifyUsers(0);
    }

    @Test
    public void getUserSlackIdsEmptySlackUsers() throws IOException, SlackApiException {
        givenAToken();
        givenAMeetingTopic();
        givenATeamId();
        givenAListOfUserDTO();
        givenAListOfSlackUsers("this@mail.com");
        givenATeamRepository(userList);
        givenSlackUserData(Lists.emptyList());
        whenGetUserSlackIdsIsCalled();
        thenVerifyCalls(1);
        thenVerifyUsers(0);
    }

    @Test
    public void getUserSlackIdsWithSlackUsersButNoMail() throws IOException, SlackApiException {
        givenAToken();
        givenAMeetingTopic();
        givenATeamId();
        givenAListOfUserDTO();
        givenAListOfSlackUsers("other@mail.com");
        givenATeamRepository(userList);
        givenSlackUserData(Lists.emptyList());
        whenGetUserSlackIdsIsCalled();
        thenVerifyCalls(1);
        thenVerifyUsers(0);
    }

    @Test
    @Ignore
    public void pinMeetingInfoSuccess() throws IOException, SlackApiException {
        givenAChannelName();
        givenAToken();
        givenAMessage("this is a message");
        givenSlackChatResponseMock("1456723648945");
        givenAPinsAddResponse();
        whenPinMeetingInfoIsCalled();
        thenVerifyCallsPin();
    }

    @Test
    @Ignore
    public void inviteUserToUserGroupSuccess() throws IOException, SlackApiException {
        givenAToken();
        givenAMeetingTopic();
        givenATeamId();
        givenAListOfUserDTO();
        givenAListOfSlackUsers("this@mail.com");
        givenATeamRepository(userList);
        givenSlackUserData(slackUserList);
        givenSlackInviteResponseMock();
        whenInviteUserToUserGroupIsCalled();
        thenVerifyCallsInvite();
    }

    private void thenVerifyCallsInvite() {
        // TODO: verify how can verify stubbing calls
    }

    private void givenSlackInviteResponseMock() throws IOException, SlackApiException {
        GroupsInviteResponse response = Mockito.mock(GroupsInviteResponse.class);
        MethodsClient methods = Mockito.mock(MethodsClient.class);

        Mockito.when(methods.groupsInvite((GroupsInviteRequest) Mockito.anyObject())).thenReturn(response);

        Mockito.when(slack.methods()).thenReturn(methods);

    }

    private void whenInviteUserToUserGroupIsCalled() {
        underTest.inviteUsersToMeetingGroup(teamId, meetingTopic);
    }

    private void thenVerifyCallsPin() {
        // TODO: look how we can test the stubbing slack calls
    }

    private void whenPinMeetingInfoIsCalled() {
        underTest.pinMeetingInfo(new Meeting(), TIMESTAMP_CHAT_POST_MESSAGE);
    }

    private void givenAPinsAddResponse() throws IOException, SlackApiException {
        MethodsClient methods = Mockito.mock(MethodsClient.class);
        PinsAddResponse response = Mockito.mock(PinsAddResponse.class);

        Mockito.when(methods.pinsAdd(Mockito.anyObject())).thenReturn(response);

        Mockito.when(slack.methods()).thenReturn(methods);
    }

    private void givenAChatPostMessageResponse(String timestamp) throws IOException, SlackApiException {
        MethodsClient methods = Mockito.mock(MethodsClient.class);
        ChatPostMessageResponse response = Mockito.mock(ChatPostMessageResponse.class);

        Mockito.when(response.getTs()).thenReturn(timestamp);

        Mockito.when(methods.chatPostMessage(Mockito.anyObject())).thenReturn(response);

        Mockito.when(slack.methods()).thenReturn(methods);

    }

    private void givenAMessage(String slackMessage) {
        message = slackMessage;
    }

    private void givenAChannelName() {
        channelName = "channel-test";
    }

    private void givenAListOfSlackUsers(String mail) {
        User user = new User();

        Profile profile = new Profile();
        profile.setEmail(mail);

        user.setProfile(profile);
        user.setId("test");

        slackUserList = new ArrayList<>();

        slackUserList.add(user);

    }

    private void thenVerifyUsers(int size) {
        Assert.assertEquals(size, users.size());
    }

    private void thenVerifyCalls(int times) throws IOException, SlackApiException {
        Mockito.verify(teamRepositoryImpl, Mockito.times(times)).getTeamUsers(teamId);
    }

    private void whenGetUserSlackIdsIsCalled() {
        users = underTest.getUsersSlackIds(teamId, meetingTopic);
    }

    private void givenAListOfUserDTO() {

        userList = new ArrayList<>();

        UserDTO user1 = new UserDTO();
        user1.setMail("this@mail.com");

        UserDTO user2 = new UserDTO();
        user2.setMail("test@mail.com");

        userList.add(user1);
        userList.add(user2);
    }

    private void givenSlackUserData(List<User> slackUserList) throws IOException, SlackApiException {
        UsersListResponse response = Mockito.mock(UsersListResponse.class);
        MethodsClient methods = Mockito.mock(MethodsClient.class);

        Mockito.when(response.getMembers()).thenReturn(slackUserList);

        Mockito.when(methods.usersList(Mockito.anyObject())).thenReturn(response);

        Mockito.when(slack.methods()).thenReturn(methods);

    }

    private void givenATeamRepository(List<UserDTO> userList) {
        Mockito.when(teamRepositoryImpl.getTeamUsers(teamId)).thenReturn(userList);

    }

    private void givenAToken() {
        teamToken = "ñalksjdfñalskdf54564564564df56a465sd465sdf465sd4f98sdf";
    }

    private void givenSlackChatResponseMock(String timestampResponse) throws IOException, SlackApiException {
        ChatPostMessageResponse response = Mockito.mock(ChatPostMessageResponse.class);
        MethodsClient methods = Mockito.mock(MethodsClient.class);

        Mockito.when(response.getTs()).thenReturn(timestampResponse);

        Mockito.when(methods.chatPostMessage((ChatPostMessageRequest) Mockito.anyObject())).thenReturn(response);

        Mockito.when(slack.methods()).thenReturn(methods);
    }

    private void givenSlackPinResponseMock() throws IOException, SlackApiException {
        PinsAddResponse response = Mockito.mock(PinsAddResponse.class);
        MethodsClient methods = Mockito.mock(MethodsClient.class);

        Mockito.when(response.toString()).thenReturn("pinned successfuly");

        Mockito.when(methods.pinsAdd((PinsAddRequest) Mockito.anyObject())).thenReturn(response);

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
