package org.iteam.services.meeting;

import org.iteam.services.mail.MailServiceImpl;

//@Service
public class MeetingServiceImpl implements MeetingService {

	private MailServiceImpl mailServiceImpl;

	@Override
	public void createMeeting() {
		mailServiceImpl.sendEmail();
	}

	// @Autowired
	private void setMailServiceImpl(MailServiceImpl mailServiceImpl) {
		this.mailServiceImpl = mailServiceImpl;
	}

}
