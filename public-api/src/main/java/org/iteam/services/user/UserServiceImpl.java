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
    public boolean setUser(UserDTO user) {
        return userRepository.setUser(user);
    }

    @Override
    public boolean checkUserExistence(String username) {
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
