package org.iteam.services.slack;

import org.iteam.data.dal.slack.SlackRepositoryImpl;
import org.iteam.data.dto.Meeting;
import org.iteam.data.model.SlackModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SlackServiceImpl implements SlackService {

    private SlackRepositoryImpl slackRepository;

    @Override
    public void createMeetingChannel(String meetingId) {
        slackRepository.createMeetingGroup(meetingId);
    }

    @Override
    public void postMesageToChannel(String channelName, String message, String title, String description,
            boolean remark) {
        slackRepository.postMessageToChannel(channelName, message, title, description, remark);
    }

    @Override
    public void inviteUserToChannel(String channelName, String userId) {
        slackRepository.inviteUserToChannel(channelName, userId);
    }

    @Override
    public boolean isTeamMember(String userMail) {
        return slackRepository.userIsTeamMember(userMail);
    }

    @Override
    public void addUserToSlackGroup(String email) {
        slackRepository.addUserToSlackGroup(email);
    }

    @Override
    public SlackModel getTeamUsers(String teamName) {
        return slackRepository.getSlackAndNonSlackUsers(teamName);
    }

    @Override
    public void inviteUsersToChannel(Meeting meeting, String teamId) {
        slackRepository.createAndinviteToMeetingGroup(meeting, teamId);
    }

    @Autowired
    private void setSlackRepository(SlackRepositoryImpl slackRepository) {
        this.slackRepository = slackRepository;
    }
}
