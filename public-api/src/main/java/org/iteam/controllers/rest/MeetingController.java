package org.iteam.controllers.rest;

import javax.validation.Valid;

import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.Meeting;
import org.iteam.services.meeting.MeetingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for handling all meeting request.
 *
 */
@RestController
public class MeetingController {

    private MeetingServiceImpl meetingServiceImpl;

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
     * Save the ideas generated in the meeting.
     * 
     * @param ideas
     *            all the ideas.
     * @return 200 OK if it was successful
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

    @Autowired
    private void setMeetingServiceImpl(MeetingServiceImpl meetingServiceImpl) {
        this.meetingServiceImpl = meetingServiceImpl;
    }

}
