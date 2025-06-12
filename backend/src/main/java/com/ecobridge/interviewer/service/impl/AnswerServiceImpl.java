package com.ecobridge.interviewer.service.impl;

import com.ecobridge.interviewer.domain.Answer;
import com.ecobridge.interviewer.domain.Question;
import com.ecobridge.interviewer.domain.Score;
import com.ecobridge.interviewer.dto.AnswerRequestDTO;
import com.ecobridge.interviewer.dto.AnswerResponseDTO;
import com.ecobridge.interviewer.dto.AnswerScoreRequestDTO;
import com.ecobridge.interviewer.dto.AnswerScoreResponseDTO;
import com.ecobridge.interviewer.repository.*;
import com.ecobridge.interviewer.service.*;
import com.ecobridge.interviewer.mapper.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
class AnswerServiceImpl implements AnswerService {

    private final AnswerRepository answerRepo;
    private final QuestionRepository             questionRepo;
    private final AnswerMapper                   answerMapper;
    private final AnswerScoreMapper              scoreMapper;
    private final InterviewOrchestrationService  orchestrationService;
    private final ScoringService                 scoringService;

    @Override
    @Transactional
    public AnswerResponseDTO submitAnswer(AnswerRequestDTO dto) {
        Question q = questionRepo.getReferenceById(dto.questionId());
        Answer a = Answer.of(q, dto.content());
        a = answerRepo.save(a);

        // Drive interview progression
        orchestrationService.handleAnswerSubmission(a);

        return answerMapper.toDto(a);
    }

    @Override
    @Transactional
    public AnswerScoreResponseDTO scoreAnswer(AnswerScoreRequestDTO dto) {
        Answer a = answerRepo.getReferenceById(dto.answerId());
        Score s = scoringService.evaluate(a);
        return scoreMapper.toDto(s);
    }
}
