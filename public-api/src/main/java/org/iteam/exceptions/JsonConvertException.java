package org.iteam.exceptions;

public class JsonConvertException extends RuntimeException {

	private static final long serialVersionUID = -1275882207382984716L;

	public JsonConvertException(Exception e) {
		super(e);
	}

}
