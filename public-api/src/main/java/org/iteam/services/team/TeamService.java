package org.iteam.services.team;

import java.util.List;

import org.iteam.data.dto.Team;
import org.iteam.data.dto.UserDTO;
import org.iteam.data.model.FilterList;
import org.iteam.data.model.TeamModel;
import org.iteam.data.model.TeamUserModel;

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
    public void putTeam(Team team);

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
    public List<UserDTO> filterToCreateTeam(FilterList filterList);

    /**
     * Get the list of teams given an owner.
     * 
     * @param ownerName,
     *            the owner of the teams.
     * @return a list of teams.
     */
    public List<TeamModel> getTeams(String ownerName);

    /**
     * Retrieve the the list of teams in that the user is part of.
     * 
     * @param username
     *            the username.
     * @return the list of team names.
     */
    public List<String> getTeamByUser(String username);

    /**
     * Retrieve team and user information given a meetingId.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @return the team and user information.
     */
    public TeamUserModel getTeamUserInformationByMeeting(String meetingId);

}
