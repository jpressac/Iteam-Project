package org.iteam.data.dal.user;

import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.iteam.configuration.StringUtilities;
import org.iteam.data.dal.client.ElasticsearchClient;
import org.iteam.data.dto.UserDTO;
import org.iteam.exceptions.JsonParsingException;
import org.iteam.services.utils.JSONUtils;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepositoryImpl implements UserRepsoitory {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserRepositoryImpl.class);
    private static final PasswordEncoder PASSWORD_ENCODER = new BCryptPasswordEncoder();

    private static final String USER_NAME_FIELD = "username";
    private static final String LOGICAL_DELETE_FIELD = "logicalDelete";

    private static final String USER_GENDER_MALE = "male";
    private static final String USER_GENDER_FEMALE = "female";

    private ElasticsearchClient elasticsearchClient;

    @Override
    public UserDTO getUser(String username) {

        BoolQueryBuilder query = QueryBuilders.boolQuery();
        query.must(QueryBuilders.termQuery(USER_NAME_FIELD, username))
                .must(QueryBuilders.termQuery(LOGICAL_DELETE_FIELD, false));

        SearchResponse response = elasticsearchClient.search(StringUtilities.INDEX_USER, query);

        if (response != null && response.getHits().getTotalHits() == 1) {
            return (UserDTO) JSONUtils.JSONToObject(response.getHits().getAt(0).getSourceAsString(), UserDTO.class);
        }
        return null;
    }

    @Override
    public boolean setUser(UserDTO user) {

        user.setPassword(PASSWORD_ENCODER.encode(user.getPassword()));

        user.setInsertionDate(DateTime.now().getMillis());

        if (!USER_GENDER_MALE.equals(user.getGender()) && !USER_GENDER_FEMALE.equals(user.getGender())) {
            throw new JsonParsingException("Incorrect User information");
        }

        String data = JSONUtils.ObjectToJSON(user);

        IndexResponse indexResponse = elasticsearchClient.insertData(data, StringUtilities.INDEX_USER,
                StringUtilities.INDEX_TYPE_USER, user.getUsername());

        if (indexResponse != null && indexResponse.isCreated()) {
            LOGGER.info("User created");
            return true;
        }

        LOGGER.warn("User cannot be created - User: '{}'", user.toString());
        return false;
    }

    @Override
    public boolean checkUserExistance(String username) {

        GetResponse response = elasticsearchClient.getDocument(StringUtilities.INDEX_USER,
                StringUtilities.INDEX_TYPE_USER, username);

        if (response != null && response.isExists()) {
            return true;
        }
        return false;
    }

    @Override
    public boolean modifyUser(String doc, String username) {

        // TODO: verify how to validate update response.
        elasticsearchClient.modifyData(doc, StringUtilities.INDEX_USER, StringUtilities.INDEX_TYPE_USER, username);

        LOGGER.info("User modified");
        return true;
    }

    @Override
    public boolean logicalDelete(String doc, String username) {

        // TODO: verify how to validate update response.
        elasticsearchClient.logicalDelete(doc, StringUtilities.INDEX_USER, StringUtilities.INDEX_TYPE_USER, username);
        LOGGER.info("User deleted");
        return true;
    }

    @Autowired
    private void setElasticsearchClient(ElasticsearchClient elasticsearchClient) {
        this.elasticsearchClient = elasticsearchClient;
    }
}
