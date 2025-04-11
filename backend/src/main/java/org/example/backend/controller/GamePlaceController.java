package org.example.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.backend.dto.*;
import org.example.backend.service.GamePlaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/places")
@RequiredArgsConstructor
@Tag(name = "Places")
public class GamePlaceController {

    private final GamePlaceService gamePlaceService;

    @GetMapping
    public ResponseEntity<ApiResponseDto<GamePlaceResponseDto>> getAll() {
        return ResponseEntity.ok(gamePlaceService.getAll());
    }

}

