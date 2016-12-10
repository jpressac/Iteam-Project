package org.iteam.services.meeting;

import java.util.List;

import org.iteam.data.dto.Meeting;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.MeetingUsers;
import org.iteam.data.model.Reports;

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
     * Generate report for the given meeting.
     * 
     * @param meetingId
     *            the meeting id.
     * @return
     */
    public Reports generateReport(String meetingId);

    /**
     * Generate report for the given meeting.
     * 
     * @param meetingId
     *            the meeting id.
     * @return
     */
    public Reports generateReportByUser(String meetingId);

    /**
     * Generate report for the given meeting.
     * 
     * @param meetingId
     *            the meeting id.
     * @return
     */
    public Reports generateReportByTag(String meetingId);

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
}
