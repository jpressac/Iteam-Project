package org.iteam.services.meeting;

import java.util.List;

import org.iteam.data.dal.meeting.MeetingRepository;
import org.iteam.data.dal.meeting.MeetingRepositoryImpl;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.Meeting;
import org.iteam.exceptions.MeetingInfoNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingServiceImpl implements MeetingService {

	private static final Logger LOGGER = LoggerFactory.getLogger(MeetingServiceImpl.class);
	private MeetingRepository meetingRepositoryImpl;

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

		String result = meetingRepositoryImpl.getMeetingInfo(meetingId);
		if (result == null) {
			LOGGER.error("Error when retrieving meeting info of meeting '{}'", meetingId);
			throw new MeetingInfoNotFoundException("Error when retrieving meeting info");
		}
		return result;

	}

	@Override
	public void updateMeetingInfo(String meetingId, String info) {
		meetingRepositoryImpl.saveMeetingInfo(info, meetingId);

	}
}
