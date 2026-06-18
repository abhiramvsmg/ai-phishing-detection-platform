"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  Building2, 
  ArrowRight, 
  Check, 
  Loader2, 
  Shield, 
  Zap, 
  Globe,
  CheckCircle2
} from "lucide-react";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRequirements = [
    { label: "At least 8 characters", met: password.length >= 8 },
    { label: "Contains a number", met: /\d/.test(password) },
    { label: "Special character", met: /[^A-Za-z0-9]/.test(password) },
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
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left Side: Visual/Marketing - Hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:20px_20px]" />
        </div>
        
        <div className="relative z-10 max-w-lg">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-3 text-white">
              <div className="h-10 w-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <ShieldCheck size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight">PhishShield AI</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white leading-tight">
                Secure your enterprise against next-gen threats.
              </h2>
              <p className="text-slate-400 text-lg">
                Join 500+ security teams using AI-driven analysis to stop phishing before it reaches the inbox.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 pt-8">
              {[
                { icon: Zap, title: "Real-time Analysis", desc: "Scan URLs and emails in under 2 seconds." },
                { icon: Shield, title: "SOC2 Compliant", desc: "Enterprise-grade data protection and privacy." },
                { icon: Globe, title: "Global Intelligence", desc: "Fed by millions of threat signals daily." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-12 w-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-indigo-400">
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side: Registration Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-slate-50/50">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-[480px]"
        >
          <div className="bg-white border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Check your inbox</h2>
                  <p className="text-slate-500 mb-8">
                    We've sent a verification link to your work email. Please click it to activate your security dashboard.
                  </p>
                  <Link 
                    href="/login" 
                    className="inline-flex items-center justify-center w-full bg-slate-900 text-white rounded-xl py-4 font-bold hover:bg-slate-800 transition-all"
                  >
                    Go to Login
                  </Link>
                </motion.div>
              ) : (
                <div className="p-8 lg:p-10">
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
                    <p className="text-slate-500 text-sm mt-1">Start your 14-day full-access trial today.</p>
                  </div>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                          <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" placeholder="John" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Last Name</label>
                        <div className="relative">
                          <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" placeholder="Doe" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" placeholder="john@company.com" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Organization</label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" placeholder="Acme Security Corp" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                        <input 
                          required 
                          type="password" 
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all" 
                          placeholder="••••••••" 
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 px-1">
                        {passwordRequirements.map((req, i) => (
                          <div key={i} className="flex items-center gap-1.5">
                            <div className={`h-3.5 w-3.5 rounded-full flex items-center justify-center ${req.met ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
                              <Check size={10} strokeWidth={4} />
                            </div>
                            <span className={`text-[10px] font-medium ${req.met ? 'text-emerald-600' : 'text-slate-400'}`}>
                              {req.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-indigo-600 text-white rounded-xl py-4 font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-70"
                      >
                        {isLoading ? (
                          <Loader2 className="animate-spin" size={20} />
                        ) : (
                          <>
                            Create Security Account
                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <p className="text-center text-sm text-slate-500">
                      Already have an account?{" "}
                      <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-700">
                        Sign in instead
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
          
          <p className="text-center mt-8 text-[11px] text-slate-400 leading-relaxed px-4">
            By creating an account, you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>. All data is encrypted using AES-256 standards.
          </p>
        </motion.div>
      </div>
    </div>
  );
}