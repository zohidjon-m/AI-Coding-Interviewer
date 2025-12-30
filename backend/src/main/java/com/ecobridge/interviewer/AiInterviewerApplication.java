package com.ecobridge.interviewer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class AiInterviewerApplication {

  public static void main(String[] args) {
    SpringApplication.run(AiInterviewerApplication.class, args);
  }
}
