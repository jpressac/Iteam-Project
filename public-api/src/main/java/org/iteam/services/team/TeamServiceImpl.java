package org.iteam.services.team;

import java.util.List;

import org.iteam.data.dal.team.TeamRepositoryImpl;
import org.iteam.data.dto.Team;
import org.iteam.data.dto.UserDTO;
import org.iteam.data.model.FilterList;
import org.iteam.data.model.PaginationModel;
import org.iteam.data.model.TeamModel;
import org.iteam.data.model.TeamUserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TeamServiceImpl implements TeamService {

    private TeamRepositoryImpl teamRepository;

    @Override
    public boolean putTeam(Team team) {
        return teamRepository.putTeam(team);
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
    public PaginationModel<TeamModel> getTeams(String ownerName, int size, int from) {
        return teamRepository.getTeams(ownerName, size, from);
    }

    @Override
    public List<String> getTeamByUser(String username, int size, int from) {
        return teamRepository.getTeamByUser(username, size, from);
    }

    @Override
    public TeamUserModel getTeamUserInformationByMeeting(String meetingId) {
        return teamRepository.getTeamUsersByMeeting(meetingId);
    }

    @Override
    public boolean checkTeamNameExistent(String teamName, String teamOwner) {
        return teamRepository.checkTeamNameExistent(teamName, teamOwner);
    }

    @Autowired
    private void setTeamRepository(TeamRepositoryImpl teamRepository) {
        this.teamRepository = teamRepository;
    }

    @Override
    public PaginationModel<TeamModel> getTeamByToken(String ownerName, String token, int size, int from) {
        return teamRepository.getTeamsByToken(ownerName, token, size, from);
    }
}
