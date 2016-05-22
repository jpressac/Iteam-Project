package org.iteam.services.user;

import org.iteam.data.dal.user.UserRepositoryImpl;
import org.iteam.data.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	private UserRepositoryImpl userRepository;

	@Override
	public User getUser(String username, String password) {
		return userRepository.getUser(username, password);
	}

	@Override
	public boolean setUser(User user) {
		return userRepository.setUser(user);
	}

	@Override
	public boolean checkUserExistance(String username) {
		return userRepository.checkUserExistance(username);
	}

	@Override
	public boolean modifyUser(String doc, String username) {
		return userRepository.modifyUser(doc, username);
	}

	@Override
	public boolean logicalDelete(String doc, String username) {
		return userRepository.logicalDelete(doc, username);
	}

	@Autowired
	private void setUserRepository(UserRepositoryImpl userRepository) {
		this.userRepository = userRepository;
	}

}
