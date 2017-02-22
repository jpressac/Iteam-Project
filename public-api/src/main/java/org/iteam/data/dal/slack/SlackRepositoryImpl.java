package org.iteam.data.dal.slack;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.iteam.data.dal.team.TeamRepositoryImpl;
import org.iteam.data.dto.Meeting;
import org.iteam.data.dto.UserDTO;
import org.iteam.data.model.SlackModel;
import org.joda.time.DateTime;
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
import com.fasterxml.jackson.databind.util.ISO8601DateFormat;
import com.github.seratch.jslack.Slack;
import com.github.seratch.jslack.api.methods.request.channels.ChannelsInviteRequest;
import com.github.seratch.jslack.api.methods.request.channels.ChannelsListRequest;
import com.github.seratch.jslack.api.methods.request.chat.ChatPostMessageRequest;
import com.github.seratch.jslack.api.methods.request.groups.GroupsCreateRequest;
import com.github.seratch.jslack.api.methods.request.groups.GroupsInviteRequest;
import com.github.seratch.jslack.api.methods.request.pins.PinsAddRequest;
import com.github.seratch.jslack.api.methods.request.users.UsersListRequest;
import com.github.seratch.jslack.api.methods.response.channels.ChannelsListResponse;
import com.github.seratch.jslack.api.methods.response.chat.ChatPostMessageResponse;
import com.github.seratch.jslack.api.methods.response.groups.GroupsCreateResponse;
import com.github.seratch.jslack.api.methods.response.groups.GroupsInviteResponse;
import com.github.seratch.jslack.api.methods.response.pins.PinsAddResponse;
import com.github.seratch.jslack.api.methods.response.users.UsersListResponse;
import com.github.seratch.jslack.api.model.Channel;
import com.github.seratch.jslack.api.model.User;

@Repository
public class SlackRepositoryImpl implements SlackRepository {

    private TeamRepositoryImpl teamRepositoryImpl;
    private Slack slack = Slack.getInstance();
    private static final Logger LOGGER = LoggerFactory.getLogger(SlackRepositoryImpl.class);

    private static final String URI_TEMPLATE_SLACK_ADD_TEAM = "https://slack.com/api/users.admin.invite?token={token}&email={mail}";

    private static String BOT_TOKEN = "xoxb-141135744790-P7NOxQkNferYDZnZUAvF7M7W";
    private static String BOT_USER_ID = "USLACKBOT";
    private static String APP_TOKEN = "xoxp-140386445603-141146385335-141139898470-d07c0391cc828de808c1ca6832f0dbd8";

    @Override
    public void createAndinviteToMeetingGroup(Meeting meeting, String teamId) {
        String groupId = createMeetingGroup(meeting.getTopic());
        if (!StringUtils.isEmpty(groupId)) {
            pinMeetingInfo(meeting, groupId);
            inviteUsersToMeetingGroup(teamId, groupId);
        }
    }

    @Override
    public String createMeetingGroup(String meetingId) {
        String groupId = StringUtils.EMPTY;
        GroupsCreateRequest groupCreateRequest = GroupsCreateRequest.builder().token(APP_TOKEN).name(meetingId).build();
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
    public void postMessageToChannel(String channelName, String message, String title, String description,
            boolean remark) {

        String channelId = getChannelId(channelName);

        String formattedMessage = formatRawMessage(title, description, message, remark);

        try {
            ChatPostMessageResponse postResponse = slack.methods().chatPostMessage(ChatPostMessageRequest.builder()
                    .token(BOT_TOKEN).channel(channelId).text(formattedMessage).build());

            LOGGER.info(postResponse.toString());
        } catch (Exception e) {
            LOGGER.error("Error when sending message to slack channel ", e);
        }
    }

    @Override
    public boolean userIsTeamMember(String userMail) {
        return getTeamSlackUsers().contains(userMail);
    }

    @Override
    public SlackModel getSlackAndNonSlackUsers(String teamId) {

        List<String> slackUsers = getTeamSlackUsers();
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

    // Used by API
    @Override
    public void inviteUsersToMeetingGroup(String teamId, String meetingTopic) {
        List<String> userIds = getUsersSlackIds(teamId, meetingTopic);

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
    public String getChannelId(String channelName) {
        String channelId = StringUtils.EMPTY;

        try {
            String newChannelName = channelName.replace(" ", "-");
            ChannelsListResponse channelsResponse = slack.methods()
                    .channelsList(ChannelsListRequest.builder().token(APP_TOKEN).build());

            Channel channel = channelsResponse.getChannels().stream().filter(c -> c.getName().equals(newChannelName))
                    .findFirst().get();
            channelId = channel.getId();
        } catch (Exception e) {
            LOGGER.error("Error when retrieving channel id", e);
        }

        return channelId;
    }

    @Override
    public void pinMeetingInfo(Meeting meeting, String channelId) {

        try {
            String formattedMessage = formatMessageMeetingInfo(meeting);

            ChatPostMessageRequest request = ChatPostMessageRequest.builder().token(BOT_TOKEN).channel(channelId)
                    .text(formattedMessage).build();

            ChatPostMessageResponse postResponse = slack.methods().chatPostMessage(request);

            String timestamp = postResponse.getTs();

            if (StringUtils.isNotEmpty(timestamp)) {
                PinsAddRequest pinAddRequest = PinsAddRequest.builder().token(BOT_TOKEN).channel(channelId)
                        .timestamp(timestamp).build();
                PinsAddResponse pinAddResponse = slack.methods().pinsAdd(pinAddRequest);

                LOGGER.info("Message pinned successfully" + pinAddResponse.toString());
            }

        } catch (Exception e) {
            LOGGER.error("Error when trying to pin message", e);
        }
    }

    @Override
    public UsersListResponse getIteamAppUsers() {

        UsersListRequest userListRequest = UsersListRequest.builder().token(APP_TOKEN).build();
        try {
            UsersListResponse response = slack.methods().usersList(userListRequest);
            return response;
        } catch (Exception e) {
            LOGGER.error("Error when retrieving users", e);
        }
        return new UsersListResponse();
    }

    @Override
    public HashMap<String, String> getTeamSlackUsersData(String teamId) {
        List<User> allSlackUsers = getIteamAppUsers().getMembers();
        HashMap<String, String> slackUserData = new HashMap<>();

        if (!CollectionUtils.isEmpty(allSlackUsers)) {
            for (User slackUser : allSlackUsers) {
                slackUserData.put(slackUser.getProfile().getEmail(), slackUser.getId());
            }
        }
        return slackUserData;
    }

    @Override
    public List<String> getUsersSlackIds(String teamId, String meetingTopic) {
        List<UserDTO> users = teamRepositoryImpl.getTeamUsers(teamId);
        HashMap<String, String> allIteamSlackUsersData = getTeamSlackUsersData(teamId);
        List<String> usersSlackIds = new ArrayList<>();

        if ((!CollectionUtils.isEmpty(users)) && (!CollectionUtils.isEmpty(allIteamSlackUsersData))) {
            for (UserDTO user : users) {
                if (!ObjectUtils.isEmpty(allIteamSlackUsersData.get(user.getMail()))) {
                    usersSlackIds.add(allIteamSlackUsersData.get(user.getMail()));
                }
            }
            usersSlackIds.add(BOT_USER_ID);
        }
        return usersSlackIds;
    }

    @Override
    public void inviteUserToChannel(String channelName, String userId) {

        ChannelsInviteRequest inviteReq = ChannelsInviteRequest.builder().token(APP_TOKEN)
                .channel(getChannelId(channelName)).user(userId).build();
        try {
            slack.methods().channelsInvite(inviteReq);
        } catch (Exception e) {
            LOGGER.error("Error when inviting user to channel", e);
        }
    }

    @Override
    public void addUserToSlackGroup(String email) {

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<?> entity = new HttpEntity<>(new HttpHeaders());
        try {
            HttpEntity<JsonNode> response = restTemplate.exchange(URI_TEMPLATE_SLACK_ADD_TEAM, HttpMethod.POST, entity,
                    JsonNode.class, APP_TOKEN, email);
            LOGGER.info(response.toString());
        } catch (Exception e) {
            LOGGER.error("User could not be added to Iteam app slack group", e);
        }
    }

    private List<String> getTeamSlackUsers() {
        List<String> userEmails = new ArrayList<>();
        List<User> allIteamSlackUsers = getIteamAppUsers().getMembers();

        if (!CollectionUtils.isEmpty(allIteamSlackUsers)) {
            for (User user : allIteamSlackUsers) {
                userEmails.add(user.getProfile().getEmail());
            }
        }
        return userEmails;
    }

    private String formatMessageMeetingInfo(Meeting meeting) {

        StringBuffer message = new StringBuffer();
        message.append("_*MEETING INFORMATION:*_ \n");
        message.append(String.format("_Topic:_ %s\n", meeting.getTopic()));
        message.append("_Description:_\n");
        message.append(String.format("> %s \n", meeting.getDescription()));
        message.append(String.format("_Programmed date:_ %s \n",
                new ISO8601DateFormat().format(new DateTime(meeting.getProgrammedDate()).toDate())));

        return message.toString();
    }

    private String formatRawMessage(String messageTitle, String messageDescription, String message, boolean remark) {
        StringBuffer messageBuilder = new StringBuffer();
        messageBuilder.append(String.format("_*%s:*_ \n", messageTitle));
        messageBuilder.append("_Description:_\n");
        messageBuilder.append(String.format(">>> %s \n", messageDescription));

        if (remark) {
            messageBuilder.append(String.format(">`%s`\n", message));
        } else {
            messageBuilder.append(String.format(">%s\n", message));
        }

        return messageBuilder.toString();
    }

    @Autowired
    private void setTeamRepository(TeamRepositoryImpl teamRepository) {
        this.teamRepositoryImpl = teamRepository;
    }

}
