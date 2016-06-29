package org.iteam.services.meeting;

import org.iteam.data.dal.meeting.MeetingRepositoryImpl;
import org.iteam.data.model.InfoMeeting;
import org.iteam.data.model.Meeting;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MeetingServiceImpl implements MeetingService {

	private MeetingRepositoryImpl meetingRepositoryImpl;

	@Override
	public InfoMeeting createMeeting(Meeting meeting) {
		String meetingId = meetingRepositoryImpl.createMeeting(meeting);
		if (meetingId != null) {
			return new InfoMeeting(meetingId, meeting.getProgrammedDate(), meeting.getTopic(), meeting.getTeam(),
					meeting.getDescription());
		}
		return new InfoMeeting();
	}

	@Autowired
	private void setMeetingRepositoryImpl(MeetingRepositoryImpl meetingRepositoryImpl) {
		this.meetingRepositoryImpl = meetingRepositoryImpl;
	}

}
