package org.iteam.controllers.rest;

import java.util.List;

import javax.validation.Valid;

import org.iteam.data.dto.Meeting;
import org.iteam.data.model.D3CollapseTreeModel;
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
    public ResponseEntity<String> createMeeting(@RequestBody Meeting meeting) {

        return new ResponseEntity<String>(meetingServiceImpl.createMeeting(meeting), HttpStatus.OK);
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
    public ResponseEntity<Void> saveIdeas(@RequestBody @Valid IdeasDTO ideas,
            @RequestParam(value = "team", required = true) List<String> team) {
        meetingServiceImpl.generateScore(ideas, team);
        meetingServiceImpl.savedIdeas(ideas);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    private ResponseEntity<Void> checkResult(boolean flag) {
        if (flag) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Generate the standard report by tag and ranking for the given meeting.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param tags
     *            the list of tags for the ideas.
     * @return 204 NO CONTENT
     */
    @RequestMapping(value = "/meeting/report", method = RequestMethod.GET)
    public ResponseEntity<D3CollapseTreeModel> generateReport(
            @RequestParam(value = "meetingId", required = true) String meetingId,
            @RequestParam(value = "tags", required = true) List<String> tags) {
        D3CollapseTreeModel report = meetingServiceImpl.generateReportByRanking(meetingId, tags);

        return new ResponseEntity<D3CollapseTreeModel>(report, HttpStatus.OK);
    }

    /**
     * Generate a report by user for the given meeting.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param tags
     *            the list of tags for the ideas.
     * @return 204 NO CONTENT
     */
    @RequestMapping(value = "/meeting/report/byuser", method = RequestMethod.GET)
    public ResponseEntity<D3CollapseTreeModel> generateReportByUser(
            @RequestParam(value = "meetingId", required = true) String meetingId,
            @RequestParam(value = "tags", required = true) List<String> tags) {
        D3CollapseTreeModel report = meetingServiceImpl.generateReportByUser(meetingId, tags);

        return new ResponseEntity<D3CollapseTreeModel>(report, HttpStatus.OK);
    }

    /**
     * Generate a report by tags for the given meeting.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param tags
     *            the list of tags for the ideas.
     * @return 204 NO CONTENT
     */
    @RequestMapping(value = "/meeting/report/bytag", method = RequestMethod.GET)
    public ResponseEntity<D3CollapseTreeModel> generateReportByTag(
            @RequestParam(value = "meetingId", required = true) String meetingId,
            @RequestParam(value = "tags", required = true) List<String> tags) {
        D3CollapseTreeModel report = meetingServiceImpl.generateReportByTag(meetingId, tags);

        return new ResponseEntity<D3CollapseTreeModel>(report, HttpStatus.OK);
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
        return meetingServiceImpl.getMeetingByUser(username);
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

    @RequestMapping(value = "meeting/usersconnection", method = RequestMethod.HEAD)
    public void setUserState(@RequestHeader(value = "username", required = true) String username,
            @RequestHeader(value = "meetingId", required = true) String meetingId) {
        meetingServiceImpl.updateMeetingUsers(meetingId, username);
    }

    @RequestMapping(value = "meeting/programmed", method = RequestMethod.GET)
    public ResponseEntity<PaginationModel<Meeting>> getProgrammedMeetings(
            @RequestParam(value = "offset", required = true) int offset,
            @RequestParam(value = "limit", required = true) int limit) {
        PaginationModel<Meeting> meetings = meetingServiceImpl
                .getProgrammedMeetings(SecurityContextHolder.getContext().getAuthentication().getName(), offset, limit);
        return new ResponseEntity<PaginationModel<Meeting>>(meetings, HttpStatus.OK);
    }

    @RequestMapping(value = "meeting/search/history", method = RequestMethod.GET)
    public ResponseEntity<PaginationModel<Meeting>> getEndedMeetingsByToken(
            @RequestParam(value = "token", required = true) String token,
            @RequestParam(value = "offset", required = true) int offset,
            @RequestParam(value = "limit", required = true) int limit) {
        PaginationModel<Meeting> meetings = meetingServiceImpl.getEndedMeetingsByToken(
                SecurityContextHolder.getContext().getAuthentication().getName(), token, offset, limit);
        return new ResponseEntity<PaginationModel<Meeting>>(meetings, HttpStatus.OK);
    }

    @RequestMapping(value = "meeting/search/programmed", method = RequestMethod.GET)
    public ResponseEntity<PaginationModel<Meeting>> getProgrammedMeetingsByToken(
            @RequestParam(value = "token", required = true) String token,
            @RequestParam(value = "offset", required = true) int offset,
            @RequestParam(value = "limit", required = true) int limit) {
        PaginationModel<Meeting> meetings = meetingServiceImpl.getProgrammedMeetingsByToken(
                SecurityContextHolder.getContext().getAuthentication().getName(), token, offset, limit);
        return new ResponseEntity<PaginationModel<Meeting>>(meetings, HttpStatus.OK);
    }

    @RequestMapping(value = "meeting/paginated", method = RequestMethod.GET)
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
}
