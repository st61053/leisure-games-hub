package org.example.backend.component;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString

public class ApiData<T> {
    private String id;
    private String type;
    private T attributes;
}
