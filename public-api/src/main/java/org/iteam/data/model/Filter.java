package org.iteam.data.model;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class Filter {

    private String field;
    private List<String> values;

    public Filter() {
    }

    public Filter(String field, List<String> values) {
        this.field = field;
        this.values = values;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public List<String> getValues() {
        return values;
    }

    public void addValues(String value) {
        if (values == null) {
            values = new ArrayList<>();
        }

        values.add(value);
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
