
console.log("RESEND_API_KEY:", Deno.env.get("RESEND_API_KEY"));



import { Resend } from "resend";
// import {create, getNumericDate } from "https://deno.land/x/djwt@v2.11/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY") as string);

Deno.serve(async (req) => {

  const corsHeaders = new Headers({

    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",

  });

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") return new Response(JSON.stringify({ error: "Method not allowed"}), { status: 405, headers: corsHeaders});

  try {

  

    const { email, phone, message } = await req.json();

    if (!email) return new Response(JSON.stringify({ error: "Missing email"}), { status: 400, headers: corsHeaders});

    const registrationUrl = "http://localhost:8081/signup"

    const html = `<p>${message}</p><p>${phone}</p><p> <a href="${registrationUrl}">Click here to register</a></p>`

      const response = await resend.emails.send({
        from: "SafeStep <onboarding@resend.dev>",
        to: email,
        subject: "You've been invited to be a sponsor!",
        html
      });

      console.log("resend send response:", response)

  return new Response(JSON.stringify({ status: "ok" }), { status: 200, headers: corsHeaders });

  } catch (err) {
    console.error("There was an error sending your email:", err);
    return new Response(JSON.stringify({error: err instanceof Error ? err.message : String(err)}), { status: 500, headers: corsHeaders})
  }

  
});
