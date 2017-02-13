package org.iteam.data.model;

import java.util.List;

public class TeamPaginationModel {

    public TeamPaginationModel(long total, List<TeamModel> teams) {

        this.total = total;
        this.teams = teams;
    }

    private long total;
    private List<TeamModel> teams;

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public List<TeamModel> getMeetings() {
        return teams;
    }

    public void setMeetings(List<TeamModel> teams) {
        this.teams = teams;
    }

}
