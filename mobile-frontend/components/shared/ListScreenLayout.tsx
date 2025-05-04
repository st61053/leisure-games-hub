import React, { ReactNode, useCallback, useMemo } from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
    useAnimatedScrollHandler,
    useSharedValue,
    useAnimatedStyle,
    withTiming
} from "react-native-reanimated";
import { Box } from "@/components/ui/box";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollContext } from "./ScrollContext";

interface ListScreenLayoutProps {
    header: (animatedStyle: any) => ReactNode;
    children: ReactNode;
    headerHeight?: number;
    scrollHideEnabled?: boolean;
    hideThresholdItems?: number;
    itemCount?: number;
    paddingBottom?: number;
}

export const ListScreenLayout = ({
    header,
    children,
    headerHeight = 80,
    scrollHideEnabled = true,
    hideThresholdItems = 6,
    itemCount = 0,
    paddingBottom = 200,
}: ListScreenLayoutProps) => {
    const translateY = useSharedValue(0);
    const prevScrollY = useSharedValue(0);
    const isHeaderHidden = useSharedValue(false);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const currentY = event.contentOffset.y;
            const contentHeight = event.contentSize.height;
            const layoutHeight = event.layoutMeasurement.height;
            const diff = currentY - prevScrollY.value;
            const isAtBottom = currentY + layoutHeight >= contentHeight - 10;

            if (scrollHideEnabled && itemCount > hideThresholdItems) {
                if (diff > 0 && currentY + 50 > headerHeight && !isHeaderHidden.value) {
                    translateY.value = withTiming(-headerHeight, { duration: 300 });
                    isHeaderHidden.value = true;
                } else if (diff < -2 && isHeaderHidden.value && !isAtBottom) {
                    translateY.value = withTiming(0, { duration: 300 });
                    isHeaderHidden.value = false;
                }
            }

            prevScrollY.value = currentY;
        },
    });

    const animatedHeaderStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    useFocusEffect(
        useCallback(() => {
            translateY.value = withTiming(0, { duration: 0 });
        }, [])
    );

    const scrollProps = useMemo(() => ({
        onScroll: scrollHandler,
        contentContainerStyle: {
            paddingTop: headerHeight,
            paddingBottom,
        },
        scrollEventThrottle: 16,
        showsVerticalScrollIndicator: false,
    }), [scrollHandler, headerHeight, paddingBottom]);

    return (
        <ScrollContext.Provider value={scrollProps}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Box style={styles.container}>
                    {header(animatedHeaderStyle)}
                    <Box style={{ flex: 1 }}>{children}</Box>
                </Box>
            </TouchableWithoutFeedback>
        </ScrollContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});