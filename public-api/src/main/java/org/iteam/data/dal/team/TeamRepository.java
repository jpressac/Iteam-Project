package org.iteam.data.dal.team;

import java.util.List;

import org.iteam.data.dto.Team;
import org.iteam.data.dto.UserDTO;
import org.iteam.data.model.FilterList;
import org.iteam.data.model.TeamModel;

/**
 * Repository for team.
 *
 */
public interface TeamRepository {

    /**
     * Insert a new team to the database.
     * 
     * @param team,
     *            the data to store.
     * @return true if it was successful, false otherwise.
     */
    public boolean putTeam(Team team);

    /**
     * Delete a team from the database.
     * 
     * @param ownerName,
     *            the team owner.
     * @param teamName,
     *            the team name.
     * @return true if it was successful, false otherwise.
     */
    public boolean deleteTeam(String ownerName, String teamName);

    /**
     * Apply filter to search for users.
     * 
     * @param filterList,
     *            the filter list to apply.
     * @return a list of users that match one or more filters.
     */
    public List<UserDTO> filterToCreateTeam(FilterList filterList);

    /**
     * Get the list of teams given an owner.
     * 
     * @param ownerName,
     *            the owner of the teams.
     * @return a list of teams.
     */
    public List<TeamModel> getTeams(String ownerName);

    public List<String> getTeamByUser(String username);
}
