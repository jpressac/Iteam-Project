package org.iteam.services.user;

import org.iteam.data.dal.user.UserRepositoryImpl;
import org.iteam.data.model.User;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.util.ReflectionTestUtils;

public class IteamUserDetailServiceTest {

	@InjectMocks
	private IteamUserDetailService underTest;

	@Mock
	private UserRepositoryImpl userRepositoryImpl;

	private org.springframework.security.core.userdetails.UserDetails user;

	private String username;

	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void loadUserByName() {
		givenAnUsername();
		givenAnUserRepository();
		whenLoadUserByNameIsCalled();
		thenUserExists();
	}

	@Test(expected = UsernameNotFoundException.class)
	public void loadUserByNameException() {
		givenAnUsername();
		givenAnUserRepositoryNull();
		whenLoadUserByNameIsCalled();
	}

	private void givenAnUserRepositoryNull() {
		Mockito.when(userRepositoryImpl.getUser(username)).thenReturn(null);

		ReflectionTestUtils.setField(underTest, "userRepository", userRepositoryImpl);
	}

	private void thenUserExists() {
		Assert.assertEquals("iteam", user.getUsername());
		Assert.assertEquals("admin", user.getPassword());
	}

	private void whenLoadUserByNameIsCalled() {
		user = underTest.loadUserByUsername(username);
	}

	private void givenAnUserRepository() {
		User user = new User();
		user.setUsername("iteam");
		user.setPassword("admin");

		Mockito.when(userRepositoryImpl.getUser(username)).thenReturn(user);

		ReflectionTestUtils.setField(underTest, "userRepository", userRepositoryImpl);
	}

	private void givenAnUsername() {
		username = "iteam";
	}
}
