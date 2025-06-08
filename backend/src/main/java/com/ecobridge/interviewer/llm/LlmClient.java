package com.ecobridge.interviewer.llm;

/**
 * Minimal abstraction around your LLM provider (OpenAI, llama-cpp, etc.).
 */
public interface LlmClient {                          // ★ LLM
    String generateQuestion(String prompt, String type);

    record Eval(double score, String feedback) {}

    Eval evaluateAnswer(String question, String answer);
}