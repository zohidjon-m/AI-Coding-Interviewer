package com.ecobridge.interviewer.service.impl;

import com.ecobridge.interviewer.service.PhaseTransitionService;
import com.ecobridge.interviewer.domain.Phase.PhaseType;
import org.springframework.stereotype.Component;

@Component
public class PhaseTransitionServiceImpl implements PhaseTransitionService {

    @Override
    public PhaseType next(PhaseType current) {
        return switch (current) {
            case BASELINE     -> PhaseType.SCENARIO;
            case SCENARIO     -> PhaseType.ARCHITECTURE;
            case ARCHITECTURE -> PhaseType.DEEP_DIVE;
            default           -> null; // DEEP_DIVE or unknown → end
        };
    }
}
