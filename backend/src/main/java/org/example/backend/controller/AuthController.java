package org.example.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.example.backend.dto.*;
import org.example.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@Tag(name = "Auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<ActionResponseDto> register(@RequestBody ApiRequestDto<RegisterRequestDto> request) {
        return authService.register(request.getData().getAttributes());
    }

    @PostMapping("/login")
    public ApiResponseDto<AuthResponseDto> login(@RequestBody ApiRequestDto<AuthRequestDto> request) {
        return authService.authenticate(request.getData().getAttributes());
    }
}
