package org.iteam.controllers.rest;

import javax.validation.Valid;

import org.iteam.data.model.Team;
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

	@Autowired
	private void setTeamService(TeamServiceImpl teamService) {
		this.teamService = teamService;
	}
}
