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
import { api } from '@/lib/api';
import { ScanResult } from '@/lib/types';

export default function EmailAnalysisPage() {
  const [emailText, setEmailText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const startAnalysis = async () => {
    if (!emailText.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const scan = await api.scans.scanEmail({ email_text: emailText });
      setResult(scan);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed. Are you logged in?");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isMalicious = result?.result === "PHISHING";

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
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    placeholder="Paste full email headers or content here for neural processing..."
                    className="w-full h-56 bg-slate-950/50 border border-slate-800 rounded-2xl p-6 font-mono text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all resize-none"
                  />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Format: RFC 5322</span>
                  </div>
                </div>

                {error && (
                  <p className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3">
                    {error}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex gap-4">
                    <button
                      onClick={startAnalysis}
                      disabled={isAnalyzing || !emailText.trim()}
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
                  </div>
                  <button
                    onClick={() => { setEmailText(""); setResult(null); setError(null); }}
                    className="p-3.5 text-slate-500 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>

            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div className={`p-6 rounded-2xl border relative ${
                    isMalicious ? "bg-rose-500/10 border-rose-500/20" : "bg-emerald-500/10 border-emerald-500/20"
                  }`}>
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-2 rounded-lg ${isMalicious ? "bg-rose-500/20" : "bg-emerald-500/20"}`}>
                        {isMalicious ? (
                          <ShieldAlert className="w-6 h-6 text-rose-500" />
                        ) : (
                          <ShieldCheck className="w-6 h-6 text-emerald-500" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className={`font-black text-lg uppercase tracking-tighter ${isMalicious ? "text-rose-500" : "text-emerald-500"}`}>
                          Verdict: {isMalicious ? "Malicious" : "Safe"}
                        </span>
                        <span className={`text-[10px] font-bold ${isMalicious ? "text-rose-400" : "text-emerald-400"}`}>
                          Risk score: {result.risk_score}/100 ({result.risk_level})
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">
                      Detailed indicator breakdown coming soon — current engine returns an overall verdict and risk score only.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Globe className="w-6 h-6 text-blue-400" />
                      </div>
                      <span className="font-black text-blue-400 text-lg uppercase tracking-tighter">Scan Details</span>
                    </div>
                    <div className="space-y-2 font-mono text-xs">
                      <div className="flex justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                        <span className="text-slate-500">Scan ID</span>
                        <span className="text-slate-200">#{result.id}</span>
                      </div>
                      <div className="flex justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                        <span className="text-slate-500">Scanned At</span>
                        <span className="text-slate-200">{new Date(result.created_at).toLocaleString()}</span>
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
              <p className="text-xs text-slate-500">
                History for this page not yet wired to backend — see the main dashboard&apos;s Recent Threats for real scan history.
              </p>
            </div>
          </div>

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
                <p className="text-slate-400 leading-relaxed text-xs">
                  Detailed per-indicator explanation (psychological triggers, obfuscated URLs, header forensics) is not yet available from the backend — the engine currently returns an overall verdict and risk score.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Internal Flags</h4>
              <p className="text-xs text-slate-500">Not yet available from backend.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}