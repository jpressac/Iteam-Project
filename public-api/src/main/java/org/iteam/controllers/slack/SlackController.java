package org.iteam.controllers.slack;

import javax.validation.Valid;

import org.iteam.data.dto.Meeting;
import org.iteam.data.model.SlackModel;
import org.iteam.services.slack.SlackServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SlackController {

    private SlackServiceImpl slackService;

    @RequestMapping(value = "/slack/createchannel", method = RequestMethod.GET)
    public ResponseEntity<Void> createSlackChannel(@RequestParam(value = "meetingId") String meetingId) {
        slackService.createMeetingChannel(meetingId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/slack/post/message", method = RequestMethod.GET)
    public ResponseEntity<Void> postMessageToChannel(@RequestParam(value = "channelName") String channelName,
            @RequestParam(value = "message") String message,
            @RequestParam(value = "remark", defaultValue = "false") Boolean remark,
            @RequestParam(value = "title", defaultValue = "Slack message") String title,
            @RequestParam(value = "description", defaultValue = "Description") String description) {

        slackService.postMesageToChannel(channelName, message, title, description, remark);

        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/slack/teamusers", method = RequestMethod.GET)
    public ResponseEntity<SlackModel> getTeamUsers(@RequestParam(value = "teamId") String teamId) {
        return new ResponseEntity<SlackModel>(slackService.getTeamUsers(teamId), HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/slack/channelinvite", method = RequestMethod.GET)
    public ResponseEntity<Void> inviteToChannel(@RequestParam(value = "userId", required = true) String userId,
            @RequestParam(value = "channelName", required = true) String channelName,
            @RequestParam(value = "teamId", required = true) String teamId) {
        slackService.inviteUserToChannel(channelName, userId);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/slack/group", method = RequestMethod.POST)
    public ResponseEntity<Void> addUserToSlack(@RequestParam(value = "email") String email) {
        slackService.addUserToSlackGroup(email);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/slack/ismember", method = RequestMethod.GET)
    public ResponseEntity<Boolean> isGroupMember(@RequestParam(value = "email") String email) {
        return new ResponseEntity<Boolean>(slackService.isTeamMember(email), HttpStatus.NO_CONTENT);
    }

    @RequestMapping(value = "/slack/inviteusers", method = RequestMethod.POST)
    public ResponseEntity<Void> inviteUsersToMeetingChannel(@RequestBody @Valid Meeting meeting,
            @RequestParam(value = "teamId", required = true) String teamId) {
        slackService.inviteUsersToChannel(meeting, teamId);
        return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
    }

    @Autowired
    private void setSlackService(SlackServiceImpl slackService) {
        this.slackService = slackService;
    }

}
