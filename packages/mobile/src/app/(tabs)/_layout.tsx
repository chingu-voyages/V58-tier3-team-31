import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export const unstable_settings = {
	anchor: "(tabs)",
};

export default function PublicLayout() {
	return (
		<GluestackUIProvider mode="dark">
			<Tabs screenOptions={{ headerShown: false }}>
				<Tabs.Screen
					name="index"
					options={{
						title: "Sign In",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={20} name="home" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="signup"
					options={{
						title: "Sign Up",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={20} name="user" color={color} />
						),
					}}
				/>
			</Tabs>
			<StatusBar style="auto" />
		</GluestackUIProvider>
	);
}
