package org.iteam.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LoggingController {

	@RequestMapping("/user")
	public ResponseEntity<?> getUser() {
		return null;
	}
}
