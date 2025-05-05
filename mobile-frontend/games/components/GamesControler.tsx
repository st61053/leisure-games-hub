import { useFocusEffect } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { useCallback, useState } from "react";
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

    const [refreshing, setRefreshing] = useState(false);

    const getFilters = () => [
        ...(collectionId ? [{ key: "collection", value: collectionId }] : []),
        ...(placeId ? [{ key: "place", value: placeId }] : []),
        ...categories
            .filter((category) => category.attributes.active)
            .map((category) => ({
                key: "categories",
                value: category.id
            }))
    ];

    const fetchGames = useCallback(async () => {
        const filters = getFilters();
        await dispatch(getFilteredGames(filters));
    }, [placeId, collectionId, categories]);

    useFocusEffect(
        useCallback(() => {
            fetchGames();
        }, [fetchGames])
    );

    const handleRefresh = async () => {
        if (refreshing) return;
        setRefreshing(true);
        await fetchGames();
        setRefreshing(false);
    };

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
            <GameList refreshing={refreshing} onRefresh={handleRefresh} />
        </ListScreenLayout>
    );
};


export default GamesController;
