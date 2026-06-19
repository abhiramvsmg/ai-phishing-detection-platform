"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Lock, 
  Cpu, 
  Globe, 
  Shield, 
  Zap, 
  Check,
  Smartphone,
  CreditCard,
  BellRing
} from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('security');

  const navItems = [
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'security', label: 'Hardening & Security', icon: Shield },
    { id: 'notifications', label: 'Alert Routing', icon: BellRing },
    { id: 'api', label: 'Neural API / Webhooks', icon: Cpu },
    { id: 'billing', label: 'Subscription', icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 lg:p-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <header>
          <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent uppercase tracking-tighter">
            System Configuration
          </h1>
          <p className="text-slate-500 font-medium mt-1">Global workspace orchestration and security protocols.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all border ${
                  activeTab === item.id 
                  ? 'bg-blue-600 text-white border-blue-500 shadow-xl shadow-blue-600/20' 
                  : 'text-slate-400 hover:bg-slate-900 border-transparent hover:border-slate-800'
                }`}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {item.label}
              </button>
            ))}
          </div>

          {/* Settings Content Area */}
          <div className="lg:col-span-8">
            <motion.div 
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-10 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-md"
            >
              {activeTab === 'security' && (
                <div className="space-y-10">
                  <div className="space-y-6">
                    <h3 className="text-xl font-black text-slate-200">Session Hardening</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-5 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-colors group">
                        <div className="flex gap-4">
                          <div className="p-3 bg-emerald-500/10 rounded-xl">
                            <Smartphone className="w-6 h-6 text-emerald-500" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-200">Hardware MFA (FIDO2)</p>
                            <p className="text-xs text-slate-500 mt-1">Require physical Yubikey for analyst logins.</p>
                          </div>
                        </div>
                        <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer shadow-inner">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-5 bg-slate-950/50 rounded-2xl border border-slate-800 group hover:border-amber-500/40 transition-colors">
                        <div className="flex gap-4">
                          <div className="p-3 bg-amber-500/10 rounded-xl">
                            <Globe className="w-6 h-6 text-amber-500" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-200">Geofencing Enforcer</p>
                            <p className="text-xs text-slate-500 mt-1">Restrict dashboard access to approved HQ regions.</p>
                          </div>
                        </div>
                        <div className="w-12 h-6 bg-slate-800 rounded-full relative cursor-pointer">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-slate-500 rounded-full" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 border-t border-slate-800 space-y-6">
                    <h3 className="text-xl font-black text-slate-200">Credential Protocol</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800">
                        <Lock className="w-6 h-6 text-blue-500 mb-3" />
                        <h4 className="text-sm font-bold mb-2">SAML / SSO</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">Okta, Azure AD, G-Suite</p>
                        <button className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase transition-all tracking-widest">
                          Configure IdP
                        </button>
                      </div>
                      <div className="p-6 rounded-2xl bg-slate-950/50 border border-slate-800">
                        <Zap className="w-6 h-6 text-purple-500 mb-3" />
                        <h4 className="text-sm font-bold mb-2">Automated Revoke</h4>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-4">AI-driven session killing</p>
                        <button className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 rounded-xl text-[10px] font-black uppercase transition-all tracking-widest">
                          Active Rules
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'api' && (
                <div className="space-y-8">
                  <div className="p-8 rounded-3xl bg-blue-600/10 border border-blue-500/20">
                    <div className="flex items-center gap-3 text-blue-400 mb-4">
                      <Cpu className="w-6 h-6" />
                      <span className="font-black text-sm uppercase tracking-widest">Neural API Integration</span>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed mb-6 italic font-mono">
                      v4.2 Endpoint: <span className="text-white">api.neural-phish.io/v1/analyze</span>
                    </p>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative p-5 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between overflow-hidden">
                        <div>
                          <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">Production API Key</p>
                          <code className="text-sm font-mono text-blue-300">sk_live_8829_42xk_forensics_secure</code>
                        </div>
                        <button className="p-3 bg-slate-900 hover:bg-slate-800 rounded-xl transition-all">
                          <Check className="w-4 h-4 text-emerald-500" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Outgoing Webhooks</h4>
                    <div className="space-y-3">
                      {[
                        { url: "https://siem-collector.internal.io", event: "Threat.Detected" },
                        { url: "https://hooks.slack.com/services/...", event: "Critical.Alert" }
                      ].map(hook => (
                        <div key={hook.url} className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl flex items-center justify-between font-mono text-[10px]">
                          <span className="text-slate-400 truncate pr-4">{hook.url}</span>
                          <span className="text-blue-500 font-black uppercase tracking-tighter shrink-0">{hook.event}</span>
                        </div>
                      ))}
                    </div>
                    <button className="w-full py-4 border border-dashed border-slate-700 hover:border-slate-500 rounded-2xl text-[10px] font-black uppercase text-slate-500 hover:text-white transition-all tracking-widest">
                      Register Webhook Endpoint
                    </button>
                  </div>
                </div>
              )}

              {/* General footer for all tabs */}
              <div className="mt-12 pt-10 border-t border-slate-800 flex items-center justify-between">
                <p className="text-[10px] text-slate-600 font-black uppercase tracking-widest italic">
                  Last system-wide save: Today at 14:42 UTC
                </p>
                <button className="px-10 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20">
                  Persist Changes
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}