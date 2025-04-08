import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Divider } from "@/components/ui/divider";
import { HStack } from "@/components/ui/hstack"
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import { logoutUser } from "@/user/userSlice";
import { LogOut, Moon, Settings, ToggleLeft } from "lucide-react-native";

const AppDrawer = () => {

    const user = useAppSelector((state: RootState) => state.user.loggedUser);
    const dispatch = useAppDispatch();


    const handleLogoutUser = () => {
        dispatch(logoutUser());
    }

    return (
        <VStack style={{ backgroundColor: "#fff", paddingTop: 48, flex: 1 }}>
            <HStack space="md" style={{ alignItems: "center", padding: 16 }}>
                <Avatar style={{ height: 50, width: 50 }}>
                    <AvatarFallbackText size='md' style={{ color: "white" }}>
                        {`${user?.attributes?.firstname} ${user?.attributes?.lastname}`}
                    </AvatarFallbackText>
                </Avatar>
                <VStack >
                    <Text size="lg" style={{ color: "#4D4D4D", fontWeight: "bold" }}>
                        {`${user?.attributes?.firstname} ${user?.attributes?.lastname}`}
                    </Text>
                    <Text size="sm" className="text-typography-600" style={{ fontWeight: "normal", top: -4 }}>
                        {user?.attributes?.email}
                    </Text>
                </VStack>
            </HStack>
            <Divider />
            <VStack style={{
                padding: 8
            }}>
                <Pressable>
                    {({ pressed }) => (
                        <Box style={{
                            paddingVertical: 12,
                            paddingHorizontal: 8,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 16,
                            borderRadius: 6,
                            backgroundColor: pressed ? "#E0E0E0" : "transparent",
                        }}>
                            <Icon as={Moon} size="xl" className="text-typography-600" />
                            <Text>Dark mode</Text>
                            <Icon as={ToggleLeft} size="lg" className="text-typography-600" />
                        </Box>
                    )}
                </Pressable>
                <Pressable>
                    {({ pressed }) => (
                        <Box style={{
                            paddingVertical: 12,
                            paddingHorizontal: 8,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 16,
                            borderRadius: 6,
                            backgroundColor: pressed ? "#E0E0E0" : "transparent",
                        }}>
                            <Icon as={Settings} size="xl" className="text-typography-600" />
                            <Text>Settings</Text>
                        </Box>
                    )}
                </Pressable>
                <Pressable onPress={handleLogoutUser}>
                    {({ pressed }) => (
                        <Box style={{
                            paddingVertical: 12,
                            paddingHorizontal: 8,
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 16,
                            borderRadius: 6,
                            backgroundColor: pressed ? "#E0E0E0" : "transparent",
                        }}>
                            <Icon as={LogOut} size="xl" className="text-typography-600" />
                            <Text>Logout</Text>
                        </Box>
                    )}
                </Pressable>
            </VStack>

        </VStack>
    )
}

export default AppDrawer