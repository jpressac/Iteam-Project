package org.iteam.controllers.rest;

import javax.validation.Valid;

import org.iteam.data.model.InfoMeeting;
import org.iteam.data.model.Meeting;
import org.iteam.services.meeting.MeetingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for all request operations for the meeting.
 *
 */
@RestController
public class MeetingController {

	private MeetingServiceImpl meetingServiceImpl;

	/**
	 * Create a new meeting based on the information provided by the UI service.
	 * 
	 * @param meeting,
	 *            all the information to save about the meeting.
	 * 
	 * 			@return, an InfoMeeting object that represent the minimal
	 *            information.
	 */
	@RequestMapping(value = "/meeting/create", method = RequestMethod.POST)
	public ResponseEntity<InfoMeeting> createMeeting(@RequestBody @Valid Meeting meeting) {
		InfoMeeting infoMeeting = meetingServiceImpl.createMeeting(meeting);

		if (!ObjectUtils.isEmpty(infoMeeting)) {
			return new ResponseEntity<InfoMeeting>(infoMeeting, HttpStatus.OK);
		} else {
			return new ResponseEntity<InfoMeeting>(infoMeeting, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@Autowired
	private void setMeetingServiceImpl(MeetingServiceImpl meetingServiceImpl) {
		this.meetingServiceImpl = meetingServiceImpl;
	}

}
