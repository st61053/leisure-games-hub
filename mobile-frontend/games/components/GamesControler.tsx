import { useFocusEffect } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { useCallback } from "react";
import { getFilteredGames } from "../api/getFilteredGames";
import GameList from "./GameList";
import { ListScreenLayout } from "@/components/shared/ListScreenLayout";
import { ListHeader } from "@/components/shared/ListHeader";

interface GamesControllerProps {
    placeId?: string;
    collectionId?: string;
}

const GamesController = ({ placeId, collectionId }: GamesControllerProps) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state: RootState) => state.game.categories);
    const games = useAppSelector((state: RootState) => state.game.games);

    const fetchGames = () => {
        const filters = [
            ...(collectionId ? [{ key: "collection", value: collectionId }] : []),
            ...(placeId ? [{ key: "place", value: placeId }] : []),
            ...categories
                .filter((category) => category.attributes.active)
                .map((category) => ({
                    key: "categories",
                    value: category.id
                }))
        ];

        dispatch(getFilteredGames(filters));
    };

    useFocusEffect(
        useCallback(() => {
            fetchGames();
        }, [placeId, categories])
    );

    return (
        <ListScreenLayout
            itemCount={games.length}
            header={(animatedStyle) => (
                <ListHeader
                    translateYStyle={animatedStyle}
                    onFilterPress={() => console.log("filter pressed")}
                />
            )}
        >
            <GameList />
        </ListScreenLayout>
    );
};


export default GamesController;
