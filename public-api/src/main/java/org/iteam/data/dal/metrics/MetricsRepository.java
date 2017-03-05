package org.iteam.data.dal.metrics;

import org.iteam.data.dto.Timeframe;
import org.iteam.data.model.GoogleChartModel;

public interface MetricsRepository {

    /**
     * Generate chart information to create histogram chart
     * 
     * @param timeframe
     *            the timeframe for filtering.
     * @return a model representation to generate the chart.
     */
    public GoogleChartModel getHistogramIdeasByMeeting(Timeframe timeframe);

    /**
     * Generate chart information to create pie chart, which represents the
     * amount of meeting by owner.
     * 
     * @param timeframe
     *            the timeframe for filtering.
     * @return a model representation to generate the chart
     */
    public GoogleChartModel getPieChartMeetingByOwner(Timeframe timeframe);

    /**
     * Generate chart information to create pie chart, which represents the
     * amount of ideas by team.
     * 
     * @param timeframe
     *            the timeframe to generate the chart
     * @return a model representation to generate the chart
     */
    public GoogleChartModel getPieChartIdeasByTeam(Timeframe timeframe);

    /**
     * Get the top ten users based on his historical score
     * 
     * @return the model representation to generate the chart
     */
    public GoogleChartModel getUsersByScore();

}
