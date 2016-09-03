package org.iteam.data.model;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Meeting {

    private String topic;
    private String meetingId;
    // private String creationDate;
    private String programmedDate;
    private String ownerName;
    private Team teamAssistant;

    public String getOwnerName() {
        return ownerName;
    }

    public String getProgrammedDate() {
        return programmedDate;
    }

    public void setProgrammedDate(String programmedDate) {
        this.programmedDate = programmedDate;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public String getMeetingId() {
        return meetingId;
    }

    public void setMeetingId(String meetingId) {
        this.meetingId = meetingId;
    }

    public Team getTeamAssistant() {
        return teamAssistant;
    }

    public void setTeamAssistant(Team teamAssistant) {
        this.teamAssistant = teamAssistant;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
