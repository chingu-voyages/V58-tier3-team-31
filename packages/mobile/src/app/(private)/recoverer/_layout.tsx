import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const RecovererLayout = () => {
	return (
		<GluestackUIProvider mode="dark">
			<Tabs>
				<Tabs.Screen
					name="index"
					options={{
						headerShown: false,
						title: "Home",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={20} name="home" color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="logout"
					options={{
						title: "Log Out",
						tabBarIcon: ({ color }) => (
							<FontAwesome size={20} name="sign-out" color={color} />
						),
					}}
				/>
			</Tabs>
			<StatusBar style="auto" />
		</GluestackUIProvider>
	);
};

export default RecovererLayout;
