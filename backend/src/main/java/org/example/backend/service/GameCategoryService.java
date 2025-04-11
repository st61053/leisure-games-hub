package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.component.ApiData;
import org.example.backend.component.ApiResourceType;
import org.example.backend.dto.ApiResponseDto;
import org.example.backend.dto.GameCategoryResponseDto;
import org.example.backend.repository.GameCategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameCategoryService {

    private final GameCategoryRepository gameCategoryRepository;

    public ApiResponseDto<GameCategoryResponseDto> getAll() {
        List<ApiData<GameCategoryResponseDto>> data = gameCategoryRepository.findAll().stream()
                .map(gameCategory -> new ApiData<>(
                        gameCategory.getId(),
                        ApiResourceType.CATEGORY.getValue(),
                        new GameCategoryResponseDto(
                                gameCategory.getName()
                        )
                ))
                .toList();

        return new ApiResponseDto<>(data);
    }
}
