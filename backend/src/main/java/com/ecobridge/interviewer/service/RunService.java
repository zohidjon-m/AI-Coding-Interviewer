package com.ecobridge.interviewer.service;


import com.ecobridge.interviewer.dto.RunRequestDTO;
import com.ecobridge.interviewer.dto.RunResultDTO;

public interface RunService {
    RunResultDTO execute(RunRequestDTO dto);
}