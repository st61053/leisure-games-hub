package org.example.backend.dto;

import java.util.List;

public record GameCollectionRequestDto(String name, List<String> games) {

}
