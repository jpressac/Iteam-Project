package org.iteam.controllers.socket;

import org.iteam.data.model.SocketMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class WebscoketController {

    private SimpMessagingTemplate template;

    @MessageMapping("/channel/{channelId}")
    public void sendMessage(@DestinationVariable(value = "channelId") String channelId, SocketMessage message) {
        template.convertAndSend("/topic/" + message.getChannel(), message.getPayload());
    }

    @Autowired
    private void setTemplate(SimpMessagingTemplate template) {
        this.template = template;
    }
}
