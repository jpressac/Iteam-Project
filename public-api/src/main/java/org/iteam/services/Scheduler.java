package org.iteam.services;

import org.iteam.data.dal.meeting.MeetingRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class Scheduler {

    private static final Logger LOGGER = LoggerFactory.getLogger(Scheduler.class);
    private MeetingRepository meetingRepositoryImpl;

    @Scheduled(fixedDelay = 3600000)
    public void checkNotPerformedMeetings() {
        LOGGER.info("executing endmeeting task");
        meetingRepositoryImpl.updateEndedMeetings();
    }

    @Autowired
    private void setMeetingRepositoryImpl(MeetingRepository meetingRepositoryImpl) {
        this.meetingRepositoryImpl = meetingRepositoryImpl;
    }
}
