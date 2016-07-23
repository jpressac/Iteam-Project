package org.iteam.exceptions;

public class JsonParsingException extends RuntimeException {

    private static final long serialVersionUID = -1275882207382984716L;

    public JsonParsingException(Exception e) {
        super(e);
    }

}
