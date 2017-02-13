package org.iteam.data.dal.utilities;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.assertj.core.util.Lists;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.search.aggregations.Aggregations;
import org.elasticsearch.search.aggregations.bucket.terms.Terms;
import org.elasticsearch.search.aggregations.bucket.terms.Terms.Bucket;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.dto.Nationalities;
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

    private static final String NATIONALITIES_AS_JSON = "{\"nationalities\":[\"Argentina\", \"Germany\", \"Brazil\"]}";
    private boolean flag;
    private Nationalities nationalities;
    private List<String> professionList = new ArrayList<>();

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

    @Test
    public void getProfessionsSuccessful() {
        givenAnElasticsearchSearchResponseOk();
        whenGetProfessionsIsCalled();
        thenProfessionsHas();
    }

    @Test
    public void getProfessionsNotSuccessful() {
        givenAnElasticsearchResponseNull();
        whenGetProfessionsIsCalled();
        thenProfessionsIsEmpty();
    }

    @Test
    public void getProfessionsNotSuccessfulFailure() {
        givenAnElasticserachResponseFailure();
        whenGetProfessionsIsCalled();
        thenProfessionsIsEmpty();
    }

    private void givenAnElasticserachResponseFailure() {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        Aggregations aggregations = Mockito.mock(Aggregations.class);
        Terms terms = Mockito.mock(Terms.class);

        List<Bucket> bucketList = new ArrayList<>();

        @SuppressWarnings("unchecked")
        Iterator<Bucket> bucketIterator = Mockito.mock(Iterator.class);

        Mockito.when(response.getAggregations()).thenReturn(aggregations);
        Mockito.when(aggregations.get(Mockito.anyString())).thenReturn(terms);
        Mockito.when(terms.getBuckets()).thenReturn(bucketList);
        Mockito.when(bucketIterator.hasNext()).thenReturn(false);

        // Mockito.when(elasticsearchClient.search(Mockito.anyString(),
        // Mockito.anyObject(), Mockito.anyObject(),
        // Mockito.anyInt())).thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClient);

    }

    private void thenProfessionsIsEmpty() {
        Assert.assertTrue(professionList.isEmpty());
    }

    private void givenAnElasticsearchResponseNull() {
        // Mockito.when(elasticsearchClient.search(Mockito.anyString(),
        // Mockito.anyObject(), Mockito.anyObject(),
        // Mockito.anyInt())).thenReturn(null);

        ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClient);
    }

    private void thenProfessionsHas() {
        Assert.assertFalse(professionList.isEmpty());
        Assert.assertTrue(professionList.contains("Estudiante"));
        Assert.assertTrue(professionList.contains("Software Engineer"));
    }

    private void whenGetProfessionsIsCalled() {
        professionList = underTest.getProfessions();
    }

    private void givenAnElasticsearchSearchResponseOk() {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        Aggregations aggregations = Mockito.mock(Aggregations.class);
        Terms terms = Mockito.mock(Terms.class);
        Bucket bucket = Mockito.mock(Bucket.class);
        Bucket bucket2 = Mockito.mock(Bucket.class);

        List<Bucket> bucketList = new ArrayList<>();
        bucketList.add(bucket);
        bucketList.add(bucket2);

        @SuppressWarnings("unchecked")
        Iterator<Bucket> bucketIterator = Mockito.mock(Iterator.class);

        Mockito.when(response.getAggregations()).thenReturn(aggregations);
        Mockito.when(aggregations.get(Mockito.anyString())).thenReturn(terms);
        Mockito.when(terms.getBuckets()).thenReturn(bucketList);
        Mockito.when(bucketIterator.hasNext()).thenReturn(true, true, false);
        Mockito.when(bucketIterator.next()).thenReturn(bucket, bucket2);
        Mockito.when(bucket.getKeyAsString()).thenReturn("Estudiante");
        Mockito.when(bucket2.getKeyAsString()).thenReturn("Software Engineer");

        // Mockito.when(elasticsearchClient.search(Mockito.anyString(),
        // Mockito.anyObject(), Mockito.anyObject(),
        // Mockito.anyInt())).thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClient);
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
