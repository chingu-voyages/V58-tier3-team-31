import { Stack } from "expo-router";
import "react-native-reanimated";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Recoverers" }} />
      <Stack.Screen
        name="invitations/index"
        options={{ title: "Pending Invitations" }}
      />
    </Stack>
  );
}
