
import React from "react";
import { Resend } from "resend";
import { renderAsync } from "@react-email/components";
import { MagicLinkEmail } from "./_templates/magic-link.tsx";

const resend = new Resend(Deno.env.get("RESEND_API_KEY") as string);

Deno.serve(async (req) => {
  const { email, token } = await req.json();

  const html = await renderAsync(
    React.createElement(MagicLinkEmail, { token })
  );

  await resend.emails.send({
    from: "SafeStep <noreply@safestep.com>",
    to: email,
    subject: "You're Invited!",
    html
  });

  return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
});
