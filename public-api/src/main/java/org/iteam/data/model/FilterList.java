package org.iteam.data.model;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class FilterList {

	private List<Filter> filters;

	public FilterList() {
		this.filters = new ArrayList<>();
	}

	public List<Filter> getFilters() {
		return filters;
	}

	public void setFilters(List<Filter> filters) {
		this.filters = filters;
	}

	public void addFilter(Filter filter) {
		filters.add(filter);
	}

	@Override
	public String toString() {
		return ToStringBuilder.reflectionToString(this);
	}
}
