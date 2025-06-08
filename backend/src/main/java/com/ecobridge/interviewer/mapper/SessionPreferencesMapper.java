package com.ecobridge.interviewer.mapper;

import com.ecobridge.interviewer.domain.SessionPreferences;
import com.ecobridge.interviewer.dto.*;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface SessionPreferencesMapper {

    SessionPreferences toEntity(SessionPreferencesRequestDTO dto);

    SessionPreferencesResponseDTO toDto(SessionPreferences entity);
}
