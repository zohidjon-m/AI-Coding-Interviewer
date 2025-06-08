package com.ecobridge.interviewer.dto;

import jakarta.validation.constraints.NotNull;

public record PhaseRequestDTO(@NotNull Long sessionId,
                              @NotNull String type) {}
