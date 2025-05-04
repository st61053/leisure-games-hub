import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { IGame } from "../types";
import GameItem from "./GameItem";
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { Layers } from "lucide-react-native";
import { Divider } from "@/components/ui/divider";

const GameList = ({ games, loading }: { games: IGame[], loading: boolean }) => {

    return (
        <VStack>
            {loading
                ? <Spinner />
                : games.map((game, i) =>
                    <VStack key={game.id}>
                        <GameItem game={game} />
                        {i !== games.length - 1 && <Divider />}
                    </VStack>

                )}
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
    )
}

export default GameList