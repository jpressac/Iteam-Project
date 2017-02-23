package org.iteam.services.user;

import java.util.List;

import org.iteam.data.dal.user.UserRepositoryImpl;
import org.iteam.data.dto.UserDTO;
import org.iteam.data.model.IdeasDTO;
import org.iteam.services.slack.SlackServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private UserRepositoryImpl userRepository;
    private SlackServiceImpl slackService;

    @Override
    public UserDTO getUser(String username) {
        UserDTO user = userRepository.getUser(username);
        user.setPassword(null);

        return user;
    }

    @Override
    public void setUser(UserDTO user) {
        userRepository.setUser(user);
        if (user.isUseSlack()) {
            slackService.addUserToSlackGroup(user.getMail());
        }
    }

    @Override
    public boolean checkUserExistence(String username) {
        return userRepository.checkUserExistance(username);
    }

    @Override
    public void modifyUser(UserDTO user, String username) {
        userRepository.modifyUser(user, username);
        // TODO we need to check if the useSlack as false before
        if (user.isUseSlack()) {
            slackService.addUserToSlackGroup(user.getMail());
        }
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

    @Autowired
    private void setSlackService(SlackServiceImpl slackService) {
        this.slackService = slackService;
    }

    @Override
    public void generateScore(IdeasDTO ideas, List<String> userList) {
        this.userRepository.generateScore(ideas, userList);
    }

}
