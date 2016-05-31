// package org.iteam.services.user;
//
// import org.elasticsearch.action.search.SearchResponse;
// import org.elasticsearch.index.query.QueryBuilders;
// import org.elasticsearch.search.SearchHits;
// import org.iteam.configuration.ExternalConfigurationProperties;
// import org.iteam.data.dal.client.ElasticsearchClientImpl;
// import org.iteam.data.model.User;
// import org.iteam.services.user.UserServiceImpl;
// import org.iteam.services.utils.JSONUtils;
// import org.junit.Assert;
// import org.junit.Before;
// import org.junit.Test;
// import org.mockito.Answers;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.Mockito;
// import org.mockito.MockitoAnnotations;
// import org.springframework.test.util.ReflectionTestUtils;
//
// public class UserServiceImplTest {
//
// @InjectMocks
// private UserServiceImpl underTest;
//
// @Mock
// private ExternalConfigurationProperties configuration;
//
// @Mock
// private ElasticsearchClientImpl elastcisearchClient;
//
// @Mock(answer = Answers.RETURNS_DEEP_STUBS)
// private SearchResponse searchResponse;
//
// @Mock
// private SearchHits searchHits;
//
// private String userName;
// private String password;
// private User user;
//
// @Before
// public void init() {
// MockitoAnnotations.initMocks(this);
// }
//
// @Test
// public void getUserTestExists() {
// givenAUserNameAndPassword("testUser", "test123");
// givenExternalConfigurationProperties();
// givenASearchResponse();
// givenAJSONUtils();
// whenGetUserIsCalled();
// thenVerifyGetUserCalls();
// }
//
// private void thenVerifyGetUserCalls() {
// Assert.assertNotNull(user);
// }
//
// private void givenAJSONUtils() {
// JSONUtils.JSONToObject(
// "{\r\n\t\"userName\": \"testUser\",\r\n\t\"password\":
// \"test123\",\r\n\t\"name\": \"test\",\r\n\t\"lastName\":
// \"testLast\",\r\n\t\"nationality\": \"testiana\",\r\n\t\"bornDate\":
// \"2016-03-05T15:56:01Z\",\r\n\t\"hobbies\":
// [\"testiar\"],\r\n\t\"profession\": \"developer\",\r\n\t\"mbtiTest\":
// null,\r\n\t\"discTest\": null,\r\n\t\"logicalDelete\": false\r\n}",
// User.class);
// }
//
// private void whenGetUserIsCalled() {
// user = underTest.getUser(userName, password);
// }
//
// private void givenASearchResponse() {
//
// Mockito.when(searchResponse.getHits()).thenReturn(searchHits);
// Mockito.when(searchHits.getTotalHits()).thenReturn(1l);
//
// // ReflectionTestUtils.setField(searchResponse, "SearchHits",
// // searchHits);
// // ReflectionTestUtils.setField(elastcisearchClient,
// // "elasticsearchClient", searchResponse);
//
// Mockito.when(elastcisearchClient.search("test", "testType",
// QueryBuilders.boolQuery()))
// .thenReturn(new SearchResponse());
//
// // ReflectionTestUtils.setField(underTest, "elasticsearchClient",
// // elastcisearchClient);
// }
//
// private void givenExternalConfigurationProperties() {
// Mockito.when(configuration.getElasticsearchIndexUserName()).thenReturn("test");
// Mockito.when(configuration.getElasticsearchIndexUserTypeName()).thenReturn("testType");
//
// ReflectionTestUtils.setField(underTest, "configuration", configuration);
// }
//
// private void givenAUserNameAndPassword(String testUserName, String
// testPassword) {
// userName = testUserName;
// password = testPassword;
// }
// }
