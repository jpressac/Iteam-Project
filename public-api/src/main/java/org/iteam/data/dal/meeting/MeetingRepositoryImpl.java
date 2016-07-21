package org.iteam.data.dal.meeting;

import org.elasticsearch.action.index.IndexResponse;
import org.iteam.configuration.ExternalConfigurationProperties;
import org.iteam.data.dal.client.ElasticsearchClientImpl;
import org.iteam.data.model.Meeting;
import org.iteam.services.utils.JSONUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
@Repository
public class MeetingRepositoryImpl implements MeetingRepository {

	private static final Logger LOGGER = LoggerFactory.getLogger(MeetingRepositoryImpl.class);

	private ElasticsearchClientImpl elasticsearchClient;
	private ExternalConfigurationProperties configuration;

	// TODO: verificar que es mejor, usar el id de elasticsearch o generar uno
	// nuevo y utilizar ese para las busquedas de las ideas y todo lo
	// relacionado con la meeting.
	@Override
	public String createMeeting(Meeting meeting) {
		String data = JSONUtils.ObjectToJSON(meeting);

		IndexResponse response = elasticsearchClient.insertData(data, configuration.getElasticsearchIndexMeeting(),
				configuration.getElasticsearchIndexTypeMeeting());

		if (response != null && response.isCreated()) {
			LOGGER.info("Meeting successfully created");
			return response.getId();
		}

		LOGGER.warn("Something went wrong while saving meeting");
		return null;
	}

	@Autowired
	private void setElasticsearchClient(ElasticsearchClientImpl elasticsearchClient) {
		this.elasticsearchClient = elasticsearchClient;
	}

}
