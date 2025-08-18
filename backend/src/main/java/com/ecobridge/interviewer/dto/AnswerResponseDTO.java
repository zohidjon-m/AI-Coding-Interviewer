package com.ecobridge.interviewer.dto;

import java.time.Instant;

public record AnswerResponseDTO(Long id, Long questionId, String content, Instant createdAt) {}
