import { View, Text } from "react-native";
import Auth from "../components/Auth";
import useSession from "../hooks/useSession";

export default function Signup() {
	const { session } = useSession();

	return (
		<View>
			<Auth />
			{session?.user?.id && <Text>{session.user.id}</Text>}
		</View>
	);
}
