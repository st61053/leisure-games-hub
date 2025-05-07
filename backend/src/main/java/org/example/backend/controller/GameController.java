package org.example.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.backend.dto.*;
import org.example.backend.enums.GameSortByType;
import org.example.backend.enums.SortOrder;
import org.example.backend.service.GameService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/games")
@RequiredArgsConstructor
@Tag(name = "Games")
public class GameController {

    private final GameService gameService;

    @PostMapping
    public ResponseEntity<ActionResponseDto> create(@RequestBody ApiRequestDto<GameRequestDto> request) {
        return gameService.create(request.getData().getAttributes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponseDto<GameResponseDto>> get(@PathVariable String id) {
        return ResponseEntity.ok(gameService.get(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ActionResponseDto> update(@PathVariable String id, @RequestBody ApiRequestDto<GameRequestDto> request) {
        return gameService.update(id, request.getData().getAttributes());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ActionResponseDto> delete(@PathVariable String id) {
        return gameService.delete(id);
    }

    @GetMapping
    public ResponseEntity<ApiResponseDto<GameShortResponseDto>> getAll() {
        return ResponseEntity.ok(gameService.getAll());
    }

    @GetMapping("/filter")
    public ResponseEntity<ApiResponseDto<GameShortResponseDto>> filterGames(
            @RequestParam(required = false) String place,
            @RequestParam(required = false) List<String> categories,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String collection,
            @RequestParam(required = false, defaultValue = "CREATED_AT") GameSortByType sortBy,
            @RequestParam(required = false, defaultValue = "ASC") SortOrder sortOrder
    ) {
        return ResponseEntity.ok(gameService.filterGames(place, categories, name, collection, sortBy, sortOrder));
    }

}

