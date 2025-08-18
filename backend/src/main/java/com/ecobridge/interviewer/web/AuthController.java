package com.ecobridge.interviewer.web;

import com.ecobridge.interviewer.dto.AuthenticationDTO;
import com.ecobridge.interviewer.dto.UserRequestDTO;
import com.ecobridge.interviewer.dto.UserResponseDTO;
import com.ecobridge.interviewer.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

  private final UserService userService;

  @PostMapping("/register")
  public ResponseEntity<UserResponseDTO> register(@RequestBody @Valid UserRequestDTO dto) {
    return ResponseEntity.status(HttpStatus.CREATED).body(userService.register(dto));
  }

  @PostMapping("/login")
  public ResponseEntity<UserResponseDTO> login(@RequestBody @Valid AuthenticationDTO dto) {
    return ResponseEntity.ok(userService.login(dto.email(), dto.password()));
  }
}
