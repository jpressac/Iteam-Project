package org.iteam.controllers.rest;

import org.iteam.services.meeting.MeetingServiceImpl;
import org.springframework.http.ResponseEntity;

//@RestController
public class MeetingController {

	private MeetingServiceImpl meetingServiceImpl;

	// @RequestMapping(value = "/meeting/create", method = RequestMethod.POST)
	public ResponseEntity<Boolean> createMeeting() {
		meetingServiceImpl.createMeeting();

		return null;
	}

	// @Autowired
	private void setMeetingServiceImpl(MeetingServiceImpl meetingServiceImpl) {
		this.meetingServiceImpl = meetingServiceImpl;
	}

}
