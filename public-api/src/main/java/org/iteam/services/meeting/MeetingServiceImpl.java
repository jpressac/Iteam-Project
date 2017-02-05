package org.iteam.services.meeting;

import java.util.List;
import java.util.stream.Collectors;

import org.iteam.data.dal.meeting.MeetingRepository;
import org.iteam.data.dal.meeting.MeetingRepositoryImpl;
import org.iteam.data.dto.Meeting;
import org.iteam.data.dto.UserDTO;
import org.iteam.data.dto.ViewedMeeting;
import org.iteam.data.model.D3CollapseTreeModel;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.MeetingUsers;
import org.iteam.services.team.TeamService;
import org.iteam.services.user.UserService;
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
    private UserService userServiceImpl;

    @Override
    public boolean createMeeting(Meeting meeting) {
        return meetingRepositoryImpl.createMeeting(meeting);
    }

    @Override
    public boolean updateMeeting(Meeting updatedMeeting) {
        return meetingRepositoryImpl.updateMeeting(updatedMeeting);
    }

    @Override
    public void savedIdeas(IdeasDTO ideas) {
        meetingRepositoryImpl.saveIdeas(ideas);
    }

    @Override
    public D3CollapseTreeModel generateReportByRanking(String meetingId, List<String> tags) {
        return meetingRepositoryImpl.generateBasicReportByRanking(meetingId, tags);
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
        return meetingRepositoryImpl.getMeetingInfo(meetingId);
    }

    @Override
    public void updateMeetingInfo(String meetingId, String info) {
        meetingRepositoryImpl.saveMeetingInfo(info, meetingId);
    }

    @Override
    public void updateMeetingUsers(String meetingId, String users) {
        meetingRepositoryImpl.saveMeetingUsers(users, meetingId);
    }

    @Override
    public List<Meeting> getMeetingByState(String username) {
        return meetingRepositoryImpl.getMeetingsByState(username);
    }

    @Override
    public D3CollapseTreeModel generateReportByUser(String meetingId, List<String> tags) {

        List<String> users = teamServiceImpl.getTeamUserInformationByMeeting(meetingId).getTeamUsers().stream()
                .map(UserDTO::getUsername).collect(Collectors.toList());

        return meetingRepositoryImpl.generateBasicReportByUser(meetingId, users, tags);
    }

    // TODO: wrap the method into one generic
    @Override
    public D3CollapseTreeModel generateReportByTag(String meetingId, List<String> tags) {
        return meetingRepositoryImpl.generateBasicReportByTag(meetingId, tags);
    }

    @Override
    public void saveMeetingInfoPersonalBoard(String meetingId, String info) {
        meetingRepositoryImpl.saveMeetingInfoByUserPersonalBoard(meetingId, info);
    }

    @Override
    public String getMeetingInfoByUserPersonalBoard(String meetingId, String username) {
        return meetingRepositoryImpl.getMeetingInfoByUserPersonalBoard(meetingId, username);

    }

    @Override
    public MeetingUsers getMeetingUsers(String meetingId) {
        return meetingRepositoryImpl.getConnectedUsers(meetingId);
    }

    @Override
    public void removeIdeasFromCachePersonalBoard(String meetingId, String info) {
        meetingRepositoryImpl.removeIdeaFromCachePersonalBoard(meetingId, info);
    }

    @Override
    public void updateSharedBoardCache(String meetingId, String info) {
        meetingRepositoryImpl.updateSharedBoardCache(meetingId, info);
    }

    @Override
    public void removeIdeasFromCacheSharedBoard(String meetingId, String id) {
        meetingRepositoryImpl.removeIdeasFromCacheSharedBoard(meetingId, id);
    }

    @Autowired
    private void setMeetingRepositoryImpl(MeetingRepositoryImpl meetingRepositoryImpl) {
        this.meetingRepositoryImpl = meetingRepositoryImpl;
    }

    @Autowired
    private void setTeamServiceImpl(TeamService teamServiceImpl) {
        this.teamServiceImpl = teamServiceImpl;
    }

    @Autowired
    private void setUserServiceImpl(UserService userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    @Override
    public void generateScore(IdeasDTO ideas, List<String> usersList) {
        userServiceImpl.generateScore(ideas, usersList);
    }

    @Override
    public boolean createMeetingViewed(Meeting meeting) {
        return this.meetingRepositoryImpl.createMeetingViewed(meeting);
    }

    @Override
    public List<ViewedMeeting> getMeetingsNotViewed(String username) {
        return this.meetingRepositoryImpl.getMeetingsNotViewed(username);
    }

    @Override
    public void updateMeetingViewedByUser(List<ViewedMeeting> meetingsViewedByUser, String username) {
        this.meetingRepositoryImpl.updateMeetingViewedByUser(meetingsViewedByUser, username);
    }
}
