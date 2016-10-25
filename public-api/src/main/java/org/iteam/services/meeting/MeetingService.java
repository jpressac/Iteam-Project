package org.iteam.services.meeting;

import java.util.List;

import org.iteam.data.dto.Meeting;
import org.iteam.data.model.IdeasDTO;
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
	 *
	 * Get all the meeting given a user.
	 * 
	 * @param username
	 *            the username of the user.
	 * 
	 * @return a list with all the meeting for the given user.
	 */
	public List<Meeting> getMeetingByUser(String username);

	public String getMeetingInfo(String meetingId);

	public void updateMeetingInfo(String meetingId, String info);

	public boolean updateMeeting(Meeting updatedMeeting);

	public List<Meeting> getMeetingByTeamName(String username);
}
