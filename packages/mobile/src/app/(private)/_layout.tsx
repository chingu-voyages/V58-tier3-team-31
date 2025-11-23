import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import useUserRole from "@/hooks/useUserRole";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export const unstable_settings = {
	// Anchor ensures that tabs in this layout only control private screens

	anchor: "(private)",
};

const PrivateLayout = () => {
	const router = useRouter();
	const { userRole, isLoading } = useUserRole();

	useEffect(() => {
		if (!isLoading && userRole) {
			if (userRole.role === "recoverer") router.replace("/(private)/recoverer");
			if (userRole.role === "sponsor") router.replace("/(private)/sponsor");
		}
	}, [isLoading, userRole, router]);

	if (isLoading) return null;

	return (
		<GluestackUIProvider mode="dark">
			<Stack>
				<Stack.Screen name="sponsor" options={{ headerShown: false }} />
				<Stack.Screen name="recoverer" options={{ headerShown: false }} />
			</Stack>
			<StatusBar style="auto" />
		</GluestackUIProvider>
	);
};

export default PrivateLayout;
