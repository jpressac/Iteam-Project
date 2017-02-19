package org.iteam.data.dto;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class Meeting {

    private String topic;
    private String meetingId;
    private Long creationDate;
    private Long programmedDate;
    private Long endDate;
    private Boolean ended;
    private String ownerName;
    private String teamName;
    private String description;
    private MeetingConfigDTO meetingConfig;
    private boolean useSlack = false;

    public Meeting() {
    }

    public Meeting(String id, boolean ended) {
        this.meetingId = id;
        this.ended = ended;
    }

    public boolean isUseSlack() {
        return useSlack;
    }

    public void setUseSlack(boolean useSlack) {
        this.useSlack = useSlack;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public Long getProgrammedDate() {
        return programmedDate;
    }

    public Long getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Long creationDate) {
        this.creationDate = creationDate;
    }

    public void setProgrammedDate(Long programmedDate) {
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

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public MeetingConfigDTO getMeetingConfig() {
        return meetingConfig;
    }

    public void setMeetingConfig(MeetingConfigDTO meetingConfig) {
        this.meetingConfig = meetingConfig;
    }

    public Long getEndDate() {
        return endDate;
    }

    public void setEndDate(Long endDate) {
        this.endDate = endDate;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    public Boolean getEnded() {
        return ended;
    }

    public void setEnded(Boolean ended) {
        this.ended = ended;
    }

}
