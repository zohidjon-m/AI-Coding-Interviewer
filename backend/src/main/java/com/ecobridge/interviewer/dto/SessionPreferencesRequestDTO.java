package com.ecobridge.interviewer.dto;

import com.ecobridge.interviewer.domain.CompanyTier;
import com.ecobridge.interviewer.domain.Difficulty;
import com.ecobridge.interviewer.domain.ExperienceLevel;
import com.ecobridge.interviewer.domain.TechStack;

public record SessionPreferencesRequestDTO(
    TechStack stack, ExperienceLevel experience, Difficulty difficulty, CompanyTier companyTier) {}
