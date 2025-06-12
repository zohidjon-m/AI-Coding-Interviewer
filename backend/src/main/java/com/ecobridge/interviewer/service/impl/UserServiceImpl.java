package com.ecobridge.interviewer.service.impl;

import com.ecobridge.interviewer.domain.User;
import com.ecobridge.interviewer.dto.UserRequestDTO;
import com.ecobridge.interviewer.dto.UserResponseDTO;
import com.ecobridge.interviewer.mapper.UserMapper;
import com.ecobridge.interviewer.repository.UserRepository;
import com.ecobridge.interviewer.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    @Transactional
    public UserResponseDTO register(UserRequestDTO request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new IllegalArgumentException("Email already in use");
        }

        User user = User.builder()
                .email(request.email())
                .fullName(request.fullName())
                .password(request.password()) // Hash this in production!
//                .role(User.Role.valueOf("CANDIDATE"))
                .build();

        User savedUser = userRepository.save(user);
        return userMapper.toDto(savedUser);
    }

    @Override
    public UserResponseDTO login(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password)
                .map(userMapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
    }
}
