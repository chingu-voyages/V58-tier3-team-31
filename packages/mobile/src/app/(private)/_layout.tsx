import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export const unstable_settings = {
	// Anchor ensures that tabs in this layout only control private screens

	anchor: "(private)",
};

const PrivateLayout = () => {
	return (
		<GluestackUIProvider mode="dark">
			<Tabs>
				<Tabs.Screen name="recoverer" />
				<Tabs.Screen name="sponsor" />
			</Tabs>
			<StatusBar style="auto" />
		</GluestackUIProvider>
	);
};

export default PrivateLayout;
