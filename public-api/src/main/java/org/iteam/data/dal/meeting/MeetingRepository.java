package org.iteam.data.dal.meeting;

import java.util.List;

import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.Meeting;

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

	public void generateBasicReport(String meetingId);

	public List<Meeting> getMeetingUser(String username);

	public void saveMeetingInfo(String data, String meetingId);

	public String getMeetingInfo(String meetingId);

	public void deleteMeetingInfo(String meetingId);
}
