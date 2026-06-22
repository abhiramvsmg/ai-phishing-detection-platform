"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, ShieldCheck, Mail, 
  BarChart3, FileText, Users, Settings, 
  Zap, Brain, TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

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

  return (
    <aside className="w-64 bg-surface border-r border-white/10 flex flex-col h-screen sticky top-0">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <motion.div 
          className="bg-gradient-to-br from-primary to-secondary p-2 rounded-lg"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <ShieldCheck className="w-6 h-6 text-white" />
        </motion.div>
        <span className="font-bold text-xl gradient-text">Sentinel</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
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
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-smooth group relative",
                  isActive 
                    ? "text-primary bg-primary/10 border border-primary/20" 
                    : "text-muted hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-transform group-hover:scale-110",
                  isActive ? "text-primary" : "text-muted group-hover:text-primary"
                )} />
                <span className="text-sm font-medium">{item.name}</span>
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
      <div className="p-4 border-t border-white/10 space-y-4">
        <motion.div 
          className="glass-sm p-4 text-center space-y-2"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold">Pro Plan</span>
          </div>
          <p className="text-[10px] text-muted leading-relaxed">
            Advanced threat detection and team collaboration
          </p>
        </motion.div>
      </div>
    </aside>
  );
};