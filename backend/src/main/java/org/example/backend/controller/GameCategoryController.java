package org.example.backend.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.example.backend.dto.ApiResponseDto;
import org.example.backend.dto.GameCategoryResponseDto;
import org.example.backend.dto.GamePlaceResponseDto;
import org.example.backend.service.GameCategoryService;
import org.example.backend.service.GamePlaceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
@Tag(name = "Categories")
public class GameCategoryController {

    private final GameCategoryService gameCategoryService;

    @GetMapping
    public ResponseEntity<ApiResponseDto<GameCategoryResponseDto>> getAll() {
        return ResponseEntity.ok(gameCategoryService.getAll());
    }

}

