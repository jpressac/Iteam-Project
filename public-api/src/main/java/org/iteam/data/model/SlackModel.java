package org.iteam.data.model;

import java.util.List;

public class SlackModel {

    private List<String> usersInSlack;
    private List<String> usersWithoutSlack;

    public SlackModel(List<String> slackUsers, List<String> slackWithoutUsers) {
        this.usersInSlack = slackUsers;
        this.usersWithoutSlack = slackWithoutUsers;
    }

    public List<String> getUsersInSlack() {
        return usersInSlack;
    }

    public void setUsersInSlack(List<String> usersInSlack) {
        this.usersInSlack = usersInSlack;
    }

    public List<String> getUsersWithoutSlack() {
        return usersWithoutSlack;
    }

    public void setUsersWithoutSlack(List<String> usersWithoutSlack) {
        this.usersWithoutSlack = usersWithoutSlack;
    }

}
