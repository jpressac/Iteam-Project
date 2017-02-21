package org.iteam.services.slack;

import org.iteam.data.model.SlackModel;

public interface SlackService {

    public void createMeetingChannel(String meetingId, String token);

    public void postMesageToChannel(String channelName, String token, String message);

    public void inviteUserToChannel(String channelName, String userId, String token);

    public boolean isTeamMember(String userMail, String teamToken);

    public void addUserToSlackGroup(String token, String email);

    public SlackModel getTeamUsers(String teamToken, String teamName);

    public void inviteUsersToChannel(String teamId, String meetingTopic);
}
