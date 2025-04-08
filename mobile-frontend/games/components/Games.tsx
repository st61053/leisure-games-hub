import { useAppSelector } from "@/app/hooks";
import { RootState } from "@/app/store";
import { Text } from "@/components/ui/text"

const Games = () => {

    const user = useAppSelector((state: RootState) => state.user.loggedUser);

    return (
        <Text>{`${JSON.stringify(user)}`}</Text>
    )
}

export default Games