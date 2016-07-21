package org.iteam.data.dal.meeting;

import org.iteam.data.model.Meeting;

/**
 * Handles all the CRUD meeting operations with the database.
 *
 */
public interface MeetingRepository {

	/**
	 * Create a new meeting.
	 * 
	 * @param meeting,
	 *            the information to save in the database. @return,
	 */
	public String createMeeting(Meeting meeting);

}
