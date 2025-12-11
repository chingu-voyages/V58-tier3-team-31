import { supabase } from "../supabase";

export default async function getRecovererProfile() {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("User not authenticated");
  }

  const { data: recoverer, error: recovererError } = await supabase
    .from("recoverers")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (recovererError || !recoverer) {
    throw new Error("Recoverer profile not found");
  }

  return recoverer;
}
