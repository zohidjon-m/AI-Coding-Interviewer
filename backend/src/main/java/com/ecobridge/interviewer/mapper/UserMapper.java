package com.ecobridge.interviewer.mapper;

import com.ecobridge.interviewer.domain.User;
import com.ecobridge.interviewer.dto.UserRequestDTO;
import com.ecobridge.interviewer.dto.UserResponseDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
  User toEntity(UserRequestDTO dto);

  UserResponseDTO toDto(User entity);
}
