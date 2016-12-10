package org.iteam.data.model;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class MeetingUsers {

    private List<String> users;

    public MeetingUsers() {
        this.users = new ArrayList<>();
    }

    public List<String> getUsers() {
        return users;
    }

    public void setUsers(List<String> users) {
        this.users = users;
    }

    public void addUser(String user) {
        users.add(user);
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

}
