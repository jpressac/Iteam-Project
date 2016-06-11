package org.iteam.configuration;

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
	private String elasticsaerchIndexTeam;

	@Value("${org.iteam.elasticsearch.index.type.team}")
	private String elasticsaerchIndexTypeTeam;

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

	public String getElasticsaerchIndexTeam() {
		return elasticsaerchIndexTeam;
	}

	public void setElasticsaerchIndexTeam(String elasticsaerchIndexTeam) {
		this.elasticsaerchIndexTeam = elasticsaerchIndexTeam;
	}

	public String getElasticsaerchIndexTypeTeam() {
		return elasticsaerchIndexTypeTeam;
	}

	public void setElasticsaerchIndexTypeTeam(String elasticsaerchIndexTypeTeam) {
		this.elasticsaerchIndexTypeTeam = elasticsaerchIndexTypeTeam;
	}

}
