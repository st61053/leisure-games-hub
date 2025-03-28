package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.component.ApiData;
import org.example.backend.component.ApiResourceType;
import org.example.backend.dto.*;
import org.example.backend.entity.Game;
import org.example.backend.entity.GameCategory;
import org.example.backend.entity.Place;
import org.example.backend.entity.User;
import org.example.backend.repository.GameCategoryRepository;
import org.example.backend.repository.GameRepository;
import org.example.backend.repository.PlaceRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameService {

    private final GameRepository gameRepository;
    private final UserRepository userRepository;
    private final GameCategoryRepository gameCategoryRepository;
    private final PlaceRepository placeRepository;

    public ResponseEntity<ActionResponseDto> create(GameRequestDto request) {

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User createdBy = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        User author = userRepository.findById(request.author())
                .orElseThrow(() -> new RuntimeException("Author not found"));

        Place place = placeRepository.findById(request.place())
                .orElseThrow(() -> new RuntimeException("Place not found"));

        List<GameCategory> categories = request.categories().stream()
                .map(catId -> gameCategoryRepository.findById(catId)
                        .orElseThrow(() -> new RuntimeException("Category not found: " + catId)))
                .collect(Collectors.toCollection(ArrayList::new));

        Game game = new Game();
        game.setName(request.name());
        game.setDescription(request.description());
        game.setPlace(place);
        game.setCategories(categories);
        game.setDuration(request.duration());
        game.setMinPlayers(request.minPlayers());
        game.setEquipment(request.equipment());
        game.setCreatedBy(createdBy);
        game.setAuthor(author);

        gameRepository.save(game);

        ActionResultDto result = new ActionResultDto(
                game.getId(),
                "success",
                "GAME_CREATED"
        );

        return ResponseEntity.ok(new ActionResponseDto(List.of(result)));
    }

    public ApiResponseDto<GameResponseDto> get(String id) {
        Game game = gameRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        ApiData<GameResponseDto> dataItem = new ApiData<>(game.getId(), ApiResourceType.GAME.getValue(), mapToResponse(game));
        return new ApiResponseDto<>(List.of(dataItem));
    }

    public ResponseEntity<ActionResponseDto> update(String id, GameRequestDto request) {
        Game game = gameRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game not found"));

        // Přihlášený uživatel
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Current user not found"));

        // Je admin?
        boolean isAdmin = currentUser.getRoles().stream()
                .anyMatch(role -> role.getName().equalsIgnoreCase("ADMIN"));

        // Je původní autor hry?
        boolean isAuthor = game.getAuthor().getId().equals(currentUser.getId());

        if (!isAdmin && !isAuthor) {
            throw new AccessDeniedException("You are not allowed to update this game.");
        }

        List<GameCategory> categories = request.categories().stream()
                .map(catId -> gameCategoryRepository.findById(catId)
                        .orElseThrow(() -> new RuntimeException("Category not found: " + catId)))
                .collect(Collectors.toCollection(ArrayList::new));

        // Nový autor
        User newAuthor = userRepository.findById(request.author())
                .orElseThrow(() -> new RuntimeException("Author not found"));

        Place place = placeRepository.findById(request.place())
                .orElseThrow(() -> new RuntimeException("Place not found"));

        // Aktualizace hry
        game.setName(request.name());
        game.setDescription(request.description());
        game.setPlace(place);
        game.setCategories(categories);
        game.setDuration(request.duration());
        game.setMinPlayers(request.minPlayers());
        game.setEquipment(request.equipment());
        game.setAuthor(newAuthor); // může být i jiný autor

        gameRepository.save(game);

        ActionResultDto result = new ActionResultDto(
                game.getId(),
                "success",
                "GAME_UPDATED"
        );

        return ResponseEntity.ok(new ActionResponseDto(List.of(result)));
    }


    public ResponseEntity<ActionResponseDto> delete(String id) {
        gameRepository.deleteById(id);

        ActionResultDto result = new ActionResultDto(
                id,
                "success",
                "GAME_DELETED"
        );

        return ResponseEntity.ok(new ActionResponseDto(List.of(result)));
    }

    public ApiResponseDto<GameResponseDto> getAll() {
        List<ApiData<GameResponseDto>> data = gameRepository.findAll().stream()
                .map(game -> new ApiData<>(
                        game.getId(),
                        ApiResourceType.GAME.getValue(),
                        mapToResponse(game)
                ))
                .toList();

        return new ApiResponseDto<>(data);
    }

    private GameResponseDto mapToResponse(Game game) {
        List<String> categoryNames = game.getCategories().stream()
                .map(GameCategory::getId)
                .toList();

        return new GameResponseDto(
                game.getName(),
                game.getDescription(),
                game.getPlace().getId(),
                categoryNames,
                game.getDuration(),
                game.getMinPlayers(),
                game.getEquipment(),
                game.getAuthor().getId(),
                game.getCreatedBy().getId(),
                game.getCreatedAt(),
                game.getUpdatedAt()
        );
    }
}

