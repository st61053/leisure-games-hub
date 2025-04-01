package org.example.backend.repository;

import org.example.backend.entity.GameCollection;
import org.example.backend.enums.GameCollectionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface GameCollectionRepository extends JpaRepository<GameCollection, String> {
    List<GameCollection> findByOwnerId(String ownerId);
    Optional<GameCollection> findByOwnerIdAndType(String ownerId, GameCollectionType type);
    Optional<GameCollection> findByIdAndOwnerId(String collectionId, String ownerId);
}
