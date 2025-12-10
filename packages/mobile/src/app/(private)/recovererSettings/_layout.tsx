import { Stack } from "expo-router";

export default function RecovererSettingsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Settings" }} />
      <Stack.Screen name="placeholder" options={{ title: "Placeholder" }} />
    </Stack>
  );
}
