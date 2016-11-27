package org.iteam.services.meeting;

import java.util.List;

import org.elasticsearch.search.sort.SortOrder;
import org.iteam.data.dal.meeting.MeetingRepository;
import org.iteam.data.dal.meeting.MeetingRepositoryImpl;
import org.iteam.data.dto.Meeting;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.MeetingUsers;
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
    private static final String RANKING_ID_FIELD = "ranking";

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
        return meetingRepositoryImpl.generateBasicReport(meetingId, RANKING_ID_FIELD, SortOrder.ASC);
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

    @Override
    public void updateMeetingUsers(String meetingId, String users) {
        meetingRepositoryImpl.saveMeetingUsers(users, meetingId);
    }

    @Autowired
    private void setMeetingRepositoryImpl(MeetingRepositoryImpl meetingRepositoryImpl) {
        this.meetingRepositoryImpl = meetingRepositoryImpl;
    }

    @Autowired
    private void setTeamServiceImpl(TeamService teamServiceImpl) {
        this.teamServiceImpl = teamServiceImpl;
    }

    @Override
    public Reports generateReportByUser(String meetingId) {
        return meetingRepositoryImpl.generateBasicReportByUser(meetingId);
    }

    @Override
    public Reports generateReportByTag(String meetingId) {
        return meetingRepositoryImpl.generateBasicReportByTag(meetingId);
    }

    @Override
    public void saveMeetingInfoPB(String meetingId, String info) {
        meetingRepositoryImpl.saveMeetingInfoPBByUser(meetingId, info);
    }

    @Override
    public String getMeetingInfoByUserPB(String meetingId, String username) {
        return meetingRepositoryImpl.getMeetingInfoByUserPB(meetingId, username);

    }

    @Override
    public MeetingUsers getMeetingUsers(String meetingId) {
        return meetingRepositoryImpl.getConnectedUsers(meetingId);
    }
}
