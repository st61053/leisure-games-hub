import { useAppDispatch } from "@/app/hooks";
import { useEffect, useState } from "react";
import { getPlaces } from "../api/getPlaces";
import { Box } from "@/components/ui/box";
import { Pressable } from "@/components/ui/pressable";
import { Heading } from "@/components/ui/heading";
import { getCategories } from "../api/getCategories";
import { LandPlot, LibraryBig, List, MenuIcon, Plus } from "lucide-react-native";
import { getCollections } from "@/collections/api/getCollections";
import GamesViewPlaces from "./GamesViewPlaces";
import GamesController from "./GamesControler";
import { Modal, ModalBackdrop } from "@/components/ui/modal";
import { Menu, MenuItem, MenuItemLabel, MenuSeparator } from "@/components/ui/menu";
import { Icon } from "@/components/ui/icon";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList } from "@/navigation/types";
import { useNavigation } from "@react-navigation/native";
import Collections from "@/collections/components/Collections";
import { getUsers } from "@/user/api/getUsers";

enum GamesView {
    PLACES = "places",
    OVERVIEW = "overview",
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
        dispatch(getUsers());
    }, []);

    const [gamesView, setGamesView] = useState<GamesView>(GamesView.OVERVIEW);

    const gamesViewMap = {
        [GamesView.PLACES]: {
            title: "Places",
            component: <GamesViewPlaces />,
        },
        [GamesView.OVERVIEW]: {
            title: "Overview",
            component: <GamesController />,
        },
        [GamesView.COLLECTIONS]: {
            title: "Collections",
            component: <Collections />,
        }
    }

    const { title, component } = gamesViewMap[gamesView];
    const [showModal, setShowModal] = useState(false)

    return (
        <Box style={{
            height: '100%',
            backgroundColor: "#FDFDFD",
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
                zIndex: 1,
                backgroundColor: "#FDFDFD",
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
                        setGamesView(GamesView.OVERVIEW);
                    }} key="AllGames" textValue="a" style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
                        <Icon as={List} size="md" style={{ marginRight: 12, color: "#4D4D4D" }} />
                        <MenuItemLabel size="lg" style={{ flexShrink: 1 }}>Overview</MenuItemLabel>
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
                        <MenuItemLabel size="lg" style={{ flexShrink: 1 }}>Add game</MenuItemLabel>
                    </MenuItem>
                    <MenuItem
                        onPress={() => {
                            navigation.navigate('CreateCollection', {
                                collectionId: undefined,
                            });
                        }}
                        key="AddCollection" textValue="d" style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
                        <Icon as={Plus} size="md" style={{ marginRight: 12, color: "#4D4D4D" }} />
                        <MenuItemLabel size="lg" style={{ flexShrink: 1 }}>Add collection</MenuItemLabel>
                    </MenuItem>
                </Menu>
            </Box>
            {component}
        </Box>
    )
}

export default Games