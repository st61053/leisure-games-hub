export type HomeStackParamList = {
    Games: undefined;
    GamePlace: {
        place: string;
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
};