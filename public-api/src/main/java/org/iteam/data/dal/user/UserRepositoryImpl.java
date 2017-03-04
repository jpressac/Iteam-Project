package org.iteam.data.dal.user;

import java.util.ArrayList;
import java.util.List;

import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.iteam.configuration.StringUtilities;
import org.iteam.data.dal.client.ElasticsearchClient;
import org.iteam.data.dto.Idea;
import org.iteam.data.dto.UserDTO;
import org.iteam.data.model.BiFieldModel;
import org.iteam.data.model.IdeasDTO;
import org.iteam.exceptions.JsonParsingException;
import org.iteam.services.utils.JSONUtils;
import org.joda.time.DateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.util.ObjectUtils;

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
    public void setUser(UserDTO user) {

        user.setPassword(PASSWORD_ENCODER.encode(user.getPassword()));

        user.setInsertionDate(DateTime.now().getMillis());

        if (!USER_GENDER_MALE.equals(user.getGender()) && !USER_GENDER_FEMALE.equals(user.getGender())) {
            throw new JsonParsingException("Incorrect User information");
        }

        String data = JSONUtils.ObjectToJSON(user);

        IndexResponse indexResponse = elasticsearchClient.insertData(data, StringUtilities.INDEX_USER,
                StringUtilities.INDEX_TYPE_USER, user.getUsername());

        if (indexResponse.isCreated()) {
            LOGGER.info("User created");
        } else {
            LOGGER.warn("User cannot be created - User: '{}'", user.toString());
        }
    }

    @Override
    public boolean checkUserExistance(String username) {

        GetResponse response = elasticsearchClient.getDocument(StringUtilities.INDEX_USER,
                StringUtilities.INDEX_TYPE_USER, username);

        return response.isExists();
    }

    @Override
    public void modifyUser(UserDTO user, String username) {

        if (!ObjectUtils.isEmpty(user.getPassword()) && validatePassword(username, user.getPassword())) {
            user.setPassword(PASSWORD_ENCODER.encode(user.getNewPassword()));
            user.setNewPassword(null);
        }

        elasticsearchClient.modifyData(JSONUtils.ObjectToJSON(user), StringUtilities.INDEX_USER,
                StringUtilities.INDEX_TYPE_USER, username);

        LOGGER.info("User modified - username: '{}'", username);
    }

    @Override
    public boolean logicalDelete(String doc, String username) {

        elasticsearchClient.logicalDelete(doc, StringUtilities.INDEX_USER, StringUtilities.INDEX_TYPE_USER, username);
        LOGGER.info("User deleted");
        return true;
    }

    @Override
    public boolean validatePassword(String username, String password) {

        GetResponse response = elasticsearchClient.getDocument(StringUtilities.INDEX_USER,
                StringUtilities.INDEX_TYPE_USER, username);

        if (response.isExists()) {
            UserDTO user = (UserDTO) JSONUtils.JSONToObject(response.getSourceAsString(), UserDTO.class);
            return PASSWORD_ENCODER.matches(password, user.getPassword());
        }

        return false;
    }

    @Override
    public void generateScore(IdeasDTO ideas, List<String> userList) {
        List<BiFieldModel<String>> dataToUpdate = new ArrayList<>();
        List<String> tags = new ArrayList<>();

        for (String userName : userList) {

            long partialScore = 0L;
            tags.clear();

            for (Idea idea : ideas.getIdeas()) {

                if (idea.getUsername().equals(userName)) {

                    partialScore += (long) Math.floor((0.1 + (idea.getRanking() * 0.7)) * 10);
                    if (!tags.contains(idea.getTag())) {
                        tags.add(idea.getTag());
                    }
                }
            }

            Long totalTags = (long) (tags.size() * 0.2 * 10);
            Long finalScore = partialScore + totalTags;

            BiFieldModel<String> userToUpdate = new BiFieldModel<String>(userName, finalScore.toString());
            dataToUpdate.add(userToUpdate);
        }

        BulkResponse bulkResponse = elasticsearchClient.updateScore(dataToUpdate, StringUtilities.INDEX_USER, StringUtilities.INDEX_TYPE_USER);
        
        if(bulkResponse.hasFailures()){
        	LOGGER.info("Error in bulk request execution '{}'", bulkResponse.buildFailureMessage());
        }

        LOGGER.info("Updating user score");
        LOGGER.debug("User scores: '{}'", dataToUpdate.toString());
    }

    @Autowired
    private void setElasticsearchClient(ElasticsearchClient elasticsearchClient) {
        this.elasticsearchClient = elasticsearchClient;
    }
}
