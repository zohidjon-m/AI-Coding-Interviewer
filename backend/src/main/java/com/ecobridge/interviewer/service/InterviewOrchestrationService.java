package com.ecobridge.interviewer.service;

import com.ecobridge.interviewer.domain.Answer;
import com.ecobridge.interviewer.dto.PhaseResponseDTO;
import com.ecobridge.interviewer.dto.QuestionResponseDTO;

public interface InterviewOrchestrationService {

  /** Creates the next Phase (and Question) and returns its DTO representation. */
  PhaseResponseDTO advancePhase(Long sessionId);

  QuestionResponseDTO generateBaselineQuestion(Long sessionId);

  /** Called whenever an answer is submitted. Handles scoring + possible advancement. */
  void handleAnswerSubmission(Answer answer);
}
