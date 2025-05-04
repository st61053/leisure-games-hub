import React from 'react'
import { IGame, PlaceType } from '../types'
import { Pressable } from '@/components/ui/pressable';
import { HStack } from '@/components/ui/hstack';
import { Box } from '@/components/ui/box';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from "@/components/ui/text";
import { Heart, Clock4, User, EllipsisVertical } from 'lucide-react-native';
import { createPlacesMap } from '../constants';
import { HomeStackParamList } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { formatDuration } from '../functions/formatDuration';
import { useAppSelector } from '@/app/hooks';
import { CollectionType } from '@/collections/types';
import CollectionsActionSheet from '@/collections/components/CollectionsActionSheet';

interface GameItemProps {
    game: IGame;
}

const GameItem = ({ game }: GameItemProps) => {

    const places = useAppSelector((state) => state.game.places);
    const placeName = places.find((p) => p.id === game.attributes.place)?.attributes.name;

    const placesMap = createPlacesMap(32);
    const { color, icon } = placesMap[placeName as PlaceType];
    const { name, favorites, duration, minPlayers } = game.attributes;

    const collections = useAppSelector((state) => state.collection.collections);

    const favoriteCollection = collections.find((collection) => collection.attributes.type === CollectionType.FAVORITE);
    const isGameInFavoriteCollection = favoriteCollection?.attributes.games.includes(game.id);

    type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Games'>;
    const navigation = useNavigation<NavigationProp>();

    const [openCollectionActionsheet, setOpenCollectionActionsheet] = React.useState(false);

    return (
        <>
            <Pressable
                onPress={() => {
                    navigation.navigate('Game', {
                        gameId: game.id,
                    });
                }}
            >
                {({ pressed }) => (
                    <HStack
                        style={{
                            // backgroundColor: "#fff",
                            padding: 16,
                            paddingHorizontal: 24,
                            // borderRadius: 12,
                            gap: 16,
                            // borderWidth: 1,
                            // borderColor: pressed ? "#4D4D4D" : "#D4D4D4",
                        }}
                    >
                        <Box
                            style={{
                                backgroundColor: color,
                                padding: 12,
                                borderRadius: 6,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.15,
                                shadowRadius: 4,
                                elevation: 4, // pro Android
                            }}>
                            {icon}
                        </Box>
                        <VStack style={{ flex: 1 }} space='xs'>
                            <Heading size="lg">
                                {name}
                            </Heading>
                            <HStack space="xl">
                                <HStack space="xs" style={{ alignItems: "center" }}>
                                    <Heart fill={isGameInFavoriteCollection ? "#6D6D6D" : "transparent"} size={16} color={"#6D6D6D"} />
                                    <Text style={{ color: "#6D6D6D" }}>{favorites}</Text>
                                </HStack>
                                <HStack space="xs" style={{ alignItems: "center" }}>
                                    <Clock4 size={16} color={"#6D6D6D"} />
                                    <Text style={{ color: "#6D6D6D" }}>{formatDuration(duration)}</Text>
                                </HStack>
                                <HStack space="xs" style={{ alignItems: "center" }}>
                                    <User size={16} color={"#6D6D6D"} />
                                    <Text style={{ color: "#6D6D6D" }}>{`${minPlayers}+`}</Text>
                                </HStack>
                            </HStack>

                        </VStack>
                        <Pressable
                            onPress={() => {
                                setOpenCollectionActionsheet(true);
                            }}
                        >
                            {({ pressed }) => (
                                <Box style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: 12,
                                    borderRadius: "50%",
                                    backgroundColor: pressed ? "#D4D4D4" : "transparent",
                                    right: -16
                                }}>
                                    <EllipsisVertical
                                        color={"#4D4D4D"}
                                        size={28}
                                    />
                                </Box>

                            )}
                        </Pressable>
                    </HStack>
                )}
            </Pressable>
            <CollectionsActionSheet isOpen={openCollectionActionsheet} gameId={game.id} onClose={() => setOpenCollectionActionsheet(false)} />
        </>
    )
}

export default GameItem