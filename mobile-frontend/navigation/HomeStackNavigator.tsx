import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import Games from '@/games/components/Games';
import { Icon } from "@/components/ui/icon"
import { ChevronLeft } from 'lucide-react-native';

import { HomeStackParamList } from '@/navigation/types';
import GamePlaceList from '@/games/components/GamePlaceList';
import GameDetail from '@/games/components/GameDetail';
import { Ionicons } from '@expo/vector-icons';
import GameEditor from '@/games/components/GameEditor';
import GameCollectionList from '@/games/components/GameCollectionList';
import CollectionEditor from '@/collections/components/CollectionEditor';

const Stack = createNativeStackNavigator<HomeStackParamList>();



const HomeStackNavigator = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Games"
                component={Games}
                options={{
                    title: 'Games',
                    headerLeft: () => (
                        <TouchableOpacity style={{ paddingHorizontal: 4 }}>
                            <Ionicons name="apps" size={16} color="#4D4D4D" style={{ paddingLeft: 4 }} />
                        </TouchableOpacity>
                    ),
                }}
            />

            <Stack.Screen
                name="GamePlace"
                component={GamePlaceList}
                options={({ navigation }) => {
                    return {
                        title: "Place",
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
            <Stack.Screen
                name="GameCollection"
                component={GameCollectionList}
                options={({ navigation }) => {
                    return {
                        title: "Collection",
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
            <Stack.Screen
                name="Game"
                component={GameDetail}
                options={({ navigation }) => {
                    return {
                        title: "Game",
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
            <Stack.Screen
                name="CreateGame"
                component={GameEditor}
                options={({ navigation }) => {
                    return {
                        title: "Create Game",
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
            <Stack.Screen
                name="EditGame"
                component={GameEditor}
                options={({ navigation }) => {
                    return {
                        title: "Edit Game",
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
            <Stack.Screen
                name="CreateCollection"
                component={CollectionEditor}
                options={({ navigation }) => {
                    return {
                        title: "Create Collection",
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
            <Stack.Screen
                name="EditCollection"
                component={CollectionEditor}
                options={({ navigation }) => {
                    return {
                        title: "Edit Collection",
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
