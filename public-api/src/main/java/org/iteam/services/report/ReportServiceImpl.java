package org.iteam.services.report;

import java.util.List;
import java.util.stream.Collectors;

import org.iteam.data.dal.report.ReportRepository;
import org.iteam.data.dto.UserDTO;
import org.iteam.data.model.D3CollapseTreeModel;
import org.iteam.services.slack.SlackService;
import org.iteam.services.team.TeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.google.common.collect.Lists;

@Service
public class ReportServiceImpl implements ReportService {

    private ReportRepository reportRepositoryImpl;
    private TeamService teamServiceImpl;
    private SlackService slackServiceImpl;

    @Override
    public D3CollapseTreeModel generateReportByRanking(String meetingId, List<String> tags) {
        return reportRepositoryImpl.generateBasicReportByRanking(meetingId, tags);
    }

    @Override
    public D3CollapseTreeModel generateReportByUser(String meetingId, List<String> tags) {

        List<String> users = teamServiceImpl.getTeamUserInformationByMeeting(meetingId).getTeamUsers().stream()
                .map(UserDTO::getUsername).collect(Collectors.toList());

        return reportRepositoryImpl.generateBasicReportByUser(meetingId, users, tags);
    }

    @Override
    public D3CollapseTreeModel generateReportByTag(String meetingId, List<String> tags) {
        return reportRepositoryImpl.generateBasicReportByTag(meetingId, tags);
    }

    @Override
    public String generateSharedReport(List<String> meetingIds) {
        return reportRepositoryImpl.generateSharedReport(meetingIds);
    }

    @Override
    public void postSharedBasicReportToSlack(String meetingId, String meetingTopic, String reportName) {

        String token = generateSharedReport(Lists.newArrayList(meetingId));

        String tokenURI = ServletUriComponentsBuilder.fromCurrentServletMapping()
                .path("/application/member/report/shared").queryParam("token", token).toUriString();

        slackServiceImpl.postMesageToChannel(meetingTopic, String.format("URL to shared report: %s", tokenURI),
                "SHARED REPORT", "This URL is valid for the next month, share your report", true);
    }

    @Override
    public D3CollapseTreeModel getSharedReport(String token) {
        return this.reportRepositoryImpl.getSharedReport(token);
    }

    @Override
    public D3CollapseTreeModel generateMixMeeting(List<String> meetingIds, String reportName) {
        return this.reportRepositoryImpl.generateReportByMeeting(meetingIds, reportName);
    }

    @Autowired
    public void setReportRepositoryImpl(ReportRepository reportRepositoryImpl) {
        this.reportRepositoryImpl = reportRepositoryImpl;
    }

    @Autowired
    public void setTeamSerivceImpl(TeamService teamServiceImpl) {
        this.teamServiceImpl = teamServiceImpl;
    }

    @Autowired
    public void setSlackServiceImpl(SlackService slackServiceImpl) {
        this.slackServiceImpl = slackServiceImpl;
    }

}
