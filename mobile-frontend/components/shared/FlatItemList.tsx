import Animated from "react-native-reanimated";
import { ListRenderItem, RefreshControl } from "react-native";
import { Spinner } from "@/components/ui/spinner";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Divider } from "@/components/ui/divider";
import { Layers } from "lucide-react-native";
import { useScrollProps } from "./ScrollContext";

interface FlatItemListProps<T> {
    items: T[];
    loading: boolean;
    renderItem: ListRenderItem<T>;
    emptyMessage?: string;
    keyExtractor?: (item: T, index: number) => string;
    showDividers?: boolean;
    onRefresh?: () => void;
    refreshing?: boolean;
}

export const FlatItemList = <T,>({
    items,
    loading,
    renderItem,
    emptyMessage = "Nothing to show here.",
    keyExtractor = (item, index) => (item as any).id?.toString() ?? index.toString(),
    showDividers = true,
    refreshing,
    onRefresh
}: FlatItemListProps<T>) => {
    const scrollProps = useScrollProps();

    if (loading && !refreshing) return <Spinner />;

    return (
        <Animated.FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={items}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={showDividers ? Divider : undefined}
            ListEmptyComponent={
                <HStack style={{ alignItems: "center", paddingVertical: 8, paddingHorizontal: 24 }} space="md">
                    <Layers size={48} color="#929292" />
                    <VStack>
                        <Heading size="md" style={{ color: "#4D4D4D" }}>Oops!</Heading>
                        <Text size="md" style={{ color: "#4D4D4D", top: -4 }}>{emptyMessage}</Text>
                    </VStack>
                </HStack>
            }
            {...scrollProps}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing ?? false}
                    onRefresh={onRefresh}
                    progressViewOffset={60}
                />
            }
        />
    );
};