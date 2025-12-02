import { supabase } from "../supabase";

export default async function acceptRecovererInvite(invitationId: string) {
  const { data: invitation, error: invitationError } = await supabase
    .from("invitations")
    .update({ status: "accepted" })
    .eq("id", invitationId)
    .select("recoverer_id, sponsor_id")
    .single();

  if (invitationError) throw invitationError;

  const { recoverer_id, sponsor_id } = invitation;

  // Update sponsor entry to add recoverer_id
  const { error: sponsorError } = await supabase
    .from("sponsors")
    .update({ recoverer_id })
    .eq("id", sponsor_id);

  if (sponsorError) throw sponsorError;

  // Update recoverer entry to add sponsor_id
  const { error: recovererError } = await supabase
    .from("recoverers")
    .update({ sponsor_id })
    .eq("id", recoverer_id);

  if (recovererError) throw recovererError;

  return { success: true };
}
