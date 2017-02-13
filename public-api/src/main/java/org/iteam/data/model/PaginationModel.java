package org.iteam.data.model;

import java.util.List;

public class PaginationModel<T> {

    private long total;
    private List<T> model;

    public PaginationModel(long total, List<T> model) {

        this.total = total;
        this.model = model;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public List<T> getModel() {
        return model;
    }

    public void setModel(List<T> model) {
        this.model = model;
    }

}
