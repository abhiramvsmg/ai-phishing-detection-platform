"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle,
  Loader2,
  CheckCircle2,
  Fingerprint,
  Building2,
  Key
} from "lucide-react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate Enterprise SSO / Auth Logic
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[440px] z-10"
      >
        {/* Logo & Branding */}
        <div className="flex flex-col items-center mb-10">
          <div className="h-12 w-12 bg-indigo-600 rounded-xl flex items-center justify-center shadow-xl shadow-indigo-200 mb-4">
            <ShieldCheck className="text-white" size={28} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Enterprise Access</h1>
          <p className="text-slate-500 text-sm mt-1">AI-Powered Phishing Defense Platform</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60 overflow-hidden">
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-10 text-center"
            >
              <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Authentication Successful</h2>
              <p className="text-slate-500 text-sm mb-8">Redirecting you to the security dashboard...</p>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-emerald-500"
                />
              </div>
            </motion.div>
          ) : (
            <div className="p-8">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">
                    Work Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                      <Mail size={18} />
                    </div>
                    <input
                      required
                      type="email"
                      placeholder="name@company.com"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Password
                    </label>
                    <Link href="#" className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                      <Lock size={18} />
                    </div>
                    <input
                      required
                      type="password"
                      placeholder="••••••••"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-slate-900"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 text-white rounded-xl py-3.5 font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-[0.98] disabled:opacity-70"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      Sign In to Platform
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-4 text-slate-400 font-medium">Or Secure login with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors uppercase tracking-tight">
                  <Building2 size={16} className="text-slate-400" />
                  SAML SSO
                </button>
                <button className="flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors uppercase tracking-tight">
                  <Key size={16} className="text-slate-400" />
                  Azure AD
                </button>
              </div>
            </div>
          )}

          {/* Footer Warning */}
          {!isSuccess && (
            <div className="px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-start gap-3">
              <AlertCircle size={16} className="text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-500 leading-normal">
                This is a secure system. Authorized access only. All activities are monitored and logged for security auditing purposes.
              </p>
            </div>
          )}
        </div>

        <p className="text-center mt-8 text-sm text-slate-500">
          Don't have an account?{" "}
          <Link href="/register" className="font-bold text-indigo-600 hover:text-indigo-700">
            Start free trial
          </Link>
        </p>
      </motion.div>
    </div>
  );
}