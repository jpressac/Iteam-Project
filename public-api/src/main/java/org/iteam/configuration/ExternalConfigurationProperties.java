package org.iteam.configuration;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration class for all external properties
 *
 */
@Configuration
public class ExternalConfigurationProperties {

	@Value("${org.iteam.elasticsearch.host}")
	private String elasticsearchHost;

	@Value("${org.iteam.elasticsearch.port}")
	private int elasticsearchPort;

	@Value("${org.iteam.elasticsearch.cluster.name}")
	private String elasticsearchClusterName;

	@Value("${org.iteam.elasticsearch.index.user}")
	private String elasticsearchIndexUserName;

	@Value("${org.iteam.elasticsearch.index.type.user}")
	private String elasticsearchIndexUserTypeName;

	@Value("${org.iteam.elasticsearch.index.team}")
	private String elasticsearchIndexTeam;

	@Value("${org.iteam.elasticsearch.index.type.team}")
	private String elasticsearchIndexTypeTeam;

	@Value("${org.iteam.elasticsearch.index.utility}")
	private String elasticsearchIndexUtility;

	@Value("${org.iteam.elasticsearch.index.type.utility}")
	private String elasticsearchIndexTypeUtility;

	@Value("${org.iteam.elasticsearch.index.meeting}")
	private String elasticsearchIndexMeeting;

	@Value("${org.iteam.elasticsearch.index.type.meeting}")
	private String elasticsearchIndexTypeMeeting;

	public String getElasticsearchHost() {
		return elasticsearchHost;
	}

	public void setElasticsearchHost(String elasticsearchHost) {
		this.elasticsearchHost = elasticsearchHost;
	}

	public int getElasticsearchPort() {
		return elasticsearchPort;
	}

	public void setElasticsearchPort(int elasticsearchPort) {
		this.elasticsearchPort = elasticsearchPort;
	}

	public String getElasticsearchClusterName() {
		return elasticsearchClusterName;
	}

	public void setElasticsearchClusterName(String elasticsearchClusterName) {
		this.elasticsearchClusterName = elasticsearchClusterName;
	}

	public String getElasticsearchIndexUserName() {
		return elasticsearchIndexUserName;
	}

	public void setElasticsearchIndexUserName(String elasticsearchIndexUserName) {
		this.elasticsearchIndexUserName = elasticsearchIndexUserName;
	}

	public String getElasticsearchIndexUserTypeName() {
		return elasticsearchIndexUserTypeName;
	}

	public void setElasticsearchIndexUserTypeName(String elasticsearchIndexUserTypeName) {
		this.elasticsearchIndexUserTypeName = elasticsearchIndexUserTypeName;
	}

	public String getElasticsearchIndexTeam() {
		return elasticsearchIndexTeam;
	}

	public void setElasticsearchIndexTeam(String elasticsaerchIndexTeam) {
		this.elasticsearchIndexTeam = elasticsaerchIndexTeam;
	}

	public String getElasticsaerchIndexTypeTeam() {
		return elasticsearchIndexTypeTeam;
	}

	public void setElasticsaerchIndexTypeTeam(String elasticsaerchIndexTypeTeam) {
		this.elasticsearchIndexTypeTeam = elasticsaerchIndexTypeTeam;
	}

	public String getElasticsearchIndexUtility() {
		return elasticsearchIndexUtility;
	}

	public void setElasticsearchIndexUtility(String elasticsearchIndexUtility) {
		this.elasticsearchIndexUtility = elasticsearchIndexUtility;
	}

	public String getElasticsearchIndexTypeUtility() {
		return elasticsearchIndexTypeUtility;
	}

	public void setElasticsearchIndexTypeUtility(String elasticsearchIndexTypeUtility) {
		this.elasticsearchIndexTypeUtility = elasticsearchIndexTypeUtility;
	}

	public String getElasticsearchIndexMeeting() {
		return elasticsearchIndexMeeting;
	}

	public void setElasticsearchIndexMeeting(String elasticsearchIndexMeeting) {
		this.elasticsearchIndexMeeting = elasticsearchIndexMeeting;
	}

	public String getElasticsearchIndexTypeMeeting() {
		return elasticsearchIndexTypeMeeting;
	}

	public void setElasticsearchIndexTypeMeeting(String elasticsearchIndexTypeMeeting) {
		this.elasticsearchIndexTypeMeeting = elasticsearchIndexTypeMeeting;
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}

}
