package com.ecobridge.interviewer.mapper;

import com.ecobridge.interviewer.domain.InterviewSession;
import com.ecobridge.interviewer.domain.User;
import com.ecobridge.interviewer.dto.*;
import org.mapstruct.*;

@Mapper(componentModel = "spring",
        uses = SessionPreferencesMapper.class)
public interface InterviewSessionMapper {

    /* MapStruct @Context lets us pass the authenticated user in     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "active", constant = "true")
    @Mapping(target = "startedAt", ignore = true)
    @Mapping(target = "endedAt", ignore = true)
    InterviewSession toEntity(InterviewSessionRequestDTO dto,
                              @Context User user);

    InterviewSessionResponseDTO toDto(InterviewSession entity);
}