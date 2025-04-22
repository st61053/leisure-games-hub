import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { ChevronDown } from "lucide-react-native";
import CollectionList from "./CollectionList";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { getCollections } from "../api/getCollections";

const Collections = () => {

    const dispatch = useAppDispatch();

    const collections = useAppSelector((state) => state.collection.collections);
    const loading = useAppSelector((state) => state.collection.loading);

    useFocusEffect(
        useCallback(() => {
            dispatch(getCollections());
        }, [])
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
                    <HStack style={{ paddingHorizontal: 24, paddingLeft: 28 }} space="xl">
                        <Button variant="link">
                            <ButtonText className="font-medium text-md text-typography-900">
                                Name
                            </ButtonText>
                            <ChevronDown color={"#4D4D4D"} size={18} />
                        </Button>
                        <Button variant="link">
                            <ButtonText className="font-medium text-md text-typography-900">
                                Games
                            </ButtonText>
                            {/* <ChevronDown color={"#4D4D4D"} size={18} /> */}
                        </Button>
                    </HStack>
                </Box>
                <CollectionList collections={collections} loading={loading} />
            </Box>
        </TouchableWithoutFeedback>
    )
}

export default Collections