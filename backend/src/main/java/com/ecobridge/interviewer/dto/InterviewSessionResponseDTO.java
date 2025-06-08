package com.ecobridge.interviewer.dto;

import java.time.Instant;

public record InterviewSessionResponseDTO(Long id,
                                          Long userId,
                                          Boolean active,
                                          Instant createdAt,
                                          SessionPreferencesResponseDTO preferences) {}