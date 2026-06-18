"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Correct hook for Next.js 13+
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  AlertCircle,
  Loader2,
  CheckCircle2,
  Building2,
  Key,
  Fingerprint
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [email, setEmail] = useState("");

  // Handle the actual redirect logic
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        router.push("/dashboard"); // Redirects to your dashboard page
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate Enterprise Auth API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Requirement 5: Cybersecurity Particle Background (CSS version) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[420px] z-10"
      >
        {/* Branding */}
        <div className="flex flex-col items-center mb-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="h-14 w-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/20 mb-4 border border-white/10"
          >
            <ShieldCheck className="text-white" size={32} />
          </motion.div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Console Access</h1>
          <p className="text-slate-500 text-sm mt-1 font-mono uppercase tracking-widest text-[10px]">Security Protocol v4.0 Active</p>
        </div>

        {/* Requirement 4: Glassmorphism Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-10 text-center"
              >
                <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/20">
                  <CheckCircle2 size={40} className="animate-pulse" />
                </div>
                <h2 className="text-xl font-bold text-white mb-2">Access Granted</h2>
                <p className="text-slate-400 text-sm mb-8 font-mono">Initializing secure session...</p>
                
                {/* Visual Progress Bar */}
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                    className="h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                  />
                </div>
              </motion.div>
            ) : (
              <div className="p-8">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                      Identity Provider Email
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                        <Mail size={18} />
                      </div>
                      <input
                        required
                        type="email"
                        placeholder="analyst@company.com"
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white placeholder:text-slate-600"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                        Security Token
                      </label>
                      <Link href="#" className="text-[10px] font-bold text-blue-500 hover:text-blue-400 uppercase">
                        Recovery?
                      </Link>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                        <Lock size={18} />
                      </div>
                      <input
                        required
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-white placeholder:text-slate-600"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 text-white rounded-xl py-3.5 font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-500/10 transition-all active:scale-[0.98] disabled:opacity-70 group"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      <>
                        Authenticate
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/5"></div>
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                    <span className="bg-[#0f172a] px-4 text-slate-500">SSO Gateways</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 border border-white/10 rounded-xl py-3 text-[10px] font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-all uppercase tracking-tighter">
                    <Building2 size={14} />
                    SAML 2.0
                  </button>
                  <button className="flex items-center justify-center gap-2 border border-white/10 rounded-xl py-3 text-[10px] font-bold text-slate-400 hover:bg-white/5 hover:text-white transition-all uppercase tracking-tighter">
                    <Fingerprint size={14} />
                    Azure AD
                  </button>
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* Requirement 9: Security Health Monitoring (Footer version) */}
          {!isSuccess && (
            <div className="px-8 py-4 bg-black/20 border-t border-white/5 flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mt-1.5" />
              <p className="text-[10px] text-slate-500 leading-relaxed font-mono">
                System status: <span className="text-blue-500">Operational</span>. 
                IP logging enabled. Unauthorized attempts are reported to Cyber Command.
              </p>
            </div>
          )}
        </div>

        <p className="text-center mt-8 text-xs text-slate-500">
          Need an environment?{" "}
          <Link href="/register" className="font-bold text-blue-500 hover:text-blue-400">
            Provision New Instance
          </Link>
        </p>
      </motion.div>
    </div>
  );
}