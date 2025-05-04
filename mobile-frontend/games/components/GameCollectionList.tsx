import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HomeStackParamList } from "@/navigation/types";
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { Pressable } from 'react-native';
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MenuIcon, Plus, SquarePen, Trash2 } from "lucide-react-native";
import GamesController from "./GamesControler";
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from "@/components/ui/modal";
import { useCallback, useState } from "react";
import { Menu, MenuItem, MenuItemLabel, MenuSeparator } from "@/components/ui/menu";
import { CloseIcon, Icon } from "@/components/ui/icon";
import { Controller, useForm } from "react-hook-form";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";
import { deleteCollection } from "@/collections/api/deleteCollection";
import { getCollection } from "@/collections/api/getCollection";
import { CollectionType } from "@/collections/types";

const GameCollectionList = () => {

    const dispatch = useAppDispatch();

    type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Games'>;
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProp<HomeStackParamList, 'GameCollection'>>();

    const { collectionId } = route.params;

    const collections = useAppSelector((state: RootState) => state.collection.collections);
    const collection = collections.find((c) => c.id === collectionId);

    const [showModal, setShowModal] = useState(false)
    const [showRemoveModal, setShowRemoveModal] = useState(false)

    const isFavorite = collection?.attributes.type === CollectionType.FAVORITE;

    useFocusEffect(
        useCallback(() => {
            dispatch(getCollection(collectionId));
        }, [])
    );

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            name: ""
        },
    })

    return (
        <Box style={{
            paddingBottom: 12,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: "#FDFDFD",
            height: '100%',
        }}>
            <Box style={{
                paddingTop: 20,
                paddingHorizontal: 24,
                paddingRight: 12,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: "center",
                zIndex: 1,
                backgroundColor: "#FDFDFD",
            }}>
                <Heading size="2xl" style={{ color: "#4D4D4D" }}>
                    {collection?.attributes.name}
                </Heading>
                <Modal
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false)
                    }}
                    size="md"
                >
                    <ModalBackdrop />
                </Modal>
                <Menu
                    placement="bottom right"
                    onOpen={() => setShowModal(true)}
                    onClose={() => setShowModal(false)}
                    style={{ width: 204 }}
                    trigger={({ ...triggerProps }) => {
                        return (
                            <Pressable {...triggerProps}>
                                {({ pressed }) => (
                                    <Box style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 12,
                                        borderRadius: "50%",
                                        backgroundColor: pressed ? "#D4D4D4" : "transparent",
                                    }}>
                                        <MenuIcon
                                            color={"#4D4D4D"}
                                            size={28}
                                        />
                                    </Box>

                                )}
                            </Pressable>
                        )
                    }}
                >
                    {!isFavorite && <MenuItem onPress={() => {
                        navigation.navigate('EditCollection', {
                            collectionId: collectionId,
                        });
                    }} key="edit" textValue="a" style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
                        <Icon as={SquarePen} size="md" style={{ marginRight: 12, color: "#4D4D4D" }} />
                        <MenuItemLabel size="lg" style={{ flexShrink: 1 }}>Edit</MenuItemLabel>
                    </MenuItem>}
                    {!isFavorite && <MenuItem onPress={() => {
                        setShowRemoveModal(true)
                    }} key="remove" textValue="b" style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
                        <Icon as={Trash2} size="md" style={{ marginRight: 12, color: "#4D4D4D" }} />
                        <MenuItemLabel size="lg" style={{ flexShrink: 1 }}>Delete</MenuItemLabel>
                    </MenuItem>}
                    {!isFavorite && <MenuSeparator />}
                    <MenuItem
                        onPress={() => {
                            navigation.navigate('CreateGame', {
                                placeId: undefined,
                            });
                        }}
                        key="AddGame" textValue="d" style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
                        <Icon as={Plus} size="md" style={{ marginRight: 12, color: "#4D4D4D" }} />
                        <MenuItemLabel size="lg" style={{ flexShrink: 1 }}>Add to collection</MenuItemLabel>
                    </MenuItem>
                </Menu>
            </Box>
            <GamesController collectionId={collection?.id} />
            <Modal
                isOpen={showRemoveModal}
                onClose={() => {
                    setShowRemoveModal(false);
                    reset({ name: "" });
                }}
                size="lg"
            >
                <ModalBackdrop />
                <ModalContent>
                    <ModalHeader>
                        <Heading size="lg" className="text-typography-950">
                            Delete Collection
                        </Heading>
                        <ModalCloseButton>
                            <Icon
                                as={CloseIcon}
                                size="md"
                                className="stroke-background-400 group-[:hover]/modal-close-button:stroke-background-700 group-[:active]/modal-close-button:stroke-background-900 group-[:focus-visible]/modal-close-button:stroke-background-900"
                            />
                        </ModalCloseButton>
                    </ModalHeader>
                    <ModalBody>
                        <VStack space="sm">
                            <Text size="md" className="text-typography-500">
                                {`You are about to delete the collection.`}
                            </Text>
                            <Text size="md" className="text-typography-500" style={{ top: -8 }}>
                                {`To confirm, please enter its name below.`}
                            </Text>

                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input size="lg" style={{ backgroundColor: "#fff", height: 48 }}>
                                        <InputField
                                            onBlur={onBlur}
                                            onChangeText={onChange}
                                            value={value}
                                            type="text"
                                            keyboardType="default"
                                            placeholder='Collection'
                                        />
                                    </Input>
                                )}
                                name="name"
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="outline"
                            action="secondary"
                            onPress={() => {
                                setShowRemoveModal(false);
                                reset({ name: "" });
                            }}
                        >
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                        <Controller
                            control={control}
                            render={({ field: { value } }) => (
                                <Button
                                    isDisabled={value !== collection?.attributes.name}
                                    onPress={async () => {
                                        setShowRemoveModal(false);
                                        reset({ name: "" });
                                        await dispatch(deleteCollection(collectionId));
                                        navigation.goBack();
                                    }}
                                >
                                    <ButtonText>Confirm</ButtonText>
                                </Button>
                            )}
                            name="name"
                        />
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default GameCollectionList