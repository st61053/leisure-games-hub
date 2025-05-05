import { CollectionType, ICollection } from "../types"
import { Item } from "@/components/shared/Item";
import { Boxes, EllipsisVertical, Heart } from "lucide-react-native";
import { Text } from "@/components/ui/text";
import { HomeStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatItemList } from "@/components/shared/FlatItemList";

interface CollectionListProps {
    collections: ICollection[];
    loading: boolean;
}

const CollectionList = ({ collections, loading }: CollectionListProps) => {

    type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Games'>;
    const navigation = useNavigation<NavigationProp>();

    return (

        <FlatItemList
            items={collections}
            loading={loading}
            emptyMessage="No collections found."
            renderItem={({ item: collection }) => {

                const { name, games, type } = collection.attributes;

                return (
                    <Item
                        color={"#4D4D4D"}
                        title={name}
                        leftSlot={type === CollectionType.FAVORITE ? <Heart color={"#fff"} size={32} /> : <Boxes color={"#fff"} size={32} />}
                        meta={
                            <Text style={{ color: "#6D6D6D", top: -4 }}>{`${games.length} ${games.length > 1 ? "games" : "game"}`}</Text>
                        }
                        onPress={() => navigation.navigate('GameCollection', {
                            collectionId: collection.id
                        })}
                        rightSlot={<EllipsisVertical size={24} color="#4D4D4D" />}

                    />
                );
            }}
        />
    )
}

export default CollectionList