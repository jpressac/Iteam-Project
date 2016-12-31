package org.iteam.services.meeting;

import java.util.List;

import org.iteam.data.dto.Meeting;
import org.iteam.data.model.D3CollapseTreeModel;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.MeetingUsers;

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
    public boolean savedIdeas(IdeasDTO ideas);

    /**
     * Generate report by tag and ranking for the given meeting.
     * 
     * @param meetingId
     *            the meeting id.
     * @param tags
     *            tags to create the report
     * @return the an structure to generate a report tree
     */
    public D3CollapseTreeModel generateReportByRanking(String meetingId, List<String> tags);

    /**
     * Generate report for the given meeting.
     * 
     * @param meetingId
     *            the meeting id.
     * @param tags
     *            tags to create the report.
     * @return the an structure to generate a report tree
     */
    public D3CollapseTreeModel generateReportByUser(String meetingId, List<String> tags);

    /**
     * Generate report for the given meeting.
     * 
     * @param meetingId
     *            the meeting id.
     * @param tags
     *            tags to create the report.
     * @return the an structure to generate a report tree
     */
    public D3CollapseTreeModel generateReportByTag(String meetingId, List<String> tags);

    /**
     *
     * Get all the meeting given a user.
     * 
     * @param username
     *            the username of the user.
     * 
     * @return a list with all the meeting for the given user.
     */
    public List<Meeting> getMeetingByUser(String username);

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

    public boolean updateMeeting(Meeting updatedMeeting);

    /**
     * Retrieve the meetings given a list of team names.
     * 
     * @param teamName
     *            a list with all team names.
     * @return a list of meetings.
     */
    public List<Meeting> getMeetingByTeamName(String username);

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
}
