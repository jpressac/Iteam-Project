package org.iteam.controllers.rest;

import java.util.List;

import javax.validation.Valid;

import org.iteam.data.model.FilterList;
import org.iteam.data.model.Team;
import org.iteam.data.model.User;
import org.iteam.services.team.TeamServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class TeamController {

	private TeamServiceImpl teamService;

	/**
	 * Create a new team based on the parameter information.
	 * 
	 * @param team,
	 *            the team to create.
	 * @return 200 OK if it was successful, 400 if not.
	 */
	@RequestMapping(value = "/team/create", consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
	public ResponseEntity<Boolean> createTeam(@RequestBody @Valid Team team) {
		boolean success = teamService.putTeam(team);

		if (success) {
			return new ResponseEntity<Boolean>(success, HttpStatus.OK);
		} else {
			return new ResponseEntity<Boolean>(success, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Delete an entire team based on a team owner a his name.
	 * 
	 * @param ownerName,
	 *            the team owner.
	 * @param teamName,
	 *            the team name.
	 * @return 200 OK if it was successful, 400 if not.
	 */
	@RequestMapping(value = "/team/delete", method = RequestMethod.HEAD)
	public ResponseEntity<Boolean> deleteTeam(@RequestParam(value = "ownerName", required = true) String ownerName,
			@RequestParam(value = "teamName", required = true) String teamName) {
		// TODO: add validations Valid.istrue()

		boolean success = teamService.deleteTeam(ownerName, teamName);

		if (success) {
			return new ResponseEntity<Boolean>(success, HttpStatus.OK);
		} else {
			return new ResponseEntity<Boolean>(success, HttpStatus.BAD_REQUEST);
		}
	}

	/**
	 * Apply filters to users for creating teams
	 * 
	 * @param filter,
	 *            a filter list to apply to users.
	 * @return a list of user.
	 */
	@RequestMapping(value = "/team/select", method = RequestMethod.GET)
	public List<User> filterTeam(@RequestParam(value = "filter") FilterList filter) {
		return teamService.filterToCreateTeam(filter);
	}

	@Autowired
	private void setTeamService(TeamServiceImpl teamService) {
		this.teamService = teamService;
	}
}
