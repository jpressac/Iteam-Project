package org.iteam.controllers;

import javax.validation.Valid;

import org.iteam.data.model.User;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

/**
 * Controller for logging api. It manage the methods get user for retrieving a
 * particular user, post for inserting a new user and put for modifying an
 * existing user.
 */
@Controller
public class LoggingController {

	/**
	 * Request for getting the user information
	 * 
	 * @return a response entity that represents the request status and the user
	 *         information.
	 */
	@RequestMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<?> getUser() {
		return null;
	}

	/**
	 * Request for inserting a new user to the database.
	 * 
	 * @return a response entity that represents the request status.
	 */
	@RequestMapping(value = "/user", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_UTF8_VALUE, method = RequestMethod.POST)
	public ResponseEntity<?> putUser(@RequestBody @Valid User user) {
		return null;
	}

	/**
	 * Request for modifying an specific user.
	 * 
	 * @return a response entity that represents the request status.
	 */
	@RequestMapping(value = "/user/modify", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
	public ResponseEntity<?> modifyUser() {
		return null;
	}

	/**
	 * Request for deleting an user.
	 * 
	 * @param userName,
	 *            the userName that represent the user for deleting.
	 * @return a response entity that represents the request status.
	 */
	@RequestMapping(value = "/user/delete")
	public ResponseEntity<?> deleteUser(@RequestParam(value = "username") String userName) {
		return null;
	}
}
