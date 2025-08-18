package com.ecobridge.interviewer.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

public record AnswerScoreRequestDTO(
    @NotNull Long answerId, @DecimalMin("0.0") @DecimalMax("1.0") double value, String feedback) {}
