"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  ShieldCheck,
  Activity,
  BadgeCheck,
  Search,
  Key,
} from 'lucide-react';
import { api, AdminUser } from '@/lib/api';
import { TiltCard } from '@/components/ui/TiltCard';

export default function TeamPage() {
  const [members, setMembers] = useState<AdminUser[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.admin
      .listUsers()
      .then(setMembers)
      .catch((err) => setError(err.message ?? "Failed to load team members"));
  }, []);

  const adminCount = members?.filter((m) => m.role === "ADMIN").length ?? 0;

  const filteredMembers = members?.filter((member) => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? [];

  return (
    <div className="bg-background text-slate-800 space-y-8 min-h-screen">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Team Operations</h1>
          <p className="text-slate-500 text-sm font-medium">Registered account operators with access to Sentinel platform</p>
        </div>
      </header>

      {error && (
        <p className="text-sm font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-6 py-4">
          {error} — this page requires an admin account.
        </p>
      )}

      {/* KPI stats section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Accounts", val: members ? String(members.length) : "—", icon: Users, color: "text-violet-600" },
          { label: "Admins", val: String(adminCount), icon: ShieldCheck, color: "text-teal-600" },
          { label: "Security Status", val: "Live Data", icon: Activity, color: "text-violet-500" },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <TiltCard className="p-6 h-full group hover:border-violet-300">
              <card.icon className={`w-6 h-6 mb-4 transition-colors ${card.color}`} />
              <p className="text-3xl font-black text-slate-850 tracking-tight">{card.val}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">{card.label}</p>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      {/* Main Table view */}
      <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xl shadow-slate-100/40">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-violet-500 transition-colors" />
            <input
              className="bg-white border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs w-72 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 outline-none text-slate-800 transition-all placeholder:text-slate-400 font-semibold"
              placeholder="Filter team members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {members === null ? (
          <p className="p-8 text-sm text-slate-500 font-semibold">Loading team members...</p>
        ) : filteredMembers.length === 0 ? (
          <p className="p-8 text-sm text-slate-500 font-semibold select-none text-center">No team members match your filter criteria.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-8 py-5">Identity</th>
                  <th className="px-8 py-5">Access Level</th>
                  <th className="px-8 py-5">Joined</th>
                  <th className="px-8 py-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-50/60 transition-all group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center font-black text-violet-600 text-sm shadow-inner shrink-0">
                          {member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 group-hover:text-violet-600 transition-colors">{member.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono font-bold mt-0.5">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-700 font-bold">{member.role}</span>
                        {member.role === "ADMIN" && <BadgeCheck className="w-3.5 h-3.5 text-violet-500" />}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs text-slate-500 font-mono">
                      {new Date(member.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wide ${
                          member.is_active 
                            ? "bg-teal-50 border-teal-100 text-teal-700" 
                            : "bg-slate-100 border-slate-200 text-slate-500"
                        }`}>
                          {member.is_active ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Role Notice */}
      <div className="p-8 bg-violet-50/50 border border-violet-200/50 rounded-3xl shadow-sm">
        <Key className="w-8 h-8 text-violet-500 mb-4" />
        <h4 className="text-lg font-black text-slate-800 mb-1.5">Role-Based System Access</h4>
        <p className="text-xs text-slate-500 leading-relaxed font-semibold">
          Access privileges displayed reflect system-level security groups. Promoting or demoting account scopes must be authorized and processed by an administrator directly inside database controls.
        </p>
      </div>
    </div>
  );
}