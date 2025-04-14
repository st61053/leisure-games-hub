import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { HomeStackParamList } from '@/navigation/types';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Text } from "@/components/ui/text";
import { Clock4, Heart, LandPlot, Menu as MenuIcon, Plus, SquarePen, Trash2, User } from 'lucide-react-native';
import React, { useCallback } from 'react'
import { ScrollView } from 'react-native';
import { getGameById } from '../gameSlice';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { formatDuration } from '../functions/formatDuration';
import { createPlacesMap } from '../constants';
import { PlaceType } from '../types';
import { Checkbox, CheckboxGroup, CheckboxIcon, CheckboxIndicator, CheckboxLabel } from '@/components/ui/checkbox';
import { CheckIcon, CloseIcon, Icon } from '@/components/ui/icon';
import { Menu, MenuItem, MenuItemLabel, MenuSeparator } from '@/components/ui/menu';
import { Modal, ModalBackdrop, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader } from '@/components/ui/modal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { VStack } from '@/components/ui/vstack';
import { Input, InputField } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { deleteGame } from '../api/deleteGame';
import { getGame } from '../api/getGame';

const GameDetail = () => {

    const dispatch = useAppDispatch();

    const route = useRoute<RouteProp<HomeStackParamList, 'Game'>>();
    type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Games'>;
    const navigation = useNavigation<NavigationProp>();

    const { gameId } = route.params;

    const game = useAppSelector(getGameById(gameId));
    const categories = useAppSelector((state) => state.game.categories);
    const places = useAppSelector((state) => state.game.places);

    const { name, favorites, duration, minPlayers, description, equipment } = game?.attributes ?? {};

    const place = places.find((place) => place.id === game?.attributes.place);
    const placesMap = createPlacesMap(24);
    const { text, color } = placesMap[place?.attributes.name as unknown as PlaceType];

    const [values, setValues] = React.useState([])
    const [showModal, setShowModal] = React.useState(false)

    const [showRemoveModal, setShowRemoveModal] = React.useState(false)

    useFocusEffect(
        useCallback(() => {
            dispatch(getGame(gameId));
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
                                            right: -4
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
                        <MenuItem onPress={() => {
                            navigation.navigate('EditGame', {
                                gameId: game.id,
                            });
                        }} key="Edit" textValue="edit" style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
                            <Icon as={SquarePen} size="md" style={{ marginRight: 12, color: "#4D4D4D" }} />
                            <MenuItemLabel size="lg" style={{ flexShrink: 1 }}>Edit</MenuItemLabel>
                        </MenuItem>
                        <MenuItem
                            onPress={() => {
                                setShowRemoveModal(true)
                            }}
                            key="remove" textValue="edit" style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
                            <Icon as={Trash2} size="md" style={{ marginRight: 12, color: "#4D4D4D" }} />
                            <MenuItemLabel size="lg" style={{ flexShrink: 1 }}>Delete</MenuItemLabel>
                        </MenuItem>
                        <MenuSeparator />
                        <MenuItem key="collection" textValue="edit" style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
                            <Icon as={Plus} size="md" style={{ marginRight: 12, color: "#4D4D4D" }} />
                            <MenuItemLabel size="lg" style={{ flexShrink: 1 }}>Add to collection</MenuItemLabel>
                        </MenuItem>
                    </Menu>
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
                            Delete Game
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
                                {`You are about to delete the game.`}
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
                                            placeholder='Game'
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
                                    isDisabled={value !== game?.attributes.name}
                                    onPress={async () => {
                                        setShowRemoveModal(false);
                                        reset({ name: "" });
                                        await dispatch(deleteGame(gameId));
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

export default GameDetail