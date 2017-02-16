package org.iteam.data.dal.meeting;

import java.util.List;

import org.iteam.data.dto.Idea;
import org.iteam.data.dto.Meeting;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.MeetingUsers;
import org.iteam.data.model.PaginationModel;

/**
 * Handles all operations for the meeting.
 *
 */
public interface MeetingRepository {

    /**
     * Create a new meeting, given the information.
     * 
     * @param meeting
     *            the meeting to create
     * @return true if it was successful, false otherwise
     */
    public boolean createMeeting(Meeting meeting);

    /**
     * Save the ideas generated during the meeting.
     * 
     * @param ideas
     *            ideas which have to be saved.
     * @return true if it was successful, false otherwise.
     */
    public void saveIdeas(IdeasDTO ideas);

    /**
     * Save the ideas of a meeting, it's just temporary.
     * 
     * @param data
     *            the list of ideas in json raw format.
     * @param meetingId
     *            the id of the meeting.
     */
    public void saveMeetingInfo(String data, String meetingId);

    /**
     * Retrieve the meeting ideas
     * 
     * @param meetingId
     *            the id of the meeting.
     * @return the json raw representation for the ideas.
     */
    public String getMeetingInfo(String meetingId);

    /**
     * Update the meeting Information
     * 
     * @param updatedMeeting
     *            meeting information, fields that will not be updated has to be
     *            null.
     * @return true if it's succes, false otherwise.
     */

    public void updateMeeting(Meeting updatedMeeting);

    /**
     * Save actual users connected
     * 
     * @param updatedMeeting
     * @return
     */

    public void saveMeetingUsers(String users, String meetingId);

    /**
     * Retrieve the meetings given a list of team names.
     * 
     * @param teamName
     *            a list with all team names.
     * @return a list of meetings.
     */
    public List<Meeting> getMeetingByTeamName(List<String> teamName);

    /**
     * Returns all the users that are connected to the meeting
     * 
     * @param meetingId
     * @return
     */
    public MeetingUsers getConnectedUsers(String meetingId);

    /**
     * Save temporally the ideas, by user, in the personal board.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param info
     *            the information, which contains the ideas and the username.
     */
    public void saveMeetingInfoByUserPersonalBoard(String meetingId, String info);

    /**
     * Retrieve the personal board ideas, by user.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param username
     *            the username.
     * @return the list of ideas for the given user.
     */
    public String getMeetingInfoByUserPersonalBoard(String meetingId, String username);

    /**
     * Remove from cache the idea for the given user.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param info
     *            information that has the id of the idea and the username.
     */
    public void removeIdeaFromCachePersonalBoard(String meetingId, String info);

    /**
     * Update cache shared board given a meeting id and the information.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param info
     *            the list of notes.
     */
    public void updateSharedBoardCache(String meetingId, String info);

    /**
     * Remove from cache the idea given the meeting id.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param info
     *            the id of the idea to remove.
     */
    public void removeIdeasFromCacheSharedBoard(String meetingId, String info);

    /**
     * Update the state of the meetings to ended, just the finalized meetings.
     */
    public void updateEndedMeetings();

    /**
     * Retrieve the scheduled meeting given a token (some part of the topic)
     * 
     * @param username
     *            the username of some team member
     * @param token
     *            the token to be search as part of meeting topic. If it's null
     *            it will look for all meetings.
     * @param offset
     *            pagination from
     * @param limit
     *            pagination limit
     * @param ended
     *            true to search ended meetings, false to search scheduled
     *            meetings.
     * @return a model representation of the scheduled meetings.
     */
    public PaginationModel<Meeting> getMeetingsByToken(String username, String token, int offset, int limit,
            boolean ended);

    /**
     * Retrieve the scheduled meeting given a token (some part of the topic)
     * 
     * @param username
     *            the username of some team member
     * @param offset
     *            pagination from
     * @param limit
     *            pagination limit
     * @param ended
     *            true to search ended meetings, false to search scheduled
     *            meetings.
     * @return a model representation of the scheduled meetings.
     */
    public PaginationModel<Meeting> getMeetingsByToken(String username, int offset, int limit, boolean ended);

    /**
     * Get the meeting topic, given the meeting id.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @return the meeting topic.
     */
    public String getMeetingTopic(String meetingId);

    /**
     * Retrieve all the ideas given a meeting id.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @return a list of ideas.
     */
    public List<Idea> getIdeasGivenMeetingId(String meetingId);

}
