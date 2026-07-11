"use client";

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  BellRing,
  CheckCircle,
  Copy,
  Mail,
  Building,
  Key,
  BadgeAlert,
  Sliders,
  DollarSign,
  AlertTriangle
} from 'lucide-react';
import { TiltCard } from '@/components/ui/TiltCard';
import { getSession, subscribeToAuth } from '@/lib/auth-client';

export default function SettingsPage() {
  const session = useSyncExternalStore(subscribeToAuth, getSession, () => null);
  const [activeTab, setActiveTab] = useState('profile'); // Default to profile tab

  // Profile Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Populate form with session data when loaded
  useEffect(() => {
    if (session) {
      setFullName(session.fullName);
      setEmail(session.email);
      setCompany(session.company || "Enterprise Operator");
    }
  }, [session]);

  // Security Toggles
  const [mfaEnabled, setMfaEnabled] = useState(true);
  const [geoEnabled, setGeoEnabled] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("8h");

  // Notifications Toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [slackUrl, setSlackUrl] = useState("https://hooks.slack.com/services/sentinel-alerts");
  const [alertThreshold, setAlertThreshold] = useState("HIGH");

  // API Configs
  const [copiedToken, setCopiedToken] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("https://siem-collector.internal-sec.io/logs");
  const [webhookEvent, setWebhookEvent] = useState("Threat.Identified");

  // Interactive Action Feedbacks
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const navItems = [
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'security', label: 'Hardening & Security', icon: Shield },
    { id: 'notifications', label: 'Alert Routing', icon: BellRing },
    { id: 'api', label: 'Neural API / Webhooks', icon: Cpu },
    { id: 'billing', label: 'Subscription', icon: CreditCard },
  ];

  const handleCopyToken = () => {
    navigator.clipboard.writeText("demo_analyst_token_value_xyz77");
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="bg-background text-slate-850 space-y-8 min-h-screen">
      <header>
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">System Configuration</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Global workspace orchestration and threat-engine protocols</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar & Operator Details */}
        <div className="lg:col-span-4 space-y-6 select-none">
          {/* Operator Mini Profile Card */}
          <div className="p-6 bg-white border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-100/30 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-black text-white text-lg shadow-md border border-white/40">
              {fullName ? fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : "SA"}
            </div>
            <div>
              <p className="font-black text-slate-800 text-base leading-tight">{fullName || "Security Admin"}</p>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider mt-1">{session?.role || "USER"} operator</p>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">{email || "admin@sentinel.test"}</p>
            </div>
          </div>

          <div className="space-y-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSaveStatus(null);
                  }}
                  whileHover={{ x: 4 }}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs uppercase tracking-wider font-bold transition-all border ${
                    isActive
                    ? 'bg-violet-600 text-white border-violet-600 shadow-xl shadow-violet-100/50'
                    : 'bg-white border-slate-200/60 text-slate-600 hover:text-slate-900 hover:border-slate-350 shadow-sm shadow-slate-100/5'
                  }`}
                >
                  <item.icon className={`w-5 h-5 shrink-0 transition-transform ${isActive ? 'scale-110' : 'text-slate-400 group-hover:text-violet-500'}`} />
                  <span>{item.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Configurations Content in 3D Card */}
        <div className="lg:col-span-8">
          <TiltCard
            glowColor="99, 102, 241"
            className="p-8 rounded-3xl bg-white border border-slate-200/60 shadow-xl shadow-slate-100/40 relative overflow-hidden"
            maxRotation={1}
            depthZ={5}
          >
            <div className="cyber-grid absolute inset-0 pointer-events-none opacity-20" />
            <form onSubmit={handleSaveSettings} className="relative z-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  
                  {/* USER PROFILE TAB */}
                  {activeTab === 'profile' && (
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                        <User className="w-5 h-5 text-violet-500" />
                        <h3 className="text-lg font-black text-slate-850 uppercase tracking-tight">User Account Profile</h3>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Operator Name</label>
                          <div className="relative">
                            <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                            <input 
                              type="text" 
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="w-full bg-slate-50 focus:bg-white border border-slate-250 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold focus:outline-none text-slate-800 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                            <input 
                              type="email" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-slate-50 focus:bg-white border border-slate-250 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold focus:outline-none text-slate-800 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Workspace Organization</label>
                          <div className="relative">
                            <Building className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                            <input 
                              type="text" 
                              value={company}
                              onChange={(e) => setCompany(e.target.value)}
                              className="w-full bg-slate-50 focus:bg-white border border-slate-250 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 rounded-xl py-3 pl-10 pr-4 text-xs font-semibold focus:outline-none text-slate-800 transition-all"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Security Access Role</label>
                          <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-violet-500" />
                            <span>{session?.role || "USER"} (Read-Only Access level)</span>
                          </div>
                        </div>
                      </div>

                      {/* Password Hardening Area */}
                      <div className="pt-6 border-t border-slate-100 space-y-4">
                        <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                          <Key className="w-4.5 h-4.5 text-violet-500" />
                          Update Security Credentials
                        </h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <input 
                            type="password"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-250 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 rounded-xl p-3 text-xs font-semibold focus:outline-none text-slate-800 transition-all"
                          />
                          <input 
                            type="password"
                            placeholder="New Secure Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-250 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 rounded-xl p-3 text-xs font-semibold focus:outline-none text-slate-800 transition-all"
                          />
                          <input 
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-slate-50 focus:bg-white border border-slate-250 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 rounded-xl p-3 text-xs font-semibold focus:outline-none text-slate-800 transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* HARDENING & SECURITY TAB */}
                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-violet-500 animate-pulse" />
                        <h3 className="text-lg font-black text-slate-850 uppercase tracking-tight">Session Hardening & Security</h3>
                      </div>
                      
                      <div className="space-y-3">
                        {/* Hardware MFA */}
                        <div 
                          onClick={() => setMfaEnabled(!mfaEnabled)}
                          className="flex items-center justify-between p-5 bg-slate-50 hover:bg-white border border-slate-200 hover:border-violet-300 rounded-2xl transition-all duration-300 cursor-pointer group shadow-sm"
                        >
                          <div className="flex gap-4">
                            <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl text-teal-600 shadow-inner shrink-0 group-hover:bg-teal-100 transition-colors">
                              <Smartphone className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-850 text-sm">Hardware MFA (FIDO2)</p>
                              <p className="text-xs text-slate-500 mt-1 font-semibold">Require physical security key signatures (YubiKey) for access.</p>
                            </div>
                          </div>
                          <div className={`w-12 h-6 rounded-full relative cursor-pointer shadow-inner shrink-0 transition-colors duration-300 ${mfaEnabled ? 'bg-violet-600' : 'bg-slate-300'}`}>
                            <motion.div 
                              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                              animate={{ left: mfaEnabled ? '26px' : '4px' }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          </div>
                        </div>

                        {/* Geofencing */}
                        <div 
                          onClick={() => setGeoEnabled(!geoEnabled)}
                          className="flex items-center justify-between p-5 bg-slate-50 hover:bg-white border border-slate-200 hover:border-violet-300 rounded-2xl transition-all duration-300 cursor-pointer group shadow-sm"
                        >
                          <div className="flex gap-4">
                            <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-amber-600 shadow-inner shrink-0 group-hover:bg-amber-100 transition-colors">
                              <Globe className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-855 text-sm">Geofencing Enforcer</p>
                              <p className="text-xs text-slate-500 mt-1 font-semibold">Restrict dashboard authorization to corporate IP zones.</p>
                            </div>
                          </div>
                          <div className={`w-12 h-6 rounded-full relative cursor-pointer shadow-inner shrink-0 transition-colors duration-300 ${geoEnabled ? 'bg-violet-600' : 'bg-slate-300'}`}>
                            <motion.div 
                              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                              animate={{ left: geoEnabled ? '26px' : '4px' }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          </div>
                        </div>

                        {/* Session Timeout */}
                        <div className="flex items-center justify-between p-5 bg-slate-50 border border-slate-250/80 rounded-2xl shadow-sm">
                          <div className="flex gap-4">
                            <div className="p-3 bg-violet-50 border border-violet-100 rounded-xl text-violet-600 shadow-inner shrink-0">
                              <Sliders className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-855 text-sm">Session Timeout Interval</p>
                              <p className="text-xs text-slate-500 mt-1 font-semibold">Automatic token revocation window for idle administrator sessions.</p>
                            </div>
                          </div>
                          <select 
                            value={sessionTimeout}
                            onChange={(e) => setSessionTimeout(e.target.value)}
                            className="bg-white border border-slate-250 text-slate-700 text-xs font-bold p-2.5 rounded-xl outline-none focus:border-violet-400 shadow-sm"
                          >
                            <option value="15m">15 Minutes</option>
                            <option value="1h">1 Hour</option>
                            <option value="8h">8 Hours (Default)</option>
                            <option value="24h">24 Hours</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ALERT ROUTING TAB */}
                  {activeTab === 'notifications' && (
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                        <BellRing className="w-5 h-5 text-violet-500" />
                        <h3 className="text-lg font-black text-slate-855 uppercase tracking-tight">Alert Routing & Incident Feeds</h3>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-5 bg-slate-50 hover:bg-white border border-slate-200 hover:border-violet-300 rounded-2xl transition-all duration-300 cursor-pointer group shadow-sm" onClick={() => setEmailAlerts(!emailAlerts)}>
                          <div>
                            <p className="font-bold text-slate-855 text-sm">Real-time Email Notifications</p>
                            <p className="text-xs text-slate-500 mt-1 font-semibold font-sans">Send automated forensic analysis details to team emails on critical alerts.</p>
                          </div>
                          <div className={`w-12 h-6 rounded-full relative cursor-pointer shadow-inner shrink-0 transition-colors duration-300 ${emailAlerts ? 'bg-violet-600' : 'bg-slate-300'}`}>
                            <motion.div 
                              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                              animate={{ left: emailAlerts ? '26px' : '4px' }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-5 bg-slate-50 hover:bg-white border border-slate-200 hover:border-violet-300 rounded-2xl transition-all duration-300 cursor-pointer group shadow-sm" onClick={() => setWeeklyDigest(!weeklyDigest)}>
                          <div>
                            <p className="font-bold text-slate-855 text-sm">Weekly SOC Digest Reports</p>
                            <p className="text-xs text-slate-500 mt-1 font-semibold font-sans">Generate comprehensive PDFs summarizing incidents and vector trends.</p>
                          </div>
                          <div className={`w-12 h-6 rounded-full relative cursor-pointer shadow-inner shrink-0 transition-colors duration-300 ${weeklyDigest ? 'bg-violet-600' : 'bg-slate-300'}`}>
                            <motion.div 
                              className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
                              animate={{ left: weeklyDigest ? '26px' : '4px' }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                          </div>
                        </div>

                        {/* Slack Webhook Integrator */}
                        <div className="p-5 bg-slate-50 border border-slate-250 rounded-2xl shadow-sm space-y-3">
                          <p className="font-bold text-slate-855 text-sm">Enterprise Webhook alert Endpoint</p>
                          <p className="text-xs text-slate-500 font-semibold font-sans">Route notifications in JSON format to your custom endpoint receiver or SIEM platform.</p>
                          <div className="flex gap-3">
                            <input 
                              type="text" 
                              value={slackUrl}
                              onChange={(e) => setSlackUrl(e.target.value)}
                              className="flex-1 bg-white border border-slate-250 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 rounded-xl p-3 text-xs font-mono font-bold text-slate-700 focus:outline-none transition-all shadow-inner"
                            />
                            <select 
                              value={alertThreshold}
                              onChange={(e) => setAlertThreshold(e.target.value)}
                              className="bg-white border border-slate-250 text-slate-700 text-xs font-bold p-3 rounded-xl outline-none focus:border-violet-400 shadow-sm"
                            >
                              <option value="ALL">All Events</option>
                              <option value="MEDIUM">Medium +</option>
                              <option value="HIGH">High Severity</option>
                              <option value="CRITICAL">Critical Only</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* NEURAL API & WEBHOOKS TAB */}
                  {activeTab === 'api' && (
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-violet-500 animate-pulse" />
                        <h3 className="text-lg font-black text-slate-850 uppercase tracking-tight">Neural API & Webhook Configuration</h3>
                      </div>
                      
                      <div className="p-6 bg-violet-50/40 border border-violet-200/60 rounded-3xl relative overflow-hidden shadow-sm">
                        <div className="cyber-grid absolute inset-0 pointer-events-none opacity-20" />
                        <div className="relative">
                          <div className="flex items-center gap-3 text-violet-600 mb-4 select-none">
                            <Cpu className="w-5 h-5 shrink-0 animate-pulse" />
                            <span className="font-black text-xs uppercase tracking-wider">Neural Engine API Integration</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed mb-6 font-mono font-bold">
                            REST API Core Endpoint: <span className="text-slate-800 font-bold select-all">https://api.sentinel-phish.io/v1/analyze</span>
                          </p>
                          <div className="relative p-4 bg-white border border-slate-200 rounded-2xl flex items-center justify-between shadow-sm hover:border-violet-300 transition-colors">
                            <div className="min-w-0 flex-1 pr-4">
                              <p className="text-[9px] font-black text-slate-455 uppercase tracking-widest mb-1 select-none">Developer API Token (Demo Mode)</p>
                              <code className="text-xs font-mono text-violet-600 font-bold select-all truncate block">demo_analyst_token_value_xyz77</code>
                            </div>
                            <button 
                              type="button"
                              onClick={handleCopyToken}
                              className={`p-2.5 rounded-xl border transition-all shrink-0 active:scale-90 ${copiedToken ? 'bg-teal-50 border-teal-200 text-teal-600' : 'bg-slate-50 hover:bg-violet-50 border-slate-200 text-violet-600'}`}
                            >
                              {copiedToken ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest select-none">Active Webhook Listeners</h4>
                        
                        <div className="space-y-3">
                          <div className="flex flex-col sm:flex-row gap-3">
                            <input 
                              type="text" 
                              value={webhookUrl}
                              onChange={(e) => setWebhookUrl(e.target.value)}
                              placeholder="Webhook URL Target"
                              className="flex-1 bg-slate-50 focus:bg-white border border-slate-250 focus:border-violet-400 focus:ring-4 focus:ring-violet-100 rounded-xl p-3 text-xs font-mono text-slate-700 focus:outline-none transition-all shadow-inner"
                            />
                            <select 
                              value={webhookEvent}
                              onChange={(e) => setWebhookEvent(e.target.value)}
                              className="bg-white border border-slate-250 text-slate-700 text-xs font-bold p-3 rounded-xl outline-none focus:border-violet-400 shadow-sm"
                            >
                              <option value="Threat.Identified">Threat.Identified</option>
                              <option value="Scan.Completed">Scan.Completed</option>
                              <option value="System.Alert">System.Alert</option>
                            </select>
                          </div>
                          
                          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between font-mono text-[10px] shadow-sm hover:border-violet-300 transition-colors">
                            <span className="text-slate-600 truncate pr-4 font-bold">{webhookUrl}</span>
                            <span className="text-violet-600 font-black uppercase tracking-wider bg-violet-50 border border-violet-100/60 px-2.5 py-1 rounded-lg shrink-0">{webhookEvent}</span>
                          </div>
                        </div>
                        <button type="button" className="w-full py-4 border border-dashed border-slate-350 hover:border-violet-300 rounded-2xl text-[10px] font-black uppercase text-slate-400 hover:text-violet-600 transition-all tracking-wider select-none">
                          Register Webhook Endpoint
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SUBSCRIPTION & BILLING TAB */}
                  {activeTab === 'billing' && (
                    <div className="space-y-6">
                      <div className="border-b border-slate-100 pb-3 flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-violet-500" />
                        <h3 className="text-lg font-black text-slate-855 uppercase tracking-tight">Subscription & Plan Management</h3>
                      </div>

                      {/* Current plan detail */}
                      <div className="p-6 bg-gradient-primary rounded-3xl text-white relative overflow-hidden shadow-lg shadow-violet-100/60">
                        <div className="cyber-grid absolute inset-0 pointer-events-none opacity-20" />
                        <div className="relative space-y-4">
                          <div className="flex justify-between items-center select-none">
                            <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full border border-white/10">Active Subscription</span>
                            <span className="text-xs font-bold font-mono">ID: sub_18f27asb</span>
                          </div>
                          <div>
                            <h4 className="text-2xl font-black tracking-tight">Sentinel Enterprise Core</h4>
                            <p className="text-xs text-white/80 mt-1 font-semibold">Fully managed multi-agent AI scanning and automated threat routing.</p>
                          </div>
                          <div className="flex justify-between items-end border-t border-white/10 pt-4">
                            <div>
                              <p className="text-[9px] font-black uppercase tracking-wider text-white/60">Subscription Cost</p>
                              <p className="text-2xl font-black tracking-tight mt-0.5">$299<span className="text-sm font-semibold">/mo</span></p>
                            </div>
                            <span className="text-xs font-bold font-sans">Next renewal: July 28, 2026</span>
                          </div>
                        </div>
                      </div>

                      {/* Upgrade Plan Selection Grid */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-black text-slate-455 uppercase tracking-widest select-none">Upgrade Workspace Scope</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between hover:border-violet-300 transition-colors shadow-sm">
                            <div>
                              <h5 className="font-black text-sm text-slate-800 uppercase tracking-tight">Pro Plan</h5>
                              <p className="text-[10px] text-slate-500 font-semibold mt-1">For growing teams requiring robust API access and historical logs.</p>
                              <p className="text-xl font-black text-violet-600 mt-3">$99<span className="text-xs font-normal">/mo</span></p>
                            </div>
                            <button type="button" className="mt-4 w-full py-2 bg-white border border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[9px] rounded-xl hover:bg-slate-50 active:scale-95 transition-all">
                              Downgrade Plan
                            </button>
                          </div>

                          <div className="p-5 bg-violet-50/20 border border-violet-200/50 rounded-2xl flex flex-col justify-between hover:border-violet-350 transition-colors shadow-sm relative">
                            <span className="absolute -top-2.5 -right-2 bg-violet-600 text-white font-black uppercase tracking-wider text-[8px] px-2 py-0.5 rounded-full shadow-sm">Current Plan</span>
                            <div>
                              <h5 className="font-black text-sm text-slate-800 uppercase tracking-tight">Enterprise Core</h5>
                              <p className="text-[10px] text-slate-500 font-semibold mt-1">For SOC operations needing global API endpoints and live observers.</p>
                              <p className="text-xl font-black text-violet-600 mt-3">$299<span className="text-xs font-normal">/mo</span></p>
                            </div>
                            <button type="button" disabled className="mt-4 w-full py-2 bg-violet-100 text-violet-600 font-black uppercase tracking-wider text-[9px] rounded-xl transition-all select-none">
                              Active
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Persist Changes Footer */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between select-none">
                    <div className="flex items-center gap-2 min-w-0">
                      {saveStatus === "saving" && (
                        <div className="flex items-center gap-2 text-violet-500 font-bold text-xs">
                          <Sliders className="w-4 h-4 animate-spin" />
                          <span>Saving parameters...</span>
                        </div>
                      )}
                      {saveStatus === "saved" && (
                        <div className="flex items-center gap-2 text-teal-600 font-bold text-xs animate-pulse">
                          <CheckCircle className="w-4 h-4" />
                          <span>Configurations synchronized.</span>
                        </div>
                      )}
                      {!saveStatus && (
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider italic">
                          Demo Mode: Changes are temporary
                        </p>
                      )}
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={saveStatus === "saving"}
                      className="px-8 py-3.5 bg-gradient-to-r from-primary to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-violet-100 active:scale-95 select-none disabled:opacity-50"
                    >
                      Persist Changes
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>
            </form>
          </TiltCard>
        </div>
      </div>
    </div>
  );
}