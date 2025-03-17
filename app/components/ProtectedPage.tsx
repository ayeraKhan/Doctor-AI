// components/ProtectedPage.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && !session.user.hasConsented) {
      router.push("/consent"); // Redirect to consent form if not consented
    }
  }, [session, status, router]);

  if (status === "loading") return <div>Loading...</div>;

  return <>{children}</>;
}
