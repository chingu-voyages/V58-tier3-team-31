import "../../global.css";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="light">
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </GluestackUIProvider>
  );
}
