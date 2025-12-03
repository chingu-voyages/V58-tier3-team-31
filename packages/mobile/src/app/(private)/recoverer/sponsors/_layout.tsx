import { Stack } from "expo-router";
import "react-native-reanimated";

export default function SponsorsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Sponsors" }} />
      <Stack.Screen
        name="invite-sponsor"
        options={{ title: "Invite Sponsor" }}
      />
    </Stack>
  );
}
