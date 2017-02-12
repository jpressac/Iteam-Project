package org.iteam.data.dal.team;

import java.util.Iterator;
import java.util.List;

import org.assertj.core.util.Lists;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.iteam.configuration.ExternalConfigurationProperties;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.dto.Filter;
import org.iteam.data.dto.Team;
import org.iteam.data.dto.UserDTO;
import org.iteam.data.model.FilterList;
import org.iteam.data.model.TeamModel;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.util.ObjectUtils;

public class TeamRepositoryImplTest {

    @InjectMocks
    private TeamRepositoryImpl underTest;

    @Mock
    private ElasticsearchClientImpl elasticsearchClientImpl;

    @Mock
    private ExternalConfigurationProperties configuration;

    private static final String JSON_REPRESNTATION_USER = "{\"username\":\"iteam\"}";
    private static final String JSON_REPRESNTATION_TEAM = "{\"ownerName\":\"iteam\", \"name\":\"testIteam\"}";

    private boolean flag;
    private String ownerName;
    private String teamName;
    private FilterList filterList;
    private List<UserDTO> userList;
    private List<TeamModel> teamList;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void insertNewTeamSuccessfully() {
        givenAnElasticsearchClientResponseOk();
        whenPutTeamIsCalled();
        thenTeamWasCreated();
    }

    @Test
    public void insertNewTeamNotSuccessfully() {
        givenAnElasticsearchClientResponseFailure();
        whenPutTeamIsCalled();
        thenTeamWasntCreated();
    }

    @Test
    public void deleteTeamSuccessfully() {
        givenAnOwnerName();
        givenATeamName();
        givenAnElasticsearchClientSearchDeleteOk();
        whenDeleteTeamIsCalled();
        thenTeamWasDeleted();
    }

    @Test
    public void deleteTeamNotSuccessfullySearchError() {
        givenAnOwnerName();
        givenATeamName();
        givenAnElasticsearchClientSearchFailure();
        whenDeleteTeamIsCalled();
        thenTeamWasntDeleted();
    }

    @Test
    public void deleteTeamNotSuccessfullyDeleteFailure() {
        givenAnOwnerName();
        givenATeamName();
        givenAnElasticsearchClientDeleteFailure();
        whenDeleteTeamIsCalled();
        thenTeamWasntDeleted();
    }

    @Test
    public void filterParticipantsSuccessfully() {
        givenAFilterList();
        givenAnElasticsearchSearchResponseOk(JSON_REPRESNTATION_USER);
        whenFilterToCreateTeamIsCalled();
        thenListOfUsersOk();
    }

    @Test
    public void filterParticipantsNotSuccessfulNull() {
        givenAFilterList();
        givenAnElasticsearchSearchResponseNull();
        whenFilterToCreateTeamIsCalled();
        thenListOfUsersNull();
    }

    @Test
    public void filterParticipantsNotSuccessful() {
        givenAFilterList();
        givenAnElasticsearchSearchResponseNotHits();
        whenFilterToCreateTeamIsCalled();
        thenListOfUsersNull();
    }

    @Test
    public void getTeamsSuccessful() {
        givenAnOwnerName();
        givenAnElasticsearchSearchResponseOk(JSON_REPRESNTATION_TEAM);
        // whenGetTeamsIsCalled();
        // thenListOfTeamsNotEmpty();
    }

    @Test
    public void getTeamNotSuccessfulNull() {
        givenAnOwnerName();
        givenAnElasticsearchSearchResponseNull();
        // whenGetTeamsIsCalled();
        thenListOfTeamsIsEmpty();
    }

    @Test
    public void getTeamNotSuccessful() {
        givenAnOwnerName();
        givenAnElasticsearchSearchResponseNotHits();
        // whenGetTeamsIsCalled();
        thenListOfTeamsIsEmpty();
    }

    private void thenListOfTeamsIsEmpty() {
        Assert.assertTrue(ObjectUtils.isEmpty(teamList));
    }

    private void thenListOfTeamsNotEmpty() {
        Assert.assertFalse(ObjectUtils.isEmpty(teamList));
    }

    /*
     * private void whenGetTeamsIsCalled() { teamList =
     * underTest.getTeams(ownerName); }
     */

    private void givenAnElasticsearchSearchResponseNotHits() {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        SearchHits searchHits = Mockito.mock(SearchHits.class);

        @SuppressWarnings("unchecked")
        Iterator<SearchHit> hitIterator = Mockito.mock(Iterator.class);

        Mockito.when(response.getHits()).thenReturn(searchHits);
        Mockito.when(searchHits.iterator()).thenReturn(hitIterator);
        Mockito.when(hitIterator.hasNext()).thenReturn(false);

        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject())).thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClientImpl);
    }

    private void givenAnElasticsearchSearchResponseNull() {
        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject())).thenReturn(null);

        ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClientImpl);
    }

    private void thenListOfUsersNull() {
        Assert.assertEquals(0, userList.size());
    }

    private void thenListOfUsersOk() {
        Assert.assertEquals(1, userList.size());
        Assert.assertEquals("iteam", userList.get(0).getUsername());
    }

    private void whenFilterToCreateTeamIsCalled() {
        userList = underTest.filterToCreateTeam(filterList);
    }

    private void givenAnElasticsearchSearchResponseOk(String jsonRepresentation) {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        SearchHits searchHits = Mockito.mock(SearchHits.class);
        SearchHit hit = Mockito.mock(SearchHit.class);

        @SuppressWarnings("unchecked")
        Iterator<SearchHit> hitIterator = Mockito.mock(Iterator.class);

        Mockito.when(response.getHits()).thenReturn(searchHits);
        Mockito.when(searchHits.iterator()).thenReturn(hitIterator);
        Mockito.when(hitIterator.hasNext()).thenReturn(true, false);
        Mockito.when(hitIterator.next()).thenReturn(hit);
        Mockito.when(hit.getSourceAsString()).thenReturn(jsonRepresentation);

        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject())).thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClientImpl);

    }

    private void givenAFilterList() {
        filterList = new FilterList();
        filterList.addFilter(new Filter("nationality", Lists.newArrayList("Argentina", "Germany")));
    }

    private void givenAnElasticsearchClientDeleteFailure() {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        SearchHits searchHits = Mockito.mock(SearchHits.class);
        SearchHit hit = Mockito.mock(SearchHit.class);

        Mockito.when(response.getHits()).thenReturn(searchHits);
        Mockito.when(searchHits.getTotalHits()).thenReturn(1l);
        Mockito.when(searchHits.getAt(0)).thenReturn(hit);
        Mockito.when(hit.getId()).thenReturn("12345-abcde");

        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject())).thenReturn(response);

        DeleteResponse deleteResponse = Mockito.mock(DeleteResponse.class);

        Mockito.when(deleteResponse.isFound()).thenReturn(false);

        Mockito.when(elasticsearchClientImpl.delete(Mockito.anyString(), Mockito.anyString(), Mockito.anyString()))
                .thenReturn(deleteResponse);

        ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClientImpl);
    }

    private void thenTeamWasntDeleted() {
        Assert.assertFalse(flag);
    }

    private void givenAnElasticsearchClientSearchFailure() {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        SearchHits searchHits = Mockito.mock(SearchHits.class);
        SearchHit hit = Mockito.mock(SearchHit.class);

        Mockito.when(response.getHits()).thenReturn(searchHits);
        Mockito.when(searchHits.getTotalHits()).thenReturn(0l);
        Mockito.when(searchHits.getAt(0)).thenReturn(hit);
        Mockito.when(hit.getId()).thenReturn("12345-abcde");

        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject())).thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClientImpl);
    }

    private void whenDeleteTeamIsCalled() {
        flag = underTest.deleteTeam(ownerName, teamName);
    }

    private void givenAnElasticsearchClientSearchDeleteOk() {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        SearchHits searchHits = Mockito.mock(SearchHits.class);
        SearchHit hit = Mockito.mock(SearchHit.class);

        Mockito.when(response.getHits()).thenReturn(searchHits);
        Mockito.when(searchHits.getTotalHits()).thenReturn(1l);
        Mockito.when(searchHits.getAt(0)).thenReturn(hit);
        Mockito.when(hit.getId()).thenReturn("12345-abcde");

        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject())).thenReturn(response);

        DeleteResponse deleteResponse = Mockito.mock(DeleteResponse.class);

        Mockito.when(deleteResponse.isFound()).thenReturn(true);

        Mockito.when(elasticsearchClientImpl.delete(Mockito.anyString(), Mockito.anyString(), Mockito.anyString()))
                .thenReturn(deleteResponse);

        ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClientImpl);
    }

    private void thenTeamWasDeleted() {
        Assert.assertTrue(flag);
    }

    private void givenATeamName() {
        teamName = "iteam";
    }

    private void givenAnOwnerName() {
        ownerName = "Iteam";
    }

    private void givenAnElasticsearchClientResponseFailure() {
        IndexResponse response = Mockito.mock(IndexResponse.class);

        Mockito.when(response.isCreated()).thenReturn(false);

        Mockito.when(elasticsearchClientImpl.insertData(Mockito.anyString(), Mockito.anyString(), Mockito.anyString(),
                Mockito.anyString())).thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClientImpl);
    }

    private void thenTeamWasntCreated() {
        Assert.assertFalse(flag);
    }

    private void thenTeamWasCreated() {
        Assert.assertTrue(flag);
    }

    private void whenPutTeamIsCalled() {

        Team team = new Team();

        flag = underTest.putTeam(team);
    }

    private void givenAnElasticsearchClientResponseOk() {
        IndexResponse response = Mockito.mock(IndexResponse.class);

        Mockito.when(response.isCreated()).thenReturn(true);

        Mockito.when(elasticsearchClientImpl.insertData(Mockito.anyString(), Mockito.anyString(), Mockito.anyString(),
                Mockito.anyString())).thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClientImpl);
    }

}