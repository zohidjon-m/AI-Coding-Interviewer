package com.ecobridge.interviewer.dto;

import jakarta.validation.constraints.NotNull;

/** Empty‑body DTO – the sessionId is carried in the path (e.g. /interviews/{id}/next‑phase). */
public record NextPhaseRequestDTO(@NotNull Long sessionId) {}
