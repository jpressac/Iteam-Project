package org.iteam.services.user;

import org.iteam.data.dal.user.UserRepositoryImpl;
import org.iteam.data.dal.user.UserRepositoryMySQL;
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
    private UserRepositoryMySQL userRepositoryMySQL;

    private static final String ROLE = "ROLE_ADMIN";

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // org.iteam.data.dto.UserDTO user = userRepository.getUser(username);

        org.iteam.data.dto.UserDTO user = userRepositoryMySQL.findOne(username);

        if(user == null) {
            throw new UsernameNotFoundException("User not fould" + username);
        }

        return new User(user.getUsername(), user.getPassword(),
                AuthorityUtils.createAuthorityList(new String[] { ROLE }));

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
