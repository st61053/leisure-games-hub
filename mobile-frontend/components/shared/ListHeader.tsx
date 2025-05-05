import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { SearchIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { SlidersVertical } from "lucide-react-native";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

interface ListHeaderProps {
    translateYStyle: any;
    onFilterPress?: () => void;
    searchPlaceholder?: string;
    showSearch?: boolean;
    showFilter?: boolean;
}

export const ListHeader = ({
    translateYStyle,
    onFilterPress,
    searchPlaceholder = "Search...",
    showSearch = true,
    showFilter = true
}: ListHeaderProps) => {
    return (
        <Animated.View style={[styles.headerContainer, translateYStyle]}>
            <Box style={{ paddingBottom: 12, flexDirection: "column" }}>
                <HStack style={{ paddingHorizontal: 24 }} space="md">
                    {showFilter && (
                        <Button
                            size="md"
                            variant="solid"
                            style={styles.filterButton}
                            onPress={onFilterPress}
                        >
                            <SlidersVertical color={"#929292"} size={20} strokeWidth={2.5} />
                        </Button>
                    )}

                    {showSearch && (
                        <Input
                            size="xl"
                            style={styles.searchInput}
                        >
                            <InputSlot style={{ paddingLeft: 16 }}>
                                <InputIcon as={SearchIcon} />
                            </InputSlot>
                            <InputField placeholder={searchPlaceholder} />
                        </Input>
                    )}
                </HStack>
            </Box>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: "#FDFDFD",
        paddingTop: 12,
    },
    filterButton: {
        borderRadius: 12,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#D4D4D4",
        height: 48
    },
    searchInput: {
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 12,
        height: 48
    }
});
