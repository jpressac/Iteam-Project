package org.iteam.controllers.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AuthenticationController {

    @RequestMapping("/application")
    public String index(Model model) {
        return "application";
    }

    @RequestMapping("/application/nmember/login")
    public String login(Model model) {
        return "application";
    }

    @RequestMapping("/application/member/home")
    public String signin(Model model) {
        return "application";
    }

    @RequestMapping("/application/nmember/home")
    public String signout(Model model) {
        return "application";
    }

    @RequestMapping("/application/**")
    public String rootLogged(Model model) {
        return "redirect:/application";
    }

    @RequestMapping("/")
    public String rootNotLogged(Model model) {
        return "redirect:/application";
    }
}
