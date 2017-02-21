package org.iteam.services.meeting;

import java.util.List;

import org.iteam.data.dal.meeting.MeetingRepository;
import org.iteam.data.dal.meeting.MeetingRepositoryImpl;
import org.iteam.data.dto.Meeting;
import org.iteam.data.dto.ViewedMeeting;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.MeetingUsers;
import org.iteam.data.model.PaginationModel;
import org.iteam.services.slack.SlackService;
import org.iteam.services.team.TeamService;
import org.iteam.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingServiceImpl implements MeetingService {

    private MeetingRepository meetingRepositoryImpl;
    private TeamService teamServiceImpl;
    private UserService userServiceImpl;
    private SlackService slackService;

    @Override
    public boolean createMeeting(Meeting meeting) {
        if (meeting.isUseSlack()) {
            slackService.inviteUsersToChannel(meeting.getTeamName(), meeting.getTopic());
        }
        return meetingRepositoryImpl.createMeeting(meeting);
    }

    @Override
    public void updateMeeting(Meeting updatedMeeting) {
        meetingRepositoryImpl.updateMeeting(updatedMeeting);
    }

    @Override
    public void savedIdeas(IdeasDTO ideas) {
        meetingRepositoryImpl.saveIdeas(ideas);
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
        return meetingRepositoryImpl.getMeetingsByToken(username, null, offset, limit, false);
    }

    @Override
    public PaginationModel<Meeting> getEndedMeetingsByToken(String username, String token, int offset, int limit) {
        return this.meetingRepositoryImpl.getMeetingsByToken(username, token, offset, limit, true);
    }

    @Override
    public PaginationModel<Meeting> getProgrammedMeetingsByToken(String name, String token, int offset, int limit) {
        return this.meetingRepositoryImpl.getMeetingsByToken(name, token, offset, limit, false);
    }

    @Override
    public void generateScore(IdeasDTO ideas, List<String> usersList) {
        userServiceImpl.generateScore(ideas, usersList);
    }

    @Override
    public PaginationModel<Meeting> getEndedMeetings(String username, int offset, int limit) {
        return meetingRepositoryImpl.getMeetingsByToken(username, offset, limit, true);
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

    @Override
    public void updateMeetingViewed(Meeting updatedMeeting) {
        this.meetingRepositoryImpl.updateMeetingViewed(updatedMeeting);
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

    @Autowired
    private void setSlackServiceImpl(SlackService slackServiceImpl) {
        this.slackService = slackServiceImpl;
    }
}
