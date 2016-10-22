package org.iteam.data.model;

import org.iteam.data.dto.Team;

/**
 * Model representation for a Team.
 *
 */
public class TeamModel {

    private String teamId;
    private Team team;

    public TeamModel(String teamId, Team team) {
        this.teamId = teamId;
        this.team = team;
    }

    public String getTeamId() {
        return teamId;
    }

    public void setTeamId(String teamId) {
        this.teamId = teamId;
    }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

}
