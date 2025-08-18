package com.ecobridge.interviewer.service;

import com.ecobridge.interviewer.domain.Answer;
import com.ecobridge.interviewer.domain.Score;

public interface ScoringService {
  Score evaluate(Answer answer);
}
