import getRecovererProfile from "./getRecovererProfile";
import { supabase } from "../supabase";

export default async function getAllSponsorsByRecoverer() {
  const recoverer = await getRecovererProfile();
  if (!recoverer) {
    throw new Error("Recoverer profile not found");
  }
  const { data: sponsors, error } = await supabase
    .from("sponsors")
    .select("*")
    .eq("recoverer_id", recoverer.id);

  if (error) {
    throw error;
  }

  return sponsors[0] || null;
}

export type Sponsor = Awaited<ReturnType<typeof getAllSponsorsByRecoverer>>;
