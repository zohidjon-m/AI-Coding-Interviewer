package com.ecobridge.interviewer.service.impl;

import com.ecobridge.interviewer.service.McpContextService;
import com.ecobridge.interviewer.domain.*;
import com.ecobridge.interviewer.repository.McpContextRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class McpContextServiceImpl implements McpContextService {

    private final McpContextRepository repo;

    @Override
    @Transactional
    public void initContext(InterviewSession session, Phase phase, Question question) {
        McpContext ctx = McpContext.start(session, phase, question);
        repo.save(ctx);
    }

    @Override
    @Transactional
    public void appendContext(InterviewSession session, Phase phase, Question question) {
        McpContext ctx = repo.findBySessionId(session.getId())
                .orElseThrow();
        ctx.append(phase, question);
        repo.save(ctx);
    }

    @Override
    public McpContext load(Long sessionId) {
        return repo.findBySessionId(sessionId).orElse(null);
    }
}
