package org.iteam.controllers.slack;

import org.iteam.data.model.SlackModel;
import org.iteam.services.slack.SlackServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SlackController {

    private SlackServiceImpl slackService;
    // private static String TOKEN =
    // "xoxp-42952114835-44793745938-139712933216-c558a1777b26f523bfb8fda50b404de8";
    private static String BOT_TOKEN = "xoxb-141135744790-P7NOxQkNferYDZnZUAvF7M7W";
    private static String APP_TOKEN = "xoxp-140386445603-141146385335-141139898470-d07c0391cc828de808c1ca6832f0dbd8";

    @RequestMapping(value = "slack/createchannel", method = RequestMethod.GET)
    public ResponseEntity<Void> createSlackChannel(@RequestParam(value = "meetingId") String meetingId) {
        slackService.createMeetingChannel(meetingId, APP_TOKEN);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @RequestMapping(value = "slack/sendmessage", method = RequestMethod.POST)
    public ResponseEntity<Void> sendMessageToChannel(
            @RequestParam(value = "meetingTopic", required = true) String meetingTopic,
            @RequestParam(value = "message") String message) {
        slackService.postMesageToChannel(meetingTopic, BOT_TOKEN, message);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @RequestMapping(value = "slack/teamusers", method = RequestMethod.GET)
    public ResponseEntity<SlackModel> getTeamUsers(@RequestParam(value = "teamId") String teamId) {
        return new ResponseEntity<SlackModel>(slackService.getTeamUsers(APP_TOKEN, teamId), HttpStatus.OK);
    }

    @RequestMapping(value = "slack/channelinvite", method = RequestMethod.GET)
    public ResponseEntity<Void> inviteToChannel(@RequestParam(value = "userId", required = true) String userId,
            @RequestParam(value = "channelName", required = true) String channelName,
            @RequestParam(value = "teamId", required = true) String teamId) {
        slackService.inviteUserToChannel(channelName, userId, APP_TOKEN);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @RequestMapping(value = "slack/group", method = RequestMethod.POST)
    public ResponseEntity<Void> addUserToSlack(@RequestParam(value = "email") String email) {
        slackService.addUserToSlackGroup(APP_TOKEN, email);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @RequestMapping(value = "slack/ismember", method = RequestMethod.GET)
    public ResponseEntity<Boolean> isGroupMember(@RequestParam(value = "email") String email) {
        return new ResponseEntity<Boolean>(slackService.isTeamMember(email, APP_TOKEN), HttpStatus.OK);
    }

    @RequestMapping(value = "slack/inviteusers", method = RequestMethod.POST)
    public ResponseEntity<Void> inviteUsersToMeetingChannel(
            @RequestParam(value = "meetingTopic", required = true) String meetingTopic,
            @RequestParam(value = "teamId", required = true) String teamId) {
        slackService.inviteUsersToChannel(teamId, meetingTopic);
        return new ResponseEntity<Void>(HttpStatus.OK);
    }

    @Autowired
    private void setSlackService(SlackServiceImpl slackService) {
        this.slackService = slackService;
    }

}
