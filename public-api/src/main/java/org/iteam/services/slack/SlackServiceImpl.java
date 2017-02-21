package org.iteam.services.slack;

import org.iteam.data.dal.slack.SlackRepositoryImpl;
import org.iteam.data.model.SlackModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SlackServiceImpl implements SlackService {

    private SlackRepositoryImpl slackRepository;

    @Override
    public void createMeetingChannel(String meetingId, String token) {
        slackRepository.createMeetingGroup(meetingId, token);
    }

    @Override
    public void postMesageToChannel(String channelName, String token, String message) {
        slackRepository.postMessageToChannel(channelName, token, message);
    }

    @Override
    public void inviteUserToChannel(String channelName, String userId, String token) {
        slackRepository.inviteUserToChannel(channelName, userId, token);
    }

    @Override
    public boolean isTeamMember(String userMail, String teamToken) {
        return slackRepository.userIsTeamMember(userMail, teamToken);
    }

    @Override
    public void addUserToSlackGroup(String token, String email) {
        slackRepository.addUserToSlackGroup(token, email);
    }

    @Override
    public SlackModel getTeamUsers(String teamToken, String teamName) {
        return slackRepository.getSlackAndNonSlackUsers(teamToken, teamName);
    }

    @Override
    public void inviteUsersToChannel(String teamId, String meetingTopic) {
        slackRepository.createAndinviteToMeetingGroup(meetingTopic, teamId);
    }

    @Autowired
    private void setSlackRepository(SlackRepositoryImpl slackRepository) {
        this.slackRepository = slackRepository;
    }
}
