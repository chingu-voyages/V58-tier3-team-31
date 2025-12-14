import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack screenOptions={{ headerTitle: "" }}>
      <Stack.Screen name="roleSelection" />
      <Stack.Screen name="locationConsent" />
      <Stack.Screen name="privacyConsent" />
    </Stack>
  );
};

export default AuthLayout;
