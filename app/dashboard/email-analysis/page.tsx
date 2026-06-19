"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Mail, 
  ShieldAlert, 
  Fingerprint, 
  Globe, 
  ChevronRight, 
  Cpu,
  History,
  AlertCircle,
  FileSearch,
  Link2,
  Trash2,
  ShieldCheck
} from 'lucide-react';

export default function EmailAnalysisPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const startAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            AI Forensic Laboratory
          </h1>
          <p className="text-slate-400 mt-1 italic font-mono text-sm tracking-tight">System version: v4.2.0-Alpha (Neural Core)</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Submission Panel */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 rounded-3xl bg-slate-900/40 border border-slate-800 backdrop-blur-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <FileSearch className="w-32 h-32" />
              </div>
              
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-400" />
                Raw Email Submission
              </h3>
              
              <div className="space-y-5">
                <div className="relative group">
                  <textarea 
                    placeholder="Paste full email headers or content here for neural processing..."
                    className="w-full h-56 bg-slate-950/50 border border-slate-800 rounded-2xl p-6 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all resize-none"
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Format: RFC 5322</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-4">
                    <button 
                      onClick={startAnalysis}
                      disabled={isAnalyzing}
                      className="px-8 py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 rounded-xl font-black transition-all flex items-center gap-3 shadow-lg shadow-blue-600/20 text-sm uppercase tracking-wider"
                    >
                      {isAnalyzing ? (
                        <>
                          <Cpu className="w-4 h-4 animate-spin" />
                          Running Forensics...
                        </>
                      ) : (
                        <>
                          <Fingerprint className="w-4 h-4" />
                          Initiate Deep Scan
                        </>
                      )}
                    </button>
                    <button className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-all text-sm flex items-center gap-2 border border-slate-700">
                      Upload .msg / .eml
                    </button>
                  </div>
                  <button className="p-3.5 text-slate-500 hover:text-rose-500 transition-colors">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {showResult && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/20 relative">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-rose-500/20 rounded-lg">
                        <ShieldAlert className="w-6 h-6 text-rose-500" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-black text-rose-500 text-lg uppercase tracking-tighter">Verdict: Malicious</span>
                        <span className="text-[10px] text-rose-400 font-bold">Confidence: 98.4%</span>
                      </div>
                    </div>
                    <ul className="space-y-4 text-xs font-medium">
                      <li className="flex gap-3 text-slate-300 items-start">
                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 shrink-0" />
                        Homograph domain attack: "rnicrosoft.com" instead of "microsoft.com"
                      </li>
                      <li className="flex gap-3 text-slate-300 items-start">
                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 shrink-0" />
                        Payload hidden in QR code redirection to credential harvester.
                      </li>
                      <li className="flex gap-3 text-slate-300 items-start">
                        <div className="w-1.5 h-1.5 bg-rose-500 rounded-full mt-1.5 shrink-0" />
                        Urgency indicators detected in NLP subject line analysis.
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Globe className="w-6 h-6 text-blue-400" />
                      </div>
                      <span className="font-black text-blue-400 text-lg uppercase tracking-tighter">Origin Intelligence</span>
                    </div>
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                        <span className="text-slate-500">Source IP</span>
                        <span className="text-slate-200">185.12.110.42 (Russia)</span>
                      </div>
                      <div className="flex justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                        <span className="text-slate-500">SPF / DKIM</span>
                        <span className="text-rose-500 font-bold">FAIL / FAIL</span>
                      </div>
                      <div className="flex justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                        <span className="text-slate-500">SMTP Relay</span>
                        <span className="text-slate-200">Anon-MTA v2.4</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <History className="w-5 h-5 text-slate-500" />
                Analysis History
              </h3>
              <div className="space-y-3">
                {[
                  { subject: "Urgent: Microsoft 365 Password Reset Required", score: 94, date: "2m ago", sender: "security@rnicrosoft.com" },
                  { subject: "Invoice #INV-2024-8829-AQ1", score: 12, date: "1h ago", sender: "billing@acme.com" },
                  { subject: "New Login Detected from Berlin, DE", score: 88, date: "4h ago", sender: "verify@secure-auth.io" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-950/30 border border-slate-800 rounded-2xl hover:border-slate-600 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 rounded-xl ${item.score > 50 ? 'bg-rose-500/10 text-rose-500' : 'bg-emerald-500/10 text-emerald-400'}`}>
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold group-hover:text-blue-400 transition-colors">{item.subject}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter mt-0.5">{item.sender} • {item.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className={`text-lg font-black ${item.score > 50 ? 'text-rose-500' : 'text-emerald-400'}`}>{item.score}</p>
                        <p className="text-[10px] text-slate-600 uppercase font-black tracking-tighter">Score</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-white transition-all" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Explanation Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-3xl bg-blue-600/5 border border-blue-600/20 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 opacity-10">
                <Cpu className="w-40 h-40" />
              </div>
              <h3 className="text-lg font-black mb-6 flex items-center gap-2 text-blue-400 uppercase tracking-widest">
                <Cpu className="w-5 h-5" />
                Copilot Analysis
              </h3>
              <div className="prose prose-invert prose-sm">
                <p className="text-slate-400 leading-relaxed">
                  The AI core detected <span className="text-white font-bold underline decoration-blue-500 underline-offset-4 tracking-tight">Active Social Engineering</span> tactics. 
                </p>
                <div className="mt-6 space-y-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-2 uppercase">
                      <AlertCircle className="w-4 h-4 text-amber-500" /> Psychological Trigger
                    </div>
                    <p className="text-xs text-slate-400 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                      "Immediate action required" - Classic time-pressure stressor used to bypass cognitive critical thinking.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-200 mb-2 uppercase">
                      <Link2 className="w-4 h-4 text-rose-500" /> Obfuscated URL
                    </div>
                    <p className="text-xs text-slate-400 bg-slate-950/50 p-3 rounded-xl border border-slate-800">
                      URL is base64 encoded and wrapped in 4 recursive redirects to hide the final PHP credential harvest script.
                    </p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-800">
                  <button className="w-full py-3 bg-slate-800 hover:bg-slate-700 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
                    Generate Forensic PDF
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Internal Flags</h4>
              <div className="space-y-2">
                {['MFA Bypass Attempt', 'Corporate Impersonation', 'Malicious Scripting'].map(flag => (
                  <div key={flag} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-[10px] font-bold text-slate-400">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" />
                    {flag}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}