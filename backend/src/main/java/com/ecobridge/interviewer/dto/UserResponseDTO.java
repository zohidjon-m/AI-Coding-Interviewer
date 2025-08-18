package com.ecobridge.interviewer.dto;

import java.time.Instant;

public record UserResponseDTO(
    Long id, String email, String fullName, String role, Instant createdAt) {}
