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
     * Retrieve the all the meetings in which a user is part of.
     * 
     * @param username
     *            the username.
     * @return the list of the meetings.
     */
    public List<Meeting> getMeetingUser(String username);

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

    public boolean updateMeeting(Meeting updatedMeeting);

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

    public PaginationModel<Meeting> getProgrammedMeetings(String username, int offset, int limit);

    public void updateEndedMeetings();

    public PaginationModel<Meeting> getEndedMeetingByToken(String username, String token, int offset, int limit);

    public PaginationModel<Meeting> getProgrammedMeetingsByToken(String name, String token, int offset, int limit);

    public PaginationModel<Meeting> getEndedMeetings(String username, int offset, int limit);

    public List<Meeting> getCustomReportByMeeting(String ownerName, String topicToken);

    public D3CollapseTreeModel generateCustomReportByMeeting(List<String> meetingId);

    public String getMeetingTopic(String meetingId);

    public List<Idea> getIdeasGivenMeetingId(String meetingId);

}
