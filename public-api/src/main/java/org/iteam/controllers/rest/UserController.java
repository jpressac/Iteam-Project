package org.iteam.controllers.rest;

import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.Arrays;

import javax.validation.Valid;

import org.iteam.data.dto.UserDTO;
import org.iteam.services.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;

/**
 * Controller for login api. It manage the methods get user for retrieving a
 * particular user, post for inserting a new user and put for modifying an
 * existing user.
 */
@RestController
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    private UserService userServiceImpl;
    private String USER_NOT_LOGGED_IN = "anonymousUser";
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    /**
     * Request for checking if the user is authenticated
     * 
     * @return 200 OK if there is user logged in or 401 UNAUTHORIZED if it
     *         isn't.
     */
    @RequestMapping(value = "/user/authenticated", method = RequestMethod.GET)
    public ResponseEntity<Void> getUserAuthenticated() {

        return checkResult(!USER_NOT_LOGGED_IN.equals(SecurityContextHolder.getContext().getAuthentication().getName()),
                HttpStatus.UNAUTHORIZED);
    }

    /**
     * Request for getting the user information.
     * 
     * @return a User.
     */
    @RequestMapping(value = "/user", produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.GET)
    public UserDTO getUser() {
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
    public ResponseEntity<Void> insertUser(@RequestBody @Valid UserDTO user) {

        return checkResult(userServiceImpl.setUser(user), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Request for inserting a new user to the database.
     * 
     * @param user,
     *            json representation of the user to create.
     * @return 200 OK if it was successful.
     * @throws IOException
     * @throws GeneralSecurityException
     */
    @RequestMapping(value = "/usergoogle", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<Void> insertUser(@RequestBody LinkedMultiValueMap<String, String> tokenId)
            throws GeneralSecurityException, IOException {
        JsonFactory jsonFactory = JacksonFactory.getDefaultInstance();

        LOGGER.info("hola puteee");
        GoogleIdTokenVerifier tokenVerifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), jsonFactory)
                .setAudience(Arrays.asList("89509495276-65c7sk1u2vl5csup6gv0542oi3eg459j.apps.googleusercontent.com"))
                .build();

        String token = null;
        GoogleIdToken idToken = null;

        for(String element : tokenId.keySet()) {
            JsonNode node = OBJECT_MAPPER.readTree(element);
            token = node.get("tokenId").asText();
        }

        if(token != null) {
            idToken = tokenVerifier.verify(token);
        }

        if(idToken != null) {
            LOGGER.info("hola putito");
            Payload payload = idToken.getPayload();

            String userId = payload.getSubject();

            // Get profile information from payload
            String email = payload.getEmail();
            boolean emailVerified = Boolean.valueOf(payload.getEmailVerified());
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");
            String locale = (String) payload.get("locale");
            String familyName = (String) payload.get("family_name");
            String givenName = (String) payload.get("given_name");

            LOGGER.info(email);
            LOGGER.info("" + emailVerified);
            LOGGER.info(name);
            LOGGER.info(pictureUrl);
            LOGGER.info(locale);
            LOGGER.info(familyName);
            LOGGER.info(givenName);
            // Use or store profile information
            // ...

        } else {
            LOGGER.info("hola uto");
            // System.out.println("Invalid ID token.");
        }

        LOGGER.info("hola gonza");
        return null;
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
            return new ResponseEntity<>(errorCode);
        } else {
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @Autowired
    public void setUserServiceImpl(UserService userServiceImpl) {
        this.userServiceImpl = userServiceImpl;
    }

    private class Test {
        private String tokenId;

        public String getTokenId() {
            return tokenId;
        }

        public void setTokenId(String tokenId) {
            this.tokenId = tokenId;
        }

    }
}
