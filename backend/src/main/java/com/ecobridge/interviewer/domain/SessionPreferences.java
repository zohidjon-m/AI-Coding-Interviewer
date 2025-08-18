package com.ecobridge.interviewer.domain;

import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotNull;
import java.io.Serializable;

/** Immutable value object persisted inline in InterviewSession. */
@Embeddable
public record SessionPreferences(
    @NotNull @Enumerated(EnumType.STRING) TechStack stack,
    @NotNull @Enumerated(EnumType.STRING) ExperienceLevel experience,
    @NotNull @Enumerated(EnumType.STRING) Difficulty difficulty,
    @NotNull @Enumerated(EnumType.STRING) CompanyTier companyTier)
    implements Serializable {}
