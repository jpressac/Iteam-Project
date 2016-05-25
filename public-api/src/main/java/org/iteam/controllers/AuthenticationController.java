package org.iteam.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AuthenticationController {

	@RequestMapping("application")
	public String index(Model model) {
		return "index";
	}

	@RequestMapping("application/**/*")
	public String rootLogged(Model model) {
		return "redirect:/application";
	}

	@RequestMapping("/")
	public String rootNotLogged(Model model) {
		return "redirect:/application";
	}
}
