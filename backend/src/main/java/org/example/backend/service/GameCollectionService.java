package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.component.ApiData;
import org.example.backend.component.ApiResourceType;
import org.example.backend.dto.*;
import org.example.backend.entity.Game;
import org.example.backend.entity.GameCollection;
import org.example.backend.entity.User;
import org.example.backend.enums.GameCollectionType;
import org.example.backend.repository.GameCollectionRepository;
import org.example.backend.repository.GameRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameCollectionService {

    private final GameCollectionRepository collectionRepository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;

    private User getAuthenticatedUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public ResponseEntity<ActionResponseDto> create(GameCollectionRequestDto request) {
        User user = getAuthenticatedUser();

        GameCollection collection = new GameCollection();
        collection.setName(request.name());
        collection.setType(GameCollectionType.CUSTOM);
        collection.setOwner(user);
        collection.setGames(gameRepository.findAllById(request.games()));

        GameCollection saved = collectionRepository.save(collection);
        log.info("User {} is creating a new collection: {}", user.getUsername(), request.name());

        return buildActionResponse(saved.getId(), "GAME_COLLECTION_CREATED");
    }

    public ResponseEntity<ActionResponseDto> update(String id, GameCollectionRequestDto request) {
        User user = getAuthenticatedUser();

        GameCollection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection not found"));

        validateOwner(collection, user);
        validateNotFavorite(collection);

        collection.setName(request.name());
        collection.setGames(gameRepository.findAllById(request.games()));

        GameCollection updated = collectionRepository.save(collection);
        log.info("User {} is updating collection {} to new name: {}", user.getUsername(), id, request.name());

        return buildActionResponse(updated.getId(), "GAME_COLLECTION_UPDATED");
    }

    public ResponseEntity<ActionResponseDto> delete(String id) {
        User user = getAuthenticatedUser();

        GameCollection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection not found"));

        validateOwner(collection, user);
        validateNotFavorite(collection);

        collectionRepository.deleteById(id);
        log.warn("User {} is deleting collection {}", user.getUsername(), id);

        return buildActionResponse(id, "GAME_COLLECTION_DELETED");
    }

    public ApiResponseDto<GameCollectionResponseDto> getAll() {
        User user = getAuthenticatedUser();

        List<ApiData<GameCollectionResponseDto>> data = collectionRepository.findByOwnerId(user.getId()).stream()
                .map(collection -> new ApiData<>(
                        collection.getId(),
                        ApiResourceType.COLLECTION.getValue(),
                        mapToResponse(collection)))
                .toList();

        return new ApiResponseDto<>(data);
    }

    public ApiResponseDto<GameCollectionResponseDto> get(String id) {
        GameCollection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection not found"));

        ApiData<GameCollectionResponseDto> data = new ApiData<>(
                collection.getId(),
                ApiResourceType.COLLECTION.getValue(),
                mapToResponse(collection)
        );

        return new ApiResponseDto<>(List.of(data));
    }

    public ResponseEntity<ActionResponseDto> addGameToCollection(String collectionId, String gameId) {
        User user = getAuthenticatedUser();

        GameCollection collection = collectionRepository.findByIdAndOwnerId(collectionId, user.getId())
                .orElseThrow(() -> new AccessDeniedException("Unauthorized or collection not found"));

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));

        if (collection.getGames().add(game)) {
            if (collection.getType() == GameCollectionType.FAVORITE) {
                game.setFavorites(game.getFavorites() + 1);
                gameRepository.save(game);
            }
            collectionRepository.save(collection);
            log.info("User {} is adding game {} to collection {}", user.getUsername(), gameId, collectionId);

        }

        return buildActionResponse(game.getId(), "GAME_ADDED_TO_COLLECTION");
    }

    public ResponseEntity<ActionResponseDto> removeGameFromCollection(String collectionId, String gameId) {
        User user = getAuthenticatedUser();

        GameCollection collection = collectionRepository.findByIdAndOwnerId(collectionId, user.getId())
                .orElseThrow(() -> new AccessDeniedException("Unauthorized or collection not found"));

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));

        if (collection.getGames().remove(game)) {
            if (collection.getType() == GameCollectionType.FAVORITE) {
                game.setFavorites(game.getFavorites() - 1);
                gameRepository.save(game);
            }
            collectionRepository.save(collection);
            log.info("User {} is removing game {} from collection {}", user.getUsername(), gameId, collectionId);

        }

        return buildActionResponse(game.getId(), "GAME_REMOVED_FROM_COLLECTION");
    }

    public void createDefaultFavoriteCollection(User user) {
        GameCollection favorite = new GameCollection();
        favorite.setName("Favorite");
        favorite.setType(GameCollectionType.FAVORITE);
        favorite.setOwner(user);
        collectionRepository.save(favorite);
    }

    private GameCollectionResponseDto mapToResponse(GameCollection collection) {
        List<String> gameIds = collection.getGames().stream()
                .map(Game::getId)
                .toList();

        return new GameCollectionResponseDto(
                collection.getName(),
                gameIds,
                collection.getType().toString()
        );
    }

    private void validateOwner(GameCollection collection, User user) {
        if (!collection.getOwner().getId().equals(user.getId())) {
            throw new AccessDeniedException("Unauthorized");
        }
    }

    private void validateNotFavorite(GameCollection collection) {
        if (collection.getType() == GameCollectionType.FAVORITE) {
            throw new IllegalStateException("Cannot modify favorite collection");
        }
    }

    private ResponseEntity<ActionResponseDto> buildActionResponse(String id, String message) {
        ActionResultDto result = new ActionResultDto(id, "success", message);
        return ResponseEntity.ok(new ActionResponseDto(List.of(result)));
    }
}
