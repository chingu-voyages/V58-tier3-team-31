import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Alert } from "react-native";
import type { Session, User } from "@supabase/supabase-js";

const fetchSession = async () => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      Alert.alert(error.message);
    } else {
      return session;
    }
  } catch (err) {
    Alert.alert("Error fetching session state.");
    console.error("Session fetch failed:", err);
  }
};

const useSession = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const createSession = async () => {
      setIsLoading(true);
      try {
        const session = await fetchSession();
        setSession(session || null);
      } catch (err) {
        console.error("Failed to fetch session:", err);
      } finally {
        setIsLoading(false);
      }
    };

    createSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      },
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return {
    session,
    user: session?.user as User | undefined,
    isLoading,
  };
};

export default useSession;
