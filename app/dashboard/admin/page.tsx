"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Activity,
  FileText,
  Terminal,
  Server,
  Lock
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
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "scans" | "reports" | "audit">("overview");

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
  }, []);

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
    { label: "Total Users", val: users ? String(users.length) : "—", icon: Users, color: "text-indigo-600" },
    { label: "Total Scans", val: scans ? String(scans.length) : "—", icon: Activity, color: "text-cyan-600" },
    { label: "Total Reports", val: reports ? String(reports.length) : "—", icon: FileText, color: "text-teal-650" },
    { label: "Audit Actions", val: activities ? String(activities.length) : "—", icon: Terminal, color: "text-amber-600" },
  ];

  return (
    <div className="bg-background text-slate-800 space-y-8 min-h-screen">
      <header className="space-y-1">
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Sentinel Control Center</h1>
        <p className="text-slate-500 text-sm font-medium">System administration, live threat feeds, and security audit logs</p>
      </header>

      {/* Overview metrics list */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <div key={card.label} className="p-6 bg-white border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-100/40 flex items-center gap-6">
            <div className={`p-4 rounded-2xl bg-slate-50 border border-slate-100 ${card.color} shadow-inner`}>
              <card.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-800 tracking-tight">{card.val}</p>
              <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tab Switcher navigation */}
      <div className="flex border-b border-slate-200/60 gap-6">
        {[
          { id: "overview", label: "Overview", icon: Server },
          { id: "users", label: "Accounts", icon: Users },
          { id: "scans", label: "All Scans", icon: Activity },
          { id: "reports", label: "All Reports", icon: FileText },
          { id: "audit", label: "Audit Logs", icon: Terminal },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 font-bold text-xs uppercase tracking-wider transition-smooth relative flex items-center gap-2 select-none ${
              activeTab === tab.id ? "text-indigo-600" : "text-slate-400 hover:text-slate-655"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {activeTab === tab.id && (
              <motion.div layoutId="admin-active-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
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
              <div className="p-6 bg-white border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-100/40 space-y-4">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-600" />
                  System Threat Activity
                </h3>
                <div className="space-y-3">
                  {scans && scans.slice(0, 4).map((scan) => (
                    <div key={scan.id} className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-between text-xs font-semibold">
                      <div className="space-y-1 pr-4">
                        <p className="text-slate-800">{scan.scan_type}: {scan.content.slice(0, 45)}{scan.content.length > 45 ? '...' : ''}</p>
                        <p className="text-[9px] text-slate-450 font-mono font-bold uppercase tracking-wider">User ID: {scan.user_id}</p>
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
              </div>

              {/* Event Log audit feed */}
              <div className="p-6 bg-white border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-100/40 space-y-4">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-500" />
                  Security Event Log
                </h3>
                <div className="space-y-3 font-mono text-[10px]">
                  {activities && activities.slice(0, 4).map((act) => (
                    <div key={act.id} className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-1">
                      <div className="flex justify-between text-[9px] text-slate-450 font-bold uppercase tracking-wide">
                        <span>{act.action}</span>
                        <span className="font-sans">{new Date(act.created_at).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-700 font-semibold">{act.description}</p>
                      {act.ip_address && <p className="text-[9px] text-slate-400 font-sans mt-0.5">IP Origin: {act.ip_address}</p>}
                    </div>
                  ))}
                  {(!activities || activities.length === 0) && <p className="text-xs text-slate-500 font-sans font-bold uppercase">No audit events logged.</p>}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "users" && (
            <motion.div
              key="users"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/40"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-150">
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
                          <p className="text-[10px] text-slate-450 font-mono font-bold mt-0.5">{user.email}</p>
                        </td>
                        <td className="px-8 py-5 text-slate-600 font-bold">{user.role}</td>
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
              className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/40"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-150">
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
                        <td className="px-8 py-5 font-mono font-bold text-indigo-650">#{scan.id}</td>
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
                        <td className="px-8 py-5 font-mono text-slate-450 font-bold uppercase tracking-wider">#{scan.user_id}</td>
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
              className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/40"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-150">
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
                        <td className="px-8 py-5 font-mono font-bold text-indigo-650">#{rep.id}</td>
                        <td className="px-8 py-5 font-bold text-slate-700">{rep.report_type}</td>
                        <td className="px-8 py-5 max-w-sm truncate font-mono text-slate-500">{rep.details}</td>
                        <td className="px-8 py-5 text-slate-500 font-sans">{new Date(rep.created_at).toLocaleString()}</td>
                        <td className="px-8 py-5 font-mono text-slate-450 font-bold uppercase tracking-wider">#{rep.user_id}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === "audit" && (
            <motion.div
              key="audit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/40"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-150">
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
                        <td className="px-8 py-5">#{act.id}</td>
                        <td className="px-8 py-5 font-bold text-slate-800">{act.action}</td>
                        <td className="px-8 py-5 text-slate-500 font-sans font-medium">{act.description}</td>
                        <td className="px-8 py-5 text-slate-450">{act.ip_address ?? "Unknown"}</td>
                        <td className="px-8 py-5 text-slate-500 font-sans font-medium">{new Date(act.created_at).toLocaleString()}</td>
                        <td className="px-8 py-5 text-slate-450">#{act.user_id}</td>
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
