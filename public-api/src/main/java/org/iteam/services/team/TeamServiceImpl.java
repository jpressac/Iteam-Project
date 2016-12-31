package org.iteam.services.team;

import java.util.List;

import org.iteam.data.dal.team.TeamRepositoryImpl;
import org.iteam.data.dal.team.TeamRepositoryMySQL;
import org.iteam.data.dto.Team;
import org.iteam.data.dto.UserDTO;
import org.iteam.data.model.FilterList;
import org.iteam.data.model.TeamModel;
import org.iteam.data.model.TeamUserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamServiceImpl implements TeamService {

    private TeamRepositoryImpl teamRepository;
    private TeamRepositoryMySQL teamRepositoryMySQL;

    @Override
    public void putTeam(Team team) {
        teamRepositoryMySQL.save(team);
    }

    @Override
    public boolean deleteTeam(String ownerName, String teamName) {
        return teamRepository.deleteTeam(ownerName, teamName);
    }

    @Override
    public List<UserDTO> filterToCreateTeam(FilterList filterList) {
        return teamRepository.filterToCreateTeam(filterList);
    }

    @Override
    public List<TeamModel> getTeams(String ownerName) {
        return teamRepository.getTeams(ownerName);
    }

    @Override
    public List<String> getTeamByUser(String username) {
        return teamRepository.getTeamByUser(username);
    }

    @Override
    public TeamUserModel getTeamUserInformationByMeeting(String meetingId) {
        return teamRepository.getTeamUsersByMeeting(meetingId);
    }

    @Autowired
    private void setTeamRepository(TeamRepositoryImpl teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Autowired
    public void setTeamRepositoryMySQL(TeamRepositoryMySQL teamRepositoryMySQL) {
        this.teamRepositoryMySQL = teamRepositoryMySQL;
    }

}
