package com.ecobridge.interviewer.mapper;

import com.ecobridge.interviewer.domain.Answer;
import com.ecobridge.interviewer.domain.Score;
import com.ecobridge.interviewer.dto.AnswerScoreRequestDTO;
import com.ecobridge.interviewer.dto.AnswerScoreResponseDTO;
import org.mapstruct.Context;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnswerScoreMapper {
    Score toEntity(AnswerScoreRequestDTO dto, @Context Answer answer);
    AnswerScoreResponseDTO toDto(Score entity);
}
