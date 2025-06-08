package com.ecobridge.interviewer.service.impl;

import com.ecobridge.interviewer.adapter.out.llm.LlmAdapter;
import com.ecobridge.interviewer.service.PromptService;
import com.ecobridge.interviewer.domain.*;
import com.ecobridge.interviewer.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PromptServiceImpl implements PromptService {

    private final LlmAdapter         llmAdapter;
    private final QuestionRepository questionRepo;

    @Override
    public Question generatePromptAndPersist(Phase phase) {
        String promptText = llmAdapter.generateQuestionForPhase(phase);
        String rubric     = llmAdapter.generateRubricForPhase(phase);
        Question question = Question.of(phase, promptText, rubric);
        return questionRepo.save(question);
    }
}