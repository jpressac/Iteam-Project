package org.iteam.data.dto;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class SocketPayload {

    private String payload;
    private String action;

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

}
