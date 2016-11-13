package org.iteam.data.model;

import java.util.List;

import org.iteam.data.dto.UserDTO;

/**
 * Represents the information about the users of a particular team.
 *
 */
public class TeamUserModel {

    private String teamId;
    private List<UserDTO> teamUsers;

    public String getTeamId() {
        return teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    public List<UserDTO> getTeamUsers() {
        return teamUsers;
    }

    public void setTeamUsers(List<UserDTO> teamUsers) {
        this.teamUsers = teamUsers;
    }
}
