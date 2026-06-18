"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Search,
  ShieldAlert,
  Globe2,
  BarChart3,
  FileText,
  Users,
  Settings,
  LogIn,
  UserPlus,
  ChevronLeft,
  Menu,
  X,
  ShieldCheck,
  Activity,
  Zap,
  Cpu,
  Circle,
} from "lucide-react";

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string | number;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

const NAVIGATION_GROUPS: NavGroup[] = [
  {
    label: "Analysis",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { name: "URL Scanner", href: "/scanner", icon: Search },
      { name: "Email Analysis", href: "/email-analysis", icon: ShieldAlert, badge: 2 },
    ],
  },
  {
    label: "Intelligence",
    items: [
      { name: "Threat Intel", href: "/threat-intel", icon: Globe2, badge: "Live" },
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
      { name: "Reports", href: "/reports", icon: FileText },
    ],
  },
  {
    label: "Management",
    items: [
      { name: "Team", href: "/team", icon: Users },
      { name: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [threatCount, setThreatCount] = useState(14201);

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatCount((prev) => prev + Math.floor(Math.random() * 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-[70]">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-cyan-400 backdrop-blur-md shadow-xl"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar Panel */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 280,
          x: isMobileOpen ? 0 : (typeof window !== 'undefined' && window.innerWidth < 1024 ? -300 : 0)
        }}
        className={`
          fixed top-0 left-0 h-screen z-[60] 
          bg-slate-950/40 backdrop-blur-xl border-r border-slate-800/50 
          flex flex-col transition-all duration-300 ease-in-out
          ${isMobileOpen ? "translate-x-0 !w-[280px]" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="h-20 flex items-center px-7 border-b border-slate-800/30 shrink-0">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <ShieldCheck className="w-8 h-8 text-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.4)]" />
            {(!isCollapsed || isMobileOpen) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
                <span className="font-black text-xl tracking-tighter text-white uppercase leading-none">
                  PHISH<span className="text-cyan-500">AI</span>
                </span>
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-1">
                  SOC COMMAND
                </span>
              </motion.div>
            )}
          </Link>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-8 px-4 space-y-10 no-scrollbar">
          {NAVIGATION_GROUPS.map((group) => (
            <div key={group.label}>
              {(!isCollapsed || isMobileOpen) && (
                <h3 className="px-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-600 mb-4">
                  {group.label}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.href} href={item.href} className="block group">
                      <div className={`relative flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-300 ${
                        isActive ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_-5px_rgba(6,182,212,0.3)]" : "text-slate-400 hover:text-white hover:bg-slate-800/30"
                      }`}>
                        <item.icon className={`w-5 h-5 shrink-0 ${isActive ? "text-cyan-400" : "group-hover:text-cyan-400"}`} />
                        {(!isCollapsed || isMobileOpen) && (
                          <span className="text-sm font-bold tracking-tight">{item.name}</span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Widgets */}
        <div className="p-4 mt-auto space-y-4">
           {(!isCollapsed || isMobileOpen) && (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-3 h-3 text-amber-500" />
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Threats</span>
                  </div>
                  <div className="text-xl font-mono font-black text-slate-200 tracking-tighter">{threatCount.toLocaleString()}</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-md">
                   <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">System Health</span>
                      <Circle className="w-2 h-2 text-emerald-500 fill-emerald-500 animate-pulse" />
                   </div>
                   <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-500 w-[94%]" />
                   </div>
                </div>
             </motion.div>
           )}
          
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="hidden lg:flex w-full items-center justify-center py-3 text-slate-500 hover:text-white transition-colors">
            <ChevronLeft size={20} className={`transition-transform duration-500 ${isCollapsed ? "rotate-180" : ""}`} />
          </button>
        </div>
      </motion.aside>
    </>
  );
}