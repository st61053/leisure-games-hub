package org.example.backend.component;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString

public class ApiData<T> {
    private Object id;
    private String type;
    private T attributes;
}
