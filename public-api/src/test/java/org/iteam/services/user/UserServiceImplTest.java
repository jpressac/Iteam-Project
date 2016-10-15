package org.iteam.services.user;

import org.iteam.data.dal.user.UserRepositoryImpl;
import org.iteam.data.dto.UserDTO;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

public class UserServiceImplTest {

	@InjectMocks
	private UserServiceImpl underTest;

	@Mock
	private UserRepositoryImpl userRepositoryImpl;

	private UserDTO user;
	private boolean flag;
	private String userName;
	private String doc;

	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void setNewRealUser() {
		givenARealUser();
		whenSetUserIsCalled();
		thenUserWasCreated();
	}

	@Test
	public void setNewUserWithFakeUser() {
		givenAFakeUser();
		whenSetUserIsCalled();
		thenUserWasNotCreated();
	}

	@Test
	public void checkExistenceRealUser() {
		givenARealUserName();
		whenCheckExistanceIsCalled();
		thenUserExists();
	}

	@Test
	public void checkExistenceFakeUser() {
		givenAFakeUserName();
		whenCheckExistanceIsCalled();
		thenUserNotExists();
	}

	@Test
	public void modifyUser() {
		givenADoc();
		givenAUserName();
		givenUserRepoMock();
		whenModifyUserIsCalled();
		thenUserWasModify();
	}

	@Test
	public void logicalDeleteSuccess() {
		givenADocDelete();
		givenAUserName();
		givenAUserRepoMockDelete();
		whenLogicalDeleteIsCalled();
		thenUserWasDeleted();
	}

	private void thenUserWasDeleted() {
		Assert.assertTrue(flag);
	}

	private void whenLogicalDeleteIsCalled() {
		flag = underTest.logicalDelete(doc, userName);
	}

	private void givenAUserRepoMockDelete() {
		Mockito.when(userRepositoryImpl.logicalDelete(doc, userName)).thenReturn(true);
	}

	private void givenADocDelete() {
		doc = "{\"logicalDelete\": \"true\"}";
	}

	private void thenUserWasModify() {
		Assert.assertTrue(flag);
	}

	private void whenModifyUserIsCalled() {
		flag = underTest.modifyUser(doc, userName);
	}

	private void givenUserRepoMock() {
		Mockito.when(userRepositoryImpl.modifyUser(doc, userName)).thenReturn(true);
	}

	private void givenAUserName() {
		userName = "admin";
	}

	private void givenADoc() {
		doc = "{\"nationality\": \"alemana\", \"hobbies\": [\"futbol\", \"baseball\"]}";
	}

	private void thenUserNotExists() {
		Assert.assertFalse(flag);
	}

	private void givenAFakeUserName() {
		userName = "fakeAdmin";
		Mockito.when(userRepositoryImpl.checkUserExistance(userName)).thenReturn(false);
	}

	private void thenUserExists() {
		Assert.assertTrue(flag);
	}

	private void whenCheckExistanceIsCalled() {
		flag = underTest.checkUserExistence(userName);
	}

	private void givenARealUserName() {
		userName = "admin";
		Mockito.when(userRepositoryImpl.checkUserExistance(userName)).thenReturn(true);
	}

	private void thenUserWasNotCreated() {
		Assert.assertFalse(flag);
	}

	private void givenAFakeUser() {
		user = null;
		Mockito.when(userRepositoryImpl.setUser(user)).thenReturn(false);
	}

	private void thenUserWasCreated() {
		Assert.assertTrue(flag);
	}

	private void whenSetUserIsCalled() {
		flag = underTest.setUser(user);
	}

	private void givenARealUser() {
		user = new UserDTO();
		Mockito.when(userRepositoryImpl.setUser(user)).thenReturn(true);
	}
}
