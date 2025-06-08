package com.ecobridge.interviewer.dto;

import jakarta.validation.constraints.NotNull;

public record AnswerRequestDTO(@NotNull Long questionId,
                               @NotNull String content) {}
