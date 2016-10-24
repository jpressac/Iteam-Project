package org.iteam.services.meeting;

import java.util.List;

import org.iteam.data.dal.meeting.MeetingRepository;
import org.iteam.data.dal.meeting.MeetingRepositoryImpl;
import org.iteam.data.dto.Meeting;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.Meeting;
import org.iteam.data.model.Reports;
import org.iteam.exceptions.MeetingInfoNotFoundException;
import org.iteam.services.team.TeamService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingServiceImpl implements MeetingService {

    private static final Logger LOGGER = LoggerFactory.getLogger(MeetingServiceImpl.class);

    private MeetingRepository meetingRepositoryImpl;
    private TeamService teamServiceImpl;

    @Override
    public boolean createMeeting(Meeting meeting) {
        return meetingRepositoryImpl.createMeeting(meeting);
    }

    @Override
    public boolean updateMeeting(Meeting updatedMeeting) {
        return meetingRepositoryImpl.updateMeeting(updatedMeeting);
    }

    @Override
    public boolean savedIdeas(IdeasDTO ideas) {
        return meetingRepositoryImpl.saveIdeas(ideas);
    }

    @Override
    public Reports generateReport(String meetingId) {
        return meetingRepositoryImpl.generateBasicReport(meetingId);
    }

    @Override
    public List<Meeting> getMeetingByUser(String username) {
        return meetingRepositoryImpl.getMeetingUser(username);
    }

    @Override
    public List<Meeting> getMeetingByTeamName(String username) {
        List<String> teamName = teamServiceImpl.getTeamByUser(username);
        return meetingRepositoryImpl.getMeetingByTeamName(teamName);
    }

    @Override
    public String getMeetingInfo(String meetingId) {

        String result = meetingRepositoryImpl.getMeetingInfo(meetingId);
        if(result == null) {
            LOGGER.error("Error when retrieving meeting info of meeting '{}'", meetingId);
            throw new MeetingInfoNotFoundException("Error when retrieving meeting info");
        }
        return result;

    }

    @Override
    public void updateMeetingInfo(String meetingId, String info) {
        meetingRepositoryImpl.saveMeetingInfo(info, meetingId);
    }

    @Autowired
    private void setMeetingRepositoryImpl(MeetingRepositoryImpl meetingRepositoryImpl) {
        this.meetingRepositoryImpl = meetingRepositoryImpl;
    }

    @Autowired
    private void setTeamServiceImpl(TeamService teamServiceImpl) {
        this.teamServiceImpl = teamServiceImpl;
    }
}
