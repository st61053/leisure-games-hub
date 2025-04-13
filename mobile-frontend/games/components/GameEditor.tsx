import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Select, SelectBackdrop, SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectIcon, SelectInput, SelectItem, SelectPortal, SelectTrigger } from "@/components/ui/select";
import { VStack } from "@/components/ui/vstack";
import { HomeStackParamList } from "@/navigation/types";
import { RouteProp, useRoute } from "@react-navigation/native";
import { ChevronDownIcon, CircleX, User } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, KeyboardAvoidingView, Pressable, ScrollView, TouchableWithoutFeedback } from "react-native";
import { createPlacesMap } from "../constants";
import { PlaceType } from "../types";
import { DurationPickerField } from "./DurationPickerField";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useState } from "react";
import { Textarea, TextareaInput } from "@/components/ui/textarea";

const GameEditor = () => {

    const dispatch = useAppDispatch();

    const route = useRoute<RouteProp<HomeStackParamList, 'CreateGame'>>();
    const { placeId, gameId } = route.params;

    const categories = useAppSelector((state) => state.game.categories);
    const places = useAppSelector((state) => state.game.places);
    const games = useAppSelector((state) => state.game.games);

    const game = games.find((game) => game.id === gameId);

    const placesMap = createPlacesMap(24);

    const [newEquipment, setNewEquipment] = useState("");


    type GameFormValues = {
        name: string;
        place: string;
        categories: string[];
        duration: number | null;
        minPlayers: number | null;
        equipment: string[];
        author: string;
        description: string;
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<GameFormValues>({
        defaultValues: {
            name: "",
            place: placeId,
            categories: [],
            duration: 30,
            minPlayers: null,
            equipment: ["Ball", "Bats", "4x Bases",],
            author: "",
            description: "",
            ...game?.attributes
        },
    })

    const onCreate = (data: GameFormValues) => {

    }

    const labelSize = "sm";

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Box style={{ height: "100%", paddingBottom: 16 }}>
                <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
                        <FormControl>
                            <VStack
                                space="md"
                                style={{
                                    paddingVertical: 28,
                                    paddingBottom: 12,
                                }}
                            >
                                <VStack
                                    style={{
                                        paddingHorizontal: 24,
                                    }}
                                    space="xs"
                                >
                                    <Heading size={labelSize} style={{ color: "#4D4D4D" }}>
                                        Name
                                    </Heading>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input size="lg" style={{ backgroundColor: "#fff", borderRadius: 12, height: 48 }}>
                                                <InputField
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                    value={value}
                                                    type="text"
                                                    keyboardType="default"
                                                    placeholder="Branball"
                                                />
                                            </Input>
                                        )}
                                        name="name"
                                    />
                                </VStack>
                                <VStack
                                    space="xs"
                                >
                                    <Heading size={labelSize} style={{ color: "#4D4D4D", paddingHorizontal: 24, }}>
                                        Categories
                                    </Heading>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <ScrollView horizontal
                                                showsHorizontalScrollIndicator={false}
                                                style={{
                                                    marginLeft: 24,
                                                }}
                                            >
                                                <HStack space="sm">
                                                    {categories.map((category) => {
                                                        const isSelected = value?.includes(category.id);

                                                        return (
                                                            <Button
                                                                key={category.id}
                                                                size="md"
                                                                variant={"solid"}
                                                                style={{
                                                                    borderRadius: 12,
                                                                    backgroundColor: isSelected ? "#4D4D4D" : "#fff",
                                                                    borderWidth: 1,
                                                                    borderColor: isSelected ? "#4D4D4D" : "#D4D4D4",
                                                                }}
                                                                onPress={() => {
                                                                    const newValue = isSelected
                                                                        ? value.filter((id) => id !== category.id)
                                                                        : [...value, category.id];
                                                                    onChange(newValue);
                                                                }}
                                                            >
                                                                <ButtonText style={{ color: isSelected ? "#fff" : "#929292" }}>{category.attributes.name.charAt(0).toUpperCase() + category.attributes.name.slice(1)}</ButtonText>
                                                            </Button>
                                                        )
                                                    })}
                                                </HStack>
                                            </ScrollView>
                                        )}
                                        name="categories"
                                    />
                                </VStack>
                                <HStack style={{ justifyContent: "space-between", paddingHorizontal: 24, }}>
                                    <VStack space="xs" style={{ width: "48%" }}>
                                        <Heading size={labelSize} style={{ color: "#4D4D4D" }}>
                                            Place
                                        </Heading>
                                        {placesMap &&
                                            <Controller
                                                name="place"
                                                control={control}
                                                render={({ field: { onChange, value } }) => {

                                                    const initialPlace = places.find((place) => place.id === value);
                                                    const { text } = placesMap[initialPlace?.attributes.name as PlaceType];

                                                    return (
                                                        <Select
                                                            selectedValue={value}
                                                            onValueChange={(val) => {
                                                                onChange(val);
                                                            }}
                                                            initialLabel={text}
                                                        >
                                                            <SelectTrigger
                                                                variant="outline"
                                                                size="lg"
                                                                style={{
                                                                    backgroundColor: "#fff",
                                                                    borderRadius: 12,
                                                                    height: 48,
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    justifyContent: "space-between",
                                                                    flexDirection: "row",
                                                                }}
                                                            >
                                                                <SelectInput placeholder="Select option" />
                                                                <SelectIcon style={{ marginRight: 8 }} as={ChevronDownIcon} />
                                                            </SelectTrigger>
                                                            <SelectPortal>
                                                                <SelectBackdrop />
                                                                <SelectContent>
                                                                    <SelectDragIndicatorWrapper>
                                                                        <SelectDragIndicator />
                                                                    </SelectDragIndicatorWrapper>
                                                                    {places.map((place) => {
                                                                        const { text } = placesMap[place.attributes.name as PlaceType];
                                                                        return (
                                                                            <SelectItem
                                                                                key={place.id}
                                                                                value={place.id}
                                                                                label={text}
                                                                                style={{ height: 52 }}
                                                                            />
                                                                        );
                                                                    })}
                                                                </SelectContent>
                                                            </SelectPortal>
                                                        </Select>
                                                    );
                                                }}
                                            />}

                                    </VStack>
                                    <VStack space="xs" style={{ width: "48%" }}>
                                        <Heading size={labelSize} style={{ color: "#4D4D4D" }}>
                                            Author
                                        </Heading>
                                        <Controller
                                            control={control}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Input size="lg" style={{ backgroundColor: "#fff", borderRadius: 12, height: 48 }}>
                                                    <InputField
                                                        onBlur={onBlur}
                                                        onChangeText={onChange}
                                                        value={value}
                                                        type="text"
                                                        keyboardType="default"
                                                        textContentType="name"
                                                        placeholder="John Doe"
                                                    />
                                                </Input>
                                            )}
                                            name="author"
                                        />
                                    </VStack>
                                </HStack>
                                <HStack style={{ justifyContent: "space-between", paddingHorizontal: 24, }}>
                                    <VStack
                                        space="xs"
                                        style={{
                                            width: "48%"
                                        }}
                                    >
                                        <Heading size={labelSize} style={{ color: "#4D4D4D" }}>
                                            Durations
                                        </Heading>
                                        <DurationPickerField control={control} />
                                    </VStack>
                                    <VStack
                                        space="xs"
                                        style={{
                                            width: "48%"
                                        }}
                                    >
                                        <Heading size={labelSize} style={{ color: "#4D4D4D" }}>
                                            Players
                                        </Heading>
                                        <Controller
                                            control={control}
                                            name="minPlayers"
                                            rules={{ required: true }}
                                            render={({ field: { onChange, onBlur, value } }) => (
                                                <Input
                                                    size="lg"
                                                    style={{ backgroundColor: "#fff", borderRadius: 12, height: 48, paddingRight: 8 }}
                                                >
                                                    <InputField
                                                        onBlur={onBlur}
                                                        value={`${value ?? ""}`}
                                                        onChangeText={(text) => {
                                                            if (text === "") {
                                                                onChange(null);
                                                            } else {
                                                                const numeric = text.replace(/[^0-9]/g, "");
                                                                onChange(numeric !== "" ? Number(numeric) : null);
                                                            }
                                                        }}
                                                        keyboardType="number-pad"
                                                        placeholder="Count"
                                                    />
                                                    <Text>
                                                        +
                                                    </Text>
                                                    <User size={20} color={"#6D6D6D"} />
                                                </Input>
                                            )}
                                        />
                                    </VStack>
                                </HStack>
                            </VStack>
                            <VStack
                                space="xs"
                            >
                                <Heading size={labelSize} style={{ color: "#4D4D4D", paddingHorizontal: 24 }}>
                                    Equipment
                                </Heading>
                                <Controller
                                    control={control}
                                    name="equipment"
                                    render={({ field: { onChange, onBlur, value = [] } }) => (
                                        <VStack space="md">
                                            <HStack style={{ paddingHorizontal: 24 }} space="md">
                                                <Input
                                                    size="lg"
                                                    style={{ backgroundColor: "#fff", borderRadius: 12, height: 48, flex: 1 }}
                                                >
                                                    <InputField
                                                        onBlur={onBlur}
                                                        onChangeText={setNewEquipment}
                                                        value={newEquipment}
                                                        type="text"
                                                        keyboardType="default"
                                                        placeholder="Ball..."
                                                    />
                                                </Input>
                                                <Button
                                                    variant="solid"
                                                    size="xl"
                                                    style={{
                                                        height: 48,
                                                        borderRadius: 12,
                                                    }}
                                                    onPress={() => {
                                                        if (newEquipment.trim().length > 0 && !value.includes(newEquipment.trim())) {
                                                            onChange([...value, newEquipment.trim()]);
                                                            setNewEquipment("");
                                                        }
                                                    }}
                                                >
                                                    <ButtonText className="text-typography-0">Add</ButtonText>
                                                </Button>
                                            </HStack>
                                            <ScrollView
                                                horizontal
                                                showsHorizontalScrollIndicator={false}
                                                style={{ marginLeft: 24 }}
                                            >
                                                <HStack space="sm">
                                                    {value.map((item, index) => (
                                                        <Pressable
                                                            key={index}
                                                            onPress={() => {
                                                                const newValue = value.filter((v) => v !== item);
                                                                onChange(newValue);
                                                            }}
                                                        >
                                                            {({ pressed }) => (
                                                                <Box
                                                                    style={{
                                                                        borderRadius: 12,
                                                                        backgroundColor: "#fff",
                                                                        borderWidth: 1,
                                                                        borderColor: pressed ? "#000" : "#929292",
                                                                        display: "flex",
                                                                        flexDirection: "row",
                                                                        alignItems: "center",
                                                                        padding: 8,
                                                                        paddingLeft: 8,
                                                                        paddingRight: 12,
                                                                        gap: 8,
                                                                    }}>
                                                                    <CircleX size={18} color={pressed ? "#000" : "#929292"} />
                                                                    <Heading size="xs" style={{ color: pressed ? "#000" : "#929292" }}>
                                                                        {item}
                                                                    </Heading>
                                                                </Box>
                                                            )}
                                                        </Pressable>
                                                    ))}
                                                </HStack>
                                            </ScrollView>
                                        </VStack>
                                    )}
                                />
                                <VStack
                                    space="xs"
                                    style={{
                                        paddingHorizontal: 24,
                                        paddingTop: 8,
                                    }}
                                >
                                    <Heading size={labelSize} style={{ color: "#4D4D4D" }}>
                                        Description
                                    </Heading>
                                    <Controller
                                        control={control}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Textarea
                                                size="md"
                                                isReadOnly={false}
                                                isInvalid={false}
                                                isDisabled={false}
                                                style={{ backgroundColor: "#fff", borderRadius: 12, height: 150 }}
                                            >
                                                <TextareaInput
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                    value={value}
                                                    type="text"
                                                    keyboardType="default"
                                                    placeholder="Enter a description of the game..." />
                                            </Textarea>
                                        )}
                                        name="description"
                                    />
                                </VStack>
                            </VStack>
                        </FormControl>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Button
                    variant="solid"
                    size="xl"
                    style={{
                        marginTop: 12,
                        height: 52,
                        marginHorizontal: 24,
                        borderRadius: 12,
                    }}
                    onPress={() => {
                        handleSubmit(onCreate)();
                    }}
                >
                    <ButtonText className="text-typography-0">Create</ButtonText>
                </Button>
            </Box>
        </TouchableWithoutFeedback>
    )
}

export default GameEditor