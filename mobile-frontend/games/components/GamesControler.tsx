import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { useFocusEffect } from "@react-navigation/native";
import { Keyboard, TouchableWithoutFeedback, StyleSheet } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedScrollHandler,
    withTiming,
} from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { useCallback } from "react";
import { getFilteredGames } from "../api/getFilteredGames";
import { SlidersVertical } from "lucide-react-native";
import GameList from "./GameList";

interface GamesControllerProps {
    placeId?: string;
    collectionId?: string;
}

const HEADER_HEIGHT = 80;

const GamesController = ({ placeId, collectionId }: GamesControllerProps) => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state: RootState) => state.game.categories);
    const games = useAppSelector((state: RootState) => state.game.games);
    const loading = useAppSelector((state: RootState) => state.game.loading);

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

    // Reanimated scroll logic
    const translateY = useSharedValue(0);
    const prevScrollY = useSharedValue(0);
    const isHeaderHidden = useSharedValue(false);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const currentY = event.contentOffset.y;
            const contentHeight = event.contentSize.height;
            const layoutHeight = event.layoutMeasurement.height;
            const diff = currentY - prevScrollY.value;

            const isAtBottom = currentY + layoutHeight >= contentHeight - 10; // tolerance

            // Hide header
            if (diff > 0 && currentY + 50 > HEADER_HEIGHT && !isHeaderHidden.value) {
                translateY.value = withTiming(-HEADER_HEIGHT, { duration: 300 });
                isHeaderHidden.value = true;
            }

            // Show header only if NOT bouncing at bottom
            else if (diff < -2 && isHeaderHidden.value && !isAtBottom) {
                translateY.value = withTiming(0, { duration: 300 });
                isHeaderHidden.value = false;
            }

            prevScrollY.value = currentY;
        },
    });

    const animatedHeaderStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Box style={{ flex: 1 }}>
                <Animated.View style={[styles.headerContainer, animatedHeaderStyle]}>
                    <Box style={{ paddingBottom: 12, flexDirection: "column" }}>
                        <HStack style={{ paddingHorizontal: 24 }} space="md">
                            <Button
                                size="md"
                                variant={"solid"}
                                style={{
                                    borderRadius: 12,
                                    backgroundColor: "#fff",
                                    borderWidth: 1,
                                    borderColor: "#D4D4D4",
                                    height: 48
                                }}
                            // onPress={() => {
                            //     dispatch(activeCategory(category.id));
                            // }}
                            >
                                <SlidersVertical color={"#929292"} size={20} strokeWidth={2.5} />

                            </Button>
                            <Input
                                size="xl"
                                style={{
                                    flex: 1,
                                    backgroundColor: "#fff",
                                    borderRadius: 12,
                                    height: 48
                                }}
                            >
                                <InputSlot style={{ paddingLeft: 16 }}>
                                    <InputIcon as={SearchIcon} />
                                </InputSlot>
                                <InputField placeholder="Search..." />
                            </Input>
                        </HStack>
                        {/* <Animated.ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ paddingHorizontal: 24 }}
                        >
                            <HStack style={{ marginTop: 12 }} space="sm">
                                {categories.map((category) => (
                                    <Button
                                        key={category.id}
                                        size="md"
                                        variant={"solid"}
                                        style={{
                                            borderRadius: 12,
                                            backgroundColor: category.attributes.active
                                                ? "#4D4D4D"
                                                : "#fff",
                                            borderWidth: 1,
                                            borderColor: category.attributes.active
                                                ? "#4D4D4D"
                                                : "#D4D4D4"
                                        }}
                                        onPress={() => {
                                            dispatch(activeCategory(category.id));
                                        }}
                                    >
                                        <ButtonText
                                            style={{
                                                color: category.attributes.active
                                                    ? "#fff"
                                                    : "#929292"
                                            }}
                                        >
                                            {category.attributes.name.charAt(0).toUpperCase() +
                                                category.attributes.name.slice(1)}
                                        </ButtonText>
                                    </Button>
                                ))}
                            </HStack>
                        </Animated.ScrollView>
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
                            </Button>
                            <Button variant="link">
                                <ButtonText className="font-medium text-md text-typography-900">
                                    Players
                                </ButtonText>
                            </Button>
                        </HStack> */}
                    </Box>
                </Animated.View>

                <Animated.ScrollView
                    contentContainerStyle={{
                        paddingTop: HEADER_HEIGHT,
                        paddingBottom: 200
                    }}
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                >
                    <GameList games={games} loading={loading} />
                </Animated.ScrollView>
            </Box>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: "#FDFDFD",
        paddingTop: 12,
    }
});

export default GamesController;
