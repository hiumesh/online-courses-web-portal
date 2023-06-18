import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import SignUpUI from "./ui";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.auth.getSession();

  if (data.session) redirect("/");
  return <SignUpUI />;
}
