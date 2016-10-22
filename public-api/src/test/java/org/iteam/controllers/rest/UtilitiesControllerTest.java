package org.iteam.controllers.rest;

import org.iteam.data.dto.Nationalities;
import org.iteam.services.utilities.UtilitiesServiceImpl;
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

public class UtilitiesControllerTest {

	@InjectMocks
	private UtilitiesController underTest;

	@Mock
	private UtilitiesServiceImpl utilitiesServiceImpl;

	private Nationalities nationalities;

	private ResponseEntity<Void> response;

	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void saveNationalitiesSuccess() {
		givenNationalities();
		givenUtilitiesService(true);
		whenSaveNationalitiesIsCalled();
		thenCheckStatus(HttpStatus.OK);
	}

	@Test
	public void saveNationalitiesFail() {
		givenNationalities();
		givenUtilitiesService(false);
		whenSaveNationalitiesIsCalled();
		thenCheckStatus(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	private void thenCheckStatus(HttpStatus status) {
		Assert.assertEquals(response.getStatusCode(), status);
	}

	private void whenSaveNationalitiesIsCalled() {
		response = underTest.saveNationalitiesDropDown(nationalities);
	}

	private void givenUtilitiesService(boolean flag) {
		Mockito.when(utilitiesServiceImpl.insertNationalities(nationalities)).thenReturn(flag);

		ReflectionTestUtils.setField(underTest, "utilitiesServiceImpl", utilitiesServiceImpl);
	}

	private void givenNationalities() {
		nationalities = new Nationalities();
	}
}
