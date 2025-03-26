package org.example.backend.dto;

public record RegisterRequest(String username, String firstName, String lastName, String email, String password) {
}
