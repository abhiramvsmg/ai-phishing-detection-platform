"use client";

import { useState } from "react";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { AuthGate } from "./AuthGate";
import { SecurityCopilotPanel } from "@/components/dashboard/SecurityCopilot";

export const Shell = ({ children }: { children: React.ReactNode }) => {
  const [copilotOpen, setCopilotOpen] = useState(false);

  return (
    <AuthGate>
      <div className="flex min-h-screen bg-gradient-dark text-slate-900">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <main className="flex-1 overflow-y-auto p-6 md:p-8">
            {children}
          </main>
        </div>

        <motion.button
          onClick={() => setCopilotOpen(true)}
          className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary text-white shadow-glow-lg hover:shadow-glow-lg transition-shadow"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open Security Copilot"
        >
          <Bot className="h-6 w-6" />
        </motion.button>

        <SecurityCopilotPanel open={copilotOpen} onClose={() => setCopilotOpen(false)} />
      </div>
    </AuthGate>
  );
};

export default Shell;