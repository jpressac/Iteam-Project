package org.iteam.data.dal.slack;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.iteam.data.dal.team.TeamRepositoryImpl;
import org.iteam.data.dto.UserDTO;
import org.iteam.data.model.SlackModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Repository;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.github.seratch.jslack.Slack;
import com.github.seratch.jslack.api.methods.request.channels.ChannelsInviteRequest;
import com.github.seratch.jslack.api.methods.request.channels.ChannelsListRequest;
import com.github.seratch.jslack.api.methods.request.chat.ChatPostMessageRequest;
import com.github.seratch.jslack.api.methods.request.groups.GroupsCreateRequest;
import com.github.seratch.jslack.api.methods.request.groups.GroupsInviteRequest;
import com.github.seratch.jslack.api.methods.request.pins.PinsAddRequest;
import com.github.seratch.jslack.api.methods.request.users.UsersListRequest;
import com.github.seratch.jslack.api.methods.response.channels.ChannelsInviteResponse;
import com.github.seratch.jslack.api.methods.response.channels.ChannelsListResponse;
import com.github.seratch.jslack.api.methods.response.chat.ChatPostMessageResponse;
import com.github.seratch.jslack.api.methods.response.groups.GroupsCreateResponse;
import com.github.seratch.jslack.api.methods.response.groups.GroupsInviteResponse;
import com.github.seratch.jslack.api.methods.response.pins.PinsAddResponse;
import com.github.seratch.jslack.api.methods.response.users.UsersListResponse;
import com.github.seratch.jslack.api.model.Channel;
import com.github.seratch.jslack.api.model.User;

@Repository
public class SlackRepositoryImpl implements SlackReposit {

    private TeamRepositoryImpl teamRepositoryImpl;
    private Slack slack = Slack.getInstance();
    private static final Logger LOGGER = LoggerFactory.getLogger(SlackRepositoryImplTest.class);

    private static final String URI_TEMPLATE_SLACK_ADD_TEAM = "https://slack.com/api/users.admin.invite?token={token}&email={mail}";

    private static String BOT_TOKEN = "xoxb-141135744790-P7NOxQkNferYDZnZUAvF7M7W";
    private static String APP_TOKEN = "xoxp-140386445603-141146385335-141139898470-d07c0391cc828de808c1ca6832f0dbd8";

    @Override
    public void createAndinviteToMeetingGroup(String meetingTopic, String teamId) {
        String groupId = createMeetingGroup(meetingTopic, APP_TOKEN);
        if (!StringUtils.isEmpty(groupId)) {
            pinMeetingInfo(groupId, "Meeting information", APP_TOKEN);
            inviteUsersToMeetingGroup(teamId, groupId);
        }
    }

    @Override
    public String createMeetingGroup(String meetingId, String token) {
        String groupId = StringUtils.EMPTY;
        GroupsCreateRequest groupCreateRequest = GroupsCreateRequest.builder().token(token).name(meetingId).build();
        try {
            GroupsCreateResponse response = slack.methods().groupsCreate(groupCreateRequest);
            LOGGER.info("Slack group for meeting {} ", meetingId);
            groupId = response.getGroup().getId();
        } catch (Exception e) {
            LOGGER.error("Error when creating slack channel for meeting ", e);
        }
        return groupId;
    }

    @Override
    public void postMessageToChannel(String channelId, String token, String message) {

        try {
            ChatPostMessageResponse postResponse = slack.methods().chatPostMessage(
                    ChatPostMessageRequest.builder().token(token).channel(channelId).text(message).build());
            LOGGER.info(postResponse.toString());
        } catch (Exception e) {
            LOGGER.error("Error when sending message to slack channel ", e);
        }
    }

    // Used by API
    @Override
    public void inviteUsersToMeetingGroup(String teamId, String meetingTopic) {
        List<String> userIds = getUsersSlackIds(APP_TOKEN, teamId, meetingTopic);

        if (!CollectionUtils.isEmpty(userIds)) {
            for (String id : userIds) {
                GroupsInviteRequest inviteReq = GroupsInviteRequest.builder().token(APP_TOKEN).channel(meetingTopic)
                        .user(id).build();
                LOGGER.info(id);
                try {
                    GroupsInviteResponse inviteResponse = slack.methods().groupsInvite(inviteReq);
                    LOGGER.info(inviteResponse.toString());
                } catch (Exception e) {
                    LOGGER.error("Users couldn't be invited to meeting group", e);
                }
            }
        }
    }

    @Override
    public String getChannelId(String channelName, String token) {
        String channelId = StringUtils.EMPTY;

        try {
            ChannelsListResponse channelsResponse = slack.methods()
                    .channelsList(ChannelsListRequest.builder().token(token).build());

            Channel channel = channelsResponse.getChannels().stream().filter(c -> c.getName().equals(channelName))
                    .findFirst().get();
            channelId = channel.getId();
        } catch (Exception e) {
            LOGGER.error("Error when retrieving channel id", e);
        }

        return channelId;
    }

    @Override
    public void pinMeetingInfo(String channelName, String message, String token) {
        try {
            ChatPostMessageResponse postResponse = slack.methods().chatPostMessage(
                    ChatPostMessageRequest.builder().token(token).channel(channelName).text(message).build());
            String timestamp = postResponse.getTs();

            if (StringUtils.isNotEmpty(timestamp)) {
                PinsAddRequest pinAddRequest = PinsAddRequest.builder().token(token).channel(channelName)
                        .timestamp(timestamp).build();
                PinsAddResponse pinAddResponse = slack.methods().pinsAdd(pinAddRequest);

                LOGGER.info("Message pinned successfully" + pinAddResponse.toString());
            }

        } catch (Exception e) {
            LOGGER.error("Error when trying to pin message", e);
        }
    }

    @Override
    public UsersListResponse getIteamAppUsers(String teamToken) {

        UsersListRequest userListRequest = UsersListRequest.builder().token(teamToken).build();
        try {
            UsersListResponse response = slack.methods().usersList(userListRequest);
            return response;
        } catch (Exception e) {
            LOGGER.error("Error when retrieving users", e);
        }
        return new UsersListResponse();
    }

    private List<String> getTeamSlackUsers(String teamToken) {
        List<String> userEmails = new ArrayList<>();
        List<User> allIteamSlackUsers = getIteamAppUsers(teamToken).getMembers();

        if (!CollectionUtils.isEmpty(allIteamSlackUsers)) {
            for (User user : allIteamSlackUsers) {
                userEmails.add(user.getProfile().getEmail());
            }
        }
        return userEmails;
    }

    @Override
    public boolean userIsTeamMember(String userMail, String teamToken) {
        return getTeamSlackUsers(teamToken).contains(userMail);
    }

    @Override
    public HashMap<String, String> getTeamSlackUsersData(String teamId, String teamToken) {
        List<User> allSlackUsers = getIteamAppUsers(teamToken).getMembers();
        HashMap<String, String> slackUserData = new HashMap<>();

        if (!CollectionUtils.isEmpty(allSlackUsers)) {
            for (User slackUser : allSlackUsers) {
                slackUserData.put(slackUser.getProfile().getEmail(), slackUser.getId());
            }
        }
        return slackUserData;
    }

    @Override
    public List<String> getUsersSlackIds(String teamToken, String teamId, String meetingTopic) {
        List<UserDTO> users = teamRepositoryImpl.getTeamUsers(teamId);
        HashMap<String, String> allIteamSlackUsersData = getTeamSlackUsersData(teamId, teamToken);
        List<String> usersSlackIds = new ArrayList<>();

        if ((!CollectionUtils.isEmpty(users)) && (!CollectionUtils.isEmpty(allIteamSlackUsersData))) {
            for (UserDTO user : users) {
                if (!ObjectUtils.isEmpty(allIteamSlackUsersData.get(user.getMail()))) {
                    usersSlackIds.add(allIteamSlackUsersData.get(user.getMail()));
                }
            }
        }
        return usersSlackIds;
    }

    @Override
    public SlackModel getSlackAndNonSlackUsers(String teamToken, String teamId) {

        List<String> slackUsers = getTeamSlackUsers(teamToken);
        List<UserDTO> teamMembers = teamRepositoryImpl.getTeamUsers(teamId);
        List<String> usersInSlack = new ArrayList<>();
        List<String> usersWithoutSlack = new ArrayList<>();

        if ((!CollectionUtils.isEmpty(slackUsers) && (!CollectionUtils.isEmpty(teamMembers)))) {
            for (UserDTO user : teamMembers) {
                if (slackUsers.contains(user.getMail())) {
                    usersInSlack.add(user.getUsername());
                } else {
                    usersWithoutSlack.add(user.getUsername());
                }
            }
        }
        SlackModel model = new SlackModel(usersInSlack, usersWithoutSlack);

        return model;
    }

    @Override
    public void inviteUserToChannel(String channelName, String userId, String token) {

        ChannelsInviteRequest inviteReq = ChannelsInviteRequest.builder().token(token)
                .channel(getChannelId(channelName, token)).user(userId).build();
        try {
            ChannelsInviteResponse inviteResponse = slack.methods().channelsInvite(inviteReq);
        } catch (Exception e) {
            LOGGER.error("Error when inviting user to channel", e);
        }
    }

    @Override
    public void addUserToSlackGroup(String token, String email) {

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<?> entity = new HttpEntity<>(new HttpHeaders());
        try {
            HttpEntity<JsonNode> response = restTemplate.exchange(URI_TEMPLATE_SLACK_ADD_TEAM, HttpMethod.POST, entity,
                    JsonNode.class, token, email);
            LOGGER.info(response.toString());
        } catch (Exception e) {
            LOGGER.error("User could not be added to Iteam app slack group", e);
        }
    }

    @Autowired
    private void setTeamRepository(TeamRepositoryImpl teamRepository) {
        this.teamRepositoryImpl = teamRepository;
    }

}
