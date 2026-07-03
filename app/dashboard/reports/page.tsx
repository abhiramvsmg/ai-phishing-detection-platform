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
} from 'lucide-react';
import { api, ReportRecord } from '@/lib/api';
import { TiltCard } from '@/components/ui/TiltCard';

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportRecord[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.reports
      .list()
      .then(setReports)
      .catch((err) => setError(err.message ?? "Failed to load reports"));
  }, []);

  const handleExportPdf = async (reportId: number) => {
    try {
      const blob = await api.reports.exportPdf(reportId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report_${reportId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err: any) {
      alert("Failed to export PDF: " + (err.message ?? err));
    }
  };

  const handleExportCsv = async (reportId: number) => {
    try {
      const blob = await api.reports.exportCsv(reportId);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `report_${reportId}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err: any) {
      alert("Failed to export CSV: " + (err.message ?? err));
    }
  };

  return (
    <div className="bg-background text-slate-800 space-y-8 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Security Reports</h1>
          <p className="text-slate-500 text-sm font-medium">Exportable audit findings and deep forensic logs</p>
        </div>
      </header>

      {error && (
        <p className="text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-6 py-4">
          {error} — log in first, or check the backend is running.
        </p>
      )}

      {/* Overview stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Reports", val: reports ? String(reports.length) : "—", icon: FileCheck, color: "text-teal-600" },
          { label: "Latest Report", val: reports && reports.length > 0 ? new Date(reports[reports.length - 1].created_at).toLocaleDateString() : "—", icon: Clock, color: "text-amber-500" },
          { label: "Reporting Status", val: "Live Feed", icon: ShieldCheck, color: "text-violet-600" },
        ].map((stat) => (
          <div key={stat.label} className="p-6 bg-white border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-100/40 flex items-center gap-6">
            <div className={`p-4 rounded-2xl bg-slate-50 border border-slate-100 ${stat.color} shadow-inner`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-3xl font-black text-slate-800 tracking-tight">{stat.val}</p>
              <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table / list panel */}
      <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/40">
        <div className="p-6 border-b border-slate-150 flex items-center justify-between bg-slate-50/50">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
            <input
              className="bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs w-80 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 outline-none text-slate-800 transition-all placeholder:text-slate-400"
              placeholder="Search reports by ID or scan target..."
            />
          </div>
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-slate-700 hover:bg-slate-50 transition-all active:scale-95 shadow-sm">
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {reports === null ? (
          <p className="p-8 text-sm text-slate-500 font-semibold">Loading reports...</p>
        ) : reports.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-350 mx-auto mb-4" />
            <p className="text-sm font-bold text-slate-850">No reports generated yet.</p>
            <p className="text-xs text-slate-400 mt-1">Scan target elements to create your first threat record.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {reports.map((report, i) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-6 flex flex-col md:flex-row md:items-start justify-between gap-5 hover:bg-slate-50/40 transition-all group"
              >
                <div className="flex items-start gap-5 flex-1 min-w-0">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-violet-500 shrink-0 shadow-inner">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-800 group-hover:text-violet-600 transition-colors">
                      Report #{report.id} — {report.report_type}
                    </h4>
                    <div className="flex items-center gap-3 mt-1.5 font-mono text-[9px] text-slate-450 font-bold uppercase tracking-wider">
                      <span className="text-violet-500">Scan ID: #{report.scan_id}</span>
                      <span className="w-1 h-1 bg-slate-300 rounded-full" />
                      <span>{new Date(report.created_at).toLocaleString()}</span>
                    </div>
                    <pre className="mt-3 text-xs text-slate-600 whitespace-pre-wrap font-mono bg-slate-50/50 border border-slate-150 rounded-2xl p-5 shadow-inner">
                      {report.details}
                    </pre>
                  </div>
                </div>
                <div className="flex sm:flex-col gap-2 shrink-0 md:self-center">
                  <button
                    onClick={() => handleExportPdf(report.id)}
                    className="px-3.5 py-2 bg-rose-50 border border-rose-200 hover:bg-rose-100/80 text-rose-600 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 duration-100"
                  >
                    Export PDF
                  </button>
                  <button
                    onClick={() => handleExportCsv(report.id)}
                    className="px-3.5 py-2 bg-teal-50 border border-teal-200 hover:bg-teal-100/80 text-teal-600 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 duration-100"
                  >
                    Export CSV
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}