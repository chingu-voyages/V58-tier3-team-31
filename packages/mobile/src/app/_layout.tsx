import "../../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export const unstable_settings = {
	anchor: "(tabs)",
};

export default function RootLayout() {
	return (
		<GluestackUIProvider mode="dark">
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
			</Stack>
			<StatusBar style="auto" />
		</GluestackUIProvider>
	);
}
