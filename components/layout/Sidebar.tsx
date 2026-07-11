"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, ShieldCheck, Mail, 
  BarChart3, FileText, Users, Settings, 
  Zap, Brain, TrendingUp, ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";
import { getSession, subscribeToAuth } from "@/lib/auth-client";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Scanner", href: "/dashboard/scanner", icon: ShieldCheck },
  { name: "Email Analysis", href: "/dashboard/email-analysis", icon: Mail },
  { name: "Threat Intel", href: "/dashboard/threat-intel", icon: Brain },
  { name: "Analytics", href: "/dashboard/analytics", icon: TrendingUp },
  { name: "Reports", href: "/dashboard/reports", icon: FileText },
  { name: "Team", href: "/dashboard/team", icon: Users },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const session = useSyncExternalStore(subscribeToAuth, getSession, () => null);

  const isAdmin = session?.role === "ADMIN";

  const items = [
    ...navItems.slice(0, 7),
    ...(isAdmin ? [{ name: "Admin Panel", href: "/dashboard/admin", icon: ShieldAlert }] : []),
    ...navItems.slice(7),
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/60 flex flex-col h-screen sticky top-0">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-200/60">
        <motion.div 
          className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <ShieldCheck className="w-6 h-6 text-white" />
        </motion.div>
        <span className="font-black text-xl gradient-text tracking-tight uppercase">Sentinel</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-smooth group relative border border-transparent text-sm font-semibold select-none",
                  isActive 
                    ? "text-violet-600 bg-violet-50/60 border-violet-100/50 shadow-sm shadow-violet-50" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50/80"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-transform group-hover:scale-110",
                  isActive ? "text-violet-600" : "text-slate-400 group-hover:text-violet-500"
                )} />
                <span>{item.name}</span>
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute right-2 w-1.5 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-slate-200/60 space-y-4">
        <motion.div 
          className="bg-slate-50 border border-slate-200/60 p-4 text-center space-y-2 rounded-2xl"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-violet-500" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Pro Plan</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
            Advanced threat detection and team collaboration
          </p>
        </motion.div>
      </div>
    </aside>
  );
};