package org.example.backend.dto;

import lombok.Getter;
import org.example.backend.component.ApiData;

import java.util.List;

@Getter
public class ApiResponse<T> {

    private List<ApiData<T>> data;

    public ApiResponse(List<ApiData<T>> data) {
        this.data = data;
    }

//    public static <T> ApiResponse<T> success(List<ApiData<T>> data) {
//        return new ApiResponse<>(data);
//    }
//
//    public static <T> ApiResponse<T> fromList(List<T> items, ApiResourceType type, java.util.function.Function<T, Object> idMapper) {
//        List<ApiData<T>> data = items.stream()
//                .map(item -> new ApiData<>(idMapper.apply(item), type, item))
//                .toList();
//
//        return new ApiResponse<>(data);
//    }

}
