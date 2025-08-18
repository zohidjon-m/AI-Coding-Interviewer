package com.ecobridge.interviewer.dto;

import jakarta.validation.constraints.NotNull;
import java.util.Map;

public record AnswerRequestDTO(
    @NotNull Long questionId, @NotNull String content, @NotNull Map<String, Object> metadata) {}
