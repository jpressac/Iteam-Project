package org.iteam.services.utilities;

import java.util.ArrayList;
import java.util.List;

import org.assertj.core.util.Lists;
import org.iteam.data.dal.utilities.UtilitiesRepositoryImpl;
import org.iteam.data.dto.Nationalities;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

public class UtilitiesServiceImplTest {

	@InjectMocks
	private UtilitiesServiceImpl underTest;

	@Mock
	private UtilitiesRepositoryImpl utilitiesRepositoryImpl;

	private Nationalities nationalities;
	private List<String> professionList = new ArrayList<>();
	private boolean flag;

	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void insertNationalities() {
		givenANationalities();
		whenInsertNationalitiesIsCalled();
		thenNationalitiesWereCreated();
	}

	@Test
	public void getNationalities() {
		whenGetNationalities();
		thenNationalitiesWereNotEmpty();
	}

	@Test
	public void getProfessions() {
		whenGetProfessionsIsCalled();
		thenListOfProfessionsIsReturned();
	}

	private void thenListOfProfessionsIsReturned() {
		Assert.assertEquals(2, professionList.size());
	}

	private void whenGetProfessionsIsCalled() {
		Mockito.when(utilitiesRepositoryImpl.getProfessions())
				.thenReturn(Lists.newArrayList("Software Engineer", "Estudiante"));

		professionList = underTest.getProfessions();

	}

	private void thenNationalitiesWereNotEmpty() {
		Assert.assertTrue(nationalities.getNationalities().contains("Argentina"));
	}

	private void whenGetNationalities() {

		Nationalities natioanlitiesTest = new Nationalities();
		natioanlitiesTest.setNationalities(Lists.newArrayList("Argentina", "Germany", "Brazil"));

		Mockito.when(utilitiesRepositoryImpl.getNationalities()).thenReturn(natioanlitiesTest);

		nationalities = underTest.getNationalities();
	}

	private void thenNationalitiesWereCreated() {
		Assert.assertTrue(flag);
	}

	private void whenInsertNationalitiesIsCalled() {
		Mockito.when(utilitiesRepositoryImpl.insertNationalities(nationalities)).thenReturn(true);

		flag = underTest.insertNationalities(nationalities);
	}

	private void givenANationalities() {
		nationalities = new Nationalities();
	}

}
