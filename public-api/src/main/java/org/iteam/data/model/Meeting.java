package org.iteam.data.model;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Meeting {

    private String creationDate;
    private String programmedDate;
    private String ownerName;
    private Team teamAssistant;

    public String getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(String creationDate) {
        this.creationDate = creationDate;
    }

    public String getProgrammedDate() {
        return programmedDate;
    }

    public void setProgrammedDate(String programmedDate) {
        this.programmedDate = programmedDate;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
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
