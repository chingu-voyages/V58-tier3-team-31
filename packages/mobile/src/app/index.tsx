import { Text, View } from "react-native";
import UserConsentLocationServices from "@/components/custom/UserConsentLocationServices";

export default function Index() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<UserConsentLocationServices />
		</View>
	);
}
