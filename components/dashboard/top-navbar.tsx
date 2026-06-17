"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Bot,
  ChevronDown,
  Menu,
  Search,
  User,
} from "lucide-react";

interface TopNavbarProps {
  onMenuClick: () => void;
  onCopilotToggle: () => void;
  copilotOpen: boolean;
}

export function TopNavbar({
  onMenuClick,
  onCopilotToggle,
  copilotOpen,
}: TopNavbarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#030712]/70 backdrop-blur-xl"
    >
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="rounded-lg border border-white/[0.06] bg-white/[0.03] p-2 text-zinc-400 transition-colors hover:text-white lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div>
            <h1 className="text-base font-semibold text-white sm:text-lg">
              Security Dashboard
            </h1>
            <p className="hidden text-xs text-zinc-500 sm:block">
              Acme Corp · Production Environment
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          {/* Search */}
          <div className="relative hidden max-w-xs flex-1 md:block">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-zinc-500" />
            <input
              type="search"
              placeholder="Search scans, threats, domains..."
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] py-2 pr-4 pl-10 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/20"
            />
          </div>

          {/* Time range */}
          <button className="hidden items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:border-white/15 sm:flex">
            Last 24 hours
            <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
          </button>

          {/* Copilot toggle */}
          <button
            onClick={onCopilotToggle}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
              copilotOpen
                ? "border-cyan-500/30 bg-cyan-500/10 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                : "border-white/[0.08] bg-white/[0.03] text-zinc-300 hover:border-cyan-500/20"
            }`}
          >
            <Bot className="h-4 w-4" />
            <span className="hidden sm:inline">Copilot</span>
          </button>

          {/* Notifications */}
          <button className="relative rounded-lg border border-white/[0.08] bg-white/[0.03] p-2 text-zinc-400 transition-colors hover:text-white">
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
          </button>

          {/* User */}
          <button className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.03] py-1.5 pr-3 pl-1.5 transition-colors hover:border-white/15">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-cyan-500/30 to-blue-600/30">
              <User className="h-3.5 w-3.5 text-cyan-300" />
            </div>
            <span className="hidden text-xs font-medium text-zinc-300 sm:inline">
              Admin
            </span>
            <ChevronDown className="hidden h-3.5 w-3.5 text-zinc-500 sm:block" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
