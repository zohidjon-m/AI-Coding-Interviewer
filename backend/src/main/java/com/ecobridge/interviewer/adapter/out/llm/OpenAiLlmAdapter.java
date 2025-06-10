package com.ecobridge.interviewer.adapter.out.llm;
import com.ecobridge.interviewer.domain.Answer;
import com.ecobridge.interviewer.domain.Phase;
import com.ecobridge.interviewer.domain.Score;
import com.ecobridge.interviewer.domain.Question;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

import java.time.Duration;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
@Slf4j
public class OpenAiLlmAdapter implements LlmAdapter {

    private static final String MODEL = "gpt-4o-mini";
    private static final Duration TIMEOUT = Duration.ofSeconds(45);

    private final WebClient openAiWebClient;

    @Override
    public String generateQuestionAndRubricJson(Phase phase, String systemPrompt) {
        return callChat(systemPrompt, "");
    }

    @Override
    public Score scoreWithSystemPrompt(Answer answer, String systemPrompt) {
//        String userMsg = answer.getCode() != null ? answer.getCode() : answer.getExplanation();
        String userMsg = answer.getContent();
        String scoreTxt = callChat(systemPrompt, userMsg);
        double val = 0;
        try { val = Integer.parseInt(scoreTxt.trim()); } catch (NumberFormatException ignore) {}
        return Score.builder().answer(answer).value(val).build();
    }

    private String callChat(String systemPrompt, String userPrompt) {
        Map<String,Object> req = Map.of(
                "model", MODEL,
                "response_format", Map.of("type", "json_object"),
                "messages", List.of(
                        Map.of("role", "system", "content", systemPrompt),
                        Map.of("role", "user", "content", userPrompt)
                ),
                "temperature", 0.2
        );

        return openAiWebClient.post()
                .uri("/v1/chat/completions")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(req))
                .retrieve()
                .bodyToMono(String.class)
                .block(TIMEOUT);
    }
}