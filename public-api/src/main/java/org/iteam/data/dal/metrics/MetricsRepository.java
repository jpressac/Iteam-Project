package org.iteam.data.dal.metrics;

import org.iteam.data.dto.Timeframe;
import org.iteam.data.model.GoogleChartModel;

public interface MetricsRepository {

    public GoogleChartModel getHistogramIdeasByMeeting(Timeframe timeframe);

    public GoogleChartModel getPieChartMeetingByOwner(Timeframe timeframe);

}
