package com.ecobridge.interviewer.service.impl;

import com.ecobridge.interviewer.adapter.out.llm.LlmAdapter;
import com.ecobridge.interviewer.config.PromptTemplateLoader;
import com.ecobridge.interviewer.domain.*;
import com.ecobridge.interviewer.repository.QuestionRepository;
import com.ecobridge.interviewer.service.PromptService;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class PromptServiceImpl implements PromptService {

  private final PromptTemplateLoader templates;
  private final LlmAdapter llmAdapter;
  private final QuestionRepository questionRepo;

  @Override
  public Question generatePromptAndPersist(Phase phase) {

    SessionPreferences prefs = phase.getSession().getPreferences();
    Map<String, String> ctx =
        Map.of(
            "phase", phase.getPhaseType().name(),
            "stack", prefs.stack().name(),
            "experience", prefs.experience().name(),
            "difficulty", prefs.difficulty().name(),
            "companyTier", prefs.companyTier().name());

    String systemPrompt = templates.loadAndFill("classpath:prompts/question_generation.txt", ctx);

    String json = llmAdapter.generateQuestionAndRubricJson(phase, systemPrompt);
    JsonObject obj = JsonParser.parseString(json).getAsJsonObject();
    String qText = obj.get("question").getAsString();
    String rubric = obj.get("rubric").toString();

    Question q = Question.of(phase, qText);
    q.getMetadata().put("rubric", rubric);
    return questionRepo.save(q);
  }
}
