import { IApiObject } from "@/app/config";

export interface ICollectionState {
    collections: ICollection[];
    loading: boolean;
}

export interface ICollection extends IApiObject {
    attributes: {
        name: string;
        games: string[];
        type: CollectionType;
    }
}

export enum CollectionType {
    FAVORITE = "FAVORITE",
    CUSTOM = "CUSTOM",
}