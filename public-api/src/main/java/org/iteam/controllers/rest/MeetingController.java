package org.iteam.controllers.rest;

import java.util.List;

import javax.validation.Valid;

import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.Meeting;
import org.iteam.data.model.Reports;
import org.iteam.services.meeting.MeetingService;
import org.iteam.services.meeting.MeetingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for handling all meeting request.
 *
 */
@RestController
public class MeetingController {

	private MeetingService meetingServiceImpl;

	/**
	 * Create a new meeting, given the meeting information.
	 * 
	 * @return 200 OK if it was successful.
	 */
	@RequestMapping(value = "/meeting/create", method = RequestMethod.POST)
	public ResponseEntity<Void> createMeeting(@RequestBody Meeting meeting) {

		return checkResult(meetingServiceImpl.createMeeting(meeting));

	}

	/**
	 * Update an existed meeting, given the meeting information.
	 * 
	 * @return 200 OK if it was successful.
	 */
	@RequestMapping(value = "/meeting/update", consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<Void> updateMeeting(@RequestBody Meeting updatedMeeting) {

		return checkResult(meetingServiceImpl.updateMeeting(updatedMeeting));

	}

	/**
	 * Save the ideas generated in the meeting.
	 * 
	 * @param ideas
	 *            all the ideas.
	 * @return 200 OK if it was successful.
	 */
	@RequestMapping(value = "/meeting/ideas/save", method = RequestMethod.POST)
	public ResponseEntity<Void> saveIdeas(@RequestBody @Valid IdeasDTO ideas) {

		return checkResult(meetingServiceImpl.savedIdeas(ideas));
	}

	private ResponseEntity<Void> checkResult(boolean flag) {
		if (flag) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Generate the standard report by the given meeting.
	 * 
	 * @param meetingId
	 *            the id of the meeting.
	 * @return 204 NO CONTENT
	 */
	@RequestMapping(value = "/meeting/report", method = RequestMethod.GET)
	public ResponseEntity<Reports> generateReport(
			@RequestParam(value = "meetingId", required = true) String meetingId) {
		Reports report = meetingServiceImpl.generateReport(meetingId);

		return new ResponseEntity<Reports>(report, HttpStatus.OK);
	}

	/**
	 * Get a list of all meetings given a username. First get all teams in which
	 * the user is a member, then get all meetings which those teams are
	 * included
	 * 
	 * @param username
	 *            the username of the user
	 * @return the list of meetings by user.
	 */
	@RequestMapping(value = "/meeting/meetingbyuser")
	public List<Meeting> getUserMeetings(@RequestParam(value = "username", required = true) String username) {
		return meetingServiceImpl.getMeetingByTeamName(username);
	}

	@RequestMapping(value = "/meeting/meetinginfo", method = RequestMethod.GET)
	public String getMeetingInfo(@RequestParam(value = "meetingId", required = true) String meetingId) {
		return meetingServiceImpl.getMeetingInfo(meetingId);
	}

	@Autowired
	private void setMeetingServiceImpl(MeetingServiceImpl meetingServiceImpl) {
		this.meetingServiceImpl = meetingServiceImpl;
	}
}
