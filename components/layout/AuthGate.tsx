"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { getSession, subscribeToAuth } from "@/lib/auth-client";

const getServerSession = () => null;

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const session = useSyncExternalStore(subscribeToAuth, getSession, getServerSession);

  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [router, session]);

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-dark text-white">
        <div className="flex items-center gap-3 text-muted">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <span className="text-sm">Checking session...</span>
        </div>
      </div>
    );
  }

  return children;
};
