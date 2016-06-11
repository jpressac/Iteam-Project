package org.iteam.services.team;

import org.iteam.data.model.Team;

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

}
