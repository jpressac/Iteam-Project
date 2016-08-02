package org.iteam.exceptions;

public class HashingException extends RuntimeException {

    private static final long serialVersionUID = 1536140970299021878L;

    public HashingException(Exception e) {
        super(e);
    }

}
