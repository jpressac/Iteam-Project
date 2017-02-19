package org.iteam.services.slack;

import org.iteam.data.dal.slack.SlackRepositoryImpl;
import org.iteam.data.model.SlackModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SlackServiceImpl implements SlackService {

    private SlackRepositoryImpl slackRepository;
    private static String BOT_TOKEN = "xoxb-141135744790-P7NOxQkNferYDZnZUAvF7M7W";
    private static String APP_TOKEN = "xoxp-140386445603-141146385335-141139898470-d07c0391cc828de808c1ca6832f0dbd8";

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
