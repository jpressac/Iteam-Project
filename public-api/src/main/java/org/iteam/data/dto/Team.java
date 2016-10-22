package org.iteam.data.dto;

import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class Team {

    private String ownerName;
    private Long creationDate;
    private String name;
    private List<String> members;

    public Team() {

    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public Long getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Long creationDate) {
        this.creationDate = creationDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getMembers() {
        return members;
    }

    public void setMembers(List<String> members) {
        this.members = members;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
