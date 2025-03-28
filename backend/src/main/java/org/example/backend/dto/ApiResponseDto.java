package org.example.backend.dto;

import lombok.Getter;
import org.example.backend.component.ApiData;

import java.util.List;

@Getter
public class ApiResponseDto<T> {

    private List<ApiData<T>> data;

    public ApiResponseDto(List<ApiData<T>> data) {
        this.data = data;
    }

}
