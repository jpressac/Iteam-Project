package org.iteam.exceptions;

public class InsertionError extends RuntimeException {

	private static final long serialVersionUID = 7201359609723395115L;

	public InsertionError(Exception e) {
		super(e);
	}

	public InsertionError(String message) {
		super(message);
	}
}
