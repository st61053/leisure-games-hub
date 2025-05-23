package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.component.ApiData;
import org.example.backend.component.ApiResourceType;
import org.example.backend.dto.ApiResponseDto;
import org.example.backend.dto.GamePlaceResponseDto;
import org.example.backend.entity.Place;
import org.example.backend.repository.PlaceRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GamePlaceService {

    private final PlaceRepository placeRepository;

    public ApiResponseDto<GamePlaceResponseDto> getAll() {
        List<ApiData<GamePlaceResponseDto>> data = placeRepository.findAll().stream()
                .map(this::mapToApiData)
                .toList();

        return new ApiResponseDto<>(data);
    }

    private ApiData<GamePlaceResponseDto> mapToApiData(Place place) {
        GamePlaceResponseDto dto = new GamePlaceResponseDto(place.getName());
        return new ApiData<>(place.getId(), ApiResourceType.PLACE.getValue(), dto);
    }
}
