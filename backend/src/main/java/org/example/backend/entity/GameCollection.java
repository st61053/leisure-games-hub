package org.example.backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.example.backend.enums.GameCollectionType;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@ToString

@Entity
public class GameCollection {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String name;

    @Enumerated(EnumType.STRING)
    private GameCollectionType type = GameCollectionType.CUSTOM;

    @ManyToOne(fetch = FetchType.LAZY)
    private User owner;

    @ManyToMany
    private List<Game> games = new ArrayList<>();

}
