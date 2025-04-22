import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { HomeStackParamList } from "@/navigation/types";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback } from "react-native";
import { Box } from "@/components/ui/box";
import { ApiObjectType } from "@/app/config";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CollectionType, ICollection } from "../types";
import { createCollection } from "../api/createCollection";

const CollectionEditor = () => {

    const dispatch = useAppDispatch();

    const route = useRoute<RouteProp<HomeStackParamList, 'CreateCollection'>>();
    type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Games'>;
    const navigation = useNavigation<NavigationProp>();

    const { collectionId } = route.params;

    const collections = useAppSelector((state) => state.collection.collections);
    const collection = collections.find((collection) => collection.id === collectionId);


    type CollectionFormValues = {
        name: string;
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<CollectionFormValues>({
        defaultValues: {
            name: "",
            ...collection?.attributes
        },
    })

    const onSubmit = async (data: CollectionFormValues) => {

        const initialCollection: ICollection = {

            attributes: {
                name: "",
                games: [],
                type: CollectionType.CUSTOM
            },
            id: collectionId ?? "",
            type: ApiObjectType.COLLECTION
        }

        await dispatch(createCollection({

            ...initialCollection,
            attributes: {
                ...initialCollection.attributes,
                ...data,
            }
        }))
        navigation.goBack()
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
                                        Name*
                                    </Heading>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: true
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <Input size="lg" style={{ backgroundColor: "#fff", borderRadius: 12, height: 48 }}>
                                                <InputField
                                                    onBlur={onBlur}
                                                    onChangeText={onChange}
                                                    value={value}
                                                    type="text"
                                                    keyboardType="default"
                                                    placeholder="New collection"
                                                />
                                            </Input>
                                        )}
                                        name="name"
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
                        handleSubmit(onSubmit)();
                    }}
                >
                    <ButtonText className="text-typography-0">{collection?.id ? "Edit" : "Create"}</ButtonText>
                </Button>
            </Box>
        </TouchableWithoutFeedback>
    )
}

export default CollectionEditor