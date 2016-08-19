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

    @Value("${ort.iteam.ideas.path}")
    private String pathSaveIdeas;

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

    public String getPathSaveIdeas() {
        return pathSaveIdeas;
    }

    public void setPathSaveIdeas(String pathSaveIdeas) {
        this.pathSaveIdeas = pathSaveIdeas;
    }

}
