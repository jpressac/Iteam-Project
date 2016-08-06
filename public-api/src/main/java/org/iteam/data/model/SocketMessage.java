package org.iteam.data.model;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class SocketMessage {

    private String channel;
    private String payload;

    public String getChannel() {
        return channel;
    }

    public void setChannel(String channel) {
        this.channel = channel;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
