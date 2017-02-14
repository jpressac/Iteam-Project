package org.iteam.data.model;

/**
 * Model that could be used for many queries.
 */
public class BiFieldModel<T> {

    private String key;
    private T value;

    public BiFieldModel(String field, T value) {
        this.key = field;
        this.value = value;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public T getValue() {
        return value;
    }

    public void setValue(T value) {
        this.value = value;
    }

}
