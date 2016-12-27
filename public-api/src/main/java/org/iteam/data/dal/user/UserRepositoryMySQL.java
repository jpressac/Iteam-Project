package org.iteam.data.dal.user;

import org.iteam.data.dto.UserDTO;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepositoryMySQL extends CrudRepository<UserDTO, String> {

}
