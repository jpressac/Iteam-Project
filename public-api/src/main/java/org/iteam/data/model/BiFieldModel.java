package org.iteam.data.model;

/**
 * Model that could be used for many queries.
 */
public class BiFieldModel {

    private String field;
    private String value;

    public BiFieldModel(String field, String value) {
        this.field = field;
        this.value = value;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

}
