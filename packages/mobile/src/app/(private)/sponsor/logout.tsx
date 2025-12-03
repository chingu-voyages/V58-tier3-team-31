import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function LogoutScreen() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await supabase.auth.signOut();
      router.replace("/");
    };

    logout();
  }, [router]);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
