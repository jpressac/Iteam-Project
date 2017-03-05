package org.iteam.data.dto;

public class GoogleChartDTO {

    private String labelChart;
    private long amount;

    public GoogleChartDTO() {

    }

    public GoogleChartDTO(String labelChart, long amount) {
        this.labelChart = labelChart;
        this.amount = amount;
    }

    public String getLabelChart() {
        return labelChart;
    }

    public void setLabelChart(String labelChart) {
        this.labelChart = labelChart;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }
}
