package org.example.backend.repository;

import org.example.backend.entity.GameCollection;
import org.example.backend.enums.GameCollectionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GameCollectionRepository extends JpaRepository<GameCollection, String> {
    List<GameCollection> findByOwnerId(String ownerId);
    Optional<GameCollection> findByOwnerIdAndType(String ownerId, GameCollectionType type);
    Optional<GameCollection> findByIdAndOwnerId(String collectionId, String ownerId);

    @Modifying
    @Query(value = "DELETE FROM game_collection_games WHERE games_id = :gameId", nativeQuery = true)
    void removeGameFromAllCollections(@Param("gameId") String gameId);
}
