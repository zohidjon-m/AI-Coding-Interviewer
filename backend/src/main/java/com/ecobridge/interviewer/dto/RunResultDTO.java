package com.ecobridge.interviewer.dto;

public record RunResultDTO(
    String status, // “Accepted”, “Compilation Error”, etc.
    String stdout,
    String stderr,
    Double timeMillis // changed from Long to double
    ) {}
