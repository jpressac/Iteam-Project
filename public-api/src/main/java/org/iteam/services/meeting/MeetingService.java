package org.iteam.services.meeting;

import java.util.List;

import org.iteam.data.dto.Meeting;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.MeetingUsers;
import org.iteam.data.model.PaginationModel;

/**
 * Handles all the request for the meeting.
 *
 */
public interface MeetingService {

    /**
     * Create a new meeting given the meeting information.
     * 
     * @param meeting
     *            the meeting information.
     * @return true if it was successful, false otherwise
     */
    public boolean createMeeting(Meeting meeting);

    /**
     * Save the ideas generated during the meeting.
     * 
     * @param ideas
     *            ideas generated.
     * @return true if it was successful, false otherwise
     */
    public void savedIdeas(IdeasDTO ideas);

    /**
     * Retrieve the meeting ideas
     * 
     * @param meetingId
     *            the id of the meeting.
     * @return the json raw representation for the ideas.
     */
    public String getMeetingInfo(String meetingId);

    /**
     * Save the ideas of a meeting, it's just temporary.
     * 
     * @param meetingId
     *            the id of the meeting.
     * 
     * @param info
     *            the list of ideas in json raw format.
     */
    public MeetingUsers getMeetingUsers(String meetingId);

    public void updateMeetingInfo(String meetingId, String info);

    /**
     * Update the meeting Information
     * 
     * @param updatedMeeting
     *            meeting information, fields that will not be updated has to be
     *            null.
     * @return true if it's success, false otherwise.
     */

    public void updateMeetingUsers(String meetingId, String info);

    /**
     * Update the meeting information
     * 
     * @param updatedMeeting
     *            the new information about the meeting.
     */
    public void updateMeeting(Meeting updatedMeeting);

    /**
     * Retrieve the meetings given a list of team names.
     * 
     * @param teamName
     *            a list with all team names.
     * @return a list of meetings.
     */
    public List<Meeting> getMeetingByTeamName(String username, int size, int from);

    /**
     * Save temporally the ideas, by user, in the personal board.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param info
     *            the information, which contains the ideas and the username.
     */
    public void saveMeetingInfoPersonalBoard(String meetingId, String info);

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
    public void removeIdeasFromCachePersonalBoard(String meetingId, String info);

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

    public PaginationModel<Meeting> getEndedMeetings(String string, int offset, int limit);

    public PaginationModel<Meeting> getProgrammedMeetings(String username, int offset, int limit);

    public PaginationModel<Meeting> getEndedMeetingsByToken(String username, String token, int offset, int limit);

    public PaginationModel<Meeting> getProgrammedMeetingsByToken(String name, String token, int offset, int limit);

    public void generateScore(IdeasDTO ideas, List<String> userList);

}
