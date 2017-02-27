package org.iteam.controllers.rest;

import org.iteam.data.dal.metrics.MetricsRepositoryImpl;
import org.iteam.data.dto.Timeframe;
import org.iteam.data.model.GoogleChartModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MetricsController {

    private MetricsRepositoryImpl metricsRepository;

    @RequestMapping(value = "/metrics/histogram/ideabymeeting", method = RequestMethod.GET)
    public GoogleChartModel getHistogramIdeasByMeeting(
            @RequestParam(value = "timeframe", defaultValue = "ONE_DAY") Timeframe timeframe) {

        return metricsRepository.getHistogramIdeasByMeeting(timeframe);
    }

    @RequestMapping(value = "/metrics/pie/meetingbyowner", method = RequestMethod.GET)
    public GoogleChartModel getPieChartMeetingsByOwner(
            @RequestParam(value = "timeframe", defaultValue = "ONE_DAY") Timeframe timeframe) {

        return metricsRepository.getPieChartMeetingByOwner(timeframe);
    }

    @Autowired
    public void setMetricsRepository(MetricsRepositoryImpl metricsRepository) {
        this.metricsRepository = metricsRepository;
    }

}
