package org.iteam.exceptions;

public class IlegalParamException extends RuntimeException {

	private static final long serialVersionUID = 2205603608520797892L;

	public IlegalParamException(Exception e) {
		super(e);
	}

}
