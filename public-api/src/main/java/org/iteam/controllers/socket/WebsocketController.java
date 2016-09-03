package org.iteam.controllers.socket;

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
        if(message.getMessage().getAction().equals("updateCache")) {
            meetingService.updateMeetingInfo(message.getTopic(), message.getMessage().getPayload());
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
