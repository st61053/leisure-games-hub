package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.component.ApiData;
import org.example.backend.component.ApiResourceType;
import org.example.backend.dto.*;
import org.example.backend.entity.*;
import org.example.backend.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final GameCategoryRepository gameCategoryRepository;
    private final PlaceRepository placeRepository;
    private final GameCollectionRepository gameCollectionRepository;

    private User getAuthenticatedUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private List<GameCategory> loadCategoriesByIds(List<String> categoryIds) {
        return categoryIds.stream()
                .map(catId -> gameCategoryRepository.findById(catId)
                        .orElseThrow(() -> new RuntimeException("Category not found: " + catId)))
                .collect(Collectors.toList());
    }

    public ResponseEntity<ActionResponseDto> create(GameRequestDto request) {
        User createdBy = getAuthenticatedUser();
        Place place = placeRepository.findById(request.place())
                .orElseThrow(() -> new RuntimeException("Place not found"));
        List<GameCategory> categories = loadCategoriesByIds(request.categories());

        Game game = new Game();
        game.setName(request.name());
        game.setDescription(request.description());
        game.setPlace(place);
        game.setCategories(categories);
        game.setDuration(request.duration());
        game.setMinPlayers(request.minPlayers());
        game.setEquipment(request.equipment());
        game.setCreatedBy(createdBy);
        game.setAuthor(request.author());

        gameRepository.save(game);
        log.info("Creating new game: {}", request.name());


        return buildActionResponse(game.getId(), "GAME_CREATED");
    }

    public ResponseEntity<ActionResponseDto> update(String id, GameRequestDto request) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found"));

        User currentUser = getAuthenticatedUser();
        boolean isAdmin = currentUser.getRoles().stream()
                .anyMatch(role -> role.getName().equalsIgnoreCase("ADMIN"));
        boolean isAuthor = game.getCreatedBy().getId().equals(currentUser.getId());

        if (!isAdmin && !isAuthor) {
            throw new AccessDeniedException("You are not allowed to update this game.");
        }

        List<GameCategory> categories = loadCategoriesByIds(request.categories());
        Place place = placeRepository.findById(request.place())
                .orElseThrow(() -> new RuntimeException("Place not found"));

        game.setName(request.name());
        game.setDescription(request.description());
        game.setPlace(place);
        game.setCategories(categories);
        game.setDuration(request.duration());
        game.setMinPlayers(request.minPlayers());
        game.setEquipment(request.equipment());
        game.setAuthor(request.author());

        gameRepository.save(game);
        log.info("User {} updating game {}", currentUser.getUsername(), id);

        return buildActionResponse(game.getId(), "GAME_UPDATED");
    }

    public ResponseEntity<ActionResponseDto> delete(String id) {
        gameCollectionRepository.removeGameFromAllCollections(id);
        gameRepository.deleteById(id);
        log.warn("Deleting game with ID: {}", id);

        return buildActionResponse(id, "GAME_DELETED");
    }

    public ApiResponseDto<GameResponseDto> get(String id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found"));

        ApiData<GameResponseDto> data = new ApiData<>(
                game.getId(),
                ApiResourceType.GAME.getValue(),
                mapToResponse(game)
        );

        return new ApiResponseDto<>(List.of(data));
    }

    public ApiResponseDto<GameShortResponseDto> getAll() {
        List<ApiData<GameShortResponseDto>> data = gameRepository.findAll().stream()
                .map(game -> new ApiData<>(
                        game.getId(),
                        ApiResourceType.GAME.getValue(),
                        mapToShortResponse(game)
                ))
                .toList();

        return new ApiResponseDto<>(data);
    }

    public ApiResponseDto<GameShortResponseDto> filterGames(
            String place,
            List<String> categories,
            String name,
            String collectionId
    ) {
        List<Game> games;

        if (collectionId != null) {
            GameCollection collection = gameCollectionRepository.findById(collectionId)
                    .orElse(null);

            if (collection == null) {
                return new ApiResponseDto<>(List.of());
            }

            games = collection.getGames();
        } else {
            games = gameRepository.findAll();
        }

        List<Game> filtered = games.stream()
                .filter(game -> place == null || game.getPlace().getId().equals(place))
                .filter(game -> {
                    if (categories == null || categories.isEmpty()) return true;
                    Set<String> gameCategoryIds = game.getCategories().stream()
                            .map(GameCategory::getId)
                            .collect(Collectors.toSet());
                    return gameCategoryIds.containsAll(categories);
                })
                .filter(game -> name == null || game.getName().toLowerCase().contains(name.toLowerCase()))
                .toList();

        List<ApiData<GameShortResponseDto>> response = filtered.stream()
                .map(game -> new ApiData<>(
                        game.getId(),
                        ApiResourceType.GAME.getValue(),
                        mapToShortResponse(game)
                ))
                .toList();

        return new ApiResponseDto<>(response);
    }

    private GameResponseDto mapToResponse(Game game) {
        List<String> categoryIds = game.getCategories().stream()
                .map(GameCategory::getId)
                .toList();

        return new GameResponseDto(
                game.getName(),
                game.getDescription(),
                game.getPlace().getId(),
                categoryIds,
                game.getDuration(),
                game.getMinPlayers(),
                game.getEquipment(),
                game.getAuthor(),
                game.getCreatedBy().getId(),
                game.getCreatedAt(),
                game.getUpdatedAt(),
                game.getFavorites()
        );
    }

    private GameShortResponseDto mapToShortResponse(Game game) {
        List<String> categoryIds = game.getCategories().stream()
                .map(GameCategory::getId)
                .toList();

        return new GameShortResponseDto(
                game.getName(),
                game.getPlace().getId(),
                categoryIds,
                game.getDuration(),
                game.getMinPlayers(),
                game.getAuthor(),
                game.getCreatedBy().getId(),
                game.getCreatedAt(),
                game.getUpdatedAt(),
                game.getFavorites()
        );
    }

    private ResponseEntity<ActionResponseDto> buildActionResponse(String id, String message) {
        ActionResultDto result = new ActionResultDto(id, "success", message);
        return ResponseEntity.ok(new ActionResponseDto(List.of(result)));
    }
}
