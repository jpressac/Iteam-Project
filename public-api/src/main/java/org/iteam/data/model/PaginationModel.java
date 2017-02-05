package org.iteam.data.model;

import java.util.List;

import org.iteam.data.dto.Meeting;

public class PaginationModel {

    public PaginationModel(long total, List<Meeting> meetings) {

        this.total = total;
        this.meetings = meetings;
    }

    private long total;
    private List<Meeting> meetings;

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public List<Meeting> getMeetings() {
        return meetings;
    }

    public void setMeetings(List<Meeting> meetings) {
        this.meetings = meetings;
    }

}
