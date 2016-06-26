package org.iteam.data.model;

import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * Minimum meeting representation
 *
 */
public class InfoMeeting {

	private String meetingId;
	private String programDate;
	private String topic;
	private Team team;
	private String description;

	public InfoMeeting() {

	}

	public InfoMeeting(String meetingId, String programDate, String topic, Team team, String description) {
		super();
		this.meetingId = meetingId;
		this.programDate = programDate;
		this.topic = topic;
		this.team = team;
		this.description = description;
	}

	public String getProgramDate() {
		return programDate;
	}

	public void setProgramDate(String programDate) {
		this.programDate = programDate;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public Team getTeam() {
		return team;
	}

	public void setTeam(Team team) {
		this.team = team;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMeetingId() {
		return meetingId;
	}

	public void setMeetingId(String meetingId) {
		this.meetingId = meetingId;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

}
