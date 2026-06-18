"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Globe, Zap, AlertCircle, 
  Search, Bell, ArrowUpRight, Activity,
  Lock, MousePointerClick, ShieldAlert
} from 'lucide-react';

// --- Reusable Modern Glass Card ---
const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 shadow-2xl ${className}`}
  >
    {children}
  </motion.div>
);

export default function EliteDashboard() {
  return (
    <div className="max-w-[1600px] mx-auto space-y-10 pb-20">
      
      {/* 1. TOP STATS BAR (Canva Modern Spacing) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Threats Blocked", val: "1,284", icon: ShieldCheck, color: "text-primary", trend: "+12%" },
          { label: "Scan Accuracy", val: "99.9%", icon: Zap, color: "text-success", trend: "+0.2%" },
          { label: "Malicious URLs", val: "45,902", icon: Globe, color: "text-secondary", trend: "+18%" },
          { label: "System Health", val: "98.2%", icon: Activity, color: "text-warning", trend: "Stable" },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border p-6 rounded-[2rem] hover:border-primary/50 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-background rounded-2xl border border-border group-hover:scale-110 transition-transform">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-[10px] font-black text-success bg-success/10 px-2 py-1 rounded-full uppercase tracking-widest">{stat.trend}</span>
            </div>
            <div className="mt-4">
              <p className="text-muted text-xs font-bold uppercase tracking-widest">{stat.label}</p>
              <h3 className="text-3xl font-black mt-1 tracking-tight">{stat.val}</h3>
            </div>
            {/* Background Glow Detail */}
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/10 blur-2xl rounded-full" />
          </div>
        ))}
      </div>

      {/* 2. MAIN GRID (The Canva Template Structure) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: AI Threat Overview */}
        <div className="lg:col-span-2 space-y-10">
          <GlassCard>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-2xl font-black tracking-tighter">AI Analysis Stream</h2>
                <p className="text-muted text-sm font-medium">Real-time neural network verdict status</p>
              </div>
              <button className="text-primary text-xs font-black uppercase tracking-widest hover:underline border border-primary/20 px-4 py-2 rounded-xl">View Intelligence</button>
            </div>

            {/* Live Incident Rows */}
            <div className="space-y-4">
              {[
                { type: "Credential Harvest", target: "ms-verify-auth.net", severity: "Critical", icon: Lock },
                { type: "Lookalike Domain", target: "microseft-update.com", severity: "High", icon: ShieldAlert },
                { type: "Clickjacking Attack", target: "login.secure-bank.xyz", severity: "High", icon: MousePointerClick },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-white/[0.03] rounded-3xl border border-white/5 hover:border-white/10 transition-all group">
                  <div className="flex items-center gap-5">
                    <div className={`p-3 rounded-2xl ${row.severity === 'Critical' ? 'bg-danger/20 text-danger' : 'bg-primary/20 text-primary'}`}>
                      <row.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100">{row.type}</h4>
                      <p className="text-xs font-mono text-muted">{row.target}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${row.severity === 'Critical' ? 'text-danger' : 'text-warning'}`}>{row.severity}</p>
                      <p className="text-[10px] text-muted uppercase font-bold tracking-tighter">Analyzed Now</p>
                    </div>
                    <button className="p-2 bg-white/5 rounded-xl text-muted group-hover:text-primary group-hover:bg-primary/10 transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Visual Safety Gauge */}
        <div className="lg:col-span-1 space-y-10">
          <GlassCard className="flex flex-col items-center justify-center text-center">
            <h3 className="text-xs font-black text-muted uppercase tracking-[0.3em] mb-12">Organization Safety</h3>
            <div className="relative w-56 h-56 flex items-center justify-center mb-10">
               {/* Animated Progress Ring */}
               <svg className="w-full h-full transform -rotate-90 drop-shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-white/5" />
                  <circle cx="112" cy="112" r="100" stroke="currentColor" strokeWidth="12" fill="transparent" 
                          strokeDasharray="628" strokeDashoffset="80" strokeLinecap="round" className="text-primary" />
               </svg>
               <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-6xl font-black tracking-tighter">88%</span>
                  <span className="text-[10px] font-black text-primary tracking-[0.2em] mt-2 uppercase">Shielded</span>
               </div>
            </div>
            <div className="space-y-4 w-full">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-1">Weekly Goal Progress</p>
                <div className="flex justify-between font-black text-sm mb-2">
                   <span>92k / 100k Scans</span>
                   <span className="text-primary">92%</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                   <div className="bg-primary h-full w-[92%]" />
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Call to Action */}
          <button className="w-full bg-primary text-black font-black py-5 rounded-[2rem] hover:bg-cyan-400 transition-all shadow-[0_20px_40px_rgba(6,182,212,0.2)] uppercase text-xs tracking-[0.2em]">
            Run Full Network Audit
          </button>
        </div>

      </div>
    </div>
  );
}