package org.iteam.data.model;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

public class D3CollapseTreeModel {

    private String name;
    private List<D3CollapseTreeModel> children;
    private Integer value;
    private String color;

    public D3CollapseTreeModel() {
        this.children = new ArrayList<>();
    }

    public D3CollapseTreeModel(String name) {
        this.name = name;
        this.children = new ArrayList<>();
    }

    public D3CollapseTreeModel(String name, List<D3CollapseTreeModel> children) {
        this.name = name;
        this.children = children;
    }

    public D3CollapseTreeModel(String name, Integer value, String color) {
        this.name = name;
        this.value = value;
        this.color = color;
    }

    public void add(D3CollapseTreeModel treeModel) {
        this.children.add(treeModel);
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @JsonInclude(Include.NON_EMPTY)
    public List<D3CollapseTreeModel> getChildren() {
        return children;
    }

    public void setChildren(List<D3CollapseTreeModel> children) {
        this.children = children;
    }

    @JsonInclude(Include.NON_NULL)
    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    @JsonInclude(Include.NON_EMPTY)
    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }
}
