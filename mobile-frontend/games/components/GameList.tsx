import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { ScrollView } from 'react-native';
import { IGame } from "../types";
import GameItem from "./GameItem";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { Layers } from "lucide-react-native";

const GameList = ({ games, loading }: { games: IGame[], loading: boolean }) => {

    return (
        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 300 }}>
            <VStack space="sm">
                {loading ? <Spinner /> : games.map((game) => <GameItem key={game.id} game={game} />)}
                {games.length === 0 && !loading &&
                    <HStack style={{ alignItems: "center", paddingVertical: 8 }} space="md" >
                        <Layers size={48} color={"#929292"} />
                        <VStack>
                            <Heading size="md" style={{ color: "#4D4D4D" }}>
                                Oops!
                            </Heading>
                            <Text size="md" style={{ color: "#4D4D4D", top: -4 }}>
                                Nothing to play here.
                            </Text>
                        </VStack>
                    </HStack>
                }
            </VStack>
        </ScrollView>
    )
}

export default GameList