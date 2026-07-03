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
import { cn } from "@/lib/utils";

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

const copilotSuggestions = [
  "Summarize today's critical threats",
  "Show BEC attack trends this week",
  "Generate incident report",
  "Block flagged domains",
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
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-900/20 backdrop-blur-sm xl:hidden"
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
            className="fixed inset-y-0 right-0 z-50 flex w-full flex-col sm:w-96"
          >
            <div className="flex h-full flex-col overflow-hidden bg-white border-l border-violet-100 shadow-2xl shadow-violet-200/40">
              <div className="flex items-center justify-between border-b border-violet-100 bg-violet-50/50 px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      Security Copilot
                    </p>
                    <p className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
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
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-violet-100 hover:text-slate-700"
                  aria-label="Close copilot"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="border-b border-violet-100 px-4 py-3">
                <p className="mb-2 flex items-center gap-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  <Sparkles className="h-3 w-3 text-emerald-500" />
                  Quick Actions
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {copilotSuggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSend(s)}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-500 transition-all hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-4 bg-slate-50/30">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
                  >
                    {msg.role === "assistant" && (
                      <div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-100">
                        <MessageSquare className="h-3 w-3 text-emerald-600" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[85%] rounded-xl px-3 py-2.5 text-xs leading-relaxed font-medium",
                        msg.role === "user"
                          ? "rounded-br-sm bg-gradient-primary text-white shadow-md"
                          : "rounded-bl-sm border border-slate-200 bg-white text-slate-700 shadow-sm"
                      )}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-violet-100 p-3 bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend(input);
                  }}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 focus-within:border-violet-300 focus-within:bg-white transition-colors"
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about threats, scans..."
                    className="flex-1 bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400 font-medium"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim()}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-primary text-white transition-opacity disabled:opacity-40"
                  >
                    <Send className="h-3 w-3" />
                  </button>
                </form>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

function getCopilotResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("critical") || lower.includes("summarize")) {
    return "Based on your recent scans, I can help summarize critical threats. Check the Reports page for detailed breakdowns of flagged scans.";
  }
  if (lower.includes("bec") || lower.includes("trend")) {
    return "Trend analysis requires more historical scan data. Keep scanning URLs and emails to build up detection history for trend insights.";
  }
  if (lower.includes("incident") || lower.includes("report")) {
    return "You can generate a report for any scan from its detail view. Reports include the full risk assessment and are viewable on the Reports page.";
  }
  if (lower.includes("block")) {
    return "Domain blocking isn't automated yet in this version - flagged domains show up in your scan history for manual review.";
  }

  return "I can help you understand your scan results, navigate reports, or explain risk scores. What would you like to know?";
}