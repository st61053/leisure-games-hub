import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { HomeStackParamList } from '@/navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text } from "@/components/ui/text";
import { Clock4, Heart, LandPlot, Menu, User } from 'lucide-react-native';
import React from 'react'
import { ScrollView } from 'react-native';
import { getGameById } from '../gameSlice';
import { useAppSelector } from '@/app/hooks';
import { formatDuration } from '../functions/formatDuration';
import { createPlacesMap } from '../constants';
import { PlaceType } from '../types';
import { Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';
import { CheckIcon } from '@/components/ui/icon';

const GameDetail = () => {

    const route = useRoute<RouteProp<HomeStackParamList, 'Game'>>();

    const { gameId } = route.params;

    const game = useAppSelector(getGameById(gameId));
    const categories = useAppSelector((state) => state.game.categories);
    const places = useAppSelector((state) => state.game.places);

    const { name, favorites, duration, minPlayers, description, equipment } = game?.attributes ?? {};

    const place = places.find((place) => place.id === game?.attributes.place);
    const placesMap = createPlacesMap(24);
    const { text, color } = placesMap[place?.attributes.name as unknown as PlaceType];

    const [values, setValues] = React.useState([])

    return (
        <Box>
            {game && <Box style={{
                paddingVertical: 20,
                paddingBottom: 16,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <Box style={{
                    paddingHorizontal: 24,
                    paddingRight: 12,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: "center",
                }}>
                    <Heading size="2xl" style={{ color: "#4D4D4D", flex: 1 }}>
                        {name && name.charAt(0).toUpperCase() + name.slice(1)}
                    </Heading>
                    <Pressable>
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
                                <Heart
                                    fill={pressed ? "#4D4D4D" : "transparent"}
                                    color={"#4D4D4D"}
                                    size={28}
                                />
                            </Box>
                        )}
                    </Pressable>
                    <Pressable>
                        {({ pressed }) => (
                            <Box style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 12,
                                borderRadius: "50%",
                                backgroundColor: pressed ? "#D4D4D4" : "transparent",
                                right: -4
                            }}>
                                <Menu
                                    color={"#4D4D4D"}
                                    size={28}
                                />
                            </Box>
                        )}
                    </Pressable>
                </Box>
                <ScrollView horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        marginLeft: 24,
                    }}
                >
                    <HStack style={{ marginTop: 4 }} space="sm">
                        {categories
                            .filter((category) => game.attributes.categories.includes(category.id))
                            .map((category) => {
                                return (
                                    <Button
                                        key={category.id}
                                        size="md"
                                        variant={"solid"}
                                        style={{
                                            borderRadius: 12,
                                            backgroundColor: "#4D4D4D", // color,
                                            borderWidth: 1,
                                            borderColor: "#4D4D4D",
                                        }}
                                    >
                                        <ButtonText style={{ color: "#fff" }}>{category.attributes.name.charAt(0).toUpperCase() + category.attributes.name.slice(1)}</ButtonText>
                                    </Button>
                                )
                            })}
                    </HStack>
                </ScrollView>
                <HStack space="xl" style={{ paddingHorizontal: 24, paddingTop: 8 }}>
                    <HStack space="xs" style={{ alignItems: "center" }}>
                        <LandPlot size={16} color={"#6D6D6D"} />
                        <Text style={{ color: "#6D6D6D" }}>{text}</Text>
                    </HStack>
                    <HStack space="xs" style={{ alignItems: "center" }}>
                        <Heart size={16} color={"#6D6D6D"} />
                        <Text style={{ color: "#6D6D6D" }}>{favorites}</Text>
                    </HStack>
                    <HStack space="xs" style={{ alignItems: "center" }}>
                        <Clock4 size={16} color={"#6D6D6D"} />
                        <Text style={{ color: "#6D6D6D" }}>{duration !== undefined && formatDuration(duration)}</Text>
                    </HStack>
                    <HStack space="xs" style={{ alignItems: "center" }}>
                        <User size={16} color={"#6D6D6D"} />
                        <Text style={{ color: "#6D6D6D" }}>{`${minPlayers}+`}</Text>
                    </HStack>
                </HStack>
                <Box style={{ paddingHorizontal: 24, paddingTop: 16 }}>
                    <Text size='lg' style={{ color: "#4D4D4D", textAlign: "justify" }}>
                        {description}
                    </Text>
                </Box>
                {equipment && equipment.length > 0 &&
                    <Box style={{ paddingHorizontal: 24, paddingTop: 16 }}>
                        <Heading size="lg" style={{ color: "#4D4D4D" }}>
                            Equipment
                        </Heading>
                        <ScrollView horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            <CheckboxGroup
                                style={{ paddingTop: 8 }}
                                value={values}
                                onChange={(keys) => {
                                    setValues(keys)
                                }}
                            >
                                <HStack space="lg">
                                    {equipment.map((item, index) =>
                                        <Checkbox key={index} value={item} size='md'>
                                            <CheckboxIndicator
                                                style={{
                                                    borderColor: "#4D4D4D",
                                                    backgroundColor: values.includes(item as never) ? "#4D4D4D" : "transparent",
                                                }}
                                            >
                                                <CheckboxIcon as={CheckIcon} />
                                            </CheckboxIndicator>
                                            <CheckboxLabel style={{ color: "#4D4D4D" }}>{item}</CheckboxLabel>
                                        </Checkbox>
                                    )}
                                </HStack>
                            </CheckboxGroup>
                        </ScrollView>
                    </Box>}
            </Box>}
        </Box>
    )
}

export default GameDetail