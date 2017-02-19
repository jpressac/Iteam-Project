package org.iteam.controllers.rest;

import java.util.List;

import org.iteam.data.model.D3CollapseTreeModel;
import org.iteam.services.report.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class ReportsController {

    private ReportService reportServiceImpl;

    @RequestMapping(value = "/report/generatesharedtoken")
    public String getTokenForSharedReport(@RequestParam(value = "meetingIds") List<String> meetingIds) {

        String token = reportServiceImpl.generateSharedReport(meetingIds);

        return ServletUriComponentsBuilder.fromCurrentServletMapping().path("/application/member/report/shared")
                .queryParam("token", token).toUriString();
    }

    @RequestMapping(value = "/report/shared")
    public D3CollapseTreeModel getSharedReport(@RequestParam(value = "token") String token) {
        return reportServiceImpl.getSharedReport(token);
    }

    /**
     * Generate the standard report by tag and ranking for the given meeting.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param tags
     *            the list of tags for the ideas.
     * @return 204 NO CONTENT
     */
    @RequestMapping(value = "/report/byranking", method = RequestMethod.GET)
    public ResponseEntity<D3CollapseTreeModel> generateReport(
            @RequestParam(value = "meetingId", required = true) String meetingId,
            @RequestParam(value = "tags", required = true) List<String> tags) {
        D3CollapseTreeModel report = reportServiceImpl.generateReportByRanking(meetingId, tags);

        return new ResponseEntity<D3CollapseTreeModel>(report, HttpStatus.OK);
    }

    /**
     * Generate a report by user for the given meeting.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param tags
     *            the list of tags for the ideas.
     * @return 204 NO CONTENT
     */
    @RequestMapping(value = "/report/byuser", method = RequestMethod.GET)
    public ResponseEntity<D3CollapseTreeModel> generateReportByUser(
            @RequestParam(value = "meetingId", required = true) String meetingId,
            @RequestParam(value = "tags", required = true) List<String> tags) {
        D3CollapseTreeModel report = reportServiceImpl.generateReportByUser(meetingId, tags);

        return new ResponseEntity<D3CollapseTreeModel>(report, HttpStatus.OK);
    }

    /**
     * Generate a report by tags for the given meeting.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param tags
     *            the list of tags for the ideas.
     * @return 204 NO CONTENT
     */
    @RequestMapping(value = "/report/bytag", method = RequestMethod.GET)
    public ResponseEntity<D3CollapseTreeModel> generateReportByTag(
            @RequestParam(value = "meetingId", required = true) String meetingId,
            @RequestParam(value = "tags", required = true) List<String> tags) {
        D3CollapseTreeModel report = reportServiceImpl.generateReportByTag(meetingId, tags);

        return new ResponseEntity<D3CollapseTreeModel>(report, HttpStatus.OK);
    }

    /**
     * Generate a report by tags for the list of meetingIds.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param tags
     *            the list of tags for the ideas.
     * @return 204 NO CONTENT
     */
    @RequestMapping(value = "/report/bymeeting", method = RequestMethod.GET)
    public ResponseEntity<D3CollapseTreeModel> generateReportByMixMeetings(
            @RequestParam(value = "meetingIds", required = true) List<String> meetingIds,
            @RequestParam(value = "reportName", required = true) String reportName) {

        D3CollapseTreeModel report = reportServiceImpl.generateMixMeeting(meetingIds, reportName);

        return new ResponseEntity<D3CollapseTreeModel>(report, HttpStatus.OK);
    }

    @Autowired
    public void setReportServiceImpl(ReportService reportServiceImpl) {
        this.reportServiceImpl = reportServiceImpl;
    }

}
