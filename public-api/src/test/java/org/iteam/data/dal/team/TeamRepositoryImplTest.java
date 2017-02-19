package org.iteam.data.dal.team;

import java.util.Iterator;
import java.util.List;

import org.assertj.core.util.Lists;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.iteam.configuration.ExternalConfigurationProperties;
import org.iteam.configuration.StringUtilities;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.dto.Filter;
import org.iteam.data.dto.Team;
import org.iteam.data.dto.UserDTO;
import org.iteam.data.model.FilterList;
import org.iteam.data.model.TeamModel;
import org.iteam.data.model.TeamUserModel;
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
    private static final String JSON_REPRESENTATION_MEETING = "{\"topic\":\"juan\", \"teamName\":\"54646-64654-65465\"}";
    private static final String JSON_REPRESNTATION_TEAM_FOR_SEARCH = "{\"ownerName\":\"iteam\", \"name\":\"54646-64654-65465\", \"members\":[\"juan\", \"juanGroso\"]}";

    private boolean flag;
    private String ownerName;
    private String teamName;
    private FilterList filterList;
    private List<UserDTO> userList;
    private List<TeamModel> teamList;

    private String meetingId;

    private TeamUserModel teamUserModel;

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
    public void filterParticipantsSuccessfullyNationality() {
        givenAFilterList("Nationality", Lists.newArrayList("Argentina", "Germany"));
        givenAnElasticsearchResponseForFilters(JSON_REPRESNTATION_USER, 1);
        whenFilterToCreateTeamIsCalled();
        thenListOfUsersOk();
    }

    @Test
    public void filterParticipantsSuccessfullyAge() {
        givenAFilterList("Age", Lists.newArrayList("89", "45"));
        givenAnElasticsearchResponseForFilters(JSON_REPRESNTATION_USER, 1);
        whenFilterToCreateTeamIsCalled();
        thenListOfUsersOk();
    }

    @Test
    public void filterParticipantsSuccessfullyProfession() {
        givenAFilterList("Profession", Lists.newArrayList("Student", "Engineer"));
        givenAnElasticsearchResponseForFilters(JSON_REPRESNTATION_USER, 1);
        whenFilterToCreateTeamIsCalled();
        thenListOfUsersOk();
    }

    @Test
    public void filterParticipantsSuccessfullyScoring() {
        givenAFilterList("Scoring", Lists.newArrayList("150", "589"));
        givenAnElasticsearchResponseForFilters(JSON_REPRESNTATION_USER, 1);
        whenFilterToCreateTeamIsCalled();
        thenListOfUsersOk();
    }

    @Test
    public void filterParticipantsNotSuccessful() {
        givenAFilterList("Nationality", Lists.newArrayList("Argentina", "Germany"));
        givenAnElasticsearchResponseForFilters(JSON_REPRESNTATION_USER, 0);
        whenFilterToCreateTeamIsCalled();
        thenListOfUsersNull();
    }

    @Test
    public void getTeamsSuccessful() {
        givenAnOwnerName();
        givenAnElasticsearchSearchResponseOk(JSON_REPRESNTATION_TEAM, 1);
        whenGetTeamsIsCalled();
        thenListOfTeamsNotEmpty();
    }

    @Test
    public void getTeamNotSuccessful() {
        givenAnOwnerName();
        givenAnElasticsearchSearchResponseNotHits();
        whenGetTeamsIsCalled();
        thenListOfTeamsIsEmpty();
    }

    @Test
    public void getTeamUserByMeetingSuccess() {
        givenAMeetingId();
        givenAGetDocumentResponse(StringUtilities.INDEX_MEETING, JSON_REPRESENTATION_MEETING, true);
        givenAGetDocumentResponse(StringUtilities.INDEX_TEAM, JSON_REPRESNTATION_TEAM_FOR_SEARCH, true);
        givenAnElasticsearchResponseForFilters(JSON_REPRESNTATION_USER, 1);
        whenGetTeamUserByMeetingIsCalled();
        thenVerifyGetMeetingCall(1);
        thenVerifyGetTeamCall(1);
        thenVerifySearchCall(1);
        thenVerifyUsers(1);
    }

    @Test
    public void getTeamUserByMeetingNoMeeting() {
        givenAMeetingId();
        givenAGetDocumentResponse(StringUtilities.INDEX_MEETING, JSON_REPRESENTATION_MEETING, false);
        givenAGetDocumentResponse(StringUtilities.INDEX_TEAM, JSON_REPRESNTATION_TEAM_FOR_SEARCH, true);
        givenAnElasticsearchResponseForFilters(JSON_REPRESNTATION_USER, 1);
        whenGetTeamUserByMeetingIsCalled();
        thenVerifyGetMeetingCall(1);
        thenVerifyGetTeamCall(0);
        thenVerifySearchCall(0);
        thenVerifyUsesNull();
    }

    @Test
    public void getTeamUserByMeetingNoTeam() {
        givenAMeetingId();
        givenAGetDocumentResponse(StringUtilities.INDEX_MEETING, JSON_REPRESENTATION_MEETING, true);
        givenAGetDocumentResponse(StringUtilities.INDEX_TEAM, JSON_REPRESNTATION_TEAM_FOR_SEARCH, false);
        givenAnElasticsearchResponseForFilters(JSON_REPRESNTATION_USER, 1);
        whenGetTeamUserByMeetingIsCalled();
        thenVerifyGetMeetingCall(1);
        thenVerifyGetTeamCall(1);
        thenVerifySearchCall(0);
        thenVerifyUsesNull();
    }

    @Test
    public void getTeamUserByMeetingNoUsers() {
        givenAMeetingId();
        givenAGetDocumentResponse(StringUtilities.INDEX_MEETING, JSON_REPRESENTATION_MEETING, true);
        givenAGetDocumentResponse(StringUtilities.INDEX_TEAM, JSON_REPRESNTATION_TEAM_FOR_SEARCH, true);
        givenAnElasticsearchResponseForFilters(JSON_REPRESNTATION_USER, 0);
        whenGetTeamUserByMeetingIsCalled();
        thenVerifyGetMeetingCall(1);
        thenVerifyGetTeamCall(1);
        thenVerifySearchCall(1);
        thenVerifyUsers(0);
    }

    /* THEN */

    private void thenVerifyUsesNull() {
        Assert.assertNull(teamUserModel.getTeamUsers());
    }

    private void thenVerifyUsers(int size) {
        Assert.assertEquals(size, teamUserModel.getTeamUsers().size());
    }

    private void thenVerifySearchCall(int times) {
        Mockito.verify(elasticsearchClientImpl, Mockito.times(times)).search(Mockito.anyString(), Mockito.anyObject());
    }

    private void thenVerifyGetTeamCall(int times) {
        Mockito.verify(elasticsearchClientImpl, Mockito.times(times))
                .getDocument(Mockito.eq(StringUtilities.INDEX_TEAM), Mockito.anyString(), Mockito.anyString());
    }

    private void thenVerifyGetMeetingCall(int times) {
        Mockito.verify(elasticsearchClientImpl, Mockito.times(times))
                .getDocument(Mockito.eq(StringUtilities.INDEX_MEETING), Mockito.anyString(), Mockito.anyString());
    }

    private void thenTeamWasntDeleted() {
        Assert.assertFalse(flag);
    }

    private void thenListOfUsersNull() {
        Assert.assertEquals(0, userList.size());
    }

    private void thenListOfUsersOk() {
        Assert.assertEquals(1, userList.size());
        Assert.assertEquals("iteam", userList.get(0).getUsername());
    }

    private void thenListOfTeamsIsEmpty() {
        Assert.assertTrue(ObjectUtils.isEmpty(teamList));
    }

    private void thenListOfTeamsNotEmpty() {
        Assert.assertFalse(ObjectUtils.isEmpty(teamList));
    }

    private void thenTeamWasDeleted() {
        Assert.assertTrue(flag);
    }

    private void thenTeamWasntCreated() {
        Assert.assertFalse(flag);
    }

    private void thenTeamWasCreated() {
        Assert.assertTrue(flag);
    }

    /* WHEN */

    private void whenGetTeamUserByMeetingIsCalled() {
        teamUserModel = underTest.getTeamUsersByMeeting(meetingId);
    }

    private void whenPutTeamIsCalled() {

        Team team = new Team();

        flag = underTest.putTeam(team);
    }

    private void whenFilterToCreateTeamIsCalled() {
        userList = underTest.filterToCreateTeam(filterList);
    }

    private void whenDeleteTeamIsCalled() {
        flag = underTest.deleteTeam(ownerName, teamName);
    }

    private void whenGetTeamsIsCalled() {
        teamList = underTest.getTeamsByToken(ownerName, "token", 10, 10).getModel();
    }

    /* GIVEN */

    private void givenAGetDocumentResponse(String index, String jsonRepresentation, boolean exists) {
        GetResponse response = Mockito.mock(GetResponse.class);

        Mockito.when(response.isExists()).thenReturn(exists);
        Mockito.when(response.getSourceAsString()).thenReturn(jsonRepresentation);

        Mockito.when(elasticsearchClientImpl.getDocument(Mockito.eq(index), Mockito.anyString(), Mockito.anyString()))
                .thenReturn(response);

    }

    private void givenAMeetingId() {
        meetingId = "546579879-8798789";
    }

    private void givenAnElasticsearchSearchResponseNotHits() {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        SearchHits searchHits = Mockito.mock(SearchHits.class);

        @SuppressWarnings("unchecked")
        Iterator<SearchHit> hitIterator = Mockito.mock(Iterator.class);

        Mockito.when(response.getHits()).thenReturn(searchHits);
        Mockito.when(searchHits.iterator()).thenReturn(hitIterator);
        Mockito.when(hitIterator.hasNext()).thenReturn(false);

        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject(), Mockito.anyInt(),
                Mockito.anyInt())).thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClientImpl);
    }

    private void givenAnElasticsearchResponseForFilters(String jsonRepresentation, long totalHits) {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        SearchHits searchHits = Mockito.mock(SearchHits.class);
        SearchHit hit = Mockito.mock(SearchHit.class);

        @SuppressWarnings("unchecked")
        Iterator<SearchHit> hitIterator = Mockito.mock(Iterator.class);

        Mockito.when(response.getHits()).thenReturn(searchHits);
        Mockito.when(searchHits.getTotalHits()).thenReturn(totalHits);
        Mockito.when(searchHits.iterator()).thenReturn(hitIterator);
        Mockito.when(hitIterator.hasNext()).thenReturn(true, false);
        Mockito.when(hitIterator.next()).thenReturn(hit);
        Mockito.when(hit.getSourceAsString()).thenReturn(jsonRepresentation);

        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject())).thenReturn(response);
    }

    private void givenAnElasticsearchSearchResponseOk(String jsonRepresentation, long totalHits) {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        SearchHits searchHits = Mockito.mock(SearchHits.class);
        SearchHit hit = Mockito.mock(SearchHit.class);

        @SuppressWarnings("unchecked")
        Iterator<SearchHit> hitIterator = Mockito.mock(Iterator.class);

        Mockito.when(response.getHits()).thenReturn(searchHits);
        Mockito.when(searchHits.getTotalHits()).thenReturn(totalHits);
        Mockito.when(searchHits.iterator()).thenReturn(hitIterator);
        Mockito.when(hitIterator.hasNext()).thenReturn(true, false);
        Mockito.when(hitIterator.next()).thenReturn(hit);
        Mockito.when(hit.getSourceAsString()).thenReturn(jsonRepresentation);

        Mockito.when(elasticsearchClientImpl.search(Mockito.anyString(), Mockito.anyObject(), Mockito.anyInt(),
                Mockito.anyInt())).thenReturn(response);
    }

    private void givenAFilterList(String filterName, List<String> filters) {
        filterList = new FilterList();
        filterList.addFilter(new Filter(filterName, filters));
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

    private void givenAnElasticsearchClientResponseOk() {
        IndexResponse response = Mockito.mock(IndexResponse.class);

        Mockito.when(response.isCreated()).thenReturn(true);

        Mockito.when(elasticsearchClientImpl.insertData(Mockito.anyString(), Mockito.anyString(), Mockito.anyString(),
                Mockito.anyString())).thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClientImpl);
    }

}