package org.example.backend.dto;

import org.example.backend.enums.GameCollectionType;

import java.util.List;

public record GameCollectionResponseDto(String name, List<String> games) {}
