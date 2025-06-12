package com.ecobridge.interviewer.mapper;

import com.ecobridge.interviewer.domain.InterviewSession;
import com.ecobridge.interviewer.domain.Phase;
import com.ecobridge.interviewer.domain.Question;
import com.ecobridge.interviewer.dto.PhaseRequestDTO;
import com.ecobridge.interviewer.dto.PhaseResponseDTO;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

/**
 * Maps Phase ⇆ DTO.
 */
@Mapper(
        componentModel = "spring",
        unmappedTargetPolicy = ReportingPolicy.IGNORE   // suppress “unmapped” warnings
)
public interface PhaseMapper {

    /* ========= CREATE ========= */

    @Mapping(target = "id", ignore = true)            // DB will generate it
    @Mapping(target = "session", source = "session")
        // ← 2nd param
    Phase toEntity(PhaseRequestDTO dto,
                   InterviewSession session);

    /* ========= READ / DTO ========= */

    @Mapping(target = "id", source = "entity.id")          // choose which id
    @Mapping(target = "sessionId", source = "entity.session.id")
    @Mapping(target = "type", source = "entity.phaseType")
//    @Mapping(target = "questionId", source = "question.id")
        // current question
    PhaseResponseDTO toDto(Phase entity,
                           Question question);


}