import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import Games from '@/games/components/Games';
import { Icon } from "@/components/ui/icon"
import { LayoutGrid } from 'lucide-react-native';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => (

    <Stack.Navigator>
        <Stack.Screen
            name="Games"
            component={Games}
            options={{
                title: 'Hry',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { }}>
                        <Icon className="text-typography-500" as={LayoutGrid} />
                    </TouchableOpacity>
                ),
            }}
        />
    </Stack.Navigator>
);

export default HomeStackNavigator;
