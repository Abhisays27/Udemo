
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const { user, session } = await supabase.auth.signInWithOAuth("google", {
      authorizationCode: code,
    });

    // Save the session and user details, for example, using cookies or local storage.
    // Update the user state accordingly.

    // Redirect the user to the homepage or any other desired page after successful authentication.
    return NextResponse.redirect("/");
  }

  // URL to redirect to after sign-in process completes
  return NextResponse.redirect(requestUrl.origin);
}
