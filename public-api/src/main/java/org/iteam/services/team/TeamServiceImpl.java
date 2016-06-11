package org.iteam.services.team;

import java.util.List;

import org.iteam.data.dal.team.TeamRespositoryImpl;
import org.iteam.data.model.FilterList;
import org.iteam.data.model.Team;
import org.iteam.data.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamServiceImpl implements TeamService {

	private TeamRespositoryImpl teamRepository;

	@Override
	public boolean putTeam(Team team) {
		return teamRepository.putTeam(team);
	}

	@Override
	public boolean deleteTeam(String ownerName, String teamName) {
		return teamRepository.deleteTeam(ownerName, teamName);
	}

	@Override
	public List<User> filterToCreateTeam(FilterList filterList) {
		return teamRepository.filterToCreateTeam(filterList);
	}

	@Autowired
	private void setTeamRepository(TeamRespositoryImpl teamRepository) {
		this.teamRepository = teamRepository;
	}
}
