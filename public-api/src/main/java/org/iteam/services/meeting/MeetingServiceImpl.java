package org.iteam.services.meeting;

import org.iteam.data.dal.meeting.MeetingRepository;
import org.iteam.data.dal.meeting.MeetingRepositoryImpl;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.Meeting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingServiceImpl implements MeetingService {

	private MeetingRepository meetingRepositoryImpl;

	@Override
	public boolean createMeeting(Meeting meeting) {
		return meetingRepositoryImpl.createMeeting(meeting);
	}

	@Override
	public boolean savedIdeas(IdeasDTO ideas) {
		return meetingRepositoryImpl.saveIdeas(ideas);
	}

	@Autowired
	private void setMeetingRepositoryImpl(MeetingRepositoryImpl meetingRepositoryImpl) {
		this.meetingRepositoryImpl = meetingRepositoryImpl;
	}

	@Override
	public void generateReport(String meetingId) {
		meetingRepositoryImpl.generateBasicReport(meetingId);
	}
}
