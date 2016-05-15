package org.iteam.exceptions;

public class ElasticsearchClientException extends RuntimeException {

	private static final long serialVersionUID = -8136218143967524744L;

	public ElasticsearchClientException(Exception e) {
		super(e);
	}

}
