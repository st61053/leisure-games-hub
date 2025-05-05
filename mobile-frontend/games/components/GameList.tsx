import { Item } from "@/components/shared/Item";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "@/app/hooks";
import { PlaceType } from "../types";
import { Heart, Clock4, User, EllipsisVertical } from "lucide-react-native";
import { createPlacesMap } from "../constants";
import { formatDuration } from "../functions/formatDuration";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { CollectionType } from "@/collections/types";
import CollectionsActionSheet from "@/collections/components/CollectionsActionSheet";
import React, { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@/navigation/types";
import { FlatItemList } from "@/components/shared/FlatItemList";

interface GamesListProps {
    onRefresh?: () => void;
    refreshing?: boolean;
}

const GamesList = ({ onRefresh, refreshing }: GamesListProps) => {

    type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Games'>;
    const navigation = useNavigation<NavigationProp>();
    const games = useAppSelector((state) => state.game.games);
    const loading = useAppSelector((state) => state.game.loading);
    const places = useAppSelector((state) => state.game.places);
    const collections = useAppSelector((state) => state.collection.collections);

    const favoriteCollection = collections.find(
        (c) => c.attributes.type === CollectionType.FAVORITE
    );

    const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

    return (
        <>
            <FlatItemList
                refreshing={refreshing}
                onRefresh={onRefresh}
                items={games}
                loading={loading}
                emptyMessage="Nothing to play here!"
                renderItem={({ item: game }) => {

                    const placeName = places.find((p) => p.id === game.attributes.place)?.attributes.name;
                    const { icon, color } = createPlacesMap(28)[placeName as PlaceType];
                    const { name, favorites, duration, minPlayers } = game.attributes;
                    const isFavorited = favoriteCollection?.attributes.games.includes(game.id);

                    return (
                        <Item
                            color={color}
                            title={name}
                            leftSlot={icon}
                            meta={
                                <HStack space="md">
                                    <HStack space="xs" style={{ alignItems: "center" }}>
                                        <Heart
                                            size={16}
                                            color="#6D6D6D"
                                            fill={isFavorited ? "#6D6D6D" : "transparent"}
                                        />
                                        <Text style={{ color: "#6D6D6D" }}>{favorites}</Text>
                                    </HStack>
                                    <HStack space="xs" style={{ alignItems: "center" }}>
                                        <Clock4 size={16} color="#6D6D6D" />
                                        <Text style={{ color: "#6D6D6D" }}>{formatDuration(duration)}</Text>
                                    </HStack>
                                    <HStack space="xs" style={{ alignItems: "center" }}>
                                        <User size={16} color="#6D6D6D" />
                                        <Text style={{ color: "#6D6D6D" }}>{`${minPlayers}+`}</Text>
                                    </HStack>
                                </HStack>
                            }
                            onPress={() => navigation.navigate("Game", { gameId: game.id })}
                            rightSlot={<EllipsisVertical size={24} color="#4D4D4D" />}
                            onRightPress={() => setSelectedGameId(game.id)}
                        />
                    );
                }}
            />

            {selectedGameId && (
                <CollectionsActionSheet
                    isOpen={true}
                    gameId={selectedGameId}
                    onClose={() => setSelectedGameId(null)}
                />
            )}
        </>
    );
};

export default GamesList;
