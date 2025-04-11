import { IApiObject } from "@/app/config";

export interface IGameState {
    games: IGame[];
    places: IPlace[];
    categories: ICategory[];
    loading: boolean;
}

export interface IGame extends IApiObject {
    attributes: {
        name: string;
        description: string;
        place: string;
        categories: string[];
        duration: number;
        minPlayers: number;
        equipment: string[];
        author: string;
        createdBy: string;
        createdAt: string;
        updatedAt: string;
        favorites: number;
    }
}

export interface IPlace extends IApiObject {
    attributes: {
        name: string;
    }
}

export enum PlaceType {
    MEADOW = "meadow",
    FOREST = "forest",
    CAMP = "camp",
    WATER = "water",
    BOATHOUSE = "boathouse",
    CENTRAL_COURT = "centralCourt",
    CABINS = "cabins",
}

export interface ICategory extends IApiObject {
    attributes: {
        name: string;
        active: boolean;
    }
}

export interface GameQueryFilter {
    key: string;
    value: string | number | boolean | (string | number | boolean)[];
}