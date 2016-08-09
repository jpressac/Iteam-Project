package org.iteam.controllers.rest;

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
    private String USER_NOT_LOGGED_IN = "anonymousUser";

    /**
     * Request for checking if the user is authenticated
     * 
     * @return 200 OK if there is user logged in or 401 UNAUTHORIZED if it
     *         isn't.
     */
    @RequestMapping(value = "/user/authenticated", method = RequestMethod.GET)
    public ResponseEntity<Void> getUserAuthenticated() {

        return checkResult(USER_NOT_LOGGED_IN.equals(SecurityContextHolder.getContext().getAuthentication().getName()),
                HttpStatus.UNAUTHORIZED);
    }

    /**
     * Request for getting the user information.
     * 
     * @return a User.
     */
    @RequestMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public User getUser() {
        return userServiceImpl.getUser(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    /**
     * Request for inserting a new user to the database.
     * 
     * @param user,
     *            json representation of the user to create.
     * @return 200 OK if it was successful.
     */
    @RequestMapping(value = "/user", consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<Void> insertUser(@RequestBody @Valid User user) {

        return checkResult(userServiceImpl.setUser(user), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Modify user's information.
     * 
     * @param doc,
     *            JSON representation of the fields that will be modified.
     * @return 200 OK if it was successful or.
     */
    @RequestMapping(value = "/user/modify", consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<Void> modifyUser(@RequestBody String doc) {

        return checkResult(
                userServiceImpl.modifyUser(doc, SecurityContextHolder.getContext().getAuthentication().getName()),
                HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Delete logically a user.
     * 
     * @param doc,
     *            JSON representation of the delete field.
     * @return 200 OK if it was successful.
     */
    @RequestMapping(value = "/user/delete", method = RequestMethod.POST)
    public ResponseEntity<Void> deleteUser(@RequestBody String doc) {

        return checkResult(
                userServiceImpl.logicalDelete(doc, SecurityContextHolder.getContext().getAuthentication().getName()),
                HttpStatus.INTERNAL_SERVER_ERROR);

    }

    /**
     * Request that check for an existing user.
     * 
     * @param userName,
     *            the user name to check
     * @return 200 OK if the user exists or 404 otherwise
     */
    @RequestMapping(value = "/user/exists", method = RequestMethod.HEAD)
    public ResponseEntity<Void> checkUserIfExists(@RequestParam(value = "username", required = true) String userName) {

        return checkResult(userServiceImpl.checkUserExistence(userName), HttpStatus.NOT_FOUND);
    }

    private ResponseEntity<Void> checkResult(boolean flag, HttpStatus errorCode) {
        if(!flag) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(errorCode);
        }
    }

    @Autowired
    public void setUserServiceImpl(UserService userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }
}
