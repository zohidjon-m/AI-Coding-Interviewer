package com.ecobridge.interviewer.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * Sent when the candidate hits the **Run** button (code test only).
 */
public record RunRequestDTO(
        @NotNull Long    questionId,
        @NotNull Integer languageId,        // Judge0 language (e.g., 52 = Java 21)
        @NotNull @Size(min = 1) String content,
        String stdin                              // optional
){}