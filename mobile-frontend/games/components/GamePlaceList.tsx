import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { HomeStackParamList } from "@/navigation/types";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ScrollView, Keyboard, TouchableWithoutFeedback, Pressable } from 'react-native';
import { PlaceType } from "../types";
import { createPlacesMap } from "../constants";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { useEffect } from "react";
import { getFilteredGames } from "../api/getFilteredGames";
import GameItem from "./GameItem";
import { Spinner } from "@/components/ui/spinner";
import { ChevronDown, Layers, Plus } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { activeCategory } from "../gameSlice";

const GamePlaceList = () => {

    const dispatch = useAppDispatch();

    const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList, 'GamePlace'>>();
    const route = useRoute<RouteProp<HomeStackParamList, 'GamePlace'>>();

    const { place } = route.params;

    const placesMap = createPlacesMap(24);

    const { text } = placesMap[place as PlaceType];

    const places = useAppSelector((state: RootState) => state.game.places);
    const categories = useAppSelector((state: RootState) => state.game.categories);
    const games = useAppSelector((state: RootState) => state.game.games);

    const loading = useAppSelector((state: RootState) => state.game.loading);

    const placeId = places.find((p) => p.attributes.name === place)?.id ?? "";

    const fetchGames = () => {
        dispatch(getFilteredGames(
            [
                {
                    key: "place",
                    value: placeId
                },
                ...categories.filter((category) => category.attributes.active).map((category) => ({
                    key: "categories",
                    value: category.id
                }))
            ]));
    }

    useEffect(() => {
        fetchGames();
    }, [place, categories]);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Box>
                <Box style={{
                    paddingVertical: 20,
                    paddingBottom: 16,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box style={{
                        paddingHorizontal: 24,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}>
                        <Heading size="2xl" style={{ color: "#4D4D4D" }}>
                            {text}
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
                                }}>
                                    <Plus
                                        color={"#4D4D4D"}
                                        size={28}
                                    />
                                </Box>

                            )}
                        </Pressable>
                    </Box>
                    <Box style={{
                        paddingHorizontal: 24,
                        marginTop: 4
                    }}>
                        <Input size="xl" style={{ width: "100%", backgroundColor: "#fff", borderRadius: 12, height: 48 }}>
                            <InputSlot style={{ paddingLeft: 16 }}>
                                <InputIcon as={SearchIcon} />
                            </InputSlot>
                            <InputField placeholder="Search..." />
                        </Input>
                    </Box>
                    <ScrollView horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{
                            marginLeft: 24,
                        }}
                    >
                        <HStack style={{ marginTop: 12 }} space="sm">
                            {categories.map((category) => {
                                return (
                                    <Button
                                        key={category.id}
                                        size="md"
                                        variant={"solid"}
                                        style={{
                                            borderRadius: 12,
                                            backgroundColor: category.attributes.active ? "#4D4D4D" : "#fff",
                                            borderWidth: 1,
                                            borderColor: "#4D4D4D",
                                        }}
                                        onPress={() => {
                                            dispatch(activeCategory(category.id));
                                        }}
                                    >
                                        <ButtonText style={{ color: category.attributes.active ? "#fff" : "#4D4D4D" }}>{category.attributes.name.charAt(0).toUpperCase() + category.attributes.name.slice(1)}</ButtonText>
                                    </Button>
                                )
                            })}
                        </HStack>
                    </ScrollView>
                    <HStack style={{ paddingHorizontal: 24, marginTop: 4, paddingLeft: 28 }} space="xl">
                        <Button variant="link">
                            <ButtonText className="font-medium text-md text-typography-900">
                                Favorites
                            </ButtonText>
                            <ChevronDown color={"#4D4D4D"} size={18} />
                        </Button>
                        <Button variant="link">
                            <ButtonText className="font-medium text-md text-typography-900">
                                Time
                            </ButtonText>
                            {/* <ChevronDown color={"#4D4D4D"} size={18} /> */}
                        </Button>
                        <Button variant="link">
                            <ButtonText className="font-medium text-md text-typography-900">
                                Players
                            </ButtonText>
                            {/* <ChevronDown color={"#4D4D4D"} size={18} /> */}
                        </Button>
                    </HStack>
                </Box>
                <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}>
                    <VStack space="lg">
                        {loading ? <Spinner /> : games.map((game) => <GameItem key={game.id} game={game} place={place} />)}
                        {games.length === 0 && !loading &&
                            <HStack style={{ alignItems: "center", paddingVertical: 8 }} space="md" >
                                <Layers size={48} color={"#AEAEAE"} />
                                <VStack>
                                    <Heading size="md" style={{ color: "#4D4D4D" }}>
                                        Oops!
                                    </Heading>
                                    <Text size="md" style={{ color: "#4D4D4D", top: -4 }}>
                                        Nothing to play here.
                                    </Text>
                                </VStack>

                            </HStack>
                        }
                    </VStack>
                </ScrollView>
            </Box>
        </TouchableWithoutFeedback>
    )
}

export default GamePlaceList