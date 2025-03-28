package org.example.backend.exception;

import org.example.backend.component.ApiError;
import org.example.backend.dto.ApiErrorResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<ApiErrorResponseDto> handleBadCredentials(BadCredentialsException e) {
        ApiError error = new ApiError(
                "401",
                "INVALID_CREDENTIALS",
                "Authentication failed",
                "Username or password is incorrect.",
                "/auth/login"
        );
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ApiErrorResponseDto.of(error));
    }
}
