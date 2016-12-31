package org.iteam.data.model;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class SocketMessage {

    private String topic;
    private SocketPayload message;
    

    public SocketPayload getMessage() {
        return message;
    }

    public void setMessage(SocketPayload message) {
        this.message = message;
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
