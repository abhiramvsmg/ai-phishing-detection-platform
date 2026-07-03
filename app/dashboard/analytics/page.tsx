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
import { RiskDistribution } from '@/lib/types';
import { TiltCard } from '@/components/ui/TiltCard';

const topAttackedDomains = [
  { domain: "corp-finance.net", attempts: "12,402", risk: "Critical", status: "Protected" },
  { domain: "hr-portal.internal", attempts: "8,291", risk: "High", status: "Monitoring" },
  { domain: "dev-api.secure-cloud.io", attempts: "5,102", risk: "Medium", status: "Protected" },
  { domain: "mktg-assets.cdn", attempts: "2,410", risk: "Low", status: "Protected" },
];

export default function AnalyticsPage() {
  const [totalScans, setTotalScans] = useState<number | null>(null);
  const [phishingScans, setPhishingScans] = useState<number | null>(null);
  const [riskDist, setRiskDist] = useState<RiskDistribution | null>(null);

  useEffect(() => {
    api.dashboard
      .stats()
      .then((stats) => {
        setTotalScans(stats.total_scans);
        setPhishingScans(stats.phishing_scans);
      })
      .catch(() => {});

    api.dashboard
      .riskDistribution()
      .then(setRiskDist)
      .catch((err) => {
        console.error("Failed to load risk distribution", err);
      });
  }, []);

  const analyticsStats = [
    { label: "Total Emails Scanned", value: totalScans !== null ? totalScans.toLocaleString() : "1,284,502", change: "+12.5%", trend: "up", icon: Activity, color: "text-violet-600" },
    { label: "Malicious Blocked", value: phishingScans !== null ? phishingScans.toLocaleString() : "42,891", change: "+8.2%", trend: "up", icon: Shield, color: "text-teal-600" },
    { label: "Average Risk Score [DEMO]", value: "24/100", change: "-4.1%", trend: "down", icon: AlertTriangle, color: "text-amber-600" },
    { label: "Detection Accuracy [DEMO]", value: "99.98%", change: "+0.02%", trend: "up", icon: Target, color: "text-violet-600" },
  ];

  return (
    <div className="bg-background text-slate-800 space-y-8 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Security Analytics</h1>
          <p className="text-slate-500 text-sm font-medium">Real-time threat feeds and platform vulnerability metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 shadow-sm text-xs font-bold active:scale-95 duration-100">
            <Calendar className="w-4 h-4 text-violet-500" /> Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-md shadow-violet-150 hover:shadow-lg transition-all text-xs font-bold active:scale-95 duration-100">
            <Download className="w-4 h-4" /> Export SOC Report
          </button>
        </div>
      </header>

      {/* KPI Stats list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <TiltCard className="p-6 h-full group hover:border-violet-300">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-violet-50 transition-smooth ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div className={`flex items-center text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${stat.trend === 'up' ? 'text-teal-700 bg-teal-50 border border-teal-100' : 'text-rose-600 bg-rose-50 border border-rose-100'}`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-black text-slate-800 tracking-tight">{stat.value}</div>
              <div className="text-slate-400 text-[10px] font-bold mt-1 uppercase tracking-wider">{stat.label}</div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat velocity chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 p-6 bg-white border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-100/40"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-violet-500" />
              Threat Detection Velocity <span className="text-[10px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg text-slate-500 font-bold uppercase tracking-wide">Illustrative</span>
            </h3>
            <div className="flex gap-2">
              {['D', 'W', 'M'].map((t) => (
                <button key={t} className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider active:scale-90 ${t === 'W' ? 'bg-violet-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-500'}`}>{t}</button>
              ))}
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2 px-2">
            {[42, 65, 35, 82, 54, 91, 72, 88, 62, 75, 98, 81].map((h, i) => (
              <div key={i} className="flex-1 group relative">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 1.2, delay: i * 0.04, ease: "circOut" }}
                  className="w-full bg-gradient-to-t from-violet-500/20 to-violet-500 group-hover:to-violet-400 rounded-t-md transition-all cursor-pointer"
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white font-mono text-[9px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-all border border-slate-700 pointer-events-none shadow-md">
                  {h}k
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-6 text-[10px] text-slate-400 font-bold px-2 uppercase tracking-wider border-t border-slate-100 pt-4">
            <span>May 01</span><span>May 10</span><span>May 20</span><span>May 30</span>
          </div>
        </motion.div>

        {/* Vectors & Risk severity distributions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 bg-white border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-100/40 flex flex-col gap-6"
        >
          <div>
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-500" />
              Attack Vector Profile <span className="text-[10px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg text-slate-500 font-bold uppercase tracking-wide">Illustrative</span>
            </h3>
            <div className="space-y-5">
              {[
                { label: "Credential Phishing", val: 54, color: "bg-violet-500" },
                { label: "Ransomware Payloads", val: 28, color: "bg-rose-500" },
                { label: "Business Email Comp.", val: 12, color: "bg-amber-500" },
                { label: "Zero-Day Exploits", val: 6, color: "bg-violet-400" }
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-tighter">
                    <span className="text-slate-500">{item.label}</span>
                    <span className="text-slate-800">{item.val}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.val}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 pt-6 border-t border-slate-150">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Live Risk Distribution
            </h3>
            {riskDist ? (
              <div className="space-y-5">
                {[
                  { label: "Critical", val: riskDist.CRITICAL, color: "bg-rose-500" },
                  { label: "High", val: riskDist.HIGH, color: "bg-rose-400" },
                  { label: "Medium", val: riskDist.MEDIUM, color: "bg-amber-500" },
                  { label: "Low", val: riskDist.LOW, color: "bg-teal-500" }
                ].map((item) => {
                  const total = riskDist.CRITICAL + riskDist.HIGH + riskDist.MEDIUM + riskDist.LOW;
                  const pct = total > 0 ? Math.round((item.val / total) * 100) : 0;
                  return (
                    <div key={item.label}>
                      <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-tighter">
                        <span className="text-slate-500">{item.label}</span>
                        <span className="text-slate-800">{item.val} ({pct}%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 1 }}
                          className={`h-full ${item.color} rounded-full`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-bold uppercase">Loading risk distribution...</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Target Infrastructure Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/40"
      >
        <div className="p-6 border-b border-slate-150 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-slate-800">Top Targeted Infrastructure <span className="text-[10px] bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg text-slate-500 font-bold uppercase tracking-wide ml-1">Illustrative</span></h3>
          <Filter className="w-5 h-5 text-slate-400 cursor-pointer hover:text-slate-600 transition-colors" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-150">
              <tr>
                <th className="px-8 py-5">Target Domain</th>
                <th className="px-8 py-5">Scan Volume</th>
                <th className="px-8 py-5">Risk Exposure</th>
                <th className="px-8 py-5 text-right">Defense Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topAttackedDomains.map((row) => (
                <tr key={row.domain} className="hover:bg-slate-50/60 transition-all cursor-default group">
                  <td className="px-8 py-5 font-mono text-sm text-violet-600 font-bold">{row.domain}</td>
                  <td className="px-8 py-5 text-sm font-bold text-slate-800">{row.attempts} <span className="text-slate-400 font-normal">Hits</span></td>
                  <td className="px-8 py-5">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wide border ${
                      row.risk === 'Critical' ? 'bg-rose-50 border-rose-200 text-rose-600' :
                      row.risk === 'High' ? 'bg-rose-50 border-rose-100 text-rose-500' :
                      'bg-teal-50 border-teal-200 text-teal-700'
                    }`}>
                      {row.risk}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 text-teal-600 text-xs font-bold">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-pulse" />
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
  );
}