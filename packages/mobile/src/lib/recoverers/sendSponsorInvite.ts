import { supabase } from "../supabase";
import getRecovererProfile from "./getRecovererProfile";

export default async function sendSponsorInvite({
  sponsorEmail,
  recovererMessage,
  phoneNumber,
}: {
  sponsorEmail: string;
  recovererMessage: string;
  phoneNumber?: string;
}) {
  const recoverer = await getRecovererProfile();
  if (!recoverer) {
    throw new Error("Recoverer profile not found");
  }

  // 1. Find auth user by email, then get sponsor profile
  const { data: sponsorUser, error: sponsorUserError } = await supabase
    .from("sponsors")
    .select("id")
    .eq("email", sponsorEmail)
    .single();

  if (sponsorUserError || !sponsorUser) {
    throw new Error("User not found with that email");
  }

  // 4. Create invitation entry
  const { data: invitation, error: invitationError } = await supabase
    .from("invitations")
    .insert({
      recoverer_message: recovererMessage,
      recoverer_id: recoverer.id,
      sponsor_id: sponsorUser.id,
    })
    .select()
    .single();

  if (invitationError) {
    throw invitationError;
  }

  return invitation;
}

export type SendSponsorInviteResponse = Awaited<
  ReturnType<typeof sendSponsorInvite>
>;
