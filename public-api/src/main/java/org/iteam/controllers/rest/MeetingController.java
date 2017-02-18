package org.iteam.controllers.rest;

import java.util.List;

import javax.validation.Valid;

import org.iteam.data.dto.Meeting;
import org.iteam.data.dto.ViewedMeeting;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.MeetingUsers;
import org.iteam.data.model.PaginationModel;
import org.iteam.services.meeting.MeetingService;
import org.iteam.services.meeting.MeetingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
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

        meetingServiceImpl.createMeeting(meeting);
        return meetingServiceImpl.createMeetingViewed(meeting) ? new ResponseEntity<Void>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Update an existed meeting, given the meeting information.
     * 
     * @return 200 OK if it was successful.
     */
    @RequestMapping(value = "/meeting/update", consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<Void> updateMeeting(@RequestBody Meeting updatedMeeting) {

        meetingServiceImpl.updateMeeting(updatedMeeting);
        meetingServiceImpl.updateMeetingViewed(updatedMeeting);

        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);

    }

    /**
     * Save the ideas generated in the meeting.
     * 
     * @param ideas
     *            all the ideas.
     * @return 200 OK if it was successful.
     */
    @RequestMapping(value = "/meeting/ideas/save", method = RequestMethod.POST)
    public ResponseEntity<Void> saveIdeas(@RequestBody @Valid IdeasDTO ideas,
            @RequestParam(value = "team", required = true) List<String> team) {

        meetingServiceImpl.generateScore(ideas, team);
        meetingServiceImpl.savedIdeas(ideas);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/meeting/meetingusers", method = RequestMethod.GET)
    public MeetingUsers getMeetingUsers(@RequestParam(value = "meetingId", required = true) String meetingId) {
        return meetingServiceImpl.getMeetingUsers(meetingId);
    }

    @RequestMapping(value = "/meeting/meetinginfo", method = RequestMethod.GET)
    public String getMeetingInfo(@RequestParam(value = "meetingId", required = true) String meetingId) {
        return meetingServiceImpl.getMeetingInfo(meetingId);
    }

    @RequestMapping(value = "/meeting/meetinginfo/byuser", method = RequestMethod.GET)
    public String getMeetingInfoByUsers(@RequestParam(value = "meetingId", required = true) String meetingId,
            @RequestParam(value = "username", required = true) String username) {
        return meetingServiceImpl.getMeetingInfoByUserPersonalBoard(meetingId, username);
    }

    @RequestMapping(value = "/meeting/usersconnection", method = RequestMethod.HEAD)
    public void setUserState(@RequestHeader(value = "username", required = true) String username,
            @RequestHeader(value = "meetingId", required = true) String meetingId) {
        meetingServiceImpl.updateMeetingUsers(meetingId, username);
    }

    @RequestMapping(value = "/meeting/programmed", method = RequestMethod.GET)
    public ResponseEntity<PaginationModel<Meeting>> getProgrammedMeetings(
            @RequestParam(value = "offset", required = true) int offset,
            @RequestParam(value = "limit", required = true) int limit) {
        PaginationModel<Meeting> meetings = meetingServiceImpl
                .getProgrammedMeetings(SecurityContextHolder.getContext().getAuthentication().getName(), offset, limit);
        return new ResponseEntity<PaginationModel<Meeting>>(meetings, HttpStatus.OK);
    }

    @RequestMapping(value = "/meeting/search/history", method = RequestMethod.GET)
    public ResponseEntity<PaginationModel<Meeting>> getEndedMeetingsByToken(
            @RequestParam(value = "token", required = true) String token,
            @RequestParam(value = "offset", required = true) int offset,
            @RequestParam(value = "limit", required = true) int limit) {
        PaginationModel<Meeting> meetings = meetingServiceImpl.getEndedMeetingsByToken(
                SecurityContextHolder.getContext().getAuthentication().getName(), token, offset, limit);
        return new ResponseEntity<PaginationModel<Meeting>>(meetings, HttpStatus.OK);
    }

    @RequestMapping(value = "/meeting/search/programmed", method = RequestMethod.GET)
    public ResponseEntity<PaginationModel<Meeting>> getProgrammedMeetingsByToken(
            @RequestParam(value = "token", required = true) String token,
            @RequestParam(value = "offset", required = true) int offset,
            @RequestParam(value = "limit", required = true) int limit) {
        PaginationModel<Meeting> meetings = meetingServiceImpl.getProgrammedMeetingsByToken(
                SecurityContextHolder.getContext().getAuthentication().getName(), token, offset, limit);
        return new ResponseEntity<PaginationModel<Meeting>>(meetings, HttpStatus.OK);
    }

    @RequestMapping(value = "/meeting/paginated", method = RequestMethod.GET)
    public ResponseEntity<PaginationModel<Meeting>> getPaginatedMeetings(
            @RequestParam(value = "offset", required = true) int offset,
            @RequestParam(value = "limit", required = true) int limit) {
        PaginationModel<Meeting> meetings = meetingServiceImpl
                .getEndedMeetings(SecurityContextHolder.getContext().getAuthentication().getName(), offset, limit);
        return new ResponseEntity<PaginationModel<Meeting>>(meetings, HttpStatus.OK);

    }

    @Autowired
    private void setMeetingServiceImpl(MeetingServiceImpl meetingServiceImpl) {
        this.meetingServiceImpl = meetingServiceImpl;
    }

    @RequestMapping(value = "/meeting/notViewed", method = RequestMethod.GET)
    public ResponseEntity<List<ViewedMeeting>> getMeetingsNotViewed() {
        List<ViewedMeeting> meetings = meetingServiceImpl
                .getMeetingsNotViewed(SecurityContextHolder.getContext().getAuthentication().getName());
        return new ResponseEntity<List<ViewedMeeting>>(meetings, HttpStatus.OK);
    }

    @RequestMapping(value = "/meeting/viewed", consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<Void> updateMeetingViewed(@RequestBody @Valid List<ViewedMeeting> meetingsViewedByUser) {
        meetingServiceImpl.updateMeetingViewedByUser(meetingsViewedByUser,
                SecurityContextHolder.getContext().getAuthentication().getName());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
