package org.iteam.data.model;

/**
 * Model that could be used for many queries.
 */
public class BiFieldModel {

    private String key;
    private String value;

    public BiFieldModel(String field, String value) {
        this.key = field;
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

}
