"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, 
  Skull, 
  Radio, 
  Search, 
  ShieldAlert, 
  ChevronRight, 
  Activity,
  Zap,
  ExternalLink,
  Target,
  Terminal,
  Database
} from 'lucide-react';

const activeThreats = [
  { group: "Lazarus (APT38)", type: "State Sponsored", risk: "Critical", status: "Targeting Finance", desc: "Spear-phishing campaigns targeting decentralized crypto bridges." },
  { group: "LockBit 3.0", type: "Ransomware-as-a-Service", risk: "Critical", status: "Active Exploitation", desc: "Exploiting recently disclosed CitrixBleed vulnerabilities for initial access." },
  { group: "Black Basta", type: "Ransomware", risk: "High", status: "Monitoring", desc: "Double extortion tactics targeting manufacturing sectors in North America." },
  { group: "Pikabot", type: "Loader / Malware", risk: "High", status: "Infection Wave", desc: "Mass email campaign utilizing hijacked thread distribution." },
];

const trendingIOCs = [
  { value: "193.106.191[.]144", label: "C2 Server", date: "14m ago" },
  { value: "hxxp://auth-office365[.]net/verify", label: "Phish Domain", date: "22m ago" },
  { value: "5f8c82a17b3f92d1c6...", label: "Payload SHA256", date: "1h ago" },
];

export default function ThreatIntelPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Live Status */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent flex items-center gap-3">
              <Globe className="w-10 h-10 text-blue-500" />
              Global Threat Intel
            </h1>
            <p className="text-slate-400 font-medium">Real-time monitoring of APT groups, campaign patterns, and malicious infrastructure.</p>
          </div>
          <div className="flex items-center gap-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-800 shadow-xl">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center font-bold text-[10px]">SOC</div>)}
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">Live Observers</p>
              <p className="text-sm font-bold">14 Analysts Online</p>
            </div>
          </div>
        </header>

        {/* Global Risk Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 relative overflow-hidden group">
            <Activity className="absolute -bottom-4 -right-4 w-24 h-24 text-slate-800 opacity-20" />
            <h3 className="font-black text-xs text-slate-500 uppercase tracking-widest mb-4">Global Security Pulse</h3>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-emerald-400">Stable</span>
              <span className="text-xs font-bold text-slate-500 mb-2">No High-Value Spikes</span>
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 relative overflow-hidden">
            <Zap className="absolute -bottom-4 -right-4 w-24 h-24 text-slate-800 opacity-20" />
            <h3 className="font-black text-xs text-slate-500 uppercase tracking-widest mb-4">Emerging IOCs (24h)</h3>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-blue-400">1,248</span>
              <span className="text-xs font-bold text-blue-400/50 mb-2">+14% Growth</span>
            </div>
          </div>
          <div className="p-6 rounded-3xl bg-rose-600/5 border border-rose-600/20 relative overflow-hidden">
            <Skull className="absolute -bottom-4 -right-4 w-24 h-24 text-rose-500 opacity-5" />
            <h3 className="font-black text-xs text-rose-500 uppercase tracking-widest mb-4">New Campaigns Detected</h3>
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-rose-500">12</span>
              <span className="text-xs font-bold text-rose-400/50 mb-2">High Severity</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Radio className="w-5 h-5 text-emerald-500 animate-pulse" />
                Live Adversary Ticker
              </h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  className="bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs w-72 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                  placeholder="Search actors, CVEs or tactics..." 
                />
              </div>
            </div>

            <div className="space-y-4">
              {activeThreats.map((threat, i) => (
                <motion.div
                  key={threat.group}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-slate-700 transition-all flex items-start gap-5 group"
                >
                  <div className={`p-4 rounded-2xl shrink-0 ${threat.risk === 'Critical' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>
                    <Skull className="w-8 h-8" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-black text-xl group-hover:text-blue-400 transition-colors">{threat.group}</span>
                        <span className="text-[10px] font-black px-2 py-1 bg-slate-800 rounded-md text-slate-500 uppercase tracking-widest">{threat.type}</span>
                      </div>
                      <span className={`text-[10px] font-black uppercase tracking-tighter px-3 py-1 rounded-full ${threat.risk === 'Critical' ? 'bg-rose-500 text-white' : 'bg-amber-500 text-black'}`}>
                        {threat.risk}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{threat.desc}</p>
                    <div className="flex items-center gap-5 text-[10px] font-black uppercase tracking-widest">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <Target className="w-3 h-3" /> {threat.status}
                      </span>
                      <button className="flex items-center gap-1.5 text-blue-500 hover:underline">
                        MITRE ATT&CK <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* IOC Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
              <h3 className="font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                <Terminal className="w-5 h-5 text-blue-400" />
                Emerging IOCs
              </h3>
              <div className="space-y-4">
                {trendingIOCs.map((ioc, i) => (
                  <div key={i} className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl group hover:border-blue-500/50 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{ioc.label}</span>
                      <span className="text-[10px] font-bold text-slate-600">{ioc.date}</span>
                    </div>
                    <code className="text-xs font-mono text-blue-300 break-all">{ioc.value}</code>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border border-slate-700">
                Sync Global Blocklist
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/20">
              <Database className="w-10 h-10 text-blue-400 mb-4" />
              <h4 className="text-lg font-black mb-2">OSINT Correlator</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your infrastructure is currently cross-referencing with <strong>14 external feeds</strong> including MISP, FS-ISAC, and Shodan.
              </p>
              <div className="mt-4 text-[10px] font-black text-blue-400 uppercase tracking-widest">
                Last correlated: 42s ago
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}