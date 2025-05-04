import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";
import { HomeStackParamList } from "@/navigation/types";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Pressable } from 'react-native';
import { PlaceType } from "../types";
import { createPlacesMap } from "../constants";
import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Plus } from "lucide-react-native";
import GamesController from "./GamesControler";

const GamePlaceList = () => {

    type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Games'>;
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RouteProp<HomeStackParamList, 'GamePlace'>>();

    const { place } = route.params;
    const placesMap = createPlacesMap(24);
    const { text } = placesMap[place as PlaceType];

    const places = useAppSelector((state: RootState) => state.game.places);
    const placeId = places.find((p) => p.attributes.name === place)?.id ?? "";

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
                    {text}
                </Heading>
                <Pressable
                    onPress={() => {
                        navigation.navigate('CreateGame', {
                            placeId: placeId,
                        });
                    }}
                >
                    {({ pressed }) => (
                        <Box style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 12,
                            borderRadius: "50%",
                            backgroundColor: pressed ? "#D4D4D4" : "transparent",
                        }}>
                            <Plus
                                color={"#4D4D4D"}
                                size={28}
                            />
                        </Box>

                    )}
                </Pressable>
            </Box>
            <GamesController placeId={placeId} />
        </Box>
    )
}

export default GamePlaceList