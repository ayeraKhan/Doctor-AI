"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function SessionProviderClient({
  children,
  session, // ✅ Add session prop
}: {
  children: ReactNode;
  session?: any; // ✅ Ensure session can be passed
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
