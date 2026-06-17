"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  MessageSquare,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { copilotSuggestions } from "@/lib/dashboard-data";

interface Message {
  role: "user" | "assistant";
  text: string;
}

const initialMessages: Message[] = [
  {
    role: "assistant",
    text: "Security Copilot online. I can analyze threats, triage incidents, and execute response actions. What would you like to investigate?",
  },
];

interface SecurityCopilotPanelProps {
  open: boolean;
  onClose: () => void;
}

export function SecurityCopilotPanel({
  open,
  onClose,
}: SecurityCopilotPanelProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");

  function handleSend(text: string) {
    if (!text.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: text.trim() },
      {
        role: "assistant",
        text: getCopilotResponse(text.trim()),
      },
    ]);
    setInput("");
  }

  return (
    <>
      {/* Mobile overlay backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm xl:hidden"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {open && (
          <motion.aside
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col border-l border-white/[0.06] bg-[#030712]/95 backdrop-blur-xl sm:w-96 xl:static xl:z-0 xl:w-80 xl:shrink-0 xl:bg-transparent"
          >
            <GlassCard className="flex h-full flex-col overflow-hidden rounded-none border-0 border-l xl:rounded-xl xl:border">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 shadow-[0_0_16px_rgba(6,182,212,0.15)]">
                    <Bot className="h-4 w-4 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Security Copilot
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      </span>
                      Ready
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-1.5 text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-white xl:hidden"
                  aria-label="Close copilot"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Suggestions */}
              <div className="border-b border-white/[0.06] px-4 py-3">
                <p className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
                  <Sparkles className="h-3 w-3 text-cyan-500" />
                  Quick Actions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {copilotSuggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[11px] text-zinc-400 transition-all hover:border-cyan-500/20 hover:text-cyan-300"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-cyan-500/10">
                        <MessageSquare className="h-3 w-3 text-cyan-400" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2.5 text-xs leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-br-sm bg-gradient-to-r from-cyan-600/25 to-blue-600/25 text-zinc-200"
                          : "rounded-bl-sm border border-white/[0.06] bg-white/[0.04] text-zinc-300"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-white/[0.06] p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 focus-within:border-cyan-500/30"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about threats, scans..."
                    className="flex-1 bg-transparent text-xs text-zinc-200 outline-none placeholder:text-zinc-600"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white transition-opacity disabled:opacity-40"
                  >
                    <Send className="h-3 w-3" />
                  </button>
                </form>
              </div>
            </GlassCard>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function getCopilotResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("critical") || lower.includes("summarize")) {
    return "Today: 23 active threats detected. 4 critical — 2 credential harvest URLs, 1 BEC email (SCN-2024-8846), 1 malware attachment. All critical items auto-blocked. Recommended: review SCN-2024-8846 with finance team.";
  }
  if (lower.includes("bec") || lower.includes("trend")) {
    return "BEC attacks up 34% this week. Primary vector: newly registered lookalike domains impersonating executives. Top targeted department: Finance (62%). Suggest enabling enhanced sender verification for C-suite domains.";
  }
  if (lower.includes("incident") || lower.includes("8847")) {
    return "Incident report generated for SCN-2024-8847.\n\nTarget: paypa1-secure.com\nRisk: 98/100 (Critical)\nType: Credential harvesting\nAction: Domain blocked globally\nAffected users: 0 (pre-delivery block)\n\nReport ready for export as PDF or SIEM push.";
  }
  if (lower.includes("block")) {
    return "Executed: 3 malicious domains from today's flagged scans added to global blocklist. DNS filter rules updated across all endpoints. Estimated propagation: 45 seconds.";
  }

  return "Analyzing your request against 2.8M threat indicators... Based on current telemetry, your organization's risk posture is elevated due to increased BEC activity. Would you like me to run a full domain audit or generate a weekly threat summary?";
}
