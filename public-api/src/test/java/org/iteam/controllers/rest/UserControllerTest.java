package org.iteam.controllers.rest;

import org.iteam.data.dto.UserDTO;
import org.iteam.services.user.UserServiceImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;

public class UserControllerTest {

    @InjectMocks
    private UserController underTest;

    @Mock
    private UserServiceImpl userServiceImpl;

    private UserDTO user;

    private ResponseEntity<Void> response;

    private String doc;

    private String docDelete;

    private String username;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void insertUserSuccess() {
        givenAUser();
        givenAUserService(true);
        whenSetUserIsCalled();
        thenCheckStatus(HttpStatus.OK);
    }

    @Test
    public void insertUserFail() {
        givenAUser();
        givenAUserService(false);
        whenSetUserIsCalled();
        thenCheckStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Ignore
    public void modifyUserSuccess() {
        givenADoc();
        givenAUserService(true);
        whenModifyUserIsCalled();
        thenCheckStatus(HttpStatus.OK);
    }

    @Ignore
    public void modifyUserFail() {
        givenADoc();
        givenAUserService(false);
        whenModifyUserIsCalled();
        thenCheckStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Ignore
    public void deleteUserSuccess() {
        givenADocDelete();
        givenAUserService(true);
        whenDeleteUserIsCalled();
        thenCheckStatus(HttpStatus.OK);
    }

    @Ignore
    public void deleteUserFail() {
        givenADocDelete();
        givenAUserService(false);
        whenDeleteUserIsCalled();
        thenCheckStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Test
    public void userExists() {
        givenAUserName();
        givenAUserService(true);
        whenUserExistsIsCalled();
        thenCheckStatus(HttpStatus.OK);
    }

    @Test
    public void userNotExists() {
        givenAUserName();
        givenAUserService(false);
        whenUserExistsIsCalled();
        thenCheckStatus(HttpStatus.NOT_FOUND);
    }

    private void whenUserExistsIsCalled() {
        response = underTest.checkUserIfExists(username);
    }

    private void givenAUserName() {
        username = "iteamUser";
    }

    private void whenDeleteUserIsCalled() {
        response = underTest.deleteUser(docDelete);
    }

    private void givenADocDelete() {
        docDelete = "{\"logicalDelete\":\"true\"}";
    }

    private void whenModifyUserIsCalled() {
        response = underTest.modifyUser(doc);
    }

    private void givenADoc() {
        doc = "{\"username\":\"iteam\"}";
    }

    private void thenCheckStatus(HttpStatus status) {
        Assert.assertEquals(status, response.getStatusCode());
    }

    private void whenSetUserIsCalled() {
        response = underTest.insertUser(user);
    }

    private void givenAUserService(boolean flag) {
        Mockito.when(userServiceImpl.setUser(Mockito.anyObject())).thenReturn(flag);
        Mockito.when(userServiceImpl.checkUserExistence(Mockito.anyString())).thenReturn(flag);
        Mockito.when(userServiceImpl.logicalDelete(Mockito.anyString(), Mockito.anyString())).thenReturn(flag);
        Mockito.when(userServiceImpl.modifyUser(Mockito.anyString(), Mockito.anyString())).thenReturn(flag);

        ReflectionTestUtils.setField(underTest, "userServiceImpl", userServiceImpl);
    }

    private void givenAUser() {
        user = new UserDTO();
    }
}
