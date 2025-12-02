import { supabase } from "../supabase";
import getSponsorProfile from "./getSponsorProfile";

export default async function getPendingInvitations() {
  const sponsor = await getSponsorProfile();

  if (!sponsor) {
    throw new Error("Sponsor profile not found");
  }

  const { data: invitations, error } = await supabase
    .from("invitations")
    .select(`
        *,
        recoverer:recoverer_id (*)
    `)
    .eq("sponsor_id", sponsor.id)
    .eq("status", "pending");

  if (error) {
    throw error;
  }

  return invitations;
}

export type Invitations = Awaited<ReturnType<typeof getPendingInvitations>>;
