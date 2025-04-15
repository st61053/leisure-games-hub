import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { useCallback } from "react";
import { getFilteredGames } from "../api/getFilteredGames";
import { ChevronDown } from "lucide-react-native";
import { activeCategory } from "../gameSlice";
import GameList from "./GameList";

interface GamesControllerProps {
    placeId?: string;
}

const GamesController = ({ placeId }: GamesControllerProps) => {

    const dispatch = useAppDispatch();

    const categories = useAppSelector((state: RootState) => state.game.categories);
    const games = useAppSelector((state: RootState) => state.game.games);

    const loading = useAppSelector((state: RootState) => state.game.loading);

    const fetchGames = () => {
        const filters = [
            ...(placeId ? [{
                key: "place",
                value: placeId
            }] : []),
            ...categories
                .filter((category) => category.attributes.active)
                .map((category) => ({
                    key: "categories",
                    value: category.id
                }))
        ];

        dispatch(getFilteredGames(filters));
    }

    useFocusEffect(
        useCallback(() => {
            fetchGames();
        }, [placeId, categories])
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Box>
                <Box style={{
                    paddingBottom: 12,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Box style={{
                        paddingHorizontal: 24,
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
                                            borderColor: category.attributes.active ? "#4D4D4D" : "#D4D4D4",
                                        }}
                                        onPress={() => {
                                            dispatch(activeCategory(category.id));
                                        }}
                                    >
                                        <ButtonText style={{ color: category.attributes.active ? "#fff" : "#929292" }}>{category.attributes.name.charAt(0).toUpperCase() + category.attributes.name.slice(1)}</ButtonText>
                                    </Button>
                                )
                            })}
                        </HStack>
                    </ScrollView>
                    <HStack style={{ paddingHorizontal: 24, paddingLeft: 28 }} space="xl">
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
                <GameList games={games} loading={loading} />
            </Box>
        </TouchableWithoutFeedback>
    )
}

export default GamesController