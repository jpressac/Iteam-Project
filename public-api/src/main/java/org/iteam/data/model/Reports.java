package org.iteam.data.model;

import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.iteam.data.dto.Idea;

public class Reports {

	private String topic;
	private String description;
	private List<Idea> ideas;

	public Reports(String topic, String description, List<Idea> ideas) {
		this.topic = topic;
		this.description = description;
		this.ideas = ideas;
	}

	public String getTopic() {
		return topic;
	}

	public void setTopic(String topic) {
		this.topic = topic;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<Idea> getIdeas() {
		return ideas;
	}

	public void setIdeas(List<Idea> ideas) {
		this.ideas = ideas;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
}
