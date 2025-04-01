package org.example.backend.dto;

public record RegisterRequestDto(String username, String firstname, String lastname, String email, String password) {
}
