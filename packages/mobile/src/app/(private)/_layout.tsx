import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import useUserRole from "@/hooks/useUserRole";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
export const unstable_settings = {
	// Anchor ensures that tabs in this layout only control private screens

	anchor: "(private)",
};

const PrivateLayout = () => {
	const router = useRouter();
	const { userRole, isLoading } = useUserRole();

	if (isLoading) return null;

	return (
		<GluestackUIProvider mode="dark">
			<Stack
				screenOptions={{ headerShown: true }}
				initialRouteName={
					userRole?.role === "recoverer" ? "recoverer" : "sponsor"
				}
			>
				<Stack.Screen name="sponsor" />
				<Stack.Screen
					name="recoverer"
					options={{
						title: "",
						headerLeft: () => null,
						headerRight: () => (
							<FontAwesome
								name="cog"
								size={24}
								color="grey"
								style={{ marginRight: 16 }}
								onPress={() => router.push("/recovererSettings")}
							/>
						),
					}}
				/>
				<Stack.Screen
					name="recovererSettings"
					options={{ title: "Settings" }}
				/>
			</Stack>
			<StatusBar style="auto" />
		</GluestackUIProvider>
	);
};

export default PrivateLayout;
