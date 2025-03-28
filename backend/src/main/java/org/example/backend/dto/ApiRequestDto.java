package org.example.backend.dto;

import lombok.*;
import org.example.backend.component.ApiData;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString

public class ApiRequestDto<T> {
    private ApiData<T> data;

}

