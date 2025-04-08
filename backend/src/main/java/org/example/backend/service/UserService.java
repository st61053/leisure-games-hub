package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.component.ApiData;
import org.example.backend.component.ApiResourceType;
import org.example.backend.dto.ApiResponseDto;
import org.example.backend.dto.UserResponseDto;
import org.example.backend.entity.GameCollection;
import org.example.backend.entity.User;
import org.example.backend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
                        new UserResponseDto(
                                user.getUsername(),
                                user.getEmail(),
                                user.getFirstname(),
                                user.getLastname()
                        )
                ))
                .toList();

        return new ApiResponseDto<>(data);
    }

    public ApiResponseDto<UserResponseDto> get(String id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        userRepository.findByUsername(username).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not authenticated"));

        User responseUser = userRepository.findById(id).orElseThrow(() ->
                new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        List<ApiData<UserResponseDto>> data = List.of(new ApiData<>(
                responseUser.getId(),
                ApiResourceType.USER.getValue(),
                new UserResponseDto(
                        responseUser.getUsername(),
                        responseUser.getEmail(),
                        responseUser.getFirstname(),
                        responseUser.getLastname()
                )
        ));

        return new ApiResponseDto<>(data);
    }
}
