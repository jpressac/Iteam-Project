package org.iteam.controllers.rest;

import org.iteam.data.dto.Team;
import org.iteam.services.team.TeamServiceImpl;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;

public class TeamControllerTest {

	@InjectMocks
	private TeamController underTest;

	@Mock
	private TeamServiceImpl teamService;

	private Team team;
	private ResponseEntity<Void> response;

	private String ownerName;

	private String teamName;

	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void createTeamSuccess() {
		givenATeam();
		giveATeamService(true);
		whenPutTeamIsCalled();
		thenCheckStatus(HttpStatus.OK);
	}

	@Test
	public void createTeamFail() {
		givenATeam();
		giveATeamService(false);
		whenPutTeamIsCalled();
		thenCheckStatus(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@Test
	public void deleteTeamSuccess() {
		givenAnOwnerNameAndTeamName();
		giveATeamService(true);
		whenDeleteTeamIsCalled();
		thenCheckStatus(HttpStatus.OK);
	}

	@Test
	public void deleteTeamFail() {
		givenAnOwnerNameAndTeamName();
		giveATeamService(false);
		whenDeleteTeamIsCalled();
		thenCheckStatus(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	private void givenAnOwnerNameAndTeamName() {
		ownerName = "iteam";
		teamName = "iteamTeam";
	}

	private void whenDeleteTeamIsCalled() {
		response = underTest.deleteTeam(ownerName, teamName);
	}

	private void thenCheckStatus(HttpStatus status) {
		Assert.assertEquals(response.getStatusCode(), status);
	}

	private void whenPutTeamIsCalled() {
		response = underTest.createTeam(team);
	}

	private void giveATeamService(boolean flag) {
		Mockito.when(teamService.putTeam(Mockito.anyObject())).thenReturn(flag);
		Mockito.when(teamService.deleteTeam(Mockito.anyString(), Mockito.anyString())).thenReturn(flag);

		ReflectionTestUtils.setField(underTest, "teamService", teamService);
	}

	private void givenATeam() {
		team = new Team();
	}
}
