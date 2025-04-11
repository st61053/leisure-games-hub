import { Leaf, TreePine, Tent, Sailboat, Warehouse, Volleyball, Utensils } from "lucide-react-native";
import { PlaceType } from "./types";

export const createPlacesMap = (iconSize: number) => ({
    [PlaceType.MEADOW]: {
        icon: <Leaf color={"#fff"} size={iconSize} />,
        text: "Meadow",
        color: "#79B76E",
    },
    [PlaceType.FOREST]: {
        icon: <TreePine color={"#fff"} size={iconSize} />,
        text: "Forest",
        color: "#406C38",
    },
    [PlaceType.CAMP]: {
        icon: <Tent color={"#fff"} size={iconSize} />,
        text: "Camp",
        color: "#B16565",
    },
    [PlaceType.WATER]: {
        icon: <Sailboat color={"#fff"} size={iconSize} />,
        text: "Water",
        color: "#65A4B8",
    },
    [PlaceType.BOATHOUSE]: {
        icon: <Warehouse color={"#fff"} size={iconSize} />,
        text: "Boathouse",
        color: "#A6568B",
    },
    [PlaceType.CENTRAL_COURT]: {
        icon: <Volleyball color={"#fff"} size={iconSize} />,
        text: "Central Court",
        color: "#DA8910",
    },
    [PlaceType.CABINS]: {
        icon: <Utensils color={"#fff"} size={iconSize} />,
        text: "Cabins",
        color: "#D1C450",
    },
});