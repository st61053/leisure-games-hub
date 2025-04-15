import { useAppSelector } from "@/app/hooks";
import { Box } from "@/components/ui/box";
import { ScrollView } from "react-native";
import { createPlacesMap } from "../constants";
import { PlaceType } from "../types";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text"
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";

const GamesViewPlaces = () => {

    type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Games'>;
    const navigation = useNavigation<NavigationProp>();

    const places = useAppSelector((state) => state.game.places);
    const placesMap = createPlacesMap(64);

    return (
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
                                        borderWidth: 2,
                                        borderColor: pressed ? "#4D4D4D" : "transparent",
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
    )
}

export default GamesViewPlaces