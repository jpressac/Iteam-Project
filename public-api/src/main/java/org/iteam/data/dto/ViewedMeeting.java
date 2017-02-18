package org.iteam.data.dto;

import java.util.HashSet;
import java.util.Set;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class ViewedMeeting {

    private Set<String> users;
    private String meetingId;
    private Long time;
    private String meetingTopic;

    @JsonInclude(Include.NON_ABSENT)
    private Set<String> viewedUsers;

    public ViewedMeeting() {
        this.viewedUsers = new HashSet<>();
        this.users = new HashSet<>();
    }

    public Set<String> getUsers() {
        return users;
    }

    public void setUsers(Set<String> users) {
        this.users = users;
    }

    public Set<String> getViewedUsers() {
        return viewedUsers;
    }

    public void setViewedUsers(Set<String> viewedUsers) {
        this.viewedUsers = viewedUsers;
    }

    public String getMeetingTopic() {
        return meetingTopic;
    }

    public void setMeetingTopic(String meetingTopic) {
        this.meetingTopic = meetingTopic;
    }

    public String getMeetingId() {
        return meetingId;
    }

    public void setMeetingId(String meetingId) {
        this.meetingId = meetingId;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
