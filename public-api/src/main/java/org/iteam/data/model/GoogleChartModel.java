package org.iteam.data.model;

import java.util.List;

import org.iteam.data.dto.GoogleChartDTO;

public class GoogleChartModel {

    List<GoogleChartDTO> chartModel;

    public GoogleChartModel(List<GoogleChartDTO> chartModel) {
        super();
        this.chartModel = chartModel;
    }

    public GoogleChartModel() {

    }

    public List<GoogleChartDTO> getChartModel() {
        return chartModel;
    }

    public void setChartModel(List<GoogleChartDTO> chartModel) {
        this.chartModel = chartModel;
    }
}
