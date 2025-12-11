import useSession from "./useSession";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import type { Recoverer } from "@/types/users";
import { Alert } from "react-native";
import { useCallback } from "react";

const fetchRecoverer = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("recoverers")
      .select("*")
      .eq("user_id", userId)
      .single();

    const recovererData: Recoverer = {
      id: data.id,
      userId: data.user_id,
      firstName: data.first_name,
      lastName: data.last_name,
      sponsorId: data.sponsor_id,
      foregroundLocationPermission: data.foreground_location_permission,
      backgroundLocationPermission: data.backgroundLocationPermission,
      alertsEnabled: data.alerts_enabled,
    };

    if (error) return Alert.alert(error.message);
    return recovererData;
  } catch (err) {
    console.error("There was a problem fetching the recoverer:", err);
    if (err instanceof Error) return Alert.alert(err.message);
  }
};

const useRecoverer = () => {
  const { session } = useSession();
  const [recoverer, setRecoverer] = useState<Recoverer | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchRecoverer = useCallback(async () => {
    if (!session?.user.id) return Alert.alert("No user for recoverer found");
    setIsLoading(true);

    try {
      const recovererData = await fetchRecoverer(session?.user.id);

      if (recovererData) setRecoverer(recovererData);
    } catch (err) {
      console.error("Failed to load sponsor:", err);
      if (err instanceof Error) return Alert.alert(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (!session?.user?.id) return;
    handleFetchRecoverer();
  }, [session?.user?.id, handleFetchRecoverer]);

  return { recoverer, isLoading, handleFetchRecoverer };
};

export default useRecoverer;
