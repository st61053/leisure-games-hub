import React from 'react'
import { CollectionType, ICollection } from '../types';
import { Pressable } from '@/components/ui/pressable';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from "@/components/ui/text";
import { Box } from '@/components/ui/box';
import { Boxes, EllipsisVertical, Heart } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';

interface CollectionItemProps {
    collection: ICollection;
}

const CollectionItem = ({ collection }: CollectionItemProps) => {

    type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Games'>;
    const navigation = useNavigation<NavigationProp>();

    const { name, games, type } = collection.attributes;

    return (
        <Pressable
            onPress={() => {
                navigation.navigate('GameCollection', {
                    collectionId: collection.id
                });
            }}
        >
            {({ pressed }) => (
                <HStack
                    style={{
                        backgroundColor: "#fff",
                        padding: 12,
                        borderRadius: 12,
                        gap: 12,
                        borderWidth: 1,
                        borderColor: pressed ? "#4D4D4D" : "#D4D4D4",
                        alignItems: "center",
                    }}
                >
                    <Box
                        style={{
                            backgroundColor: "#4D4D4D",
                            padding: 12,
                            borderRadius: 6,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.15,
                            shadowRadius: 4,
                            elevation: 4, // pro Android
                        }}>
                        {type === CollectionType.FAVORITE ? <Heart color={"#fff"} size={28} /> : <Boxes color={"#fff"} size={28} />}
                    </Box>
                    <VStack style={{ flex: 1 }}>
                        <Heading size="lg">
                            {name}
                        </Heading>

                        <Text style={{ color: "#6D6D6D", top: -2 }}>{`${games.length} ${games.length > 1 ? "games" : "game"}`}</Text>

                    </VStack>
                    <Pressable
                        onPress={() => {
                            // setOpenCollectionActionsheet(true);
                        }}
                    >
                        {({ pressed }) => (
                            <Box style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 12,
                                borderRadius: "50%",
                                backgroundColor: pressed ? "#D4D4D4" : "transparent",
                                right: -8
                            }}>
                                <EllipsisVertical
                                    color={"#4D4D4D"}
                                    size={24}
                                />
                            </Box>

                        )}
                    </Pressable>
                </HStack>
            )}
        </Pressable>
    )
}

export default CollectionItem