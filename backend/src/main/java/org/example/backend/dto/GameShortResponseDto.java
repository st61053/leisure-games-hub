package org.example.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public record GameShortResponseDto(
        String name,
        String place,
        List<String> categories,
        Integer duration,
        Integer minPlayers,
        String author,
        String createdBy,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        Integer favorites
) {}
