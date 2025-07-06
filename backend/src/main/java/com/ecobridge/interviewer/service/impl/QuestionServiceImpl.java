package com.ecobridge.interviewer.service.impl;

import com.ecobridge.interviewer.domain.Phase;
import com.ecobridge.interviewer.domain.Question;
import com.ecobridge.interviewer.dto.QuestionRequestDTO;
import com.ecobridge.interviewer.dto.QuestionResponseDTO;
import com.ecobridge.interviewer.mapper.QuestionMapper;
import com.ecobridge.interviewer.repository.PhaseRepository;
import com.ecobridge.interviewer.repository.QuestionRepository;
import com.ecobridge.interviewer.service.QuestionService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
class QuestionServiceImpl implements QuestionService {

    private final QuestionRepository questionRepo;
    private final QuestionMapper questionMapper;
    private final PhaseRepository phaseRepository;

    @Override
    @Transactional
    public QuestionResponseDTO addQuestion(QuestionRequestDTO request) {
        Phase phase = phaseRepository.getReferenceById(request.phaseId());
        Question q = questionMapper.toEntity(request,phase);
        return questionMapper.toDto(questionRepo.save(q));
    }

    @Override
    public QuestionResponseDTO getQuestion(Long id) {
        return questionRepo.findById(id)
                .map(questionMapper::toDto)
                .orElseThrow();
    }
}