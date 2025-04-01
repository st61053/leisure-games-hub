package org.example.backend.component;

public enum ApiResourceType {
    USER("leisure-games-hub-user"),
    TOKEN("leisure-games-hub-token"),
    GAME("leisure-games-hub-game"),
    COLLECTION("leisure-games-hub-collection");

    private final String value;

    ApiResourceType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
