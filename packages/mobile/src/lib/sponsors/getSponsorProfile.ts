import { supabase } from "../supabase";

export default async function getRecovererProfile() {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    throw new Error("User not authenticated");
  }

  const { data: sponsor, error: sponsorError } = await supabase
    .from("sponsors")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (sponsorError || !sponsor) {
    throw new Error("Sponsor profile not found");
  }

  return sponsor;
}
