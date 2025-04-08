package org.example.backend.dto;

public record UserResponseDto(
        String username,
        String email,
        String firstname,
        String lastname
) {}
