package com.ecobridge.interviewer.dto;

public record QuestionResponseDTO(Long id,
                                  Long phaseId,
                                  String text,
                                  String type) {}