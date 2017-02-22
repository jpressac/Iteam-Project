package org.iteam.services.report;

import java.util.List;

import org.iteam.data.model.D3CollapseTreeModel;

public interface ReportService {

    /**
     * Generate report by tag and ranking for the given meeting.
     * 
     * @param meetingId
     *            the meeting id.
     * @param tags
     *            tags to create the report
     * @return the an structure to generate a report tree
     */
    public D3CollapseTreeModel generateReportByRanking(String meetingId, List<String> tags);

    /**
     * Generate report for the given meeting.
     * 
     * @param meetingId
     *            the meeting id.
     * @param tags
     *            tags to create the report.
     * @return the an structure to generate a report tree
     */
    public D3CollapseTreeModel generateReportByUser(String meetingId, List<String> tags);

    /**
     * Generate report for the given meeting.
     * 
     * @param meetingId
     *            the meeting id.
     * @param tags
     *            tags to create the report.
     * @return the an structure to generate a report tree
     */
    public D3CollapseTreeModel generateReportByTag(String meetingId, List<String> tags);

    /**
     * Generate the URL with token to share the reports.
     * 
     * @param meetingIds
     *            the meetings ids of the generated report.
     * @return the token generated.
     */
    public String generateSharedReport(List<String> meetingIds);

    /**
     * Generate report given a list of meetingIds
     * 
     * @param meetingIds
     *            the meetings ids of the generated report.
     * @param reportName
     *            the name of the report
     * @return the token generated.
     */
    public D3CollapseTreeModel generateMixMeeting(List<String> meetingIds, String reportName);

    /**
     * Retrieve the shared report given the token.
     * 
     * @param token
     *            the token with the information to generate the report.
     * @return the model representation of the report.
     */
    public D3CollapseTreeModel getSharedReport(String token);

    /**
     * Post and pin the shared report to an specific channel in Slack
     * 
     * @param meetingId
     *            the id of the meeting to generate the shared report
     * @param meetingTopic
     *            the topic name to look for the channel in Slack
     * @param reportName
     *            the report name
     */
    public void postSharedBasicReportToSlack(String meetingId, String meetingTopic, String reportName);

}
