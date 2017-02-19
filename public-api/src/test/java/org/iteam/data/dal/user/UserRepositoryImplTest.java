package org.iteam.data.dal.user;

import java.util.ArrayList;
import java.util.List;

import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.dto.Idea;
import org.iteam.data.dto.UserDTO;
import org.iteam.data.model.IdeasDTO;
import org.iteam.exceptions.JsonParsingException;
import org.joda.time.DateTime;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.test.util.ReflectionTestUtils;

import com.google.common.collect.Lists;

public class UserRepositoryImplTest {

    @InjectMocks
    private UserRepositoryImpl underTest;

    @Mock
    private ElasticsearchClientImpl elasticsearchClient;

    private static final String USER_AS_JSON = "{\"username\":\"iteam\",\"password\":\"password\",\"name\":\"iteamProject\"}";

    private UserDTO user;
    private String username;
    private boolean flag;
    private List<String> userList;
    private IdeasDTO ideaDTO;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void getUserSuccessful() {
        givenAUsername();
        givenAnElasticsearchResponseOk();
        whenGetUserIsCalled();
        thenUserIsOk();
    }

    @Test
    public void getUserNotSuccessfulResponseNull() {
        givenAUsername();
        givenAnElasticsearchResponseNull();
        whenGetUserIsCalled();
        thenUserIsNull();
    }

    @Test
    public void getUserNotSuccessfulResponseFailure() {
        givenAUsername();
        givenAnElasticsearchResponseFailure();
        whenGetUserIsCalled();
        thenUserIsNull();
    }

    @Test
    public void setUserSuccessful() {
        givenANewUser("male");
        givenAnElasticsearchIndexResponseOk();
        whenSetUserIsCalled();
        thenVerifyInsertUserCalls(1);
    }

    private void thenVerifyInsertUserCalls(int times) {
        Mockito.verify(elasticsearchClient, Mockito.times(times)).insertData(Mockito.anyString(), Mockito.anyString(),
                Mockito.anyString(), Mockito.anyString());
    }

    @Test
    public void setUserNotSuccessfulFailure() {
        givenANewUser("female");
        givenAnElasticsearchIndexResponseFailure();
        whenSetUserIsCalled();

    }

    @Test(expected = JsonParsingException.class)
    public void checkGenderUserFailed() {
        givenANewUser("hola");
        whenSetUserIsCalled();
        thenUserWasntInserted();
    }

    @Test
    public void checkUserExitenceSuccessful() {
        givenAUsername();
        givenAnElasticsearchGetResponseOk();
        whenCheckUserExistenceIsCalled();
        thenUserExists();
    }

    @Test
    public void checkUserExistenceResponseFailure() {
        givenAUsername();
        givenAnElasticsearchGetResponseFailure();
        whenCheckUserExistenceIsCalled();
        thenUserNotExists();
    }

    @Test
    public void modifyUserSuccess() {
        givenAUser("password");
        givenAUsername();
        givenAnElasticsearchUpdateResponse();
        givenAnELasticsearchUserResponse(USER_AS_JSON, true);
        whenModifyUserIsCalled();
        thenVerifyCallsModify(1);
        thenVerifyCallsGetDocument(1);
    }

    @Test
    public void modifyUserNotValidPassword() {
        givenAUser("test");
        givenAUsername();
        givenAnElasticsearchUpdateResponse();
        givenAnELasticsearchUserResponse(USER_AS_JSON, false);
        whenModifyUserIsCalled();
        thenVerifyCallsModify(1);
        thenVerifyCallsGetDocument(1);
    }

    @Test
    public void modifyUserNoPasswordToChange() {
        givenAUser("");
        givenAUsername();
        givenAnElasticsearchUpdateResponse();
        givenAnELasticsearchUserResponse(USER_AS_JSON, true);
        whenModifyUserIsCalled();
        thenVerifyCallsModify(1);
        thenVerifyCallsGetDocument(0);
    }

    @Test
    public void calculateScore() {
        givenAnIdeaList();
        givenAListOfUsers();
        givenAnElasticsearchBulkUpdate();
        whenGenerateScoreIsCalled();
        thenVerifyCalls();
    }

    private void thenVerifyCalls() {
        // TODO: we should use ArgumentCaptor to verify the update score
        Mockito.verify(elasticsearchClient, Mockito.times(1)).updateScore(Mockito.anyObject(), Mockito.anyString(),
                Mockito.anyString());
    }

    private void whenGenerateScoreIsCalled() {
        underTest.generateScore(ideaDTO, userList);
    }

    private void givenAnElasticsearchBulkUpdate() {
        BulkResponse response = Mockito.mock(BulkResponse.class);

        Mockito.when(elasticsearchClient.updateScore(Mockito.anyObject(), Mockito.anyString(), Mockito.anyString()))
                .thenReturn(response);
    }

    private void givenAListOfUsers() {
        userList = Lists.newArrayList("juan", "juan3");
    }

    private void givenAnIdeaList() {
        // Idea for tag test
        Idea idea1 = new Idea();
        idea1.setTag("test");
        idea1.setTitle("juan test");
        idea1.setUsername("juan");
        idea1.setRanking(5);

        // Idea for tag test2
        Idea idea2 = new Idea();
        idea2.setTag("test2");
        idea2.setTitle("juan test2");
        idea2.setUsername("juan");
        idea2.setRanking(10);

        // Idea for tag test3
        Idea idea3 = new Idea();
        idea3.setTag("test3");
        idea3.setTitle("juan test3");
        idea3.setUsername("juan2");
        idea3.setRanking(60);

        List<Idea> ideasList = new ArrayList<>();
        ideasList.add(idea1);
        ideasList.add(idea2);
        ideasList.add(idea3);

        ideaDTO = new IdeasDTO(ideasList, DateTime.now().toString());

    }

    private void whenModifyUserIsCalled() {
        underTest.modifyUser(user, username);
    }

    private void thenVerifyCallsGetDocument(int times) {
        Mockito.verify(elasticsearchClient, Mockito.times(times)).getDocument(Mockito.anyString(), Mockito.anyString(),
                Mockito.anyString());
    }

    private void givenAnELasticsearchUserResponse(String userAsJson, boolean exists) {
        GetResponse response = Mockito.mock(GetResponse.class);

        Mockito.when(response.isExists()).thenReturn(exists);
        Mockito.when(response.getSourceAsString()).thenReturn(userAsJson);

        Mockito.when(elasticsearchClient.getDocument(Mockito.anyString(), Mockito.anyString(), Mockito.anyString()))
                .thenReturn(response);
    }

    private void thenVerifyCallsModify(int times) {
        Mockito.verify(elasticsearchClient, Mockito.times(times)).modifyData(Mockito.anyString(), Mockito.anyString(),
                Mockito.anyString(), Mockito.anyString());
    }

    private void givenAnElasticsearchUpdateResponse() {

        UpdateResponse response = Mockito.mock(UpdateResponse.class);

        Mockito.when(elasticsearchClient.modifyData(Mockito.anyString(), Mockito.anyString(), Mockito.anyString(),
                Mockito.anyString())).thenReturn(response);
    }

    private void givenAUser(String password) {
        user = new UserDTO();
        user.setPassword(password);
    }

    /* THEN */

    private void thenUserNotExists() {
        Assert.assertFalse(flag);
    }

    private void thenUserExists() {
        Assert.assertTrue(flag);
    }

    private void thenUserWasntInserted() {
        Assert.assertFalse(flag);
    }

    private void thenUserIsOk() {
        Assert.assertEquals(username, user.getUsername());
        Assert.assertEquals("iteamProject", user.getName());
    }

    private void thenUserIsNull() {
        Assert.assertNull(user);
    }

    /* WHEN */

    private void whenCheckUserExistenceIsCalled() {
        flag = underTest.checkUserExistance(username);
    }

    private void whenSetUserIsCalled() {
        underTest.setUser(user);
    }

    private void whenGetUserIsCalled() {
        user = underTest.getUser(username);
    }

    /* GIVEN */

    private void givenAnElasticsearchGetResponseFailure() {
        givenAnElasticsearchGetResponse(false);
    }

    private void givenAnElasticsearchGetResponseOk() {
        givenAnElasticsearchGetResponse(true);
    }

    private void givenAnElasticsearchIndexResponseFailure() {
        givenAnElasticsearchIndexResponse(false);
    }

    private void givenAnElasticsearchIndexResponseOk() {
        givenAnElasticsearchIndexResponse(true);
    }

    private void givenANewUser(String gender) {
        user = new UserDTO();
        user.setUsername("iteam");
        user.setPassword("admin");
        user.setGender(gender);
    }

    private void givenAnElasticsearchResponseFailure() {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        SearchHits searchHits = Mockito.mock(SearchHits.class);

        Mockito.when(response.getHits()).thenReturn(searchHits);
        Mockito.when(searchHits.getTotalHits()).thenReturn(0l);

        Mockito.when(elasticsearchClient.search(Mockito.anyString(), Mockito.anyObject())).thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClient);
    }

    private void givenAnElasticsearchResponseNull() {
        Mockito.when(elasticsearchClient.search(Mockito.anyString(), Mockito.anyObject())).thenReturn(null);

        ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClient);
    }

    private void givenAUsername() {
        username = "iteam";
    }

    private void givenAnElasticsearchResponseOk() {
        SearchResponse response = Mockito.mock(SearchResponse.class);
        SearchHits searchHits = Mockito.mock(SearchHits.class);
        SearchHit hit = Mockito.mock(SearchHit.class);

        Mockito.when(response.getHits()).thenReturn(searchHits);
        Mockito.when(searchHits.getTotalHits()).thenReturn(1l);
        Mockito.when(searchHits.getAt(0)).thenReturn(hit);
        Mockito.when(hit.getSourceAsString()).thenReturn(USER_AS_JSON);

        Mockito.when(elasticsearchClient.search(Mockito.anyString(), Mockito.anyObject())).thenReturn(response);

        ReflectionTestUtils.setField(underTest, "elasticsearchClient", elasticsearchClient);
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
