"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  AlertTriangle,
  Calendar,
  Filter,
  Download,
  Target
} from 'lucide-react';
import { api } from '@/lib/api';

const topAttackedDomains = [
  { domain: "corp-finance.net", attempts: "12,402", risk: "Critical", status: "Protected" },
  { domain: "hr-portal.internal", attempts: "8,291", risk: "High", status: "Monitoring" },
  { domain: "dev-api.secure-cloud.io", attempts: "5,102", risk: "Medium", status: "Protected" },
  { domain: "mktg-assets.cdn", attempts: "2,410", risk: "Low", status: "Protected" },
];

export default function AnalyticsPage() {
  const [totalScans, setTotalScans] = useState<number | null>(null);
  const [phishingScans, setPhishingScans] = useState<number | null>(null);

  useEffect(() => {
    api.dashboard
      .stats()
      .then((stats) => {
        setTotalScans(stats.total_scans);
        setPhishingScans(stats.phishing_scans);
      })
      .catch(() => {
        // real stats unavailable — keep mock fallback below
      });
  }, []);

  const analyticsStats = [
    { label: "Total Emails Scanned", value: totalScans !== null ? totalScans.toLocaleString() : "1,284,502", change: "+12.5%", trend: "up", icon: Activity, color: "text-blue-400" },
    { label: "Malicious Blocked", value: phishingScans !== null ? phishingScans.toLocaleString() : "42,891", change: "+8.2%", trend: "up", icon: Shield, color: "text-emerald-400" },
    { label: "Average Risk Score", value: "24/100", change: "-4.1%", trend: "down", icon: AlertTriangle, color: "text-amber-400" },
    { label: "Detection Accuracy", value: "99.98%", change: "+0.02%", trend: "up", icon: Target, color: "text-purple-400" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              Security Analytics
            </h1>
            <p className="text-slate-400 mt-1">Real-time telemetry and organizational risk distribution.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium">
              <Calendar className="w-4 h-4 text-blue-400" /> Last 30 Days
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-all text-sm font-bold shadow-lg shadow-blue-600/20">
              <Download className="w-4 h-4" /> Export SOC Report
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsStats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md hover:border-slate-700 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl bg-slate-950 border border-slate-800 ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center text-xs font-bold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
              <div className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 p-6 rounded-3xl bg-slate-900/40 border border-slate-800"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                Threat Detection Velocity
              </h3>
              <div className="flex gap-2">
                {['D', 'W', 'M'].map((t) => (
                  <button key={t} className={`px-3 py-1 rounded-md text-[10px] font-black ${t === 'W' ? 'bg-blue-600' : 'bg-slate-800 text-slate-500'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-2 px-2">
              {[42, 65, 35, 82, 54, 91, 72, 88, 62, 75, 98, 81].map((h, i) => (
                <div key={i} className="flex-1 group relative">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1.5, delay: i * 0.05, ease: "circOut" }}
                    className="w-full bg-gradient-to-t from-blue-600/20 to-blue-500 group-hover:to-blue-400 rounded-t-sm transition-all"
                  />
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all border border-slate-700 pointer-events-none">
                    {h}k
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6 text-[10px] text-slate-500 font-bold px-2 uppercase tracking-widest border-t border-slate-800 pt-4">
              <span>May 01</span><span>May 10</span><span>May 20</span><span>May 30</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-400" />
                Attack Vector Profile
              </h3>
              <div className="space-y-5">
                {[
                  { label: "Credential Phishing", val: 54, color: "bg-blue-500" },
                  { label: "Ransomware Payloads", val: 28, color: "bg-rose-500" },
                  { label: "Business Email Comp.", val: 12, color: "bg-amber-500" },
                  { label: "Zero-Day Exploits", val: 6, color: "bg-purple-500" }
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-tighter">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-white">{item.val}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.val}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className={`h-full ${item.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-black uppercase mb-2">
                <Shield className="w-4 h-4" /> AI Guardrails
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Platform is currently prioritizing <span className="text-white font-bold">Credential Phishing</span> detection based on a 15% increase in global SMTP traffic anomalies.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-slate-900/40 border border-slate-800 overflow-hidden"
        >
          <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-950/20">
            <h3 className="font-bold text-lg">Top Targeted Infrastructure</h3>
            <Filter className="w-5 h-5 text-slate-500 cursor-pointer hover:text-white transition-colors" />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-950/50 text-slate-500 text-[10px] uppercase font-black tracking-widest border-b border-slate-800">
                <tr>
                  <th className="px-8 py-5">Target Domain</th>
                  <th className="px-8 py-5">Scan Volume</th>
                  <th className="px-8 py-5">Risk Exposure</th>
                  <th className="px-8 py-5 text-right">Defense Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {topAttackedDomains.map((row) => (
                  <tr key={row.domain} className="hover:bg-slate-800/20 transition-all cursor-default group">
                    <td className="px-8 py-5 font-mono text-sm text-blue-400 font-medium">{row.domain}</td>
                    <td className="px-8 py-5 text-sm font-bold">{row.attempts} <span className="text-slate-500 font-normal">Hits</span></td>
                    <td className="px-8 py-5">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-tighter ${
                        row.risk === 'Critical' ? 'bg-rose-500/10 text-rose-500' :
                        row.risk === 'High' ? 'bg-amber-500/10 text-amber-500' :
                        'bg-emerald-500/10 text-emerald-500'
                      }`}>
                        {row.risk}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 text-emerald-400 text-xs font-bold">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        {row.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}