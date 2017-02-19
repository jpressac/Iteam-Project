package org.iteam.data.dal.report;

import java.util.List;

import org.iteam.data.dto.Idea;
import org.iteam.data.model.D3CollapseTreeModel;

public interface ReportRepository {

    /**
     * Generate token to generate the report for the given meetingIds.
     * 
     * @param meetingIds,
     *            the list of meetings.
     * @return the token generated.
     */
    public String generateSharedReport(List<String> meetingIds);

    /**
     * Generate the report given the token.
     * 
     * @param token
     *            the token with the information about the reports.
     * @return the model representation for the reports.
     */
    public D3CollapseTreeModel getSharedReport(String token);

    /**
     * Generate the report aggregated by user
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param users
     *            the list of users to create the report.
     * @param tags
     *            the list of tag to create the report.
     * @return the report information.
     */
    public D3CollapseTreeModel generateBasicReportByUser(String meetingId, List<String> users, List<String> tags);

    /**
     * Generate the report aggregated by tag
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param tags
     *            the list of tag to create the report.
     * @return the report information.
     */
    public D3CollapseTreeModel generateBasicReportByTag(String meetingId, List<String> tags);

    /**
     * Generate the report aggregated by tag including the ranking of each idea.
     * 
     * @param meetingId
     *            the id of the meeting.
     * @param tags
     *            the list of tag to create the report.
     * @return the report information.
     */
    public D3CollapseTreeModel generateBasicReportByRanking(String meetingId, List<String> tags);

    /**
     * Generate a mix report given one or more meetings.
     * 
     * @param meetingIds
     *            the meetings to generate the report
     * @return the model representation of the report.
     */
    public D3CollapseTreeModel generateReportByMeeting(List<String> meetingIds);

    /**
     * Generate a mix report given one or more ideas from one or more meetings.
     * 
     * @param ideas
     *            the ideas to generate the report.
     * @return the model representation of the report.
     */
    public D3CollapseTreeModel generateReportByMixIdea(List<Idea> ideas);
}
