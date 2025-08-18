package com.ecobridge.interviewer.dto;

import jakarta.validation.constraints.NotNull;

public record InterviewSessionRequestDTO(
    @NotNull Long userId, @NotNull Boolean active, SessionPreferencesRequestDTO preferences) {}
