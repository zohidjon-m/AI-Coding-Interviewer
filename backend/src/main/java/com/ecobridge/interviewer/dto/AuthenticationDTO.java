package com.ecobridge.interviewer.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AuthenticationDTO(@NotNull @Email String email,
                                @NotNull @Size(min = 8, max = 72) String password) {}
