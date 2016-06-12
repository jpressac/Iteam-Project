package org.iteam.controllers.rest;

import java.beans.PropertyEditorSupport;
import java.io.IOException;

import org.iteam.data.model.ErrorDTO;
import org.iteam.data.model.Filter;
import org.iteam.data.model.FilterList;
import org.iteam.exceptions.ElasticsearchClientException;
import org.iteam.exceptions.HashingException;
import org.iteam.exceptions.IlegalParamException;
import org.iteam.exceptions.JsonParsingException;
import org.iteam.exceptions.UserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.InitBinder;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

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

	@ExceptionHandler(UserNotFoundException.class)
	public ResponseEntity<?> userExistanceException(UserNotFoundException e) {
		return new ResponseEntity<ErrorDTO>(new ErrorDTO("u001", e.getMessage()), HttpStatus.UNAUTHORIZED);
	}

	@InitBinder
	public void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(FilterList.class, new PropertyEditorSupport() {
			@Override
			public void setAsText(String text) {
				ObjectMapper mapper = new ObjectMapper();
				FilterList filters = new FilterList();
				JsonNode root;
				try {
					root = mapper.readTree(text);
					root.forEach(arrayNode -> {
						try {
							filters.addFilter(mapper.treeToValue(arrayNode, Filter.class));
						} catch (Exception e) {
							// TODO: use own exceptions
						}
					});

				} catch (IOException e) {
					// TODO: use own exceptions
				}

				setValue(filters);
			}
		});
	}

}
