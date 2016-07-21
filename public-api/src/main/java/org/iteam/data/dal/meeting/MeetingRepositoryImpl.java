package org.iteam.data.dal.meeting;

import java.util.ArrayList;
import java.util.List;

import org.elasticsearch.action.bulk.BulkResponse;
import org.elasticsearch.action.index.IndexResponse;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.model.IdeasDTO;
import org.iteam.data.model.Meeting;
import org.iteam.services.utils.JSONUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MeetingRepositoryImpl implements MeetingRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(MeetingRepositoryImpl.class);

	private ElasticsearchClientImpl elasticsearchClientImpl;

	private static final String INDEX_IDEAS = "iteam_ideas";
	private static final String INDEX_TYPE_IDEAS = "ideas";
	private static final String INDEX_MEETING = "iteam_meeting";
	private static final String INDEX_TYPE_MEETING = "information";

	@Override
	public boolean createMeeting(Meeting meeting) {
		LOGGER.info("Creating new meeting");
		LOGGER.debug("Meeting: '{}'", meeting.toString());

		String data = JSONUtils.ObjectToJSON(meeting);

		IndexResponse response = elasticsearchClientImpl.insertData(data, INDEX_MEETING, INDEX_TYPE_MEETING);

		if (!response.isCreated()) {
			LOGGER.error("The meeting couldn't be created - Meeting: '{}'", meeting.toString());
			return false;
		}
		return true;

	}

	@Override
	public boolean saveIdeas(IdeasDTO ideas) {

		LOGGER.info("Inserting new ideas");
		LOGGER.debug("Ideas: '{}'", ideas.toString());

		// TODO:check if it's necessary set the insertion date to each idea.
		List<String> dataToInsert = new ArrayList<>();

		ideas.getIdeas().forEach((idea) -> {
			dataToInsert.add(JSONUtils.ObjectToJSON(idea));
		});

		BulkResponse response = elasticsearchClientImpl.insertData(dataToInsert, INDEX_IDEAS, INDEX_TYPE_IDEAS);

		if (response.hasFailures()) {

			LOGGER.error("Ideas bulk insertion has failed - Error: '{}'", response.buildFailureMessage());
			return false;
		}

		return true;
	}

}
