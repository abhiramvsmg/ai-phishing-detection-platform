"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Search, 
  FileCheck, 
  ShieldCheck, 
  Clock, 
  MoreHorizontal,
  Filter,
  BarChart2,
  Lock,
  ArrowRight
} from 'lucide-react';

const reportHistory = [
  { title: "Monthly Executive Phishing Brief", category: "Summary", date: "May 2024", size: "2.4 MB", status: "Verified" },
  { title: "SOC Audit - Q2 2024 Compliance", category: "Audit", date: "Apr 2024", size: "12.1 MB", status: "Archived" },
  { title: "Departmental Risk Exposure Matrix", category: "Analytics", date: "May 15, 2024", size: "4.8 MB", status: "Verified" },
  { title: "Zero-Day Attack Vector Review", category: "Intelligence", date: "Mar 30, 2024", size: "8.5 MB", status: "Locked" },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Forensic Reports
            </h1>
            <p className="text-slate-400 font-medium">Export audit-ready security summaries and compliance documentation.</p>
          </div>
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3">
            Schedule New Report
          </button>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Pending Reviews", val: "4", icon: Clock, color: "text-amber-500" },
            { label: "Reports Generated", val: "142", icon: FileCheck, color: "text-emerald-500" },
            { label: "Compliance Index", val: "94%", icon: ShieldCheck, color: "text-blue-500" },
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Side Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-[10px] font-black uppercase text-slate-600 tracking-widest px-4 mb-4">Classifications</h3>
            {['All Reports', 'Executive Summary', 'Forensic Audit', 'Compliance', 'Intelligence Feed'].map((cat, i) => (
              <button 
                key={cat} 
                className={`w-full text-left px-5 py-4 rounded-2xl text-sm font-bold transition-all border ${
                  i === 0 ? 'bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-900 border-transparent'
                }`}
              >
                {cat}
              </button>
            ))}

            <div className="mt-8 p-6 rounded-3xl bg-slate-900/60 border border-slate-800">
              <BarChart2 className="w-8 h-8 text-blue-500 mb-4" />
              <h4 className="font-bold text-sm mb-2">Auto-Generation</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">Your &quot;Weekly Threat Matrix&quot; is scheduled to generate in 2 days.</p>
              <button className="text-[10px] font-black text-blue-400 uppercase flex items-center gap-1 hover:underline">
                Manage Schedule <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Report List */}
          <div className="lg:col-span-9">
            <div className="rounded-3xl bg-slate-900/40 border border-slate-800 overflow-hidden backdrop-blur-md">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/20">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                  <input 
                    className="bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs w-80 focus:ring-1 focus:ring-blue-500 outline-none" 
                    placeholder="Search by report filename..." 
                  />
                </div>
                <button className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-500 hover:text-white transition-colors">
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              <div className="divide-y divide-slate-800">
                {reportHistory.map((report, i) => (
                  <motion.div 
                    key={report.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="p-6 flex items-center justify-between hover:bg-slate-800/30 transition-all group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-blue-400 shadow-inner group-hover:scale-105 transition-transform">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-200 group-hover:text-blue-400 transition-colors">{report.title}</h4>
                        <div className="flex items-center gap-3 mt-1.5 font-mono text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                          <span className="text-blue-500">{report.category}</span>
                          <span className="w-1 h-1 bg-slate-700 rounded-full" />
                          <span>{report.date}</span>
                          <span className="w-1 h-1 bg-slate-700 rounded-full" />
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-950 border border-slate-800 rounded-full">
                        {report.status === 'Locked' ? (
                          <Lock className="w-3 h-3 text-amber-500" />
                        ) : (
                          <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        )}
                        <span className="text-[10px] font-black uppercase text-slate-400">{report.status}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="p-3 bg-slate-900 border border-slate-800 rounded-xl hover:bg-blue-600 hover:border-blue-500 transition-all text-slate-400 hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/10">
                          <Download className="w-4 h-4" />
                        </button>
                        <button className="p-3 text-slate-600 hover:text-white transition-colors">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="p-6 bg-slate-950/50 border-t border-slate-800 text-center">
                <button className="text-xs font-black text-slate-500 hover:text-blue-400 uppercase tracking-widest transition-colors">
                  View Full Report Archive
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}