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

interface GameItemProps {
    game: IGame;
    place: string;
}

const GameItem = ({ game, place }: GameItemProps) => {

    const placesMap = createPlacesMap(24);
    const { color, icon } = placesMap[place as PlaceType];
    const { name, favorites, duration, minPlayers } = game.attributes;

    type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Games'>;
    const navigation = useNavigation<NavigationProp>();

    return (
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
                        backgroundColor: "#fff",
                        padding: 12,
                        borderRadius: 12,
                        gap: 12,
                        borderWidth: 1,
                        borderColor: pressed ? "#4D4D4D" : "#D4D4D4",
                    }}
                >
                    <Box
                        style={{
                            backgroundColor: color,
                            padding: 12,
                            borderRadius: 8,
                        }}>
                        {icon}
                    </Box>
                    <VStack>
                        <Heading size="lg">
                            {name}
                        </Heading>
                        <HStack space="xl">
                            <HStack space="xs" style={{ alignItems: "center" }}>
                                <Heart size={16} color={"#6D6D6D"} />
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
                    <Box
                        style={{
                            marginLeft: "auto",
                            maxHeight: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}>
                        <EllipsisVertical size={28} color={"#4D4D4D"} />
                    </Box>
                </HStack>

            )}
        </Pressable>
    )
}

export default GameItem