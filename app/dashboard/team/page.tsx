"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  ShieldCheck, 
  Activity, 
  MoreVertical, 
  BadgeCheck,
  Search,
  Key,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';

const members = [
  { name: "Sarah Chen", role: "Security Administrator", email: "s.chen@phish-ops.io", status: "Active", lastActive: "Now", actions: 142 },
  { name: "Marcus Thorne", role: "Lead Analyst", email: "m.thorne@phish-ops.io", status: "Away", lastActive: "14m ago", actions: 89 },
  { name: "Elena Rodriguez", role: "SOC Tier 2", email: "e.rod@phish-ops.io", status: "Active", lastActive: "1h ago", actions: 256 },
  { name: "David Kim", role: "Analyst", email: "d.kim@phish-ops.io", status: "Offline", lastActive: "2d ago", actions: 44 },
];

export default function TeamPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent uppercase tracking-tighter">
              Team Operations
            </h1>
            <p className="text-slate-400 font-medium">Manage security analysts and identity-based access controls.</p>
          </div>
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3">
            <UserPlus className="w-4 h-4" /> Add Analyst
          </button>
        </header>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: "Active Seats", val: "8 / 12", icon: Users },
            { label: "Privileged Users", val: "3", icon: ShieldCheck },
            { label: "API Consumers", val: "14", icon: Key },
            { label: "System Health", val: "99.9%", icon: Activity },
          ].map((card) => (
            <div key={card.label} className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 group hover:border-slate-700 transition-all">
              <card.icon className="w-5 h-5 text-slate-500 mb-4 group-hover:text-blue-500 transition-colors" />
              <p className="text-3xl font-black tracking-tight">{card.val}</p>
              <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-1">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Members Table */}
          <div className="lg:col-span-8">
            <div className="rounded-3xl bg-slate-900/40 border border-slate-800 overflow-hidden backdrop-blur-md">
              <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/20">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                  <input 
                    className="bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs w-72 focus:ring-1 focus:ring-blue-500 outline-none" 
                    placeholder="Filter team members..." 
                  />
                </div>
              </div>
              <table className="w-full text-left">
                <thead className="bg-slate-950/50 text-slate-500 text-[10px] uppercase font-black tracking-widest border-b border-slate-800">
                  <tr>
                    <th className="px-8 py-5">Identity</th>
                    <th className="px-8 py-5">Access Level</th>
                    <th className="px-8 py-5">Activity Index</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {members.map((member) => (
                    <tr key={member.email} className="hover:bg-slate-800/20 transition-all group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/40 to-slate-800 border border-blue-500/30 flex items-center justify-center font-black text-blue-200">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-200 group-hover:text-blue-400 transition-colors">{member.name}</p>
                            <p className="text-[10px] text-slate-500 font-mono font-bold">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] text-slate-300 font-bold">{member.role}</span>
                          {member.role.includes('Admin') && <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="text-xs font-black">{member.actions} <span className="text-[9px] text-slate-600 uppercase">Alerts</span></div>
                          <div className="flex items-center gap-1.5">
                            <div className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`} />
                            <span className="text-[10px] font-bold text-slate-500 uppercase">{member.lastActive}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 text-slate-600 hover:text-white transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* RBAC Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800">
              <h3 className="font-black text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                RBAC Configuration
              </h3>
              <div className="space-y-4">
                {[
                  { r: "Full Administrator", d: "Read/Write/Delete privileges globally.", color: "bg-blue-500" },
                  { r: "Security Analyst", d: "Forensic access and report generation.", color: "bg-purple-500" },
                  { r: "Audit Reviewer", d: "View-only access for compliance logs.", color: "bg-slate-600" }
                ].map((role) => (
                  <div key={role.r} className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl hover:border-slate-600 transition-all cursor-pointer group">
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className={`w-2 h-2 rounded-full ${role.color}`} />
                      <span className="text-xs font-black uppercase tracking-tight group-hover:text-blue-400 transition-colors">{role.r}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-bold leading-relaxed">{role.d}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-4 border border-dashed border-slate-700 hover:border-slate-500 rounded-2xl text-[10px] font-black uppercase text-slate-500 hover:text-white transition-all tracking-widest">
                Define Custom Role
              </button>
            </div>

            <div className="p-8 rounded-3xl bg-rose-600/5 border border-rose-500/20">
              <ShieldAlert className="w-10 h-10 text-rose-500 mb-4" />
              <h4 className="text-lg font-black mb-2 uppercase tracking-tighter">Security Alert</h4>
              <p className="text-xs text-slate-400 leading-relaxed mb-4 italic">
                Analysts &quot;David Kim&quot; and &quot;Marcus Thorne&quot; are not currently using FIDO2 Hardware keys. This violates internal SOC policy v2.1.
              </p>
              <button className="text-[10px] font-black text-rose-500 uppercase flex items-center gap-1 hover:underline">
                Enforce MFA Policy <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}