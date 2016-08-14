package org.iteam.services.user;

import org.iteam.data.dal.user.UserRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class IteamUserDetailService implements UserDetailsService {

    private UserRepositoryImpl userRepository;
    private static final String ROLE = "ROLE_ADMIN";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        org.iteam.data.model.UserDTO user = userRepository.getUser(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not fould" + username);
        }

        return new User(user.getUsername(), user.getPassword(),
                AuthorityUtils.createAuthorityList(new String[] { ROLE }));

    }

    @Autowired
    private void setUserRepository(UserRepositoryImpl userRepository) {
        this.userRepository = userRepository;
    }
}
