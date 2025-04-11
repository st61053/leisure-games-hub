import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import Games from '@/games/components/Games';
import { Icon } from "@/components/ui/icon"
import { ChevronLeft, LayoutGrid } from 'lucide-react-native';

import { HomeStackParamList } from '@/navigation/types';
import { PlaceType } from '@/games/types';
import GamePlaceList from '@/games/components/GamePlaceList';
import { createPlacesMap } from '@/games/constants';

const Stack = createNativeStackNavigator<HomeStackParamList>();



const HomeStackNavigator = () => {

    const placesMap = createPlacesMap(24);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Games"
                component={Games}
                options={{
                    title: 'Games',
                    headerLeft: () => (
                        <TouchableOpacity style={{ paddingHorizontal: 4 }}>
                            <Icon style={{ color: "#4D4D4D" }} as={LayoutGrid} />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="GamePlace"
                component={GamePlaceList}
                options={({ navigation, route }) => {
                    const placeKey = route.params?.place as PlaceType;

                    const { text } = placesMap[placeKey] ?? { text: 'Meadow' }; // fallback

                    return {
                        title: "Place", //text,
                        headerLeft: () => (
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={{ paddingHorizontal: 4 }}
                            >
                                <Icon
                                    size="xl"
                                    as={ChevronLeft}
                                    style={{ color: '#4D4D4D' }}
                                />
                            </TouchableOpacity>
                        ),
                    };
                }}
            />
        </Stack.Navigator >
    )
};

export default HomeStackNavigator;
