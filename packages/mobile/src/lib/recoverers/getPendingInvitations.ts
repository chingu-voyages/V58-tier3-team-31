import { supabase } from "../supabase";
import getRecovererProfile from "./getRecovererProfile";

export default async function getPendingInvitations() {
  const recoverer = await getRecovererProfile();

  if (!recoverer) {
    throw new Error("Recoverer profile not found");
  }

  const { data: invitations, error } = await supabase
    .from("invitations")
    .select(`
        *,
        sponsor:sponsor_id (*)
    `)
    .eq("recoverer_id", recoverer.id)
    .eq("status", "pending");

  if (error) {
    throw error;
  }

  return invitations;
}

export type Invitations = Awaited<ReturnType<typeof getPendingInvitations>>;
