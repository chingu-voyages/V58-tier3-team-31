import { Stack } from "expo-router";
import useUserRole from "@/hooks/useUserRole";
export const unstable_settings = {
  // Anchor ensures that tabs in this layout only control private screens
  anchor: "(private)",
};

const PrivateLayout = () => {
  const { userRole, isLoading } = useUserRole();

  if (isLoading) return null;

  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName={
        userRole?.role === "recoverer" ? "recoverer" : "sponsor"
      }
    >
      <Stack.Screen name="sponsor" />
      <Stack.Screen name="recoverer" />
    </Stack>
  );
};

export default PrivateLayout;
