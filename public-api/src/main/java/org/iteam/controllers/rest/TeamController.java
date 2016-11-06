package org.iteam.controllers.rest;

import java.util.List;

import javax.validation.Valid;

import org.iteam.data.dto.Team;
import org.iteam.data.dto.UserDTO;
import org.iteam.data.model.FilterList;
import org.iteam.data.model.TeamModel;
import org.iteam.services.team.TeamServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TeamController {

    private TeamServiceImpl teamService;
    Team team = new Team();

    /**
     * Create a new team based on the parameter information.
     * 
     * @param team
     *            the team to create.
     * @return 200 OK if it was successful.
     */
    @RequestMapping(value = "/team/create", consumes = MediaType.APPLICATION_JSON_VALUE, method = RequestMethod.POST)
    public ResponseEntity<Void> createTeam(@RequestBody @Valid Team team) {
        return checkResult(teamService.putTeam(team));
    }

    /**
     * Delete an entire team based on a team owner a his name.
     * 
     * @param ownerName
     *            the team owner.
     * @param teamName
     *            the team name.
     * @return 200 OK if it was successful.
     */
    @RequestMapping(value = "/team/delete", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteTeam(@RequestParam(value = "ownerName", required = true) String ownerName,
            @RequestParam(value = "teamName", required = true) String teamName) {

        return checkResult(teamService.deleteTeam(ownerName, teamName));
    }

    /**
     * Apply filters to users for creating teams
     * 
     * @param filter
     *            a filter list to apply to users.
     * @return a list of user.
     */
    @RequestMapping(value = "/team/select", method = RequestMethod.GET)
    public List<UserDTO> filterTeam(@RequestParam(value = "filter") FilterList filter) {
        return teamService.filterToCreateTeam(filter);
    }

    /**
     * Get all the teams given a team owner.
     * 
     * @return a list of teams.
     */
    @RequestMapping(value = "team/byowner", method = RequestMethod.GET)
    public List<TeamModel> getTeamByOwner() {
        return teamService.getTeams(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    private ResponseEntity<Void> checkResult(boolean flag) {
        if(flag) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Autowired
    private void setTeamService(TeamServiceImpl teamService) {
        this.teamService = teamService;
    }
}
