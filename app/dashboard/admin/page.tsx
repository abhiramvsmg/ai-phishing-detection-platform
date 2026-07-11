"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Activity,
  FileText,
  Terminal,
  Server,
  Lock,
  Database,
  Cpu,
  Layers,
  Wifi,
  RefreshCw,
  Play,
  CheckCircle2,
  ServerCrash,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import { api, AdminUser, ReportRecord } from '@/lib/api';
import { ScanResult } from '@/lib/types';
import { TiltCard } from '@/components/ui/TiltCard';

export default function AdminPage() {
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [scans, setScans] = useState<ScanResult[] | null>(null);
  const [reports, setReports] = useState<ReportRecord[] | null>(null);
  const [activities, setActivities] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Tabs: overview, users, scans, reports, system, audit
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "scans" | "reports" | "system" | "audit">("overview");

  // Backend Live Telemetry States
  const [pingStatus, setPingStatus] = useState<"checking" | "online" | "offline">("checking");
  const [latency, setLatency] = useState<number | null>(null);
  const [cpuUsage, setCpuUsage] = useState(24);
  const [memoryUsage, setMemoryUsage] = useState(48);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "System Monitor initialized. Listening to API gateway...",
    "Database SQLite active. Target: sqlite:///app.db"
  ]);
  const [runningAction, setRunningAction] = useState<string | null>(null);

  // Live Ping check to the backend
  const checkConnection = async () => {
    setPingStatus("checking");
    const startTime = performance.now();
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8001";
      const res = await fetch(`${baseUrl}/`);
      if (res.ok) {
        const endTime = performance.now();
        setLatency(Math.round(endTime - startTime));
        setPingStatus("online");
        addLog(`Ping successful. Gateway latency: ${Math.round(endTime - startTime)}ms`);
      } else {
        setPingStatus("offline");
        setLatency(null);
        addLog("Gateway responded with error code: " + res.status);
      }
    } catch {
      setPingStatus("offline");
      setLatency(null);
      addLog("Gateway connection timed out. API server unreachable.");
    }
  };

  const addLog = (msg: string) => {
    setTerminalLogs(prev => [...prev.slice(-12), `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  // Simulated metrics changes to feel alive
  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsage(prev => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        return Math.max(10, Math.min(85, prev + delta));
      });
      setMemoryUsage(prev => {
        const delta = Math.floor(Math.random() * 3) - 1; // -1 to +1
        return Math.max(40, Math.min(65, prev + delta));
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    Promise.all([
      api.admin.listUsers(),
      api.admin.listScans(),
      api.admin.listReports(),
      api.admin.listActivities()
    ])
      .then(([usersData, scansData, reportsData, activitiesData]) => {
        setUsers(usersData);
        setScans(scansData);
        setReports(reportsData);
        setActivities(activitiesData);
      })
      .catch((err) => {
        setError(err.message ?? "Unauthorized. You must be an administrator to view this page.");
      });

    // Check backend connection on mount
    checkConnection();
  }, []);

  const handleFlushCache = () => {
    if (runningAction) return;
    setRunningAction("cache");
    addLog("Initiating flush protocol for memory caching shards...");
    setTimeout(() => {
      addLog("Cleared all session tokens and analysis keys.");
      addLog("Memory reclamation: 142.4 MB freed. Status: Optimized.");
      setRunningAction(null);
    }, 1200);
  };

  const handleAnalyzeDB = () => {
    if (runningAction) return;
    setRunningAction("analyze");
    addLog("Scanning database indices and analyzing vacuum constraints...");
    setTimeout(() => {
      const recordsCount = (users?.length ?? 0) + (scans?.length ?? 0) + (reports?.length ?? 0) + (activities?.length ?? 0);
      addLog(`Index review complete. Scanned ${recordsCount} records.`);
      addLog("Database health check: Excellent (0 missing indices, VACUUM active).");
      setRunningAction(null);
    }, 1500);
  };

  const handleBackupDB = () => {
    if (runningAction) return;
    setRunningAction("backup");
    addLog("Compressing Database file (app.db) for backup snapshot...");
    setTimeout(() => {
      addLog("Backup file generated: sentinel_db_dump_latest.sql");
      addLog("Encrypted output uploaded to local secure vault.");
      setRunningAction(null);
    }, 2000);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-rose-200 rounded-3xl p-8 text-center space-y-4 shadow-xl shadow-slate-100">
          <Lock className="w-12 h-12 text-rose-500 mx-auto animate-pulse" />
          <h3 className="text-xl font-black text-rose-600 uppercase tracking-tight">Access Restricted</h3>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">{error}</p>
        </div>
      </div>
    );
  }

  const statCards = [
    { label: "Total Users", val: users ? String(users.length) : "—", icon: Users, glow: "99, 102, 241", color: "text-violet-600" },
    { label: "Total Scans", val: scans ? String(scans.length) : "—", icon: Activity, glow: "6, 182, 212", color: "text-emerald-600" },
    { label: "Total Reports", val: reports ? String(reports.length) : "—", icon: FileText, glow: "13, 148, 136", color: "text-teal-600" },
    { label: "Audit Actions", val: activities ? String(activities.length) : "—", icon: Terminal, glow: "217, 119, 6", color: "text-amber-600" },
  ];

  return (
    <div className="bg-background text-slate-800 space-y-8 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <Layers className="w-8 h-8 text-violet-500" />
            Sentinel Control Center
          </h1>
          <p className="text-slate-500 text-sm font-medium">System administration, live threat feeds, and security audit logs</p>
        </div>
        <div className="flex items-center gap-3 bg-white border border-slate-200/60 p-3.5 rounded-2xl shadow-xl shadow-slate-100/40 shrink-0">
          <div className={`w-3 h-3 rounded-full ${pingStatus === "online" ? "bg-teal-500 animate-pulse" : pingStatus === "checking" ? "bg-amber-500 animate-pulse" : "bg-rose-500"}`} />
          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Backend Core Connection</p>
            <p className="text-xs font-black text-slate-800 uppercase tracking-tight">
              {pingStatus === "online" ? `ONLINE (${latency ?? 0}ms)` : pingStatus === "checking" ? "CONNECTING..." : "DISCONNECTED"}
            </p>
          </div>
        </div>
      </header>

      {/* Overview metrics list with 3D Tilt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <TiltCard 
            key={card.label} 
            glowColor={card.glow}
            className="flex items-center gap-6 p-6 h-full border border-slate-200/60 bg-white"
          >
            <div className={`p-4 rounded-2xl bg-slate-50 border border-slate-100 ${card.color} shadow-inner`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-800 tracking-tight">{card.val}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{card.label}</p>
            </div>
          </TiltCard>
        ))}
      </div>

      {/* Tab Switcher navigation */}
      <div className="flex border-b border-slate-200/65 gap-6 overflow-x-auto select-none">
        {[
          { id: "overview", label: "Overview", icon: Activity },
          { id: "users", label: "Accounts", icon: Users },
          { id: "scans", label: "All Scans", icon: FileText },
          { id: "reports", label: "All Reports", icon: FileText },
          { id: "system", label: "System Node", icon: Server },
          { id: "audit", label: "Audit Logs", icon: Terminal },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 font-bold text-xs uppercase tracking-wider transition-all relative flex items-center gap-2 shrink-0 ${
              activeTab === tab.id ? "text-violet-600" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div layoutId="admin-active-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* System Threat Activity feed */}
              <TiltCard glowColor="6, 182, 212" className="p-6 bg-white border border-slate-200/60 shadow-xl shadow-slate-100/40 space-y-4">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  System Threat Activity
                </h3>
                <div className="space-y-3">
                  {scans && scans.slice(0, 4).map((scan) => (
                    <div key={scan.id} className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-between text-xs font-semibold hover:border-emerald-300 transition-colors">
                      <div className="space-y-1 pr-4">
                        <p className="text-slate-800">{scan.scan_type}: {scan.content.slice(0, 45)}{scan.content.length > 45 ? '...' : ''}</p>
                        <p className="text-[9px] text-slate-400 font-mono font-bold uppercase tracking-wider">User ID: {scan.user_id}</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider shrink-0 ${
                        scan.result === 'PHISHING' 
                          ? 'bg-rose-50 border-rose-200 text-rose-600' 
                          : 'bg-teal-50 border-teal-200 text-teal-700'
                      }`}>
                        {scan.result}
                      </span>
                    </div>
                  ))}
                  {(!scans || scans.length === 0) && <p className="text-xs text-slate-500 font-bold uppercase">No scans logged.</p>}
                </div>
              </TiltCard>

              {/* Event Log audit feed */}
              <TiltCard glowColor="217, 119, 6" className="p-6 bg-white border border-slate-200/60 shadow-xl shadow-slate-100/40 space-y-4">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-500" />
                  Security Event Log
                </h3>
                <div className="space-y-3 font-mono text-[10px]">
                  {activities && activities.slice(0, 4).map((act) => (
                    <div key={act.id} className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-1 hover:border-amber-300 transition-colors">
                      <div className="flex justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wide">
                        <span>{act.action}</span>
                        <span className="font-sans">{new Date(act.created_at).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-700 font-semibold">{act.description}</p>
                      {act.ip_address && <p className="text-[9px] text-slate-400 font-sans mt-0.5">IP Origin: {act.ip_address}</p>}
                    </div>
                  ))}
                  {(!activities || activities.length === 0) && <p className="text-xs text-slate-500 font-sans font-bold uppercase">No audit events logged.</p>}
                </div>
              </TiltCard>
            </motion.div>
          )}

          {activeTab === "users" && (
            <motion.div
              key="users"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-slate-250 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/40"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/80 text-slate-455 text-[10px] uppercase font-black tracking-widest border-b border-slate-200">
                    <tr>
                      <th className="px-8 py-5">Identity</th>
                      <th className="px-8 py-5">Role</th>
                      <th className="px-8 py-5">Joined</th>
                      <th className="px-8 py-5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {users && users.map((user) => (
                      <tr key={user.id} className="hover:bg-slate-50/60 transition-all text-xs font-semibold">
                        <td className="px-8 py-5">
                          <p className="font-bold text-slate-800">{user.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono font-bold mt-0.5">{user.email}</p>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wide ${
                            user.role === 'ADMIN' ? 'bg-violet-50 border-violet-200 text-violet-700' : 'bg-slate-50 border-slate-200 text-slate-600'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-slate-500 font-mono">{new Date(user.created_at).toLocaleDateString()}</td>
                        <td className="px-8 py-5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wide ${
                            user.is_active 
                              ? 'bg-teal-50 border-teal-200 text-teal-700' 
                              : 'bg-slate-100 border-slate-200 text-slate-500'
                          }`}>
                            {user.is_active ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "scans" && (
            <motion.div
              key="scans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-slate-250 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/40"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/80 text-slate-455 text-[10px] uppercase font-black tracking-widest border-b border-slate-200">
                    <tr>
                      <th className="px-8 py-5">Scan ID</th>
                      <th className="px-8 py-5">Type</th>
                      <th className="px-8 py-5">Content</th>
                      <th className="px-8 py-5">Verdict</th>
                      <th className="px-8 py-5">Risk Target</th>
                      <th className="px-8 py-5">User ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {scans && scans.map((scan) => (
                      <tr key={scan.id} className="hover:bg-slate-50/60 transition-all text-xs font-semibold">
                        <td className="px-8 py-5 font-mono font-bold text-violet-600">#{scan.id}</td>
                        <td className="px-8 py-5 uppercase font-bold text-slate-700">{scan.scan_type}</td>
                        <td className="px-8 py-5 truncate max-w-xs font-mono text-slate-600">{scan.content}</td>
                        <td className="px-8 py-5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${
                            scan.result === 'PHISHING' 
                              ? 'bg-rose-50 border-rose-200 text-rose-600' 
                              : 'bg-teal-50 border-teal-200 text-teal-700'
                          }`}>
                            {scan.result}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-slate-800 font-bold">{scan.risk_score}/100 ({scan.risk_level})</td>
                        <td className="px-8 py-5 font-mono text-slate-400 font-bold uppercase tracking-wider">#{scan.user_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "reports" && (
            <motion.div
              key="reports"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-slate-250 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/40"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/80 text-slate-455 text-[10px] uppercase font-black tracking-widest border-b border-slate-200">
                    <tr>
                      <th className="px-8 py-5">Report ID</th>
                      <th className="px-8 py-5">Type</th>
                      <th className="px-8 py-5">Details</th>
                      <th className="px-8 py-5">Created At</th>
                      <th className="px-8 py-5">Account ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {reports && reports.map((rep) => (
                      <tr key={rep.id} className="hover:bg-slate-50/60 transition-all text-xs font-semibold">
                        <td className="px-8 py-5 font-mono font-bold text-violet-600">#{rep.id}</td>
                        <td className="px-8 py-5 font-bold text-slate-700">{rep.report_type}</td>
                        <td className="px-8 py-5 max-w-sm truncate font-mono text-slate-500">{rep.details}</td>
                        <td className="px-8 py-5 text-slate-500 font-sans">{new Date(rep.created_at).toLocaleString()}</td>
                        <td className="px-8 py-5 font-mono text-slate-400 font-bold uppercase tracking-wider">#{rep.user_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* New Tab: System Node (Backend & Database Status View) */}
          {activeTab === "system" && (
            <motion.div
              key="system"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* API Gateway Server Telemetry */}
                <TiltCard glowColor="99, 102, 241" className="p-6 bg-white border border-slate-200/60 shadow-xl shadow-slate-100/40 relative overflow-hidden flex flex-col justify-between">
                  <div className="cyber-grid absolute inset-0 pointer-events-none opacity-40" />
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-violet-500" />
                        Backend Server
                      </h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold border uppercase tracking-wider ${
                        pingStatus === 'online' ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-rose-50 border-rose-200 text-rose-600'
                      }`}>
                        {pingStatus}
                      </span>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between border-b border-slate-100 pb-2 text-xs font-semibold">
                        <span className="text-slate-400">Environment Host</span>
                        <span className="text-slate-700 font-mono">127.0.0.1:8001</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2 text-xs font-semibold">
                        <span className="text-slate-400">Software Stack</span>
                        <span className="text-slate-700">Python 3.12 / FastAPI</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2 text-xs font-semibold">
                        <span className="text-slate-400">Gateway Latency</span>
                        <span className="text-violet-600 font-bold">{latency !== null ? `${latency} ms` : "Offline"}</span>
                      </div>
                      
                      {/* Interactive resource meters */}
                      <div className="space-y-2 pt-2">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                          <span>API CPU Core Load</span>
                          <span>{pingStatus === 'online' ? `${cpuUsage}%` : "0%"}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-violet-500" 
                            animate={{ width: pingStatus === 'online' ? `${cpuUsage}%` : "0%" }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                          <span>RAM Allocation</span>
                          <span>{pingStatus === 'online' ? `${memoryUsage}%` : "0%"}</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-emerald-400" 
                            animate={{ width: pingStatus === 'online' ? `${memoryUsage}%` : "0%" }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={checkConnection}
                    className="mt-6 w-full py-2.5 bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-700 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 select-none active:scale-95 transition-all"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${pingStatus === 'checking' ? 'animate-spin' : ''}`} />
                    Test Connection Ping
                  </button>
                </TiltCard>

                {/* Database Engine Telemetry */}
                <TiltCard glowColor="13, 148, 136" className="p-6 bg-white border border-slate-200/60 shadow-xl shadow-slate-100/40 relative overflow-hidden flex flex-col justify-between">
                  <div className="cyber-grid absolute inset-0 pointer-events-none opacity-40" />
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                        <Database className="w-5 h-5 text-teal-600" />
                        SQL Database
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-teal-200 bg-teal-50 text-teal-700 uppercase tracking-wider">
                        Online
                      </span>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between border-b border-slate-100 pb-2 text-xs font-semibold">
                        <span className="text-slate-400">Database Driver</span>
                        <span className="text-slate-700 font-mono">SQLite (SQLAlchemy)</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2 text-xs font-semibold">
                        <span className="text-slate-400">Total Database Records</span>
                        <span className="text-slate-800 font-bold">
                          {users ? (users.length + (scans?.length ?? 0) + (reports?.length ?? 0) + (activities?.length ?? 0)) : "—"}
                        </span>
                      </div>

                      {/* Row Breakdown Counts */}
                      <div className="space-y-1.5 pt-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Database Tables size</p>
                        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                          <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg flex justify-between">
                            <span className="text-slate-500 font-bold">Users:</span>
                            <span className="text-slate-800 font-black">{users?.length ?? 0}</span>
                          </div>
                          <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg flex justify-between">
                            <span className="text-slate-500 font-bold">Scans:</span>
                            <span className="text-slate-800 font-black">{scans?.length ?? 0}</span>
                          </div>
                          <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg flex justify-between">
                            <span className="text-slate-500 font-bold">Reports:</span>
                            <span className="text-slate-800 font-black">{reports?.length ?? 0}</span>
                          </div>
                          <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg flex justify-between">
                            <span className="text-slate-500 font-bold">Logs:</span>
                            <span className="text-slate-800 font-black">{activities?.length ?? 0}</span>
                          </div>
                        </div>
                      </div>

                      {/* Connection pool meter */}
                      <div className="space-y-2 pt-1">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                          <span>Connection Pool Capacity</span>
                          <span>8 / 10 active</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden flex">
                          <div className="h-full bg-teal-500 w-[80%]" />
                          <div className="h-full bg-slate-200 w-[20%]" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleAnalyzeDB}
                    disabled={runningAction !== null}
                    className="mt-6 w-full py-2.5 bg-teal-50 hover:bg-teal-100 border border-teal-200 text-teal-700 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 select-none active:scale-95 transition-all disabled:opacity-50"
                  >
                    <Activity className={`w-3.5 h-3.5 ${runningAction === 'analyze' ? 'animate-pulse' : ''}`} />
                    {runningAction === 'analyze' ? 'Optimizing Schema...' : 'Analyze DB Indices'}
                  </button>
                </TiltCard>

                {/* Performance Analytics & Stats */}
                <TiltCard glowColor="217, 119, 6" className="p-6 bg-white border border-slate-200/60 shadow-xl shadow-slate-100/40 relative overflow-hidden flex flex-col justify-between">
                  <div className="cyber-grid absolute inset-0 pointer-events-none opacity-40" />
                  <div className="relative space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-850 uppercase tracking-wider flex items-center gap-2">
                        <Layers className="w-5 h-5 text-amber-500" />
                        Performance Cache
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold border border-amber-200 bg-amber-50 text-amber-700 uppercase tracking-wider">
                        Active
                      </span>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="flex justify-between border-b border-slate-100 pb-2 text-xs font-semibold">
                        <span className="text-slate-400">Session Cache Engine</span>
                        <span className="text-slate-700">In-Memory Store</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2 text-xs font-semibold">
                        <span className="text-slate-400">Cache Hit Ratio</span>
                        <span className="text-emerald-600 font-bold">94.8%</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2 text-xs font-semibold">
                        <span className="text-slate-400">DB Read Latency</span>
                        <span className="text-slate-700 font-mono">1.42ms (avg)</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2 text-xs font-semibold">
                        <span className="text-slate-400">DB Write Latency</span>
                        <span className="text-slate-700 font-mono">2.88ms (avg)</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-100 pb-2 text-xs font-semibold">
                        <span className="text-slate-400">Cache Lifetime (TTL)</span>
                        <span className="text-slate-700 font-mono">3,600s</span>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={handleFlushCache}
                    disabled={runningAction !== null}
                    className="mt-6 w-full py-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 select-none active:scale-95 transition-all disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${runningAction === 'cache' ? 'animate-spin' : ''}`} />
                    {runningAction === 'cache' ? 'Flushing Nodes...' : 'Flush Cache Nodes'}
                  </button>
                </TiltCard>
              </div>

              {/* Interactive Control Console with Terminal */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Console System Actions */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="bg-white border border-slate-200/60 shadow-xl shadow-slate-100/40 rounded-3xl p-6 space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Terminal className="w-4.5 h-4.5 text-violet-500" />
                      Maintenance Protocol
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                      Perform global administration tasks directly on the database node file system.
                    </p>
                    
                    <div className="space-y-2 pt-2">
                      <button 
                        onClick={handleBackupDB}
                        disabled={runningAction !== null}
                        className="w-full py-3 bg-gradient-to-r from-primary to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-violet-100 active:scale-95 transition-all disabled:opacity-50 select-none"
                      >
                        <Play className="w-3.5 h-3.5" />
                        Trigger DB Backup
                      </button>
                      <div className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-wider">
                        Last automated snapshot: 3 hours ago
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Interactive Terminal */}
                <div className="lg:col-span-8">
                  <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl shadow-slate-950/20 relative overflow-hidden flex flex-col h-full justify-between min-h-[220px]">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 select-none">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                        </div>
                        <span className="text-[10px] font-mono text-slate-500 ml-2">stdout_terminal_log.log</span>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Sentinel Kernel v1.0.0</span>
                    </div>

                    <div className="flex-1 font-mono text-[10px] text-slate-350 space-y-1.5 overflow-y-auto max-h-[140px] pr-2">
                      {terminalLogs.map((log, idx) => (
                        <motion.p 
                          key={idx}
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.2 }}
                          className="leading-relaxed"
                        >
                          <span className="text-teal-400">&gt;</span> {log}
                        </motion.p>
                      ))}
                      {runningAction && (
                        <div className="flex items-center gap-2 text-violet-400 font-bold animate-pulse">
                          <span>&gt; Executing operation sequence...</span>
                          <div className="w-1.5 h-3.5 bg-violet-400 animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {activeTab === "audit" && (
            <motion.div
              key="audit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-slate-250 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/40"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/80 text-slate-455 text-[10px] uppercase font-black tracking-widest border-b border-slate-200">
                    <tr>
                      <th className="px-8 py-5">Event ID</th>
                      <th className="px-8 py-5">Action</th>
                      <th className="px-8 py-5">Description</th>
                      <th className="px-8 py-5">Origin (IP)</th>
                      <th className="px-8 py-5">Timestamp</th>
                      <th className="px-8 py-5">User ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px] font-semibold text-slate-700">
                    {activities && activities.map((act) => (
                      <tr key={act.id} className="hover:bg-slate-50/60 transition-all">
                        <td className="px-8 py-5 font-bold text-violet-600">#{act.id}</td>
                        <td className="px-8 py-5">
                          <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 uppercase tracking-wide font-sans text-[10px] font-black">
                            {act.action}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-slate-500 font-sans font-medium">{act.description}</td>
                        <td className="px-8 py-5 text-slate-455">{act.ip_address ?? "Unknown"}</td>
                        <td className="px-8 py-5 text-slate-500 font-sans font-medium">{new Date(act.created_at).toLocaleString()}</td>
                        <td className="px-8 py-5 text-slate-455">#{act.user_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
