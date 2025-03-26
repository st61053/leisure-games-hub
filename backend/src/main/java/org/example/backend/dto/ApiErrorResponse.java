package org.example.backend.dto;

import org.example.backend.component.ApiError;

import java.util.List;

public class ApiErrorResponse {
    private List<ApiError> errors;

    public ApiErrorResponse(List<ApiError> errors) {
        this.errors = errors;
    }

    public static ApiErrorResponse of(ApiError... errors) {
        return new ApiErrorResponse(List.of(errors));
    }

    public List<ApiError> getErrors() {
        return errors;
    }
}
