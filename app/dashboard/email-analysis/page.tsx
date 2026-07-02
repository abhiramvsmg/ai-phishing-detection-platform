"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Mail,
  ShieldAlert,
  Fingerprint,
  Globe,
  Cpu,
  History,
  Trash2,
  ShieldCheck,
  FileSearch
} from 'lucide-react';
import { api } from '@/lib/api';
import { ScanResult } from '@/lib/types';
import { RadarScanner } from '@/components/ui/RadarScanner';
import { TypewriterText } from '@/components/ui/TypewriterText';

export default function EmailAnalysisPage() {
  const [emailText, setEmailText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<{ threats: string[]; summary: string } | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const startAnalysis = async () => {
    if (!emailText.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    setResult(null);
    setExplanation(null);
    setReportGenerated(false);

    try {
      const scan = await api.scans.scanEmail({ email_text: emailText });
      setResult(scan);

      try {
        const exp = await api.scans.explain(scan.id);
        setExplanation(exp);
      } catch (err) {
        console.error("Failed to load explanation:", err);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed. Are you logged in?");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateReport = async () => {
    if (!result?.id) return;
    setGeneratingReport(true);
    try {
      await api.reports.generate(result.id);
      setReportGenerated(true);
    } catch (err: any) {
      alert("Failed to generate report: " + (err.message ?? err));
    } finally {
      setGeneratingReport(false);
    }
  };

  const isMalicious = result?.result === "PHISHING";

  return (
    <div className="min-h-screen bg-background text-slate-800 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">AI Email Forensics</h1>
        <p className="text-slate-500 text-sm font-medium">Deep-packet email header validation and neural content decoding</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Submission Panel */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-200/60 rounded-3xl p-8 shadow-xl shadow-slate-100/40 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
              <FileSearch className="w-32 h-32 text-slate-900" />
            </div>

            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-500" />
              Raw Email Submission
            </h3>

            <div className="space-y-5">
              <div className="relative group">
                <textarea
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                  placeholder="Paste full email headers, SMTP context, or email body here for neural threat extraction..."
                  className="w-full h-56 bg-slate-50 border border-slate-200 rounded-2xl p-6 font-mono text-xs leading-relaxed focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 transition-all resize-none focus:outline-none text-slate-800 placeholder:text-slate-400"
                />
                <div className="absolute bottom-4 right-4 flex items-center gap-2 select-none">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide">Format: RFC 5322</span>
                </div>
              </div>

              {error && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              <div className="flex flex-wrap gap-4 items-center justify-between">
                <button
                  onClick={startAnalysis}
                  disabled={isAnalyzing || !emailText.trim()}
                  className="px-8 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center gap-3 disabled:opacity-50 text-xs uppercase tracking-wider active:scale-97"
                >
                  {isAnalyzing ? (
                    <>
                      <Cpu className="w-4 h-4 animate-spin" />
                      <span>Running Heuristics...</span>
                    </>
                  ) : (
                    <>
                      <Fingerprint className="w-4 h-4" />
                      <span>Initiate Deep Scan</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => { setEmailText(""); setResult(null); setError(null); setExplanation(null); }}
                  className="p-3.5 bg-slate-50 border border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 rounded-xl transition-all active:scale-90"
                  title="Clear context"
                >
                  <Trash2 className="w-4 h-4 text-slate-500 hover:text-rose-600" />
                </button>
              </div>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-white border border-slate-200/60 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[300px] shadow-xl shadow-slate-100/40"
              >
                <div className="mb-6">
                  <RadarScanner />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">AI Security Sweep Active</h3>
                  <p className="text-slate-500 text-xs font-semibold">Running deep-packet validation and email forensics...</p>
                </div>
              </motion.div>
            )}

            {result && !isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {/* Verdict Indicator */}
                <div className={`p-6 rounded-3xl border shadow-xl shadow-slate-100/40 relative ${
                  isMalicious ? "bg-white border-rose-500/25" : "bg-white border-teal-500/25"
                }`}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-3 rounded-2xl border ${
                      isMalicious 
                        ? "bg-rose-50 border-rose-200 text-rose-500" 
                        : "bg-teal-50 border-teal-200 text-teal-500"
                    }`}>
                      {isMalicious ? (
                        <ShieldAlert className="w-6 h-6" />
                      ) : (
                        <ShieldCheck className="w-6 h-6" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className={`font-black text-lg uppercase tracking-tight ${isMalicious ? "text-rose-500" : "text-teal-600"}`}>
                        Verdict: {isMalicious ? "MALICIOUS" : "SAFE"}
                      </span>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                        Risk score: {result.risk_score}/100 ({result.risk_level})
                      </span>
                    </div>
                  </div>

                  {explanation ? (
                    <div className="space-y-2 mt-6 pt-6 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Critical Factors:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {explanation.threats.map((threat, i) => (
                          <span key={i} className="px-2 py-1 bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-bold rounded-lg flex items-center gap-1.5">
                            <span className={`w-1 h-1 rounded-full ${isMalicious ? "bg-rose-500" : "bg-teal-500"}`} />
                            {threat}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">
                      Evaluation score computed.
                    </p>
                  )}
                </div>

                {/* Scan Metadata */}
                <div className="p-6 rounded-3xl bg-white border border-slate-200/60 shadow-xl shadow-slate-100/40">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 bg-indigo-50 border border-indigo-100 text-indigo-500 rounded-2xl">
                      <Globe className="w-6 h-6" />
                    </div>
                    <span className="font-black text-slate-800 text-lg uppercase tracking-tight">Forensic Metadata</span>
                  </div>
                  <div className="space-y-2 font-mono text-xs">
                    <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                      <span className="text-slate-400 font-sans font-bold uppercase text-[10px] tracking-wide">Scan ID</span>
                      <span className="text-slate-800 font-bold">#{result.id}</span>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                      <span className="text-slate-400 font-sans font-bold uppercase text-[10px] tracking-wide">Timestamp</span>
                      <span className="text-slate-800 font-bold">{new Date(result.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleGenerateReport}
                    disabled={generatingReport || reportGenerated}
                    className="w-full mt-4 py-3 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-600 font-bold rounded-xl text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2 active:scale-97 shadow-sm shadow-indigo-50"
                  >
                    {generatingReport ? (
                      <>
                        <Cpu className="w-4 h-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : reportGenerated ? (
                      <>
                        <ShieldCheck className="w-4 h-4 text-teal-600" />
                        <span>Report Saved</span>
                      </>
                    ) : (
                      "Generate Threat Report"
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-6 bg-white border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-100/40">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
              <History className="w-4 h-4 text-slate-400" />
              Analysis History
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Page-level history cached inside system memory. Refer to the dashboard telemetry for full active histories.
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          {/* AI Explanation Summary */}
          <div className="p-8 rounded-3xl bg-indigo-50/50 border border-indigo-200/50 shadow-xl shadow-indigo-50/20 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 opacity-[0.03] pointer-events-none">
              <Cpu className="w-40 h-40 text-slate-900" />
            </div>
            <h3 className="text-sm font-black mb-6 flex items-center gap-2 text-indigo-600 uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              AI Copilot Breakdown
            </h3>
            <div className="min-h-[100px]">
              {explanation ? (
                <TypewriterText text={explanation.summary} />
              ) : (
                <p className="text-slate-500 text-xs font-semibold leading-relaxed">
                  Initiate an email forensic scan to let Sentinel explain threat models and indicators.
                </p>
              )}
            </div>
          </div>

          {/* Internal Flags */}
          <div className="p-6 bg-white border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-100/40">
            <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-4">Threat Signatures</h4>
            {explanation && explanation.threats.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {explanation.threats.map((flag, i) => (
                  <span key={i} className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 text-slate-600 font-bold text-[9px] uppercase rounded-xl shadow-sm">
                    {flag}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 font-bold uppercase">No suspicious profiles logged.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}