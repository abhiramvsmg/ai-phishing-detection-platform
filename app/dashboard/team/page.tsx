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
  ShieldAlert,
} from 'lucide-react';
import { api, AdminUser } from '@/lib/api';

export default function TeamPage() {
  const [members, setMembers] = useState<AdminUser[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.admin
      .listUsers()
      .then(setMembers)
      .catch((err) => setError(err.message ?? "Failed to load team members"));
  }, []);

  const adminCount = members?.filter((m) => m.role === "ADMIN").length ?? 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent uppercase tracking-tighter">
              Team Operations
            </h1>
            <p className="text-slate-400 font-medium">Registered accounts with access to this platform.</p>
          </div>
        </header>

        {error && (
          <p className="text-sm text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-2xl px-6 py-4">
            {error} — this page requires an admin account.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Total Accounts", val: members ? String(members.length) : "—", icon: Users },
            { label: "Admins", val: String(adminCount), icon: ShieldCheck },
            { label: "Status", val: "Live Data", icon: Activity },
          ].map((card) => (
            <div key={card.label} className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 group hover:border-slate-700 transition-all">
              <card.icon className="w-5 h-5 text-slate-500 mb-4 group-hover:text-blue-500 transition-colors" />
              <p className="text-3xl font-black tracking-tight">{card.val}</p>
              <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest mt-1">{card.label}</p>
            </div>
          ))}
        </div>

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

          {members === null ? (
            <p className="p-8 text-sm text-slate-500">Loading team members...</p>
          ) : (
            <table className="w-full text-left">
              <thead className="bg-slate-950/50 text-slate-500 text-[10px] uppercase font-black tracking-widest border-b border-slate-800">
                <tr>
                  <th className="px-8 py-5">Identity</th>
                  <th className="px-8 py-5">Access Level</th>
                  <th className="px-8 py-5">Joined</th>
                  <th className="px-8 py-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-slate-800/20 transition-all group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600/40 to-slate-800 border border-blue-500/30 flex items-center justify-center font-black text-blue-200">
                          {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
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
                        {member.role === "ADMIN" && <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-xs text-slate-500 font-mono">
                      {new Date(member.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${member.is_active ? 'bg-emerald-500' : 'bg-slate-600'}`} />
                        <span className="text-[10px] font-bold text-slate-500 uppercase">{member.is_active ? "Active" : "Inactive"}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-8 rounded-3xl bg-blue-600/5 border border-blue-600/20">
          <Key className="w-8 h-8 text-blue-400 mb-4" />
          <h4 className="text-lg font-black mb-2">Role-Based Access</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Access levels shown above reflect real account roles. Role management (promote/demote) is not yet available from this UI — contact a database administrator to change a user&apos;s role.
          </p>
        </div>
      </div>
    </div>
  );
}