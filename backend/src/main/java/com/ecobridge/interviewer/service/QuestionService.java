package com.ecobridge.interviewer.service;

import com.ecobridge.interviewer.dto.QuestionRequestDTO;
import com.ecobridge.interviewer.dto.QuestionResponseDTO;

public interface QuestionService {
  QuestionResponseDTO addQuestion(QuestionRequestDTO request);

  QuestionResponseDTO getQuestion(Long id);
}
