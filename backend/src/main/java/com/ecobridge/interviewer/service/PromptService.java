package com.ecobridge.interviewer.service;

import com.ecobridge.interviewer.domain.Phase;
import com.ecobridge.interviewer.domain.Question;

public interface PromptService {
    /**
     * Generates a prompt via LLM, persists the Question and returns it.
     */
    Question generatePromptAndPersist(Phase phase);
}