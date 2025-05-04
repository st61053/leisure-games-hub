import React from "react";
import { Pressable } from "@/components/ui/pressable";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";

interface ItemProps {
    title: string;
    meta?: React.ReactNode;
    children?: React.ReactNode;
    onPress?: () => void;
    onRightPress?: () => void;
    leftSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
    color?: string;
}

export const Item = ({
    title,
    meta,
    children,
    onPress,
    onRightPress,
    leftSlot,
    rightSlot,
    color = "#eee"
}: ItemProps) => {
    const content = (
        <HStack
            style={{
                padding: 16,
                paddingHorizontal: 24,
                gap: 16,
                alignItems: "center",
            }}
        >
            {leftSlot && (
                <Box
                    style={{
                        backgroundColor: color,
                        padding: 12,
                        borderRadius: 6,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.15,
                        shadowRadius: 4,
                        elevation: 4,
                    }}
                >
                    {leftSlot}
                </Box>
            )}

            <VStack style={{ flex: 1 }} space="xs">
                <Heading size="lg">{title}</Heading>
                {meta}
                {children}
            </VStack>

            {rightSlot && (
                onRightPress ? (
                    <Pressable onPress={onRightPress}>
                        {({ pressed }) => (
                            <Box
                                style={{
                                    padding: 12,
                                    borderRadius: 999,
                                    backgroundColor: pressed ? "#D4D4D4" : "transparent",
                                    right: -16,
                                }}
                            >
                                {rightSlot}
                            </Box>
                        )}
                    </Pressable>
                ) : (
                    <Box style={{ padding: 12, right: -16 }}>{rightSlot}</Box>
                )
            )}
        </HStack>
    );

    if (onPress) {
        return (
            <Pressable onPress={onPress}>
                {({ pressed }) => (
                    <Box style={{ backgroundColor: pressed ? "#F5F5F5" : "transparent" }}>
                        {content}
                    </Box>
                )}
            </Pressable>
        );
    }

    return <>{content}</>;
};
