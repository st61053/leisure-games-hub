import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper } from "@/components/ui/actionsheet"
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import { VStack } from "@/components/ui/vstack"
import { Plus, SearchIcon, Square, SquareCheckBig } from "lucide-react-native";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Text } from "@/components/ui/text";
import { addGameToCollection } from "../api/addGameToCollection";
import { getCollections } from "../api/getCollections";
import { getFilteredGames } from "@/games/api/getFilteredGames";

interface CollectionsActionSheetProps {
    isOpen: boolean;
    gameId: string;
    onClose: () => void;
}

const CollectionsActionSheet = ({ isOpen, gameId, onClose }: CollectionsActionSheetProps) => {

    const dispatch = useAppDispatch();

    const collections = useAppSelector((state) => state.collection.collections);
    const categories = useAppSelector((state) => state.game.categories);
    const games = useAppSelector((state) => state.game.games);

    const game = games.find((game) => game.id === gameId);

    const fetchGames = () => {
        dispatch(getFilteredGames(
            [
                {
                    key: "place",
                    value: String(game?.attributes.place)
                },
                ...categories.filter((category) => category.attributes.active).map((category) => ({
                    key: "categories",
                    value: category.id
                }))
            ]));
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Actionsheet isOpen={isOpen} onClose={() => {
                    onClose();
                    // fetchGames();
                }}>
                    <ActionsheetBackdrop />
                    <ActionsheetContent style={{ paddingHorizontal: 0 }}>
                        <ActionsheetDragIndicatorWrapper>
                            <ActionsheetDragIndicator />
                        </ActionsheetDragIndicatorWrapper>
                        <VStack style={{ width: "100%", minHeight: 400 }} space="xs">
                            <HStack style={{ alignItems: "center", paddingHorizontal: 20 }}>
                                <Heading size="lg" style={{ color: "#4D4D4D", flex: 1, paddingLeft: 2 }}>
                                    Add to collection
                                </Heading>
                                <Pressable
                                // onPress={() => {
                                //     navigation.navigate('CreateGame', {
                                //         placeId: placeId,
                                //     });
                                // }}
                                >
                                    {({ pressed }) => (
                                        <Box style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            padding: 12,
                                            borderRadius: "50%",
                                            backgroundColor: pressed ? "#D4D4D4" : "transparent",
                                            right: -8
                                        }}>
                                            <Plus
                                                strokeWidth={3}
                                                color={"#4D4D4D"}
                                                size={20}
                                            />
                                        </Box>

                                    )}
                                </Pressable>
                            </HStack>
                            <Box style={{ paddingHorizontal: 20 }}>
                                <Input size="lg" style={{ width: "100%", backgroundColor: "#fff", borderRadius: 12, height: 48 }}>
                                    <InputSlot style={{ paddingLeft: 16 }}>
                                        <InputIcon as={SearchIcon} />
                                    </InputSlot>
                                    <InputField placeholder="Find collection..." />
                                </Input>
                            </Box>
                            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                                <VStack space="xs" style={{ paddingTop: 8 }}>
                                    {collections.map((collection) => {

                                        const isGameInCollection = collection.attributes.games.some((game) => game === gameId);

                                        const gamesCount = collection.attributes.games.length;

                                        return (
                                            <Pressable
                                                key={collection.id}
                                                onPress={async () => {
                                                    await dispatch(addGameToCollection({
                                                        collectionId: String(collection.id),
                                                        gameId: gameId,
                                                        method: isGameInCollection ? "DELETE" : "POST"
                                                    }))

                                                    dispatch(getCollections());
                                                }}
                                            >
                                                {({ pressed }) => (
                                                    <HStack style={{ backgroundColor: pressed ? "#E0E0E0" : "transparent", paddingVertical: 6, paddingHorizontal: 24, alignItems: "center" }}>
                                                        <VStack style={{ flex: 1 }}>
                                                            <Heading size="md" style={{ color: "#4D4D4D" }}>
                                                                {collection.attributes.name}
                                                            </Heading>
                                                            <Text size="sm" style={{ top: -2 }}>
                                                                {`${gamesCount} ${gamesCount > 1 ? "games" : "game"}`}
                                                            </Text>
                                                        </VStack>
                                                        {isGameInCollection
                                                            ? <SquareCheckBig size={20} color={"#4D4D4D"} />
                                                            : <Square size={20} color={"#4D4D4D"} />
                                                        }
                                                    </HStack>
                                                )}
                                            </Pressable>
                                        )
                                    })}
                                </VStack>
                            </ScrollView>
                        </VStack>
                    </ActionsheetContent>
                </Actionsheet>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default CollectionsActionSheet