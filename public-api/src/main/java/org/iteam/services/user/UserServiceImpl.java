package org.iteam.services.user;

import org.iteam.data.dal.user.UserRepositoryImpl;
import org.iteam.data.dal.user.UserRepositoryMySQL;
import org.iteam.data.dto.UserDTO;
import org.joda.time.DateTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepositoryImpl userRepository;
    private UserRepositoryMySQL userRepositoryMySQL;

    @Override
    public UserDTO getUser(String username) {

        return userRepositoryMySQL.findOne(username);
    }

    @Override
    public boolean setUser(UserDTO user) {
        user.setInsertionDate(DateTime.now().getMillis());

        userRepositoryMySQL.save(user);

        return true;
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

    @Autowired
    public void setUserRepositoryMySQL(UserRepositoryMySQL userRepositoryMySQL) {
        this.userRepositoryMySQL = userRepositoryMySQL;
    }

}
