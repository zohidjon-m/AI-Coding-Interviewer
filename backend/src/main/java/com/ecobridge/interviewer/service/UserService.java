package com.ecobridge.interviewer.service;

import com.ecobridge.interviewer.dto.UserRequestDTO;
import com.ecobridge.interviewer.dto.UserResponseDTO;

public interface UserService {
  UserResponseDTO register(UserRequestDTO request);

  UserResponseDTO login(String email, String password);
}
