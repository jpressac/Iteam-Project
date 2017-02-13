package org.iteam.data.dto;

public class BiFieldModel {

    private String field;
    private String values;

    public BiFieldModel(String field, String values) {
        this.field = field;
        this.values = values;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getValues() {
        return values;
    }

    public void setValues(String values) {
        this.values = values;
    }

}
