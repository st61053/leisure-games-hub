package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.component.ApiData;
import org.example.backend.component.ApiResourceType;
import org.example.backend.dto.ApiResponseDto;
import org.example.backend.dto.GameResponseDto;
import org.example.backend.dto.UserResponseDto;
import org.example.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public ApiResponseDto<UserResponseDto> getAll() {
        List<ApiData<UserResponseDto>> data = userRepository.findAll().stream()
                .map(user -> new ApiData<>(
                        user.getId(),
                        ApiResourceType.USER.getValue(),
                        new UserResponseDto(user.getUsername())
                ))
                .toList();

        return new ApiResponseDto<>(data);
    }
}
