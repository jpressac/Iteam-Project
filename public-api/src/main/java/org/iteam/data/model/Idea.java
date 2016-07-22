package org.iteam.data.model;

import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Idea {

	private String username;
	private String content;
	private List<String> comments;
	private Integer ranking;
	private String reunionId;

	// TODO: check what is better, where do we store the images, in the database
	// or file-system.
	@JsonIgnore
	private List<byte[]> attachments;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public List<String> getComments() {
		return comments;
	}

	public void setComments(List<String> comments) {
		this.comments = comments;
	}

	public Integer getRanking() {
		return ranking;
	}

	public void setRanking(Integer ranking) {
		this.ranking = ranking;
	}

	public List<byte[]> getAttachments() {
		return attachments;
	}

	public void setAttachments(List<byte[]> attachments) {
		this.attachments = attachments;
	}

	public String getReunionId() {
		return reunionId;
	}

	public void setReunionId(String reunionId) {
		this.reunionId = reunionId;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
}
