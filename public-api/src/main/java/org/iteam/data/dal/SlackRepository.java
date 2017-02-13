package org.iteam.data.dal;

import java.io.IOException;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

import com.github.seratch.jslack.Slack;
import com.github.seratch.jslack.api.methods.SlackApiException;
import com.github.seratch.jslack.api.methods.request.channels.ChannelsCreateRequest;
import com.github.seratch.jslack.api.methods.request.channels.ChannelsInviteRequest;
import com.github.seratch.jslack.api.methods.request.channels.ChannelsListRequest;
import com.github.seratch.jslack.api.methods.request.chat.ChatPostMessageRequest;
import com.github.seratch.jslack.api.methods.request.pins.PinsAddRequest;
import com.github.seratch.jslack.api.methods.request.users.UsersListRequest;
import com.github.seratch.jslack.api.methods.response.channels.ChannelsCreateResponse;
import com.github.seratch.jslack.api.methods.response.channels.ChannelsInviteResponse;
import com.github.seratch.jslack.api.methods.response.channels.ChannelsListResponse;
import com.github.seratch.jslack.api.methods.response.chat.ChatPostMessageResponse;
import com.github.seratch.jslack.api.methods.response.pins.PinsAddResponse;
import com.github.seratch.jslack.api.methods.response.users.UsersListResponse;
import com.github.seratch.jslack.api.model.Channel;

@Repository
public class SlackRepository {

    private Slack slack = Slack.getInstance();
    private static final Logger LOGGER = LoggerFactory.getLogger(SlackRepository.class);

    public void createMeetingChannel(String meetingId, String token) {

        ChannelsCreateRequest channelCreation = ChannelsCreateRequest.builder().token(token).name(meetingId).build();
        try {
            ChannelsCreateResponse response = slack.methods().channelsCreate(channelCreation);
            LOGGER.info("Slack channel for meeting {} ", meetingId);

            String messageTimestamp = postMessage(meetingId, token, "Meeting information");
            pinMeetingInfo(meetingId, messageTimestamp, token);

        } catch (Exception e) {
            LOGGER.error("Error when creating slack channel for meeting ", e);
        }

    }

    public void postMessageToChannel(String channelName, String token, String message) {

        try {
            ChatPostMessageResponse postResponse = slack.methods().chatPostMessage(ChatPostMessageRequest.builder()
                    .token(token).channel(getChannelId(channelName, token)).text(message).build());
            LOGGER.info(postResponse.toString());
        } catch (Exception e) {
            LOGGER.error("Error when sending message to slack channel ", e);
        }
    }

    public String postMessage(String channelName, String token, String message) {
        String timestamp = StringUtils.EMPTY;
        try {
            ChatPostMessageResponse postResponse = slack.methods().chatPostMessage(ChatPostMessageRequest.builder()
                    .token(token).channel(getChannelId(channelName, token)).text(message).build());
            timestamp = postResponse.getTs();
            LOGGER.info(postResponse.toString());
        } catch (Exception e) {
            LOGGER.error("Error when sending message to slack channel ", e);
        }
        return timestamp;
    }

    private String getChannelId(String channelName, String token) {
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

    public void pinMeetingInfo(String channel, String timestamp, String token) {
        try {

            PinsAddRequest pinAddRequest = PinsAddRequest.builder().token(token).channel(getChannelId(channel, token))
                    .timestamp(timestamp).build();
            PinsAddResponse pinAddResponse = slack.methods().pinsAdd(pinAddRequest);

            LOGGER.info("Message pinned successfully" + pinAddResponse.toString());

        } catch (Exception e) {
            LOGGER.error("Error when trying to pin message", e);
        }
    }

    public String getTeamUsers(String teamToken) {
        UsersListRequest userListRequest = UsersListRequest.builder().token(teamToken).build();
        try {
            UsersListResponse response = slack.methods().usersList(userListRequest);
            return response.toString();
        } catch (Exception e) {
            LOGGER.error("Error when retrieving users", e);
        }
        return null;
    }

    public String inviteUserToChannel(String channelName, String userId, String token) {

        ChannelsInviteRequest inviteReq = ChannelsInviteRequest.builder().token(token)
                .channel(getChannelId(channelName, token)).user(userId).build();

        try {
            ChannelsInviteResponse inviteResponse = slack.methods().channelsInvite(inviteReq);
            return inviteResponse.toString();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (SlackApiException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }
}
