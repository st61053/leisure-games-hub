import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { Icon } from "@/components/ui/icon"
import { LayoutGrid } from 'lucide-react-native';
import UserLoginForm from '@/user/components/UserLoginForm';

const Stack = createNativeStackNavigator();

const ProfileStackNavigator = () => (
    <Stack.Navigator
    >
        <Stack.Screen
            name="Profile"
            component={UserLoginForm}
            options={{
                title: 'Profil',
                headerLeft: () => (
                    <TouchableOpacity onPress={() => { }}>
                        <Icon className="text-typography-500" as={LayoutGrid} />
                    </TouchableOpacity>
                ),
            }}
        />
    </Stack.Navigator>
);

export default ProfileStackNavigator;
