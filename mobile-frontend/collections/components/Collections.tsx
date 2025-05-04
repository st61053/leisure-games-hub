import CollectionList from "./CollectionList";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { getCollections } from "../api/getCollections";
import { ListScreenLayout } from "@/components/shared/ListScreenLayout";
import { ListHeader } from "@/components/shared/ListHeader";

const Collections = () => {

    const dispatch = useAppDispatch();

    const collections = useAppSelector((state) => state.collection.collections);
    const loading = useAppSelector((state) => state.collection.loading);

    useFocusEffect(
        useCallback(() => {
            dispatch(getCollections());
        }, [])
    );

    return (
        <ListScreenLayout
            itemCount={collections.length}
            header={(animatedStyle) => (
                <ListHeader
                    translateYStyle={animatedStyle}
                    onFilterPress={() => console.log("filter pressed")}
                />
            )}
        >
            <CollectionList collections={collections} loading={loading} />
        </ListScreenLayout>
    )
}

export default Collections