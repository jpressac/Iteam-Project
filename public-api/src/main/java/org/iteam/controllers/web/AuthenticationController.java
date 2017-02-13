package org.iteam.controllers.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AuthenticationController {

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

    @RequestMapping(value = "/application/member/logout")
    public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return "redirect:/application";
    }

    // @RequestMapping("/application/**/*")
    // public String rootLogged(Model model) {
    // return "redirect:/application";
    // }
    //
    // @RequestMapping("/")
    // public String rootNotLogged(Model model) {
    // return "redirect:/application";
    // }
}
