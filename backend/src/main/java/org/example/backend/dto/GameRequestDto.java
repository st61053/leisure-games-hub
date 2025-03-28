package org.example.backend.dto;

import java.util.List;

public record GameRequestDto(
        String author,
        String name,
        String description,
        List<String> categories,
        Integer duration,
        Integer minPlayers,
        List<String> equipment,
        String place
) {}
