import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Calendar1, House, MessageSquareText } from 'lucide-react-native';
import HomeStackNavigator from './HomeStackNavigator';
import { Icon } from '@/components/ui/icon';
import ProfileStackNavigator from './ProfileStackNavigator';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';
import { useAppSelector } from '@/app/hooks';
import { RootState } from '@/app/store';
import { DrawerLayout } from 'react-native-gesture-handler';
import AppDrawer from './AppDrawer';

const Tab = createBottomTabNavigator();

const Placeholder = () => <View><Text>Coming soon...</Text></View>;

const TabNavigator = () => {

    const user = useAppSelector((state: RootState) => state.user.loggedUser);

    const renderDrawerContent = () => (
        <AppDrawer />
    );

    return (
        <DrawerLayout
            drawerWidth={280}
            drawerPosition="left"
            renderNavigationView={renderDrawerContent}
        >
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    name="HomeTab"
                    component={HomeStackNavigator}
                    options={{
                        tabBarShowLabel: false,
                        title: 'Home',
                        tabBarIcon: ({ focused }) => <Icon style={{ marginTop: 20, color: focused ? "#1976d2" : "#4D4D4D" }} size='xl' className="text-typography-500" as={House} />,
                    }}
                />
                <Tab.Screen
                    name="Scheduler"
                    component={Placeholder}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ focused }) => <Icon style={{ marginTop: 20, color: focused ? "#1976d2" : "#4D4D4D" }} size='xl' className="text-typography-500" as={Calendar1} />,
                    }}
                />
                {/* <Tab.Screen
                    name="Collection"
                    component={Placeholder}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ focused }) => <Icon style={{ marginTop: 20, color: focused ? "#1976d2" : "#4D4D4D" }} size='xl' className="text-typography-500" as={NotebookText} />,
                    }}
                /> */}
                <Tab.Screen
                    name="Chat"
                    component={Placeholder}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ focused }) => <Icon style={{ marginTop: 20, color: focused ? "#1976d2" : "#4D4D4D" }} size='xl' as={MessageSquareText} />,
                        tabBarBadge: 10,
                        tabBarBadgeStyle: { backgroundColor: 'red', minWidth: 17, height: 17, borderRadius: "50%", fontSize: 7, fontWeight: "bold", top: 5 },
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileStackNavigator}
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({ focused }) => (
                            <Avatar size="sm" style={{ marginTop: 18 }}>
                                <AvatarFallbackText size='xs' style={{ color: "white" }}>
                                    {`${user?.attributes?.firstname} ${user?.attributes?.lastname}`}
                                </AvatarFallbackText>
                            </Avatar>
                        ),
                    }}
                />
            </Tab.Navigator>
        </DrawerLayout>
    )
};

export default TabNavigator;
