package org.iteam.data.dto;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class chatPayload {

    private String user;
    private String text;

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
