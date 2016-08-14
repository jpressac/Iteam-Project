package org.iteam.services.team;

import java.util.ArrayList;
import java.util.List;

import org.iteam.data.dal.team.TeamRepositoryImpl;
import org.iteam.data.model.FilterList;
import org.iteam.data.model.Team;
import org.iteam.data.model.UserDTO;
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
	private TeamRepositoryImpl teamRepository;

	private Team team;
	private boolean flag;
	private String ownerName;
	private String teamName;
	private FilterList filterList;
	private List<UserDTO> userList;

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

	@Test
	public void filterParticipants() {
		givenAFilterList();
		whenFilterTeamIsCalled();
		thenFilterWasApplied();
	}

	private void thenFilterWasApplied() {
		Assert.assertNotNull(userList);
		Assert.assertFalse(userList.isEmpty());
	}

	private void whenFilterTeamIsCalled() {

		List<UserDTO> userListAfterFilter = new ArrayList<>();
		userListAfterFilter.add(new UserDTO());

		Mockito.when(teamRepository.filterToCreateTeam(filterList)).thenReturn(userListAfterFilter);

		userList = underTest.filterToCreateTeam(filterList);
	}

	private void givenAFilterList() {
		filterList = new FilterList();
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
