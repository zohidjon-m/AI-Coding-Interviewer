package com.ecobridge.interviewer.service.impl;

import com.ecobridge.interviewer.adapter.out.judge.Judge0Adapter;
import com.ecobridge.interviewer.service.RunService;
import com.ecobridge.interviewer.dto.RunRequestDTO;
import com.ecobridge.interviewer.dto.RunResultDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RunServiceImpl implements RunService {

    private final Judge0Adapter judge0Adapter;

    @Override
    public RunResultDTO execute(RunRequestDTO dto) {
        return judge0Adapter.dryRun(dto);
    }
}