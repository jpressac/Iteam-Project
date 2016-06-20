package org.iteam.services.utilities;

import org.assertj.core.util.Lists;
import org.iteam.data.dal.utilities.UtilitiesRepositoryImpl;
import org.iteam.data.model.Nationalities;
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
