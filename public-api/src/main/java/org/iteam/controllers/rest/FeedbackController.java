package org.iteam.controllers.rest;

import org.iteam.data.dto.UserDTO;
import org.iteam.services.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FeedbackController {
    private UserService userServiceImpl;

    /**
     * Modify user's information.
     * 
     * @param doc
     *            JSON representation of the fields that will be modified.
     * @return 200 OK if it was successful or.
     */
    @RequestMapping(value = "/user/updatePoints", consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<Void> modifyUser(@RequestBody UserDTO user) {

        userServiceImpl.modifyUser(user, user.getUsername());
        return new ResponseEntity<Void>(HttpStatus.ACCEPTED);
    }

}
