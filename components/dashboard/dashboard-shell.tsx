"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "@/components/dashboard/sidebar";
import { TopNavbar } from "@/components/dashboard/top-navbar";
import { SecurityCopilotPanel } from "@/components/dashboard/security-copilot-panel";
import { ThreatOverviewCards } from "@/components/dashboard/threat-overview-cards";
import { AnalyticsCharts } from "@/components/dashboard/analytics-charts";
import { ScanHistoryTable } from "@/components/dashboard/scan-history-table";

interface DashboardShellProps {
  children?: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  // Shared layout state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(true);

  return (
    <div className="relative flex min-h-screen bg-[#020617] font-sans text-slate-200 overflow-hidden">
      
      {/* 1. ADVANCED AMBIENT BACKGROUND */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* Subtle Grid - Cyber Aesthetic */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_90%)]" />
        
        {/* Cyber Glows */}
        <div className="absolute -top-[10%] -right-[10%] h-[600px] w-[600px] rounded-full bg-cyan-500/[0.05] blur-[120px] animate-pulse" />
        <div className="absolute bottom-[10%] left-[20%] h-[500px] w-[500px] rounded-full bg-blue-600/[0.04] blur-[100px]" />
        
        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%] z-50 pointer-events-none opacity-20" />
      </div>

      {/* 2. SIDEBAR - Manages its own internal state or synced via props */}
      <Sidebar 
        // Note: If your Sidebar.tsx handles its own state, these props ensure 
        // the parent Shell stays in sync for layout calculations.
      />

      {/* 3. MAIN CONTENT WRAPPER */}
      {/* 
          IMPORTANT: The transition and padding-left (pl) are key here. 
          It offsets the content so the Fixed Sidebar doesn't cover it.
      */}
      <div 
        className={`
          relative z-10 flex flex-1 flex-col transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? "lg:pl-20" : "lg:pl-[280px]"}
        `}
      >
        <TopNavbar
          onMenuClick={() => setMobileSidebarOpen(true)}
          onCopilotToggle={() => setCopilotOpen((v) => !v)}
          copilotOpen={copilotOpen}
        />

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8 p-6 lg:p-10 pb-20"
            >
              {children}
            </motion.div>
          </main>

          {/* 4. SECURITY COPILOT (RIGHT SIDEBAR) */}
          <AnimatePresence>
            {copilotOpen && (
              <motion.div
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="hidden xl:block"
              >
                <SecurityCopilotPanel
                  open={copilotOpen}
                  onClose={() => setCopilotOpen(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CUSTOM GLOBAL CSS FOR SCROLLBARS */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(30, 41, 59, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.3);
        }
      `}</style>
    </div>
  );
}

/**
 * DASHBOARD CONTENT COMPONENT
 * Renders the default grid widgets
 */
export function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <ThreatOverviewCards />

      {/* Main Visuals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="min-h-[400px]">
          <AnalyticsCharts />
        </div>
        <div className="min-h-[400px]">
          <ScanHistoryTable />
        </div>
      </div>
    </div>
  );
}