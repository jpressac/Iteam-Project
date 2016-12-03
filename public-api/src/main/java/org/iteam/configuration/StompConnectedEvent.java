package org.iteam.configuration;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;

@Component
public class StompConnectedEvent implements ApplicationListener<SessionConnectedEvent> {

    private final Log logger = LogFactory.getLog(StompConnectedEvent.class);

    @EventListener
    @Override
    public void onApplicationEvent(SessionConnectedEvent event) {
        StompHeaderAccessor sha = StompHeaderAccessor.wrap(event.getMessage());

        String user = sha.getUser().getName();
        String meetingId = sha.getDestination();
        logger.info("User connected " + user);
        logger.info("Meeting id" + meetingId);
    }

}
