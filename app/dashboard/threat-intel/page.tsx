"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Skull, 
  Radio, 
  Search, 
  Activity,
  Zap,
  ExternalLink,
  Target,
  Terminal,
  Database
} from 'lucide-react';
import { TiltCard } from '@/components/ui/TiltCard';

const activeThreats = [
  { group: "Lazarus (APT38)", type: "State Sponsored", risk: "Critical", status: "Targeting Finance", desc: "Spear-phishing campaigns targeting decentralized crypto bridges and banking infrastructures." },
  { group: "LockBit 3.0", type: "Ransomware-as-a-Service", risk: "Critical", status: "Active Exploitation", desc: "Exploiting recently disclosed network gateway vulnerabilities for initial system entry." },
  { group: "Black Basta", type: "Ransomware", risk: "High", status: "Monitoring", desc: "Double extortion tactics targeting corporate infrastructure networks in North America." },
  { group: "Pikabot", type: "Loader / Malware", risk: "High", status: "Infection Wave", desc: "Mass email campaigns utilizing hijacked thread context propagation." },
];

const trendingIOCs = [
  { value: "193.106.191[.]144", label: "C2 Server", date: "14m ago" },
  { value: "hxxp://auth-office365[.]net/verify", label: "Phish Domain", date: "22m ago" },
  { value: "5f8c82a17b3f92d1c6...", label: "Payload SHA256", date: "1h ago" },
];

export default function ThreatIntelPage() {
  return (
    <div className="bg-background text-slate-800 space-y-8 min-h-screen">
      {/* Header with Live Status */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-3">
            <Globe className="w-8 h-8 text-violet-500 animate-spin" style={{ animationDuration: '40s' }} />
            Global Threat Intel
          </h1>
          <p className="text-slate-500 text-sm font-medium">Real-time telemetry feeds of active APT campaign vectors and Indicators of Compromise (IOC)</p>
        </div>
        <div className="flex items-center gap-4 bg-white border border-slate-200/60 p-4 rounded-2xl shadow-xl shadow-slate-100/40 shrink-0">
          <div className="flex -space-x-3 select-none">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-violet-50 flex items-center justify-center font-black text-[9px] text-violet-600 shadow-sm">
                SOC
              </div>
            ))}
          </div>
          <div>
            <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Live Observers</p>
            <p className="text-xs font-black text-slate-800">14 Analysts Online</p>
          </div>
        </div>
      </header>

      {/* Global Risk Cards using premium 3D cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <TiltCard glowColor="13, 148, 136" className="p-6 h-full border border-slate-200/60 bg-white">
            <Activity className="absolute -bottom-4 -right-4 w-24 h-24 text-slate-50 group-hover:text-teal-50/30 transition-colors pointer-events-none" />
            <h3 className="font-black text-[10px] text-slate-400 uppercase tracking-widest mb-4">Global Security Pulse</h3>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-teal-600 tracking-tight">Stable</span>
              <span className="text-xs font-bold text-slate-500 mb-1.5">No High-Value Spikes</span>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
          <TiltCard glowColor="99, 102, 241" className="p-6 h-full border border-slate-200/60 bg-white">
            <Zap className="absolute -bottom-4 -right-4 w-24 h-24 text-slate-50 group-hover:text-violet-50/30 transition-colors pointer-events-none" />
            <h3 className="font-black text-[10px] text-slate-455 uppercase tracking-widest mb-4">Emerging IOCs (24h)</h3>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-violet-600 tracking-tight">1,248</span>
              <span className="text-xs font-bold text-violet-500/80 mb-1.5">+14% Growth</span>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <TiltCard glowColor="225, 29, 72" className="p-6 h-full border border-rose-200/80 bg-white">
            <Skull className="absolute -bottom-4 -right-4 w-24 h-24 text-slate-50 group-hover:text-rose-100/35 transition-colors pointer-events-none" />
            <h3 className="font-black text-[10px] text-rose-500 uppercase tracking-widest mb-4">New Campaigns Detected</h3>
            <div className="flex items-end gap-3">
              <span className="text-3xl font-black text-rose-600 tracking-tight">12</span>
              <span className="text-xs font-bold text-rose-500/80 mb-1.5">High Severity</span>
            </div>
          </TiltCard>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
            <h2 className="text-lg font-bold text-slate-855 flex items-center gap-2">
              <Radio className="w-5 h-5 text-teal-500 animate-glow-pulse" />
              Live Adversary Ticker
            </h2>
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
              <input 
                className="bg-white border border-slate-250 focus:bg-white rounded-xl py-2.5 pl-10 pr-4 text-xs w-72 focus:outline-none focus:border-violet-400 focus:ring-4 focus:ring-violet-100 transition-all text-slate-800 placeholder:text-slate-400 font-semibold" 
                placeholder="Search actors, CVEs or tactics..." 
              />
            </div>
          </div>

          <div className="space-y-4">
            {activeThreats.map((threat, i) => (
              <motion.div
                key={threat.group}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <TiltCard 
                  glowColor={threat.risk === 'Critical' ? "225, 29, 72" : "217, 119, 6"}
                  maxRotation={3}
                  depthZ={6}
                  className="p-6 bg-white border border-slate-200/60 shadow-xl shadow-slate-100/40 hover:border-violet-300 transition-all flex flex-col md:flex-row md:items-start gap-5 group"
                >
                  <div className={`p-4 rounded-2xl shrink-0 border ${
                    threat.risk === 'Critical' ? 'bg-rose-50 border-rose-200 text-rose-500 shadow-inner' : 'bg-amber-50 border-amber-200 text-amber-500 shadow-inner'
                  }`}>
                    <Skull className="w-6 h-6 animate-float" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-black text-lg text-slate-800 group-hover:text-violet-600 transition-colors">{threat.group}</span>
                        <span className="text-[9px] font-bold px-2 py-1 bg-slate-50 border border-slate-200/80 rounded-lg text-slate-500 uppercase tracking-wide">{threat.type}</span>
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border self-start ${
                        threat.risk === 'Critical' ? 'bg-rose-50 border-rose-250 text-rose-600' : 'bg-amber-50 border-amber-255 text-amber-700'
                      }`}>
                        {threat.risk}
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-4 font-semibold">{threat.desc}</p>
                    <div className="flex flex-wrap items-center gap-4 text-[9px] font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5 text-teal-600 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded-lg">
                        <Target className="w-3 h-3" /> {threat.status}
                      </span>
                      <button className="flex items-center gap-1.5 text-violet-600 hover:text-violet-500 font-bold active:scale-95 transition-transform duration-100">
                        MITRE ATT&CK <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* IOC Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <TiltCard glowColor="99, 102, 241" className="p-6 bg-white border border-slate-200/60 shadow-xl shadow-slate-100/40" maxRotation={4} depthZ={8}>
            <h3 className="font-black text-xs text-slate-600 uppercase tracking-wider mb-6 flex items-center gap-2 border-b border-slate-100 pb-3 select-none">
              <Terminal className="w-5 h-5 text-violet-500 animate-pulse" />
              Emerging IOC Indicators
            </h3>
            <div className="space-y-3">
              {trendingIOCs.map((ioc, i) => (
                <div key={i} className="p-4 bg-slate-50 hover:bg-white border border-slate-200 hover:border-violet-300 rounded-2xl group transition-all duration-300 shadow-inner hover:shadow-md hover:shadow-violet-50/10">
                  <div className="flex items-center justify-between mb-2 select-none">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{ioc.label}</span>
                    <span className="text-[9px] font-black text-slate-400">{ioc.date}</span>
                  </div>
                  <code className="text-xs font-mono text-violet-600 font-bold break-all">{ioc.value}</code>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3.5 bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-755 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-97 select-none">
              Sync Global Blocklist
            </button>
          </TiltCard>

          <TiltCard glowColor="99, 102, 241" className="p-6 bg-violet-50/50 border border-violet-200/40 shadow-xl shadow-violet-100/10 text-slate-800 relative overflow-hidden" maxRotation={5} depthZ={10}>
            <div className="cyber-grid absolute inset-0 pointer-events-none opacity-30" />
            <div className="absolute -top-10 -right-10 opacity-[0.03] pointer-events-none">
              <Database className="w-40 h-40 text-slate-900 animate-float" />
            </div>
            <div className="relative">
              <Database className="w-8 h-8 text-violet-500 mb-4 animate-glow-pulse" />
              <h4 className="text-lg font-black text-slate-850 mb-1.5 tracking-tight">OSINT Correlator</h4>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Platform is currently matching telemetry with <strong>14 external threat feeds</strong> including MISP, FS-ISAC, and Shodan alerts.
              </p>
              <div className="mt-4 text-[9px] font-bold text-violet-500 uppercase tracking-wider select-none">
                Last correlated: 42s ago
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </div>
  );
}