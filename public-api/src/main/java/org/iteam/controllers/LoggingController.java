package org.iteam.controllers;

import javax.validation.Valid;

import org.iteam.data.model.User;
import org.iteam.services.logging.LoggingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

	private LoggingService loggingServiceImpl;

	/**
	 * Request for getting the user information
	 * 
	 * @return a response entity that represents the request status and the user
	 *         information.
	 */
	@RequestMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<?> getUser(@RequestParam(value = "userName", required = true) String userName,
			@RequestParam(value = "password", required = true) String password) {
		return null;
	}

	/**
	 * Request for inserting a new user to the database.
	 * 
	 * @return a response entity that represents the request status.
	 */
	@RequestMapping(value = "/user", consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<?> insertUser(@RequestBody @Valid User user) {

		boolean insert = loggingServiceImpl.setUser(user);

		if (insert) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
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
	public ResponseEntity<?> deleteUser(@RequestParam(value = "username", required = true) String userName) {
		return null;
	}

	/**
	 * Request that check for an existing user.
	 * 
	 * @param userName,
	 *            the user name to check
	 * @return 200 OK if the user exists or 404 otherwise
	 */
	@RequestMapping(value = "/user/exists", method = RequestMethod.HEAD)
	public ResponseEntity<?> checkUserIfExists(@RequestParam(value = "userName", required = true) String userName) {

		boolean exists = loggingServiceImpl.checkUserExistance(userName);

		if (exists) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@Autowired
	private void setLoggingServiceImpl(LoggingService loggingServiceImpl) {
		this.loggingServiceImpl = loggingServiceImpl;
	}
}
