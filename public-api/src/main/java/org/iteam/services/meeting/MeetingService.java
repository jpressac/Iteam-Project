package org.iteam.services.meeting;

import org.iteam.data.model.InfoMeeting;
import org.iteam.data.model.Meeting;

/**
 * Handles all information about the meeting
 *
 */
public interface MeetingService {

	/**
	 * Create a new meeting based on the information received by the UI service.
	 * 
	 * @param meeting,
	 *            the model that contains information about the meeting.
	 * 
	 * 			@return, infoMeeting object that represent the basic info of
	 *            the meeting.
	 */
	public InfoMeeting createMeeting(Meeting meeting);
}
