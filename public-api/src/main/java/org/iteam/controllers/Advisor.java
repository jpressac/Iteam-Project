package org.iteam.controllers;

import org.iteam.data.model.ErrorDTO;
import org.iteam.exceptions.IlegalParamException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class Advisor {

	@ExceptionHandler(IlegalParamException.class)
	public ResponseEntity<?> ilegalParamException(IlegalParamException e) {
		return new ResponseEntity<ErrorDTO>(
				new ErrorDTO("e0001", "Some of the parameters are wrong Error: " + e.getMessage()),
				HttpStatus.BAD_REQUEST);
	}
}
