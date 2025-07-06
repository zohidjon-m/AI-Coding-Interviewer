package com.ecobridge.interviewer.service.impl;

import com.ecobridge.interviewer.domain.InterviewSession;
import com.ecobridge.interviewer.domain.SessionPreferences;
import com.ecobridge.interviewer.domain.User;
import com.ecobridge.interviewer.dto.InterviewSessionRequestDTO;
import com.ecobridge.interviewer.dto.InterviewSessionResponseDTO;
import com.ecobridge.interviewer.mapper.InterviewSessionMapper;
import com.ecobridge.interviewer.mapper.SessionPreferencesMapper;
import com.ecobridge.interviewer.repository.InterviewSessionRepository;
import com.ecobridge.interviewer.repository.UserRepository;
import com.ecobridge.interviewer.service.InterviewService;
import com.ecobridge.interviewer.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
@Slf4j
class InterviewServiceImpl implements InterviewService {

    private final InterviewSessionRepository sessionRepo;
    private final InterviewSessionMapper sessionMapper;
    private final SessionPreferencesMapper prefsMapper;
    private final UserRepository userRepo;

    @Override
    @Transactional
    public InterviewSessionResponseDTO createSession(InterviewSessionRequestDTO dto) {
        SessionPreferences prefs = prefsMapper.toEntity(dto.preferences());
        User user = userRepo.getReferenceById(dto.userId());
        InterviewSession session = InterviewSession.of(user, prefs, Instant.now());
        return sessionMapper.toDto(sessionRepo.save(session));
    }

    @Override
    public InterviewSessionResponseDTO getSession(Long id) {
        return sessionRepo.findById(id)
                .map(sessionMapper::toDto)
                .orElseThrow();
    }
}
