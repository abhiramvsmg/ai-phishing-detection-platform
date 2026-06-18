"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Globe, 
  Mail, 
  TrendingUp, 
  Activity,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

// --- Local Dashboard Components ---

const KPICard = ({ title, value, icon: Icon, trend, color }: any) => (
  <div className="bg-card border border-border p-5 rounded-xl hover:border-primary/50 transition-all group">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg bg-background border border-border group-hover:scale-110 transition-transform`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
      <span className="text-[10px] font-black text-success flex items-center gap-1 bg-success/10 px-2 py-0.5 rounded">
        <TrendingUp className="w-3 h-3" /> {trend}
      </span>
    </div>
    <div>
      <p className="text-muted text-xs font-bold uppercase tracking-widest">{title}</p>
      <h3 className="text-2xl font-black mt-1">{value}</h3>
    </div>
  </div>
);

const ThreatItem = ({ title, time, severity }: any) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-surface/50 border border-border hover:bg-surface transition-colors">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${
        severity === 'Critical' ? 'bg-danger animate-pulse' : 
        severity === 'High' ? 'bg-warning' : 'bg-secondary'
      }`} />
      <div>
        <p className="text-sm font-bold text-slate-200">{title}</p>
        <p className="text-[10px] text-muted font-mono uppercase">{time}</p>
      </div>
    </div>
    <button className="p-1.5 hover:bg-white/5 rounded-md text-muted hover:text-primary transition-all">
      <ArrowUpRight className="w-4 h-4" />
    </button>
  </div>
);

// --- Main Page ---

export default function Dashboard() {
  return (
    <div className="space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tighter">Security Overview</h1>
          <p className="text-muted text-sm tracking-tight">Real-time threat intelligence and system health.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-surface border border-border rounded-lg text-xs font-mono">
            LOGS: <span className="text-primary">STREAMING_LIVE</span>
          </div>
          <button className="bg-primary text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-cyan-400 transition-all">
            Generate Report
          </button>
        </div>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Threats Blocked" 
          value="1,284" 
          icon={ShieldCheck} 
          trend="+12%" 
          color="text-primary" 
        />
        <KPICard 
          title="Security Score" 
          value="98.2%" 
          icon={Activity} 
          trend="+0.4%" 
          color="text-success" 
        />
        <KPICard 
          title="URLs Scanned" 
          value="45,902" 
          icon={Globe} 
          trend="+22%" 
          color="text-secondary" 
        />
        <KPICard 
          title="Critical Alerts" 
          value="03" 
          icon={AlertTriangle} 
          trend="-5%" 
          color="text-danger" 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Incidents */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border bg-surface/30 flex justify-between items-center">
              <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-primary" /> Recent Incidents
              </h2>
              <span className="text-[10px] text-muted font-bold">LIVE UPDATES</span>
            </div>
            <div className="p-4 space-y-3">
              <ThreatItem title="Suspicious Login Redirect: outlook-verify.net" time="2 mins ago" severity="Critical" />
              <ThreatItem title="Credential Harvesting detected on /auth/reset" time="14 mins ago" severity="High" />
              <ThreatItem title="Punycode Domain spoofing attempt: microseft.com" time="45 mins ago" severity="High" />
              <ThreatItem title="Massive Phishing Campaign: HR_Benefits_Update" time="1 hour ago" severity="Medium" />
              <ThreatItem title="New Domain Registration: secure-bank-login.xyz" time="3 hours ago" severity="Medium" />
            </div>
          </div>
        </div>

        {/* AI Insight Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <ShieldCheck className="w-24 h-24 text-primary" />
            </div>
            <h2 className="text-lg font-black mb-4 flex items-center gap-2 text-primary">
              AI Copilot Insight
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-6">
              "We've detected a 15% increase in <span className="text-warning">Punycode attacks</span> targeting your Finance department. We recommend enabling 'Strict Domain Matching' in your URL Scanner settings."
            </p>
            <button className="w-full bg-primary/10 border border-primary/30 text-primary py-2 rounded-lg text-xs font-bold hover:bg-primary hover:text-black transition-all uppercase tracking-widest">
              Apply Recommendation
            </button>
          </div>

          <div className="mt-6 bg-card border border-border rounded-xl p-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-muted mb-4">Attack Origin Map</h3>
            <div className="aspect-square rounded-lg bg-surface flex flex-col items-center justify-center border border-border group cursor-crosshair">
                <div className="w-20 h-20 rounded-full border border-primary/30 animate-ping absolute" />
                <Globe className="w-12 h-12 text-muted group-hover:text-primary transition-colors" />
                <p className="text-[10px] text-muted mt-4 font-mono">LAT: 34.05 / LONG: -118.24</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}