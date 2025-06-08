package com.ecobridge.interviewer.mapper;

import com.ecobridge.interviewer.domain.Phase;
import com.ecobridge.interviewer.domain.Question;
import com.ecobridge.interviewer.dto.QuestionRequestDTO;
import com.ecobridge.interviewer.dto.QuestionResponseDTO;
import org.mapstruct.Context;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question toEntity(QuestionRequestDTO dto, @Context Phase phase);
    QuestionResponseDTO toDto(Question entity);
}
