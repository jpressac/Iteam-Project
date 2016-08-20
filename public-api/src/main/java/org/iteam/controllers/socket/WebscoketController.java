package org.iteam.controllers.socket;

import org.iteam.data.model.SocketMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 * Controller for handling the webSocket channels.
 *
 */
@Controller
public class WebscoketController {

    private SimpMessagingTemplate template;

    /**
     * One specific channel for webSocket. The message has the id of the
     * topic/channel that will be listen the subscriber.
     * 
     * @param message
     *            the message that will be send to the topic
     */
    @MessageMapping("/channel")
    public void sendMessage(String channelId, SocketMessage message) {
        template.convertAndSend("/topic/" + message.getChannel(), message.getPayload());
    }

    @Autowired
    private void setTemplate(SimpMessagingTemplate template) {
        this.template = template;
    }
}
