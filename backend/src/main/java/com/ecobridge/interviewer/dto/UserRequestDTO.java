package com.ecobridge.interviewer.dto;

import jakarta.validation.constraints.*;

public record UserRequestDTO(
    @NotNull @Email String email,
    @NotNull @Size(min = 2, max = 255) String fullName,
    @NotNull @Size(min = 6, max = 100) String password) {}
//        @NotNull String role) {}  SET THE EVERY USER AS A CANDIDATE
