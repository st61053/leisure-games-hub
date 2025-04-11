import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { Text } from "@/components/ui/text"
import { useEffect } from "react";
import { getPlaces } from "../api/getPlaces";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { PlaceType } from "../types";
import { ScrollView } from "react-native";
import { Heading } from "@/components/ui/heading";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@/navigation/types";
import { createPlacesMap } from "../constants";
import { getCategories } from "../api/getCategories";
import { SlidersHorizontal } from "lucide-react-native";


const Games = () => {

    const dispatch = useAppDispatch();

    type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Games'>;
    const navigation = useNavigation<NavigationProp>();

    const places = useAppSelector((state: RootState) => state.game.places);

    useEffect(() => {
        dispatch(getPlaces());
        dispatch(getCategories());
    }, []);

    const placesMap = createPlacesMap(64);

    return (
        <Box style={{
            height: '100%',
        }}>
            <Box style={{
                paddingHorizontal: 24,
                paddingTop: 20,
                paddingBottom: 4,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <Heading size="2xl" style={{ color: "#4D4D4D" }}>
                    Places
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
                            <SlidersHorizontal
                                color={"#4D4D4D"}
                                size={28}
                            />
                        </Box>

                    )}
                </Pressable>
            </Box>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 100 }}>
                <Box
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}
                >
                    {places.map((place) => {
                        const { color, icon, text } = placesMap[place.attributes.name as PlaceType];

                        return (
                            <Pressable
                                key={place.id}
                                style={{ width: '47%', marginBottom: 24 }}
                                onPress={() => {
                                    navigation.navigate('GamePlace', {
                                        place: place.attributes.name,
                                    });
                                }}
                            >
                                {({ pressed }) => (
                                    <Box
                                        style={{
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: color,
                                            padding: 24,
                                            borderRadius: 16,
                                            gap: 12,
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.15,
                                            shadowRadius: 4,
                                            elevation: 4, // pro Android
                                            transform: pressed ? [{ scale: 0.95 }] : [{ scale: 1 }],
                                        }}
                                    >
                                        {icon}
                                        <Text style={{ color: '#fff' }} size="lg">
                                            {text}
                                        </Text>
                                    </Box>
                                )}
                            </Pressable>
                        );
                    })}
                </Box>
            </ScrollView>
        </Box>
    )
}

export default Games