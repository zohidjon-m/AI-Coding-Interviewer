package com.ecobridge.interviewer.dto;

import jakarta.validation.constraints.NotNull;

public record QuestionRequestDTO(@NotNull Long phaseId,
                                 String text,
                                 @NotNull String prompt,
                                 @NotNull String type) {}