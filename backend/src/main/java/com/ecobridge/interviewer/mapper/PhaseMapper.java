package com.ecobridge.interviewer.mapper;

import com.ecobridge.interviewer.domain.InterviewSession;
import com.ecobridge.interviewer.domain.Phase;
import com.ecobridge.interviewer.domain.Question;
import com.ecobridge.interviewer.dto.PhaseRequestDTO;
import com.ecobridge.interviewer.dto.PhaseResponseDTO;
import org.mapstruct.Context;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PhaseMapper {
    Phase toEntity(PhaseRequestDTO dto, @Context InterviewSession session);
    PhaseResponseDTO toDto(Phase entity, Question question);
}
