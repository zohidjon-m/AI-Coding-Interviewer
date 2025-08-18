package com.ecobridge.interviewer.service;

import com.ecobridge.interviewer.dto.AnswerRequestDTO;
import com.ecobridge.interviewer.dto.AnswerResponseDTO;
import com.ecobridge.interviewer.dto.AnswerScoreRequestDTO;
import com.ecobridge.interviewer.dto.AnswerScoreResponseDTO;

public interface AnswerService {
  AnswerResponseDTO submitAnswer(AnswerRequestDTO request);

  AnswerScoreResponseDTO scoreAnswer(AnswerScoreRequestDTO request);
}
