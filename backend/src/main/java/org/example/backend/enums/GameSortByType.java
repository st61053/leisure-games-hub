package org.example.backend.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor

public enum GameSortByType {
    CREATED_AT("createdAt"),
    NAME("name"),
    FAVORITES("favorites");

    private final String value;
}

