package org.iteam.data.model;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.iteam.data.dto.chatPayload;

public class ChatMessage {

    private String topic;
    private chatPayload payload;

    public chatPayload getPayload() {
        return payload;
    }

    public void setPayload(chatPayload payload) {
        this.payload = payload;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

}
