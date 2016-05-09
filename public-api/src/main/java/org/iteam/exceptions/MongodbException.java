package org.iteam.exceptions;

/**
 * Handles all mongo exceptions.
 *
 */
public class MongodbException extends RuntimeException {

	private static final long serialVersionUID = -4497469828382919426L;

	public MongodbException(Exception e) {
		super(e);
	}

}
