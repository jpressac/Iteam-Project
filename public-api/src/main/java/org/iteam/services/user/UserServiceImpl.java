package org.iteam.services.user;

import org.iteam.data.dal.user.UserRepositoryImpl;
import org.iteam.data.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepositoryImpl userRepository;

    @Override
    public UserDTO getUser(String username) {
        UserDTO user = userRepository.getUser(username);
        user.setPassword(null);

        return user;
    }

    @Override
    public void setUser(UserDTO user) {
        userRepository.setUser(user);
    }

    @Override
    public boolean checkUserExistence(String username) {
        return userRepository.checkUserExistance(username);
    }

    @Override
    public void modifyUser(UserDTO user, String username) {
        userRepository.modifyUser(user, username);
    }

    @Override
    public boolean logicalDelete(String doc, String username) {
        return userRepository.logicalDelete(doc, username);
    }

    @Override
    public boolean validatePassord(String username, String password) {
        return userRepository.validatePassword(username, password);
    }

    @Autowired
    private void setUserRepository(UserRepositoryImpl userRepository) {
        this.userRepository = userRepository;
    }
}
