package org.iteam.data.model;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class Nationalities {

    private List<String> nationalities;

    public Nationalities() {
        nationalities = new ArrayList<>();
    }

    public List<String> getNationalities() {
        return nationalities;
    }

    public void setNationalities(List<String> nationalities) {
        this.nationalities = nationalities;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
