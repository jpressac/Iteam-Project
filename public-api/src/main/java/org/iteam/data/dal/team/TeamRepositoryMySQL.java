package org.iteam.data.dal.team;

import org.iteam.data.dto.Team;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepositoryMySQL extends CrudRepository<Team, String> {

}
