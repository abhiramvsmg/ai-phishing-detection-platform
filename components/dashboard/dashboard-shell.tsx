"use client";

import { useState } from "react";
import { AnalyticsCharts } from "@/components/dashboard/analytics-charts";
import { ScanHistoryTable } from "@/components/dashboard/scan-history-table";
import { SecurityCopilotPanel } from "@/components/dashboard/security-copilot-panel";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ThreatOverviewCards } from "@/components/dashboard/threat-overview-cards";
import { TopNavbar } from "@/components/dashboard/top-navbar";

interface DashboardShellProps {
  children?: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(true);

  return (
    <div className="relative flex min-h-screen bg-[#030712] font-sans text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
        <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-blue-600/[0.04] blur-[120px]" />
        <div className="absolute bottom-0 left-64 h-[400px] w-[400px] rounded-full bg-cyan-600/[0.03] blur-[120px]" />
      </div>

      <Sidebar
        collapsed={sidebarCollapsed}
        mobileOpen={mobileSidebarOpen}
        onToggleCollapse={() => setSidebarCollapsed((v) => !v)}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <TopNavbar
          onMenuClick={() => setMobileSidebarOpen(true)}
          onCopilotToggle={() => setCopilotOpen((v) => !v)}
          copilotOpen={copilotOpen}
        />

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <div className="space-y-6 p-4 sm:p-6">
              {children}
            </div>
          </main>

          <SecurityCopilotPanel
            open={copilotOpen}
            onClose={() => setCopilotOpen(false)}
          />
        </div>
      </div>
    </div>
  );
}

export function DashboardContent() {
  return (
    <>
      <ThreatOverviewCards />
      <AnalyticsCharts />
      <ScanHistoryTable />
    </>
  );
}
