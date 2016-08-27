package org.iteam.data.model;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class SocketMessage {

    private String payload;
	private String topic;
	private String action;

    public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
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
