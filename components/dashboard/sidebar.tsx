"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  ChevronLeft,
  FileText,
  LayoutDashboard,
  Radar,
  ScanSearch,
  Settings,
  Shield,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Threat Scans", href: "/dashboard", icon: ScanSearch },
  { label: "Threat Intel", href: "/dashboard", icon: Radar },
  { label: "Analytics", href: "/dashboard", icon: BarChart3 },
  { label: "Reports", href: "/dashboard", icon: FileText },
  { label: "Team", href: "/dashboard", icon: Users },
  { label: "Settings", href: "/dashboard", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
}

export function Sidebar({
  collapsed,
  mobileOpen,
  onToggleCollapse,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();

  const content = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-white/[0.06] px-4">
        <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.35)]">
            <Shield className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="whitespace-nowrap text-base font-semibold text-white"
            >
              PhishGuard<span className="text-cyan-400">AI</span>
            </motion.span>
          )}
        </Link>
        <button
          onClick={onCloseMobile}
          className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/[0.06] hover:text-white lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {!collapsed && (
          <p className="mb-2 px-3 text-[10px] font-semibold tracking-widest text-zinc-600 uppercase">
            Security Console
          </p>
        )}
        {navItems.map((item) => {
          const active = pathname === item.href && item.label === "Dashboard";
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onCloseMobile}
              title={collapsed ? item.label : undefined}
              className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "border border-cyan-500/20 bg-cyan-500/10 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.12)]"
                  : "border border-transparent text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-200"
              }`}
            >
              <Icon
                className={`h-[18px] w-[18px] shrink-0 ${
                  active ? "text-cyan-400" : "text-zinc-500 group-hover:text-zinc-300"
                }`}
              />
              {!collapsed && <span>{item.label}</span>}
              {active && !collapsed && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Status + collapse */}
      <div className="border-t border-white/[0.06] p-3">
        {!collapsed && (
          <div className="mb-3 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-emerald-400">
                All sensors online
              </span>
            </div>
            <p className="mt-1 text-[10px] text-zinc-500">
              Last sync: 12 seconds ago
            </p>
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="hidden w-full items-center justify-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] py-2 text-xs text-zinc-500 transition-colors hover:border-white/10 hover:text-zinc-300 lg:flex"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft
            className={`h-4 w-4 transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
          {!collapsed && "Collapse"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Mobile sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: mobileOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        className="fixed inset-y-0 left-0 z-50 w-64 border-r border-white/[0.06] bg-[#030712]/95 backdrop-blur-xl lg:hidden"
      >
        {content}
      </motion.aside>

      {/* Desktop sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 72 : 256 }}
        transition={{ type: "spring", damping: 28, stiffness: 320 }}
        className="hidden shrink-0 border-r border-white/[0.06] bg-[#030712]/80 backdrop-blur-xl lg:block"
      >
        <div className="sticky top-0 h-screen overflow-hidden">{content}</div>
      </motion.aside>
    </>
  );
}
