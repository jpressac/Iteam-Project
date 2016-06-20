package org.iteam.data.dal.utilities;

import org.assertj.core.util.Lists;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.iteam.configuration.ExternalConfigurationProperties;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.model.Nationalities;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.util.ReflectionTestUtils;

public class UtilitiesRepositoryImplTest {

	@InjectMocks
	private UtilitiesRepositoryImpl underTest;

	@Mock
	private ElasticsearchClientImpl elasticsearchClient;

	@Mock
	private ExternalConfigurationProperties configuration;

	private static final String NATIONALITIES_AS_JSON = "{\"nationalities\":[\"Argentina\", \"Germany\", \"Brazil\"]}";
	private boolean flag;
	private Nationalities nationalities;

	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
	}

	@Test
	public void insertNationalitiesSuccessful() {
		givenNationalities();
		givenAnElasticsearchIndexResponseOk();
		whenInsertNationalitiesIsCalled();
		thenNationalitiesWereCreated();
	}

	@Test
	public void insertNationalitiesNotSuccessfulNull() {
		givenNationalities();
		givenAnElasticsearchIndexResponseNull();
		whenInsertNationalitiesIsCalled();
		thenNationalitiesWerentCreated();
	}

	@Test
	public void insertNationalitiesNotSuccessfulFailure() {
		givenNationalities();
		givenAnElasticsearchIndexResponseFailure();
		whenInsertNationalitiesIsCalled();
		thenNationalitiesWerentCreated();
	}

	@Test
	public void getNationalitiesSuccessful() {
		givenAnElasticsearchGetResponseNatOk();
		whenGetNationalitiesIsCalled();
		thenNationalitiesWere3();
	}

	@Test
	public void getNationalitiesNotSuccessfulNull() {
		givenAnElasticsearchGetResponseNull();
		whenGetNationalitiesIsCalled();
		thenNationalitiesWereNull();
	}

	@Test
	public void getNationalitiesNotSuccessfulFailure() {
		givenAnElasticsearchGetResponseFailure();
		whenGetNationalitiesIsCalled();
		thenNationalitiesWereNull();
	}

	private void givenAnElasticsearchGetResponseFailure() {
		givenAnElasticsearchGetResponse(false);
	}

	private void givenAnElasticsearchGetResponseNull() {
		Mockito.when(elasticsearchClient.getDocument(Mockito.anyString(), Mockito.anyString(), Mockito.anyString()))
				.thenReturn(null);

		ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClient);
	}

	private void givenAnElasticsearchIndexResponseNull() {
		Mockito.when(elasticsearchClient.insertData(Mockito.anyString(), Mockito.anyString(), Mockito.anyString(),
				Mockito.anyString())).thenReturn(null);

		ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClient);
	}

	private void givenAnElasticsearchIndexResponseFailure() {
		givenAnElasticsearchIndexResponse(false);
	}

	private void whenGetNationalitiesIsCalled() {
		nationalities = underTest.getNationalities();
	}

	private void whenInsertNationalitiesIsCalled() {
		flag = underTest.insertNationalities(nationalities);
	}

	private void thenNationalitiesWereNull() {
		Assert.assertNull(nationalities);
	}

	private void thenNationalitiesWere3() {
		Assert.assertEquals(3, nationalities.getNationalities().size());
		Assert.assertTrue(nationalities.getNationalities().contains("Argentina"));
		Assert.assertTrue(nationalities.getNationalities().contains("Germany"));
		Assert.assertTrue(nationalities.getNationalities().contains("Brazil"));
	}

	private void givenAnElasticsearchGetResponseNatOk() {
		GetResponse response = Mockito.mock(GetResponse.class);

		Mockito.when(response.getSourceAsString()).thenReturn(NATIONALITIES_AS_JSON);

		Mockito.when(response.isExists()).thenReturn(true);

		Mockito.when(elasticsearchClient.getDocument(Mockito.anyString(), Mockito.anyString(), Mockito.anyString()))
				.thenReturn(response);

		ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClient);
	}

	private void thenNationalitiesWerentCreated() {
		Assert.assertFalse(flag);
	}

	private void thenNationalitiesWereCreated() {
		Assert.assertTrue(flag);
	}

	private void givenNationalities() {
		nationalities = new Nationalities();
		nationalities.setNationalities(Lists.newArrayList("Argentina", "Germany", "Brazil"));
	}

	private void givenAnElasticsearchIndexResponseOk() {
		givenAnElasticsearchIndexResponse(true);
	}

	private void givenAnElasticsearchIndexResponse(boolean flag) {
		IndexResponse response = Mockito.mock(IndexResponse.class);

		Mockito.when(response.isCreated()).thenReturn(flag);

		Mockito.when(elasticsearchClient.insertData(Mockito.anyString(), Mockito.anyString(), Mockito.anyString(),
				Mockito.anyString())).thenReturn(response);

		ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClient);
	}

	private void givenAnElasticsearchGetResponse(boolean flag) {
		GetResponse response = Mockito.mock(GetResponse.class);

		Mockito.when(response.isExists()).thenReturn(flag);

		Mockito.when(elasticsearchClient.getDocument(Mockito.anyString(), Mockito.anyString(), Mockito.anyString()))
				.thenReturn(response);

		ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClient);
	}
}
