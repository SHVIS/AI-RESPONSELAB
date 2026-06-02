import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Header from "@/modules/layout/compoents/header";
import { currentUser } from "@/modules/actions";

export const metadata: Metadata = {
  title: "Header | Ai-ResponseReqLab",
  description: "Authentication Using Signups To Know About You",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (session) redirect("/");
  const user = await currentUser();
  return (
     <>
      {/* @ts-ignore */}
      {/* <Header user={user!} workspace={workspace.workspace!} /> */}
      <Header user={user!} />
      <main className='max-h-[calc(100vh-4rem)] h-[calc(100vh-4rem)] flex flex-1 overflow-hidden'>
        <div className="flex h-full w-full">
          
          <div className="w-12 border-r border-zinc-800 bg-zinc-900">
            {/* <TabbedLeftPanel /> */}
          </div>
          <div className="flex-1 bg-zinc-950">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
