package org.iteam.data.dal.slack;

import java.util.HashMap;
import java.util.List;

import org.iteam.data.model.SlackModel;

import com.github.seratch.jslack.api.methods.response.users.UsersListResponse;

public interface SlackReposit {

    /*
     * Add a single user to slack group
     */
    public void addUserToSlackGroup(String token, String email);

    /*
     * Invite a single user to a Channel
     */
    public void inviteUserToChannel(String channelName, String userId, String token);

    /*
     * get team members that are part of the iteam slack group and the ones that
     * arent
     */
    public SlackModel getSlackAndNonSlackUsers(String teamToken, String teamId);

    /*
     * get team members slack user Ids
     */
    public List<String> getUsersSlackIds(String teamToken, String teamId, String meetingTopic);

    /*
     * Returns a map with a users<mail,slackUserId> for a specific team
     */

    public HashMap<String, String> getTeamSlackUsersData(String teamId, String teamToken);

    /*
     * Returns true if a user belongs to the slack group already
     */
    public boolean userIsTeamMember(String userMail, String teamToken);

    /*
     * Returns all the users that are member of the slack group
     */
    public UsersListResponse getIteamAppUsers(String teamToken);

    /*
     * Pins a message of a certain channel
     */
    public void pinMeetingInfo(String channel, String timestamp, String token);

    /*
     * Returns a channel id for a channel name
     */
    public String getChannelId(String channelName, String token);

    /*
     * Invite all team members to a channel
     */
    public void inviteUsersToMeetingGroup(String teamId, String meetingTopic);

    /*
     * Posts a message to a channel
     */
    public void postMessageToChannel(String channelId, String token, String message);

    /*
     * Creates a meeting channel
     */
    public String createMeetingGroup(String meetingId, String token);

    /*
     * creates a channel, invites the whole team and pins the meeting
     * information
     */
    public void createAndinviteToMeetingGroup(String meetingTopic, String teamId);

}
