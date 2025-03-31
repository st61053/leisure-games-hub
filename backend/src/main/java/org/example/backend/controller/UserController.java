package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.*;
import org.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<ApiResponseDto<UserResponseDto>> getAll() {
        return ResponseEntity.ok(userService.getAll());
    }
}
