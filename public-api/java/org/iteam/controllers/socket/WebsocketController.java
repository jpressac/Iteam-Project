package org.iteam.controllers.socket;

import org.iteam.data.dto.ActionsEnum;
import org.iteam.data.dto.Meeting;
import org.iteam.data.model.SocketMessage;
import org.iteam.services.meeting.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 * Controller for handling the webSocket channels.
 *
 */
@Controller
public class WebsocketController {

    private SimpMessagingTemplate template;

    private MeetingService meetingService;

    /**
     * One specific channel for webSocket. The message has the id of the
     * topic/channel that will be listening the subscriber.
     * 
     * @param message
     *            the message that will be sent to the topic
     */
    @MessageMapping("/channel")
    // TODO:remove channelId
    public void sendMessage(String channelId, SocketMessage message) {

        ActionsEnum action = ActionsEnum.toActionName(message.getMessage().getAction());
        String payload = message.getMessage().getPayload();

        switch (action) {

        case INSERT_SHARED_BOARD:
            meetingService.updateMeetingInfo(message.getTopic(), payload);
            break;
        case USER_CONNECTED:
            meetingService.updateMeetingUsers(message.getTopic(), payload);
            break;
        case INSERT_CACHE:
            meetingService.saveMeetingInfoPersonalBoard(message.getTopic(), payload);
            break;
        case UPDATE_SHARED_BOARD_CACHE:
            meetingService.saveMeetingInfoPersonalBoard(message.getTopic(), payload);
            break;
        case UPDATE_DELETE_CACHE:
            meetingService.removeIdeasFromCacheSharedBoard(message.getTopic(), payload);
            break;
        case END_MEETING:
            meetingService.updateMeeting(new Meeting(message.getTopic(), true));
            break;
        default:
            break;
        }

        template.convertAndSend("/topic/" + message.getTopic(), message.getMessage());

    }

    @Autowired
    private void setTemplate(SimpMessagingTemplate template) {
        this.template = template;
    }

    @Autowired
    private void setMeetingService(MeetingService meetingService) {
        this.meetingService = meetingService;
    }

}
