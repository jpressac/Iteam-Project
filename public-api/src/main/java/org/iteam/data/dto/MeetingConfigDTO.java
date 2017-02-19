package org.iteam.data.dto;

import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

@JsonInclude(Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
public class MeetingConfigDTO {

    private int votes;
    private List<String> tags;
    private String technic;

    /**
     * @return the votes
     */
    public int getVotes() {
        return votes;
    }

    /**
     * @param votes
     *            the votes to set
     */
    public void setVotes(int votes) {
        this.votes = votes;
    }

    /**
     * @return the tags
     */
    public List<String> getTags() {
        return tags;
    }

    /**
     * @param tags
     *            the tags to set
     */
    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    /**
     * @return the technic
     */
    public String getTechnic() {
        return technic;
    }

    /**
     * @param technic
     *            the technic to set
     */
    public void setTechnic(String technic) {
        this.technic = technic;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

}
