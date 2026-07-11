"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { getSession, subscribeToAuth, AuthSession } from "@/lib/auth-client";

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  // undefined = "haven't checked yet", null = "checked, no session", object = "logged in"
  const [session, setSession] = useState<AuthSession | null | undefined>(undefined);

  useEffect(() => {
    setSession(getSession());
    const unsubscribe = subscribeToAuth(() => setSession(getSession()));
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (session === undefined) return; // still checking - don't redirect yet
    if (!session) {
      router.replace("/login");
    }
  }, [router, session]);

  if (session === undefined || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-dark text-slate-900">
        <div className="flex items-center gap-3 text-muted">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-sm">Checking session...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};