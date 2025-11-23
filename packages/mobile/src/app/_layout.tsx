import "../../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";

export const unstable_settings = {
	anchor: "(tabs)",
};

export default function RootLayout() {
	return (
		<GestureHandlerRootView className="flex-1">
			<Drawer>
				<Drawer.Screen
					name="index"
					options={{
						title: "Login",
						drawerLabel: "Login",
					}}
				/>
				<Drawer.Screen
					name="(auth)/signup"
					options={{
						title: "Signup",
						drawerLabel: "Signup",
					}}
				/>
				<Drawer.Screen
					name="(auth)/locationConsent"
					options={{
						title: "Locatoin Consent",
						drawerLabel: "Location Consent",
					}}
				/>
				<Drawer.Screen
					name="(auth)/privacyConsent"
					options={{
						title: "Privacy Consent",
						drawerLabel: "Privacy Consent",
					}}
				/>
				<Drawer.Screen
					name="(auth)/roleSelection"
					options={{
						title: "Role Selection",
						drawerLabel: "Role Selection",
					}}
				/>
				<Drawer.Screen
					name="recoverer/index"
					options={{
						title: "Recoverer",
						drawerLabel: "Recoverer",
					}}
				/>
				<Drawer.Screen
					name="sponsor/index"
					options={{
						title: "Sponsor",
						drawerLabel: "Sponsor",
					}}
				/>
				<Drawer.Screen
					name="signin/index"
					options={{
						title: "Signin",
						drawerLabel: "Signin",
					}}
				/>
			</Drawer>
		</GestureHandlerRootView>
	);
}
