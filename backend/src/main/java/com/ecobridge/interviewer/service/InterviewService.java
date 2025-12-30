package com.ecobridge.interviewer.service;

import com.ecobridge.interviewer.dto.InterviewSessionRequestDTO;
import com.ecobridge.interviewer.dto.InterviewSessionResponseDTO;

public interface InterviewService {
  InterviewSessionResponseDTO createSession(InterviewSessionRequestDTO request);

  InterviewSessionResponseDTO getSession(Long id);
}
