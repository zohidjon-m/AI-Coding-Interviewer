package com.ecobridge.interviewer.dto;

import jakarta.validation.constraints.NotNull;

/**
 * Empty‑body DTO – the sessionId is carried in the path (e.g. /interviews/{id}/end).
 */
public record EndSessionRequestDTO(@NotNull Long sessionId) {}