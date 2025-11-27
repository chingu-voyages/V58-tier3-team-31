

import { Resend } from "resend";
import {create, getNumericDate } from "https://deno.land/x/djwt@v2.11/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY") as string);

Deno.serve(async (req) => {

  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed"}), { status: 405});

  try {

    const { email, phone, message } = await req.json();

    if (!email) return new Response(JSON.stringify({ error: "Missing email"}), { status: 400});

    const jwtSecret = Deno.env.get("SUPABASE_JWT_SECRET");
    const token = await create(
      {alg: "HS256", typ: "JWT"},
      { email, exp: getNumericDate(60 * 60)},
      jwtSecret
    );

    const registrationUrl = "http://localhost:8081/signup"

    const html = `<p>${message}</p> <p> <a href="${registrationUrl}">Click here to register</a></p>`

  await resend.emails.send({
    from: "SafeStep <noreply@safestep.com>",
    to: email,
    subject: "You've been invited to be a sponsor!",
    html
  });

  return new Response(JSON.stringify({ status: "ok" }), { status: 200 });

  } catch (err) {
    console.error("There was an error sending your email:", err);
    return new Response(JSON.stringify({error: "Failed to send email"}), { status: 500})
  }

  
});
