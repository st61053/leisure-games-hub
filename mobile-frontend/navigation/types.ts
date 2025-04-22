export type HomeStackParamList = {
    Games: undefined;
    GamePlace: {
        place: string;
    };
    GameCollection: {
        collectionId: string;
    };
    Game: {
        gameId: string;
    };
    CreateGame: {
        placeId?: string;
        gameId?: string;
    };
    EditGame: {
        gameId?: string;
    };
    CreateCollection: {
        collectionId?: string;
    };
    EditCollection: {
        collectionId?: string;
    };
};