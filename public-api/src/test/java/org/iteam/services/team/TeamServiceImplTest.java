package org.iteam.services.team;

import org.iteam.data.dal.team.TeamRespositoryImpl;
import org.iteam.data.model.Team;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

public class TeamServiceImplTest {

	@InjectMocks
	private TeamServiceImpl underTest;

	@Mock
	private TeamRespositoryImpl teamRepository;

	private Team team;
	private boolean flag;
	private String ownerName;
	private String teamName;

	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void putTeam() {
		givenANewTeam();
		whenPutTeamIsCalled();
		thenTeamWasCreated();
	}

	@Test
	public void deleteTeam() {
		givenAnOwner();
		givenATeamName();
		whenDeleteTeamIsCalled();
		thenTeamWasDeleted();
	}

	private void thenTeamWasDeleted() {
		Assert.assertTrue(flag);
	}

	private void whenDeleteTeamIsCalled() {
		Mockito.when(teamRepository.deleteTeam(ownerName, teamName)).thenReturn(true);
		flag = underTest.deleteTeam(ownerName, teamName);
	}

	private void givenATeamName() {
		teamName = "schoolOfRock";
	}

	private void givenAnOwner() {
		ownerName = "bonJovi";
	}

	private void thenTeamWasCreated() {
		Assert.assertTrue(flag);
	}

	private void whenPutTeamIsCalled() {
		flag = underTest.putTeam(team);
	}

	private void givenANewTeam() {
		team = new Team();
		Mockito.when(teamRepository.putTeam(team)).thenReturn(true);
	}

}
