package org.iteam.controllers.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AuthenticationController implements ErrorController {

    @RequestMapping("/application")
    public String index(Model model) {
        return "application";
    }

    @RequestMapping("/application/nmember/home")
    public String login(Model model) {
        return "application";
    }

    @RequestMapping("/application/member/home")
    public String homeLogin() {
        return "application";
    }

    @RequestMapping("/application/member/report/shared")
    public String sharedReport() {
        return "application";
    }

    @RequestMapping("/application/member/report")
    public String sharedReportBis() {
        return "application";
    }

    @RequestMapping("/application/member/mymeeting")
    public String myMeetings() {
        return "application";
    }

    @RequestMapping("/application/member/meeting")
    public String createMeeting() {
        return "application";
    }

    @RequestMapping("/application/member/history")
    public String meetingHistory() {
        return "application";
    }

    @RequestMapping("/application/member/team")
    public String createTeam() {
        return "application";
    }

    @RequestMapping("/application/member/myteams")
    public String mnyTeams() {
        return "application";
    }

    @RequestMapping(value = "/application/member/logout")
    public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/application";
    }

    @RequestMapping("/error")
    public String errorPage() {
        return "error";
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
}
