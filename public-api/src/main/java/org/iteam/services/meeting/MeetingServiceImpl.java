package org.iteam.services.meeting;

import java.util.List;
import java.util.stream.Collectors;

import org.iteam.data.dal.meeting.MeetingRepository;
import org.iteam.data.dal.meeting.MeetingRepositoryImpl;
import org.iteam.data.dto.Meeting;
import org.iteam.data.dto.UserDTO;
import org.iteam.data.model.D3CollapseTreeModel;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.MeetingUsers;
import org.iteam.data.model.PaginationModel;
import org.iteam.services.team.TeamService;
import org.iteam.services.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingServiceImpl implements MeetingService {

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
    public List<Meeting> getMeetingByUser(String username) {
        return meetingRepositoryImpl.getMeetingUser(username);
    }

    @Override
    public List<Meeting> getMeetingByTeamName(String username, int size, int from) {
        List<String> teamName = teamServiceImpl.getTeamByUser(username, size, from);
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

    @Override
    public PaginationModel<Meeting> getProgrammedMeetings(String username, int offset, int limit) {
        return meetingRepositoryImpl.getProgrammedMeetings(username, offset, limit);
    }

    @Override
    public PaginationModel<Meeting> getEndedMeetingsByToken(String username, String token, int offset, int limit) {
        return this.meetingRepositoryImpl.getEndedMeetingByToken(username, token, offset, limit);
    }

    @Override
    public PaginationModel<Meeting> getProgrammedMeetingsByToken(String name, String token, int offset, int limit) {
        return this.meetingRepositoryImpl.getProgrammedMeetingsByToken(name, token, offset, limit);
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
    public PaginationModel<Meeting> getEndedMeetings(String username, int offset, int limit) {
        return meetingRepositoryImpl.getEndedMeetings(username, offset, limit);
    }

}
