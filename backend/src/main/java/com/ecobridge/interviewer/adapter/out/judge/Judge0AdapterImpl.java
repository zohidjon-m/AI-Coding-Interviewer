package com.ecobridge.interviewer.adapter.out.judge;

import com.ecobridge.interviewer.domain.Answer;
import com.ecobridge.interviewer.domain.Score;
import com.ecobridge.interviewer.dto.RunRequestDTO;
import com.ecobridge.interviewer.dto.RunResultDTO;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Component
@RequiredArgsConstructor
@Slf4j
public class Judge0AdapterImpl implements Judge0Adapter {

  private final WebClient judge0WebClient;

  @Override
  public Score score(Answer answer) {
    // Extract metadata (language, stdin, expected output) or fall back to defaults
    int languageId = (int) answer.getMetadata().getOrDefault("language_id", 52); // 52 = Java 21
    String stdin = (String) answer.getMetadata().getOrDefault("stdin", "");
    String expected = (String) answer.getMetadata().getOrDefault("expected_output", "");

    Map<String, Object> submission =
        Map.of(
            "language_id", languageId,
            "source_code", answer.getContent(),
            "stdin", stdin,
            "expected_output", expected);

    Judge0Resp resp =
        judge0WebClient
            .post()
            .uri(
                uriBuilder ->
                    uriBuilder
                        .path("/submissions")
                        .queryParam("base64_encoded", false)
                        .queryParam("wait", true)
                        .build())
            .contentType(MediaType.APPLICATION_JSON)
            .body(BodyInserters.fromValue(submission))
            .retrieve()
            .bodyToMono(Judge0Resp.class)
            .block();

    double val = "Accepted".equalsIgnoreCase(resp.status().description()) ? 100 : 0;
    return Score.builder().answer(answer).value(val).build();
  }

  @Override
  public RunResultDTO dryRun(RunRequestDTO dto) {

    Map<String, Object> submission =
        Map.of(
            "language_id", dto.languageId(),
            "source_code", dto.content(),
            "stdin", dto.stdin() == null ? "" : dto.stdin());

    Judge0Resp resp =
        judge0WebClient
            .post()
            .uri(
                uriBuilder ->
                    uriBuilder
                        .path("/submissions")
                        .queryParam("base64_encoded", false)
                        .queryParam("wait", true) // block until finished
                        .build())
            .contentType(MediaType.APPLICATION_JSON)
            .body(BodyInserters.fromValue(submission))
            .retrieve()
            .bodyToMono(Judge0Resp.class)
            .block();

    return new RunResultDTO(
        resp.status().description(),
        resp.stdout(),
        resp.stderr(),
        resp.time() // Judge0 returns time in seconds; convert if needed
        );
  }

  // Minimal projection of Judge0 JSON
  private record Judge0Resp(Status status, String stdout, String stderr, Double time) {

    private record Status(String description) {}
  }
}
