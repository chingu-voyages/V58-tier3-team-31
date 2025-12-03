import getSponsorProfile from "./getSponsorProfile";
import { supabase } from "../supabase";

export default async function getAllSponsorRecoverers() {
  const sponsor = await getSponsorProfile();
  if (!sponsor) {
    throw new Error("Sponsor profile not found");
  }
  const { data: recoverers, error } = await supabase
    .from("recoverers")
    .select("*")
    .eq("sponsor_id", sponsor.id);

  if (error) {
    throw error;
  }

  return recoverers || [];
}

export type SponsorRecoverers = Awaited<
  ReturnType<typeof getAllSponsorRecoverers>
>;
