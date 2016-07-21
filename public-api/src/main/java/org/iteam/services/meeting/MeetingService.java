package org.iteam.services.meeting;

import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.Meeting;

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
}
