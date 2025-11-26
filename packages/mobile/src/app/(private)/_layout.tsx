import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import useUserRole from "@/hooks/useUserRole";
export const unstable_settings = {
	// Anchor ensures that tabs in this layout only control private screens

	anchor: "(private)",
};

const PrivateLayout = () => {
	const { userRole, isLoading } = useUserRole();

	if (isLoading) return null;

	return (
		<GluestackUIProvider mode="dark">
			<Stack
				screenOptions={{ headerShown: false }}
				initialRouteName={
					userRole?.role === "recoverer" ? "recoverer" : "sponsor"
				}
			>
				<Stack.Screen name="sponsor" />
				<Stack.Screen name="recoverer" />
			</Stack>
			<StatusBar style="auto" />
		</GluestackUIProvider>
	);
};

export default PrivateLayout;
