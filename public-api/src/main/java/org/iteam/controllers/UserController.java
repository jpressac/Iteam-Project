package org.iteam.controllers;

import javax.validation.Valid;

import org.iteam.data.model.User;
import org.iteam.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Controller for login api. It manage the methods get user for retrieving a
 * particular user, post for inserting a new user and put for modifying an
 * existing user.
 */
@RestController
public class UserController {

	private UserService userServiceImpl;

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
	@RequestMapping(value = "/user/authenticated", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
	public String getUser() {
		return SecurityContextHolder.getContext().getAuthentication().getName();
		// User user =
		// userServiceImpl.getUser(SecurityContextHolder.getContext().getAuthentication().getName(),
		// SecurityContextHolder.getContext().getAuthentication().getCredentials().toString());
		//
		// if (user != null) {
		// return new ResponseEntity<>(user, HttpStatus.OK);
		// } else {
		// return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
		// }
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

		boolean insert = userServiceImpl.setUser(user);

		if (insert) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/user/modify", consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<?> modifyUser(@RequestBody String doc,
			@RequestParam(value = "username", required = true) String username) {

		boolean modify = userServiceImpl.modifyUser(doc, username);

		if (modify) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@RequestMapping(value = "/user/delete", method = RequestMethod.POST)
	public ResponseEntity<?> deleteUser(@RequestBody String doc,
			@RequestParam(value = "username", required = true) String username) {

		boolean delete = userServiceImpl.logicalDelete(doc, username);

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
	public ResponseEntity<?> checkUserIfExists(@RequestParam(value = "username", required = true) String userName) {

		boolean exists = userServiceImpl.checkUserExistence(userName);

		if (exists) {
			return new ResponseEntity<>(HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@Autowired
	public void setUserServiceImpl(UserService userServiceImpl) {
		this.userServiceImpl = userServiceImpl;
	}
}
