package org.iteam.data.dal.slack;

import java.util.HashMap;
import java.util.List;

import org.iteam.data.dto.Meeting;
import org.iteam.data.model.SlackModel;

import com.github.seratch.jslack.api.methods.response.users.UsersListResponse;

public interface SlackRepository {

    /*
     * Add a single user to slack group
     */
    public void addUserToSlackGroup(String email);

    /*
     * Invite a single user to a Channel
     */
    public void inviteUserToChannel(String channelName, String userId);

    /*
     * get team members that are part of the iteam slack group and the ones that
     * arent
     */
    public SlackModel getSlackAndNonSlackUsers(String teamId);

    /*
     * get team members slack user Ids
     */
    public List<String> getUsersSlackIds(String teamId, String meetingTopic);

    /*
     * Returns a map with a users<mail,slackUserId> for a specific team
     */

    public HashMap<String, String> getTeamSlackUsersData(String teamId);

    /*
     * Returns true if a user belongs to the slack group already
     */
    public boolean userIsTeamMember(String userMail);

    /*
     * Returns all the users that are member of the slack group
     */
    public UsersListResponse getIteamAppUsers();

    /*
     * Pins a message of a certain channel
     */
    public void pinMeetingInfo(Meeting meeting, String channelId);

    /*
     * Returns a channel id for a channel name
     */
    public String getChannelId(String channelName);

    /*
     * Invite all team members to a channel
     */
    public void inviteUsersToMeetingGroup(String teamId, String meetingTopic);

    /*
     * Posts a message to a channel
     */
    public void postMessageToChannel(String channelId, String message, String title, String description,
            boolean remark);

    /*
     * Creates a meeting channel
     */
    public String createMeetingGroup(String meetingId);

    /*
     * creates a channel, invites the whole team and pins the meeting
     * information
     */
    public void createAndinviteToMeetingGroup(Meeting meeting, String teamId);

}
