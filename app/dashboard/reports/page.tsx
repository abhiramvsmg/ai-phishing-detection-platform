"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Search,
  FileCheck,
  ShieldCheck,
  Clock,
  Filter,
  BarChart2,
  ArrowRight
} from 'lucide-react';
import { api, ReportRecord } from '@/lib/api';

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.reports
      .list()
      .then(setReports)
      .catch((err) => setError(err.message ?? "Failed to load reports"));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Forensic Reports
            </h1>
            <p className="text-slate-400 font-medium">Scan reports generated from your detection history.</p>
          </div>
        </header>

        {error && (
          <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-2xl px-6 py-4">
            {error} — log in first, or check the backend is running.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Total Reports", val: reports ? String(reports.length) : "—", icon: FileCheck, color: "text-emerald-500" },
            { label: "Latest Report", val: reports && reports.length > 0 ? new Date(reports[reports.length - 1].created_at).toLocaleDateString() : "—", icon: Clock, color: "text-amber-500" },
            { label: "Status", val: "Live Data", icon: ShieldCheck, color: "text-blue-500" },
          ].map((stat) => (
            <div key={stat.label} className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex items-center gap-6">
              <div className={`p-4 rounded-2xl bg-slate-950 border border-slate-800 ${stat.color} shadow-inner`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-black tracking-tight">{stat.val}</p>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-3xl bg-slate-900/40 border border-slate-800 overflow-hidden backdrop-blur-md">
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
              <input
                className="bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs w-80 focus:ring-1 focus:ring-blue-500 outline-none"
                placeholder="Search by report ID or scan ID..."
              />
            </div>
            <button className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 hover:text-white transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>

          {reports === null ? (
            <p className="p-8 text-sm text-slate-500">Loading reports...</p>
          ) : reports.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <p className="text-sm text-slate-400">No reports generated yet.</p>
              <p className="text-xs text-slate-600 mt-1">Reports are created from the scan history via the backend.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {reports.map((report, i) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 flex items-start gap-5 hover:bg-slate-800/30 transition-all group"
                >
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-blue-400 shadow-inner shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-200 group-hover:text-blue-400 transition-colors">
                      Report #{report.id} — {report.report_type}
                    </h4>
                    <div className="flex items-center gap-3 mt-1.5 font-mono text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                      <span className="text-blue-500">Scan #{report.scan_id}</span>
                      <span className="w-1 h-1 bg-slate-700 rounded-full" />
                      <span>{new Date(report.created_at).toLocaleString()}</span>
                    </div>
                    <pre className="mt-3 text-xs text-slate-400 whitespace-pre-wrap font-mono bg-slate-950/50 border border-slate-800 rounded-xl p-4">
                      {report.details}
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}