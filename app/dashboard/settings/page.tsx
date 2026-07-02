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
    <div className="bg-background text-slate-850 space-y-8 min-h-screen">
      <header>
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">System Configuration</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Global workspace orchestration and threat-engine protocols</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all border select-none ${
                activeTab === item.id
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-200/50'
                : 'text-slate-600 hover:bg-white border-transparent hover:border-slate-200/60 shadow-sm shadow-slate-100/10'
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Configurations Content */}
        <div className="lg:col-span-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-8 rounded-3xl bg-white border border-slate-200/60 shadow-xl shadow-slate-100/40"
          >
            {activeTab === 'security' && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-black text-slate-850 uppercase tracking-tight border-b border-slate-100 pb-2">Session Hardening</h3>
                  <div className="space-y-3">
                    {/* Hardware MFA */}
                    <div className="flex items-center justify-between p-5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-indigo-300 transition-colors group">
                      <div className="flex gap-4">
                        <div className="p-3 bg-teal-50 border border-teal-150 rounded-xl text-teal-600 shadow-inner shrink-0">
                          <Smartphone className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">Hardware MFA (FIDO2)</p>
                          <p className="text-xs text-slate-500 mt-1">Require physical security key signatures (YubiKey) for access.</p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer shadow-inner shrink-0 transition-colors">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow" />
                      </div>
                    </div>

                    {/* Geofencing */}
                    <div className="flex items-center justify-between p-5 bg-slate-50 border border-slate-200 rounded-2xl hover:border-indigo-300 transition-colors">
                      <div className="flex gap-4">
                        <div className="p-3 bg-amber-50 border border-amber-150 rounded-xl text-amber-600 shadow-inner shrink-0">
                          <Globe className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">Geofencing Enforcer</p>
                          <p className="text-xs text-slate-500 mt-1">Restrict dashboard authorization to corporate IP zones.</p>
                        </div>
                      </div>
                      <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer shadow-inner shrink-0 transition-colors">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-slate-400 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 space-y-4">
                  <h3 className="text-lg font-black text-slate-850 uppercase tracking-tight">Access Management Protocols</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                      <Lock className="w-6 h-6 text-indigo-500 mb-3" />
                      <h4 className="text-sm font-bold text-slate-800 mb-1">SAML / SSO Single Sign-On</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-4">Okta, Azure AD, Workspace</p>
                      <button className="w-full py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-wider active:scale-95 duration-100 shadow-sm">
                        Configure IdP Identity Provider
                      </button>
                    </div>
                    <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                      <Zap className="w-6 h-6 text-teal-600 mb-3" />
                      <h4 className="text-sm font-bold text-slate-800 mb-1">Automated Session Revoke</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mb-4">AI-driven active rule matching</p>
                      <button className="w-full py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl text-[10px] font-black uppercase tracking-wider active:scale-95 duration-100 shadow-sm">
                        Manage Rule Policies
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-6">
                <div className="p-6 bg-indigo-50/50 border border-indigo-200 rounded-3xl relative overflow-hidden">
                  <div className="flex items-center gap-3 text-indigo-600 mb-4">
                    <Cpu className="w-5 h-5 shrink-0" />
                    <span className="font-black text-xs uppercase tracking-wider">Neural Engine API Integration</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6 font-mono font-medium">
                    REST API Core Endpoint: <span className="text-slate-800 font-bold select-all">https://api.sentinel-phish.io/v1/analyze</span>
                  </p>
                  <div className="relative p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm">
                    <div>
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">Developer API Token (Demo Mode)</p>
                      <code className="text-xs font-mono text-indigo-600 font-bold select-all">demo_analyst_token_value_xyz77</code>
                    </div>
                    <button className="p-2.5 bg-slate-50 hover:bg-indigo-50 border border-slate-200 rounded-xl text-teal-600 shadow-inner transition-colors">
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Active Webhook Listeners</h4>
                  <div className="space-y-2">
                    {[
                      { url: "https://siem-collector.internal-sec.io/logs", event: "Threat.Identified" },
                      { url: "https://hooks.slack.com/services/sentinel-alerts", event: "Critical.Alert" }
                    ].map(hook => (
                      <div key={hook.url} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between font-mono text-[10px] shadow-sm">
                        <span className="text-slate-600 truncate pr-4 font-bold">{hook.url}</span>
                        <span className="text-indigo-600 font-black uppercase tracking-wide bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-lg shrink-0">{hook.event}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3.5 border border-dashed border-slate-300 hover:border-slate-400 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:text-slate-600 transition-all tracking-wider">
                    Register Webhook Endpoint
                  </button>
                </div>
              </div>
            )}

            {(activeTab === 'profile' || activeTab === 'notifications' || activeTab === 'billing') && (
              <div className="py-16 text-center space-y-2">
                <p className="text-sm font-black text-slate-400 uppercase tracking-wider">Configuration Node Offline</p>
                <p className="text-xs text-slate-400">These settings are scheduled to launch in the upcoming platform sprint.</p>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider italic">
                Demo Mode: Changes are temporary
              </p>
              <button className="px-8 py-3.5 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-indigo-150 active:scale-95 duration-100">
                Persist Changes
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}