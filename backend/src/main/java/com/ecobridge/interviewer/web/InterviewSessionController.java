package com.ecobridge.interviewer.web;

import com.ecobridge.interviewer.dto.*;
import com.ecobridge.interviewer.service.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/sessions")
@RequiredArgsConstructor
class InterviewSessionController {
  private final InterviewService interviewService;
  private final InterviewOrchestrationService orchestrationService;
  private final AnswerService answerService;
  private final RunService runService;

  // ─────────────── Session CRUD ───────────────
  @PostMapping
  public ResponseEntity<InterviewSessionResponseDTO> create(
      @RequestBody @Valid InterviewSessionRequestDTO dto) {
    InterviewSessionResponseDTO resp = interviewService.createSession(dto);
    return ResponseEntity.status(HttpStatus.CREATED).body(resp);
  }

  @GetMapping("/{id}")
  public InterviewSessionResponseDTO get(@PathVariable Long id) {
    return interviewService.getSession(id);
  }

  //
  //    @PostMapping("/{id}baseline-question")
  //    public ResponseEntity<QuestionResponseDTO> baselineQuestion(@PathVariable Long id) {
  //
  //    }

  // ─────────────── Phase progression ───────────────
  @PostMapping("/{id}/phases/next")
  public PhaseResponseDTO nextPhase(@PathVariable Long id) {
    return orchestrationService.advancePhase(id);
  }

  @PostMapping("/{id}baseline-question")
  public ResponseEntity<QuestionResponseDTO> baselineQuestion(@PathVariable Long id) {}

  // ─────────────── Answers ───────────────
  @PostMapping("/answers")
  public AnswerResponseDTO submit(@RequestBody @Valid AnswerRequestDTO dto) {
    return answerService.submitAnswer(dto);
  }

  @PostMapping("/answers/score")
  public AnswerScoreResponseDTO score(@RequestBody @Valid AnswerScoreRequestDTO dto) {
    return answerService.scoreAnswer(dto);
  }

  // ─────────────── Code run (Judge0) ───────────────
  @PostMapping("/run")
  public RunResultDTO run(@RequestBody @Valid RunRequestDTO dto) {
    return runService.execute(dto);
  }
}
