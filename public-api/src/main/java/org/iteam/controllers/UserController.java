package org.iteam.controllers;

import javax.validation.Valid;

import org.iteam.data.model.User;
import org.iteam.services.user.UserService;
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
public class UserController {

	private UserService loggingServiceImpl;

	/**
	 * Request for getting the user information
	 * 
	 * @param userName,
	 *            the userName that represent the user for deleting.
	 * @param password,
	 *            the password of the user.
	 * @return 200 OK and the user if it was successful or 500 if the user
	 *         doesn't exists.
	 */
	@RequestMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public ResponseEntity<?> getUser(@RequestParam(value = "userName", required = true) String userName,
			@RequestParam(value = "password", required = true) String password) {

		User user = loggingServiceImpl.getUser(userName, password);

		if (user != null) {
			return new ResponseEntity<>(user, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	/**
	 * Request for inserting a new user to the database.
	 * 
	 * @param user,
	 *            json representation of the user to create.
	 * @return 200 OK if it was successfully created or 500 if it wasn't.
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
	 * @param user,
	 *            json representation of the user to create.
	 * @return 200 OK if it was successfully modified or 500 if it wasn't
	 */
	@RequestMapping(value = "/user/modify", consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
	public ResponseEntity<?> modifyUser(@RequestBody @Valid User user) {

		boolean modify = loggingServiceImpl.modifyUser(user);

		if (modify) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * Request for deleting an user.
	 * 
	 * @param user,
	 *            json representation of the user to create.
	 * @return 200 OK if it was successfully deleted or 500 if it wasn't
	 */
	@RequestMapping(value = "/user/delete", consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.PUT)
	public ResponseEntity<?> deleteUser(@RequestBody @Valid User user) {

		boolean delete = loggingServiceImpl.logicalDelete(user);

		if (delete) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
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
	private void setLoggingServiceImpl(UserService loggingServiceImpl) {
		this.loggingServiceImpl = loggingServiceImpl;
	}
}
