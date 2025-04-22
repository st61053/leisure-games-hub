import { ScrollView } from "react-native";
import { ICollection } from "../types"
import { VStack } from "@/components/ui/vstack";
import { Spinner } from "@/components/ui/spinner";
import CollectionItem from "./CollectionItem";

interface CollectionListProps {
    collections: ICollection[];
    loading: boolean;
}

const CollectionList = ({ collections, loading }: CollectionListProps) => {

    return (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 300 }}>
            <VStack space="sm">
                {loading ? <Spinner /> : collections.map((collection) => <CollectionItem key={collection.id} collection={collection} />)}
            </VStack>
        </ScrollView>
    )
}

export default CollectionList