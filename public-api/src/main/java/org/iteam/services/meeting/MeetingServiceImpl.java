package org.iteam.services.meeting;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import javax.annotation.PostConstruct;

import org.iteam.data.dal.meeting.MeetingRepository;
import org.iteam.data.dal.meeting.MeetingRepositoryImpl;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.Meeting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingServiceImpl implements MeetingService {

	private MeetingRepository meetingRepositoryImpl;

	private ConcurrentMap<String, String> meetingInfo;

	@PostConstruct
	private void initialize() {
		meetingInfo = new ConcurrentHashMap<>();
	}

	@Override
	public boolean createMeeting(Meeting meeting) {
		return meetingRepositoryImpl.createMeeting(meeting);
	}

	@Override
	public boolean savedIdeas(IdeasDTO ideas) {
		return meetingRepositoryImpl.saveIdeas(ideas);
	}

	@Override
	public void generateReport(String meetingId) {
		meetingRepositoryImpl.generateBasicReport(meetingId);
	}

	@Override
	public List<Meeting> getMeetingByUser(String username) {
		return meetingRepositoryImpl.getMeetingUser(username);
	}

	@Autowired
	private void setMeetingRepositoryImpl(MeetingRepositoryImpl meetingRepositoryImpl) {
		this.meetingRepositoryImpl = meetingRepositoryImpl;
	}

	@Override
	public String getMeetingInfo(String meetingId) {
		synchronized (meetingInfo) {
			return meetingInfo.get(meetingId);
		}
	}

	@Override
	public void updateMeetingInfo(String meetingId, String info) {
		synchronized (meetingInfo) {
			meetingInfo.put(meetingId, info);
		}
	}
}
