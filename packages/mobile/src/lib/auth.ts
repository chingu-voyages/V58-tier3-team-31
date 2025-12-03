import { supabase } from "@/lib/supabase";
import type { Session } from "@supabase/supabase-js";

export const signUpWithEmail = async (
  email: string,
  password: string,
): Promise<Session | null> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.signUp({ email, password });

  if (error) throw new Error(error.message);

  return session;
};

export const signUpRecoverer = async (userId: string) => {
  const { data, error } = await supabase
    .from("recoverers")
    .insert([{ user_id: userId, first_name: "Default", last_name: "Default" }])
    .select()
    .single();

  if (error) throw new Error(error.message);

  if (data) return data;
};

export const signUpSponsor = async ({
  userId,
  firstName,
  lastName,
  email,
}: {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
}) => {
  const { data, error } = await supabase
    .from("sponsors")
    .insert([
      { user_id: userId, first_name: firstName, last_name: lastName, email },
    ])
    .select()
    .single();

  if (error) throw new Error(error.message);
  if (data) return data;
};

export const fetchRecoverer = async (userId: string) => {
  const { data, error } = await supabase
    .from("recoverers")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  if (!data.user) throw new Error("No user returned from Supabase.");

  return data.user;
};

export const fetchUserRole = async (userId: string) => {
  const { data: recovererData, error: recovererError } = await supabase
    .from("recoverers")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (recovererError) throw new Error(recovererError.message);
  if (recovererData) return { role: "recoverer", data: recovererData };

  const { data: sponsorData, error: sponsorError } = await supabase
    .from("sponsors")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (sponsorError) throw new Error(sponsorError.message);

  if (sponsorData) return { role: "sponsor", data: sponsorData };

  return null;
};
