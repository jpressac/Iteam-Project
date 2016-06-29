package org.iteam.services.team;

import java.util.List;

import org.iteam.data.model.FilterList;
import org.iteam.data.model.Team;
import org.iteam.data.model.User;

/**
 * Manage all the operations that can be done with a team.
 *
 */
public interface TeamService {

	/**
	 * Insert a new team
	 * 
	 * @return true if it was successful, false otherwise
	 */
	public boolean putTeam(Team team);

	/**
	 * Delete an existing team.
	 * 
	 * @param ownerName,
	 *            the team owner.
	 * @param teamName,
	 *            the team name.
	 * @return true if it was successful, false otherwise.
	 */
	public boolean deleteTeam(String ownerName, String teamName);

	/**
	 * Apply filters to search for users.
	 * 
	 * @param filterList,
	 *            the list of filters to apply.
	 * @return a list of user that apply to one or more filter.
	 */
	public List<User> filterToCreateTeam(FilterList filterList);

	/**
	 * Get the list of teams given an owner.
	 * 
	 * @param ownerName,
	 *            the owner of the teams.
	 * @return a list of teams.
	 */
	public List<Team> getTeams(String ownerName);

}
