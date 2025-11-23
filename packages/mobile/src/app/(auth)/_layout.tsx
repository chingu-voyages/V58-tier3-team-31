import { Stack } from "expo-router";

const AuthLayout = () => {
	return (
		<Stack screenOptions={{ headerTitle: "Sign Up" }}>
			<Stack.Screen name="roleSelection" />
			<Stack.Screen name="locationConsent" />
		</Stack>
	);
};

export default AuthLayout;
