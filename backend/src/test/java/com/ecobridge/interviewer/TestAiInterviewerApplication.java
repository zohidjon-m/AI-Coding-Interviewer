package com.ecobridge.interviewer;

import org.springframework.boot.SpringApplication;

public class TestAiInterviewerApplication {

	public static void main(String[] args) {
		SpringApplication.from(AiInterviewerApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
