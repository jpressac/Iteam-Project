package org.iteam.data.dal.team;

import org.iteam.data.model.Team;

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
}
