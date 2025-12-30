package com.ecobridge.interviewer.service;

import com.ecobridge.interviewer.domain.InterviewSession;
import com.ecobridge.interviewer.domain.McpContext;
import com.ecobridge.interviewer.domain.Phase;
import com.ecobridge.interviewer.domain.Question;

public interface McpContextService {
  void initContext(InterviewSession session, Phase phase, Question question);

  void appendContext(InterviewSession session, Phase phase, Question question);

  McpContext load(Long sessionId);
}
