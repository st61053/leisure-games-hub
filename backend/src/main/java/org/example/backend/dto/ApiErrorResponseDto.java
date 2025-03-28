package org.example.backend.dto;

import org.example.backend.component.ApiError;

import java.util.List;

public class ApiErrorResponseDto {
    private List<ApiError> errors;

    public ApiErrorResponseDto(List<ApiError> errors) {
        this.errors = errors;
    }

    public static ApiErrorResponseDto of(ApiError... errors) {
        return new ApiErrorResponseDto(List.of(errors));
    }

    public List<ApiError> getErrors() {
        return errors;
    }
}
