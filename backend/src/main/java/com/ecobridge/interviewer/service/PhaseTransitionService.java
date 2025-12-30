package com.ecobridge.interviewer.service;

import com.ecobridge.interviewer.domain.Phase.PhaseType;

public interface PhaseTransitionService {
  PhaseType next(PhaseType current);
}
