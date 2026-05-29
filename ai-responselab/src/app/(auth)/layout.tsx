import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: "Sign-Up | Ai-ResponseReqLab",
  description: "Authentication Using Signups To Know About You",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (session) redirect("/");

  return (
    <div className={`antialiased p-4`}>
      <h2> Your Trusted Partner Welcome Back !</h2>
      {children}
    </div>
  );
}
