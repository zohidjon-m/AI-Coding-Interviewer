package com.ecobridge.interviewer.adapter.out.llm;

import com.ecobridge.interviewer.domain.Answer;
import com.ecobridge.interviewer.domain.Phase;
import com.ecobridge.interviewer.domain.Score;

public interface LlmAdapter {
  /** Single call that returns JSON with keys "question" and "rubric". */
  String generateQuestionAndRubricJson(Phase phase, String systemPrompt);

  /** Grades an answer using the provided system prompt (includes rubric). */
  Score scoreWithSystemPrompt(Answer answer, String systemPrompt);
}
