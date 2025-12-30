package com.ecobridge.interviewer.mapper;

import com.ecobridge.interviewer.domain.Answer;
import com.ecobridge.interviewer.domain.Question;
import com.ecobridge.interviewer.dto.AnswerRequestDTO;
import com.ecobridge.interviewer.dto.AnswerResponseDTO;
import org.mapstruct.Context;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
  Answer toEntity(AnswerRequestDTO dto, @Context Question question);

  AnswerResponseDTO toDto(Answer entity);
}
