package org.iteam.data.model;

public class ErrorDTO {

	private String errorCode;
	private String error;

	public ErrorDTO(String errorCode, String error) {
		this.errorCode = errorCode;
		this.error = error;
	}

	public String getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

}
