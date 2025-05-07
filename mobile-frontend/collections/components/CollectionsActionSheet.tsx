import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper } from "@/components/ui/actionsheet"
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Boxes, Heart, Square, SquareCheckBig } from "lucide-react-native";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { Text } from "@/components/ui/text";
import { addGameToCollection } from "../api/addGameToCollection";
import { getCollections } from "../api/getCollections";
import { CollectionType } from "../types";
import { ListScreenLayout } from "@/components/shared/ListScreenLayout";
import { ListHeader } from "@/components/shared/ListHeader";
import { FlatItemList } from "@/components/shared/FlatItemList";
import { Item } from "@/components/shared/Item";

interface CollectionsActionSheetProps {
    isOpen: boolean;
    gameId: string;
    onClose: () => void;
}

const CollectionsActionSheet = ({ isOpen, gameId, onClose }: CollectionsActionSheetProps) => {

    const dispatch = useAppDispatch();
    const collections = useAppSelector((state) => state.collection.collections);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Actionsheet
                    isOpen={isOpen}
                    onClose={() => {
                        onClose();
                    }}>
                    <ActionsheetBackdrop />
                    <ActionsheetContent style={{ paddingHorizontal: 0 }}>
                        <ActionsheetDragIndicatorWrapper>
                            <ActionsheetDragIndicator />
                        </ActionsheetDragIndicatorWrapper>
                        <Box style={{ minHeight: 400, height: 640, width: "100%", overflow: "hidden" }}>
                            <HStack style={{ alignItems: "center", paddingHorizontal: 20, zIndex: 1, backgroundColor: "#FDFDFD", paddingTop: 8 }}>
                                <Heading size="xl" style={{ color: "#4D4D4D", flex: 1, paddingLeft: 2 }}>
                                    Add to collection
                                </Heading>
                            </HStack>
                            <ListScreenLayout
                                itemCount={collections.length}
                                header={(animatedStyle) => (
                                    <ListHeader
                                        translateYStyle={animatedStyle}
                                        showFilter={false}
                                    />
                                )}
                            >
                                <FlatItemList
                                    items={collections}
                                    loading={false}
                                    emptyMessage="No collections found."
                                    renderItem={({ item: collection }) => {

                                        const { name, games, type } = collection.attributes;

                                        const isGameInCollection = collection.attributes.games.some((game) => game === gameId);

                                        return (
                                            <Item
                                                color={"#4D4D4D"}
                                                title={name}
                                                leftSlot={type === CollectionType.FAVORITE ? <Heart color={"#fff"} size={28} /> : <Boxes color={"#fff"} size={28} />}
                                                meta={
                                                    <Text style={{ color: "#6D6D6D", top: -2 }}>{`${games.length} ${games.length > 1 ? "games" : "game"}`}</Text>
                                                }
                                                onPress={async () => {
                                                    await dispatch(addGameToCollection({
                                                        collectionId: String(collection.id),
                                                        gameId: gameId,
                                                        method: isGameInCollection ? "DELETE" : "POST"
                                                    }))

                                                    dispatch(getCollections());
                                                }}
                                                rightSlot={isGameInCollection
                                                    ? <SquareCheckBig size={24} color={"#4D4D4D"} style={{ left: -4 }} />
                                                    : <Square size={24} color={"#4D4D4D"} style={{ left: -4 }} />
                                                }

                                            />
                                        );
                                    }}
                                />
                            </ListScreenLayout>
                        </Box>

                    </ActionsheetContent>
                </Actionsheet>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default CollectionsActionSheet