package org.iteam.data.dto;

import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class ScoreDTO {

    private Integer amountNotes;
    private Integer amountVotes;
    private List<String> tags;

    public Integer getAmountNotes() {
        return amountNotes;
    }

    public void setAmountNotes(Integer amountNotes) {
        this.amountNotes = amountNotes;
    }

    public Integer getAmountVotes() {
        return amountVotes;
    }

    public void setAmountVotes(Integer amountVotes) {
        this.amountVotes = amountVotes;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

}
