"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, Mail, Lock, User, Building2, ArrowRight, 
  Check, Loader2, Shield, Zap, Globe, CheckCircle2, 
  Terminal, Activity, Fingerprint
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRequirements = [
    { label: "MIN_LENGTH: 8", met: password.length >= 8 },
    { label: "REQ_NUMERIC: 1", met: /\d/.test(password) },
    { label: "REQ_SYMBOL: 1", met: /[^A-Za-z0-9]/.test(password) },
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col lg:flex-row font-sans selection:bg-blue-500/30">
      
      {/* LEFT SIDE: Mission Briefing / Threat Visuals */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#020617] relative overflow-hidden items-center justify-center p-12 border-r border-white/5">
        {/* Requirement 5: Cyber Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/10 via-transparent to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-lg">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-2xl shadow-blue-500/20 border border-white/10">
                <ShieldCheck className="text-white" size={28} />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white uppercase">PHISH-AI <span className="text-blue-500 text-sm font-mono">SYSTEMS</span></span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white leading-tight tracking-tight">
                Secure the human <br />perimeter at scale.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Deploy autonomous phishing detection across your global workforce in minutes.
              </p>
            </div>

            {/* Requirement 7: Dashboard Widgets (Mini versions) */}
            <div className="grid grid-cols-1 gap-4 pt-4">
              {[
                { icon: Zap, title: "LLM INFERENCE", desc: "Real-time intent analysis engine." },
                { icon: Fingerprint, title: "ZERO-TRUST", desc: "Biometric and MFA integration ready." },
                { icon: Activity, title: "LIVE TELEMETRY", desc: "Fed by 50M+ global threat signals." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white/5 border border-white/5 rounded-2xl backdrop-blur-sm">
                  <div className="h-10 w-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-400">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="text-white text-xs font-black uppercase tracking-widest">{item.title}</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed mt-1 font-mono">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* RIGHT SIDE: Registration Gate */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative">
        {/* Mobile Background Glow */}
        <div className="lg:hidden absolute top-0 left-0 w-full h-64 bg-blue-600/10 blur-[100px]" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[500px] z-10"
        >
          {/* Requirement 4: Glassmorphism Card */}
          <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 text-center"
                >
                  <div className="w-20 h-20 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                    <CheckCircle2 size={40} className="animate-pulse" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">Provisioning Started</h2>
                  <p className="text-slate-400 text-sm mb-10 leading-relaxed font-mono">
                    Check your work email to verify your identity and activate your cloud node.
                  </p>
                  <Link 
                    href="/login" 
                    className="flex items-center justify-center w-full bg-blue-600 text-white rounded-xl py-4 font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                  >
                    Return to Login
                  </Link>
                </motion.div>
              ) : (
                <div className="p-8 lg:p-12">
                  <div className="mb-10">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Start Protection</h1>
                    <p className="text-slate-500 text-xs font-mono mt-2 uppercase tracking-widest">Instance: US-EAST-1 (PROVISIONING)</p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Given Name</label>
                        <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white outline-none" placeholder="First" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Surname</label>
                        <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white outline-none" placeholder="Last" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Corporation Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                        <input required type="email" className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white outline-none" placeholder="name@company.com" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Asset Group</label>
                      <div className="relative">
                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                        <input required type="text" className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white outline-none" placeholder="Organization Name" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Security Token (PWD)</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                        <input 
                          required 
                          type="password" 
                          className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white outline-none" 
                          placeholder="••••••••" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      
                      {/* Password Requirement Checklist */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3 px-1">
                        {passwordRequirements.map((req, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className={`h-1.5 w-1.5 rounded-full ${req.met ? 'bg-blue-500 shadow-[0_0_8px_#3b82f6]' : 'bg-slate-700'}`} />
                            <span className={`text-[9px] font-mono font-bold tracking-tighter ${req.met ? 'text-blue-400' : 'text-slate-600'}`}>
                              {req.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-70 group"
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin" size={20} />
                        ) : (
                          <>
                            DEPLOY ACCOUNT
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  <div className="mt-10 pt-8 border-t border-white/5">
                    <p className="text-center text-xs text-slate-500 uppercase font-bold tracking-widest">
                      Existing Operator?{" "}
                      <Link href="/login" className="text-blue-500 hover:text-blue-400">
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="mt-8 flex items-center gap-4 justify-center">
            <Shield className="text-slate-700" size={16} />
            <p className="text-[10px] text-slate-600 font-mono leading-relaxed max-w-xs">
              TLS 1.3 / AES-256 Encryption Standard Active. Account provisioning subject to identity verification.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}