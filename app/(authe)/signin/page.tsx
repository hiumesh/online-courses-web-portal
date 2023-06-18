import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import SignInUI from "./ui";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getSession();

  if (data.session) redirect("/");
  return <SignInUI />;
}
