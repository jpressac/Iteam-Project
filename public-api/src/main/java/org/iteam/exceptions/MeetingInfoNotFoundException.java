package org.iteam.exceptions;

public class MeetingInfoNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 1480529110175073814L;

	public MeetingInfoNotFoundException(Exception e) {
		super(e);

	}

	public MeetingInfoNotFoundException(String message) {
		super(message);
	}

}
