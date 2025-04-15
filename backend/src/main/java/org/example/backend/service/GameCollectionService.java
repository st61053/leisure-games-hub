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

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameCollectionService {

    private final GameCollectionRepository collectionRepository;
    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final GameCollectionRepository gameCollectionRepository;

    public ResponseEntity<ActionResponseDto> create(GameCollectionRequestDto request) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByUsername(username).orElseThrow();;

        GameCollection collection = new GameCollection();
        collection.setName(request.name());
        collection.setType(GameCollectionType.CUSTOM);
        collection.setOwner(user);
        collection.setGames(gameRepository.findAllById(request.games()));

        GameCollection saved = collectionRepository.save(collection);

        ActionResultDto result = new ActionResultDto(
                saved.getId(),
                "success",
                "GAME_COLLECTION_CREATED"
        );

        return ResponseEntity.ok(new ActionResponseDto(List.of(result)));
    }

    public ResponseEntity<ActionResponseDto> update(String id, GameCollectionRequestDto request) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User author = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        GameCollection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection not found"));

        if (!collection.getOwner().getId().equals(author.getId())) {
            throw new AccessDeniedException("Unauthorized");
        }

        if (collection.getType() == GameCollectionType.FAVORITE) {
            throw new IllegalStateException("Cannot modify favorite collection");
        }

        collection.setName(request.name());

        List<Game> games = gameRepository.findAllById(request.games());
        collection.setGames(games);

        GameCollection updated = collectionRepository.save(collection);

        ActionResultDto result = new ActionResultDto(
                updated.getId(),
                "success",
                "GAME_COLLECTION_UPDATED"
        );

        return ResponseEntity.ok(new ActionResponseDto(List.of(result)));
    }

    public ResponseEntity<ActionResponseDto> delete(String id) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User author = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        GameCollection collection = collectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Collection not found"));

        if (!collection.getOwner().getId().equals(author.getId())) {
            throw new AccessDeniedException("Unauthorized");
        }

        if (collection.getType() == GameCollectionType.FAVORITE) {
            throw new IllegalStateException("Cannot modify favorite collection");
        }

        collectionRepository.deleteById(id);

        ActionResultDto result = new ActionResultDto(
                id,
                "success",
                "GAME_COLLECTION_DELETED"
        );

        return ResponseEntity.ok(new ActionResponseDto(List.of(result)));
    }

    public ApiResponseDto<GameCollectionResponseDto> getAll() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<ApiData<GameCollectionResponseDto>> data = collectionRepository.findByOwnerId(user.getId()).stream()
                .map(collection -> new ApiData<>(
                        collection.getId(),
                        ApiResourceType.COLLECTION.getValue(),
                        mapToResponse(collection)
                ))
                .toList();

        return new ApiResponseDto<>(data);
    }

    public ResponseEntity<ActionResponseDto> addGameToCollection(String collectionId, String gameId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        GameCollection collection = gameCollectionRepository.findByIdAndOwnerId(collectionId, user.getId())
                .orElseThrow(() -> new AccessDeniedException("Unauthorized or collection not found"));

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));

        if (!collection.getGames().contains(game)) {
            collection.getGames().add(game);
            if (collection.getType() == GameCollectionType.FAVORITE) {
                game.setFavorites(game.getFavorites() + 1);
                gameRepository.save(game);
            }
            gameCollectionRepository.save(collection);
        }

        ActionResultDto result = new ActionResultDto(
                game.getId(),
                "success",
                "GAME_ADDED_TO_COLLECTION"
        );

        return ResponseEntity.ok(new ActionResponseDto(List.of(result)));
    }

    public ResponseEntity<ActionResponseDto> removeGameFromCollection(String collectionId, String gameId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username).orElseThrow();

        GameCollection collection = gameCollectionRepository.findByIdAndOwnerId(collectionId, user.getId())
                .orElseThrow(() -> new AccessDeniedException("Unauthorized or collection not found"));

        Game game = gameRepository.findById(gameId)
                .orElseThrow(() -> new RuntimeException("Game not found"));

        if (collection.getGames().remove(game)) {
            if (collection.getType() == GameCollectionType.FAVORITE) {
                game.setFavorites(game.getFavorites() - 1);
                gameRepository.save(game);
            }
            gameCollectionRepository.save(collection);
        }

        ActionResultDto result = new ActionResultDto(
                game.getId(),
                "success",
                "GAME_REMOVED_FROM_COLLECTION"
        );

        return ResponseEntity.ok(new ActionResponseDto(List.of(result)));
    }

    private GameCollectionResponseDto mapToResponse(GameCollection collection) {
        List<String> games = collection.getGames().stream()
                .map(Game::getId)
                .toList();

        return new GameCollectionResponseDto(
                collection.getName(),
                games,
                collection.getType().toString()
        );
    }

    public void createDefaultFavoriteCollection(User user) {
        GameCollection favorite = new GameCollection();
        favorite.setName("Favorite");
        favorite.setType(GameCollectionType.FAVORITE);
        favorite.setOwner(user);
        collectionRepository.save(favorite);
    }
}
