package org.example.backend.component;

import lombok.Getter;

@Getter
public enum ApiResourceType {
    USER("leisure-games-hub-user"),
    TOKEN("leisure-games-hub-token"),
    GAME("leisure-games-hub-game"),
    COLLECTION("leisure-games-hub-collection"),
    PLACE("leisure-games-hub-place"),
    CATEGORY("leisure-games-hub-place");
    private final String value;

    ApiResourceType(String value) {
        this.value = value;
    }

}
