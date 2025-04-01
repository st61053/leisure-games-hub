package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.*;
import org.example.backend.service.GameCollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/collections")
@RequiredArgsConstructor
public class GameCollectionController {

    private final GameCollectionService gameCollectionService;

    @PostMapping
    public ResponseEntity<ActionResponseDto> create(@RequestBody ApiRequestDto<GameCollectionRequestDto> request) {
        return gameCollectionService.create(request.getData().getAttributes());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ActionResponseDto> update(@PathVariable String id, @RequestBody ApiRequestDto<GameCollectionRequestDto> request) {
        return gameCollectionService.update(id, request.getData().getAttributes());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ActionResponseDto> delete(@PathVariable String id) {
        return gameCollectionService.delete(id);
    }

    @GetMapping
    public ResponseEntity<ApiResponseDto<GameCollectionResponseDto>> getAll() {
        return ResponseEntity.ok(gameCollectionService.getAll());
    }

    @PostMapping("/{collectionId}/games/{gameId}")
    public ResponseEntity<ActionResponseDto> addGameToCollection(@PathVariable String collectionId, @PathVariable String gameId) {
        return gameCollectionService.addGameToCollection(collectionId, gameId);
    }

    @DeleteMapping("/{collectionId}/games/{gameId}")
    public ResponseEntity<ActionResponseDto> removeGameFromCollection(@PathVariable String collectionId, @PathVariable String gameId) {
        return gameCollectionService.removeGameFromCollection(collectionId, gameId);
    }
}
