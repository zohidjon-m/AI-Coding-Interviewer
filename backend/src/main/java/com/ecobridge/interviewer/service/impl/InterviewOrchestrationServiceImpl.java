package com.ecobridge.interviewer.service.impl;
import com.ecobridge.interviewer.dto.QuestionResponseDTO;
import com.ecobridge.interviewer.mapper.QuestionMapper;
import com.ecobridge.interviewer.service.*;
import com.ecobridge.interviewer.domain.*;
import com.ecobridge.interviewer.dto.PhaseResponseDTO;
import com.ecobridge.interviewer.mapper.PhaseMapper;
import com.ecobridge.interviewer.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class InterviewOrchestrationServiceImpl implements InterviewOrchestrationService {

    private final InterviewSessionRepository interviewSessionRepo;
    private final PhaseRepository            phaseRepo;
    private final QuestionRepository         questionRepo;
    private final ScoringService             scoringService;
    private final PromptService              promptService;
    private final PhaseTransitionService     phaseTransitionService;
    private final McpContextService          mcpContextService;
    private final PhaseMapper                phaseMapper;
    private final QuestionMapper             questionMapper;

    @Override
    @Transactional
    public PhaseResponseDTO advancePhase(Long sessionId) {
        Phase current = phaseRepo.findTopBySessionIdOrderByIdDesc(sessionId);
        Phase.PhaseType nextType = phaseTransitionService.next(current.getPhaseType());
        if (nextType == null) {
            throw new IllegalStateException("Session already finished");
        }

        InterviewSession session = interviewSessionRepo.getReferenceById(sessionId);
        Phase nextPhase = phaseRepo.save(Phase.of(session, nextType));
        Question question = promptService.generatePromptAndPersist(nextPhase);
        mcpContextService.appendContext(session, nextPhase, question);

        return phaseMapper.toDto(nextPhase, question);
    }
    /* ---------------- baseline‑only generation --------------------------- */
    @Override @Transactional
    public QuestionResponseDTO generateBaselineQuestion(Long sessionId) {
        InterviewSession session = interviewSessionRepo.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));

        // find existing BASELINE phase or create one lazily
        Phase baseline =phaseRepo.save(Phase.of(session, Phase.PhaseType.BASELINE));

        Question q = promptService.generatePromptAndPersist(baseline);
        return questionMapper.toDto(q);
    }

    @Override
    @Transactional
    public void handleAnswerSubmission(Answer answer) {
        Score score = scoringService.evaluate(answer);
        // Simplified: mark phase complete if scoring succeeded
        Phase phase = answer.getQuestion().getPhase();
        if (score != null && phase.isCompleteAfter(score)) {
            advancePhase(phase.getSession().getId());
        }
    }
}
