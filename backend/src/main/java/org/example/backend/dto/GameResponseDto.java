package org.example.backend.dto;

import java.time.LocalDateTime;
import java.util.List;

public record GameResponseDto(
        String name,
        String description,
        String place,
        List<String> categories,
        Integer duration,
        Integer minPlayers,
        List<String> equipment,
        String author,
        String createdBy,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {}
