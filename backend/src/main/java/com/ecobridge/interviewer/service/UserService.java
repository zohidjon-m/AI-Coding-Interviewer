package com.ecobridge.interviewer.service;

import com.ecobridge.interviewer.dto.UserRequestDTO;
import com.ecobridge.interviewer.dto.UserResponseDTO;

import java.util.List;

public interface UserService {
    UserResponseDTO register(UserRequestDTO request);
    UserResponseDTO getById(Long id);
    List<UserResponseDTO> listAll();
}