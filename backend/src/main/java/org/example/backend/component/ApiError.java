package org.example.backend.component;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter

public class ApiError {
    private String status;
    private String code;
    private String title;
    private String detail;
    private String source;
}
