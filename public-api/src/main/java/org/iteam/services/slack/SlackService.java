package org.iteam.services.slack;

import org.iteam.data.dto.Meeting;
import org.iteam.data.model.SlackModel;

public interface SlackService {

    public void createMeetingChannel(String meetingId);

    public void postMesageToChannel(String channelName, String message, String title, String description,
            boolean remark);

    public void inviteUserToChannel(String channelName, String userId);

    public boolean isTeamMember(String userMail);

    public void addUserToSlackGroup(String email);

    public SlackModel getTeamUsers(String teamName);

    public void inviteUsersToChannel(Meeting meeting, String teamId);

    public void postMessageUpdateMeeting(Meeting meeting);
}
