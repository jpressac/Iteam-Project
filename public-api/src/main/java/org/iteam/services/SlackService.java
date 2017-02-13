package org.iteam.services;

import org.iteam.data.dal.SlackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SlackService {

    private SlackRepository slackRepository;

    public void createMeetingChannel(String meetingId, String token) {
        slackRepository.createMeetingChannel(meetingId, token);
    }

    public void postMesageToChannel(String channelName, String token, String message) {
        slackRepository.postMessageToChannel(channelName, token, message);
    }

    @Autowired
    private void setSlackRepository(SlackRepository slackRepository) {
        this.slackRepository = slackRepository;
    }

    public String inviteUserToChannel(String channelName, String userId, String token) {
        return slackRepository.inviteUserToChannel(channelName, userId, token);
    }

    public String getUsersList(String teamToken) {
        return slackRepository.getTeamUsers(teamToken);
    }
}
