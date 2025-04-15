import { useAppDispatch } from "@/app/hooks";
import { useEffect, useState } from "react";
import { getPlaces } from "../api/getPlaces";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Heading } from "@/components/ui/heading";
import { getCategories } from "../api/getCategories";
import { LandPlot, LayoutList, LibraryBig, MenuIcon, Plus } from "lucide-react-native";
import { getCollections } from "@/collections/api/getCollections";
import GamesViewPlaces from "./GamesViewPlaces";
import GamesController from "./GamesControler";
import { Modal, ModalBackdrop } from "@/components/ui/modal";
import { Menu, MenuItem, MenuItemLabel, MenuSeparator } from "@/components/ui/menu";
import { Icon } from "@/components/ui/icon";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";

enum GamesView {
    PLACES = "places",
    ALL_GAMES = "all_games",
    COLLECTIONS = "collections",
}


const Games = () => {

    const dispatch = useAppDispatch();

    type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'Games'>;
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        dispatch(getPlaces());
        dispatch(getCategories());
        dispatch(getCollections());
    }, []);

    const [gamesView, setGamesView] = useState<GamesView>(GamesView.ALL_GAMES);

    const gamesViewMap = {
        [GamesView.PLACES]: {
            title: "Places",
            component: <GamesViewPlaces />,
        },
        [GamesView.ALL_GAMES]: {
            title: "All Games",
            component: <GamesController />,
        },
        [GamesView.COLLECTIONS]: {
            title: "Collections",
            component: <GamesViewPlaces />,
        }
    }

    const { title, component } = gamesViewMap[gamesView];
    const [showModal, setShowModal] = useState(false)

    return (
        <Box style={{
            height: '100%',
        }}>
            <Box style={{
                paddingHorizontal: 24,
                paddingTop: 20,
                paddingBottom: 4,
                paddingRight: 12,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <Heading size="2xl" style={{ color: "#4D4D4D" }}>
                    {title}
                </Heading>
                <Modal
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false)
                    }}
                    size="md"
                >
                    <ModalBackdrop />
                </Modal>
                <Menu
                    placement="bottom right"
                    onOpen={() => setShowModal(true)}
                    onClose={() => setShowModal(false)}
                    style={{ width: 204 }}
                    trigger={({ ...triggerProps }) => {
                        return (
                            <Pressable {...triggerProps}>
                                {({ pressed }) => (
                                    <Box style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        padding: 12,
                                        borderRadius: "50%",
                                        backgroundColor: pressed ? "#D4D4D4" : "transparent",
                                    }}>
                                        <MenuIcon
                                            color={"#4D4D4D"}
                                            size={28}
                                        />
                                    </Box>

                                )}
                            </Pressable>
                        )
                    }}
                >
                    <MenuItem onPress={() => {
                        setGamesView(GamesView.ALL_GAMES);
                    }} key="AllGames" textValue="a" style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
                        <Icon as={LayoutList} size="md" style={{ marginRight: 12, color: "#4D4D4D" }} />
                        <MenuItemLabel size="lg" style={{ flexShrink: 1 }}>All Games</MenuItemLabel>
                    </MenuItem>
                    <MenuItem onPress={() => {
                        setGamesView(GamesView.PLACES);
                    }} key="Places" textValue="b" style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
                        <Icon as={LandPlot} size="md" style={{ marginRight: 12, color: "#4D4D4D" }} />
                        <MenuItemLabel size="lg" style={{ flexShrink: 1 }}>Places</MenuItemLabel>
                    </MenuItem>
                    <MenuItem onPress={() => {
                        setGamesView(GamesView.COLLECTIONS);
                    }} key="Collections" textValue="c" style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
                        <Icon as={LibraryBig} size="md" style={{ marginRight: 12, color: "#4D4D4D" }} />
                        <MenuItemLabel size="lg" style={{ flexShrink: 1 }}>Collections</MenuItemLabel>
                    </MenuItem>
                    <MenuSeparator />
                    <MenuItem
                        onPress={() => {
                            navigation.navigate('CreateGame', {
                                placeId: undefined,
                            });
                        }}
                        key="AddGame" textValue="d" style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
                        <Icon as={Plus} size="md" style={{ marginRight: 12, color: "#4D4D4D" }} />
                        <MenuItemLabel size="lg" style={{ flexShrink: 1 }}>Add Game</MenuItemLabel>
                    </MenuItem>
                </Menu>
            </Box>
            {component}
        </Box>
    )
}

export default Games