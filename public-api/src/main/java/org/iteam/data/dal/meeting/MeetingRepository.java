package org.iteam.data.dal.meeting;

import java.util.List;

import org.elasticsearch.search.sort.SortOrder;
import org.iteam.data.dto.Meeting;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.Reports;

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
    public boolean saveIdeas(IdeasDTO ideas);

    /**
     * Generate the basic report (that is by ranking) given some parameters.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param fieldOrder
     *            field by will be ordered the ideas.
     * @param sortOrder
     *            sort order ASC or DESC
     * @return the report information.
     */
    public Reports generateBasicReport(String meetingId, String fieldOrder, SortOrder sortOrder);

    /**
     * Generate the report aggregated by user
     * 
     * @param meetingId
     *            the id of the meeting.
     * @return the report information.
     */
    public Reports generateBasicReportByUser(String meetingId);

    /**
     * Generate the report aggregated by tag
     * 
     * @param meetingId
     *            the id of the meeting.
     * @return the report information.
     */
    public Reports generateBasicReportByTag(String meetingId);

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
     * Retrieve the meetings given a list of team names.
     * 
     * @param teamName
     *            a list with all team names.
     * @return a list of meetings.
     */
    public List<Meeting> getMeetingByTeamName(List<String> teamName);

    public void saveMeetingInfoPBByUser(String meetingId, String info);

    public String getMeetingInfoByUserPB(String meetingId, String username);
}
