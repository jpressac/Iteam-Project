package org.iteam.services;

import org.iteam.data.dal.SlackRepository;
import org.iteam.data.model.SlackModel;
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

    public boolean isTeamMember(String userMail, String teamToken) {
        return slackRepository.userIsTeamMember(userMail, teamToken);
    }

    public void addUserToSlackGroup(String token, String email) {
        slackRepository.addUserToSlackGroup(token, email);
    }

    public SlackModel getTeamUsers(String teamToken, String teamName) {
        return slackRepository.getSlackAndNonSlackUsers(teamToken, teamName);
    }

    public void inviteUsersToChannel(String token, String teamId, String meetingTopic) {
        slackRepository.createAndinviteToMeetingChannel(meetingTopic, token, teamId);
    }
}
