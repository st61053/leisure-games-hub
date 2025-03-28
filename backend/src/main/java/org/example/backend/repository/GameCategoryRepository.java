package org.example.backend.repository;

import org.example.backend.entity.GameCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GameCategoryRepository extends JpaRepository<GameCategory, String> {
    Optional<GameCategory> findByName(String name);
}

