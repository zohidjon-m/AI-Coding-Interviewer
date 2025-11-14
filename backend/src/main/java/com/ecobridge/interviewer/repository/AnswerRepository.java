package com.ecobridge.interviewer.repository;

import com.ecobridge.interviewer.domain.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {}
