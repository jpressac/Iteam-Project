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
    private int PBtime;
    private int SBtime;
    private int template;
    private int technic;

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
     * @return the pBtime
     */
    public int getPBtime() {
        return PBtime;
    }

    /**
     * @param pBtime
     *            the pBtime to set
     */
    public void setPBtime(int pBtime) {
        PBtime = pBtime;
    }

    /**
     * @return the sBtime
     */
    public int getSBtime() {
        return SBtime;
    }

    /**
     * @param sBtime
     *            the sBtime to set
     */
    public void setSBtime(int sBtime) {
        SBtime = sBtime;
    }

    /**
     * @return the template
     */
    public int getTemplate() {
        return template;
    }

    /**
     * @param template
     *            the template to set
     */
    public void setTemplate(int template) {
        this.template = template;
    }

    /**
     * @return the technic
     */
    public int getTechnic() {
        return technic;
    }

    /**
     * @param technic
     *            the technic to set
     */
    public void setTechnic(int technic) {
        this.technic = technic;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

}
