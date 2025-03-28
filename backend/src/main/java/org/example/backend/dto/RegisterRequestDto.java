package org.example.backend.dto;

public record RegisterRequestDto(String username, String firstName, String lastName, String email, String password) {
}
