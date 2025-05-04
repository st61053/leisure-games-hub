package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.component.ApiData;
import org.example.backend.component.ApiResourceType;
import org.example.backend.dto.ApiResponseDto;
import org.example.backend.dto.UserResponseDto;
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
                .map(this::mapToApiData)
                .toList();

        return new ApiResponseDto<>(data);
    }

    public ApiResponseDto<UserResponseDto> get(String id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!user.getUsername().equals(currentUsername)) {
            throw new AccessDeniedException("Access denied");
        }

        return new ApiResponseDto<>(List.of(mapToApiData(user)));
    }

    private ApiData<UserResponseDto> mapToApiData(User user) {
        UserResponseDto dto = new UserResponseDto(
                user.getUsername(),
                user.getEmail(),
                user.getFirstname(),
                user.getLastname()
        );
        return new ApiData<>(user.getId(), ApiResourceType.USER.getValue(), dto);
    }
}
