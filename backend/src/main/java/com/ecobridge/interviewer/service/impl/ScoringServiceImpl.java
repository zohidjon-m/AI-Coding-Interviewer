package com.ecobridge.interviewer.service.impl;

import com.ecobridge.interviewer.adapter.out.llm.LlmAdapter;
import com.ecobridge.interviewer.config.PromptTemplateLoader;
import com.ecobridge.interviewer.domain.*;
import com.ecobridge.interviewer.repository.ScoreRepository;
import com.ecobridge.interviewer.service.ScoringService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class ScoringServiceImpl implements ScoringService {

  private final LlmAdapter llmAdapter;
  private final ScoreRepository scoreRepo;
  private final PromptTemplateLoader templates;

  @Override
  public Score evaluate(Answer answer) {
    Question q = answer.getQuestion();
    Phase phase = q.getPhase();
    SessionPreferences prefs = phase.getSession().getPreferences();
    String rubric = (String) q.getMetadata().get("rubric");

    Map<String, String> ctx =
        Map.of(
            "phase", phase.getPhaseType().name(),
            "stack", prefs.stack().name(),
            "difficulty", prefs.difficulty().name(),
            "rubric", rubric);

    String systemPrompt = templates.loadAndFill("classpath:prompts/answer_evaluation.txt", ctx);

    Score score = llmAdapter.scoreWithSystemPrompt(answer, systemPrompt);
    return scoreRepo.save(score);
  }
}
