package org.iteam.controllers.rest;

import org.iteam.data.model.ErrorDTO;
import org.iteam.exceptions.ElasticsearchClientException;
import org.iteam.exceptions.HashingException;
import org.iteam.exceptions.IlegalParamException;
import org.iteam.exceptions.JsonParsingException;
import org.iteam.exceptions.UserExistenceException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Advisor that handles all the exception that occur while performing the
 * requests.
 *
 */
@ControllerAdvice
public class Advisor {

	@ExceptionHandler(IlegalParamException.class)
	public ResponseEntity<ErrorDTO> ilegalParamException(IlegalParamException e) {
		return new ResponseEntity<ErrorDTO>(
				new ErrorDTO("e0001", "Some of the parameters are wrong - Error: " + e.getMessage()),
				HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(ElasticsearchClientException.class)
	public ResponseEntity<ErrorDTO> elasctisearchClientException() {
		return new ResponseEntity<ErrorDTO>(new ErrorDTO("es001", "Cannot establish a conection to the database"),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(HashingException.class)
	public ResponseEntity<ErrorDTO> hashingException() {
		return new ResponseEntity<ErrorDTO>(new ErrorDTO("h01", "Cannot get hash 256"),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(JsonParsingException.class)
	public ResponseEntity<ErrorDTO> jsonParsingException() {
		return new ResponseEntity<ErrorDTO>(new ErrorDTO("j001", "Json parsing exception"),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(UserExistenceException.class)
	public ResponseEntity<?> userExistanceException(UserExistenceException e) {
		return new ResponseEntity<ErrorDTO>(new ErrorDTO("u001", e.getMessage()), HttpStatus.UNAUTHORIZED);
	}
}
