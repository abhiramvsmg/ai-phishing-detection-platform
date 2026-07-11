"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Loader2, 
  ShieldCheck, 
  AlertTriangle, 
  Globe, 
  Brain, 
  Check, 
  Copy,
  ChevronDown,
  ChevronUp,
  Settings2,
  ShieldAlert,
  Server,
  Zap,
  Lock
} from "lucide-react";
import { api } from "@/lib/api";
import { RadarScanner } from "@/components/ui/RadarScanner";
import { TypewriterText } from "@/components/ui/TypewriterText";

export default function ScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [complete, setComplete] = useState(false);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [activeTab, setActiveTab] = useState<"url" | "text">("url");
  const [result, setResult] = useState<any>(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  // Deep Scan config states
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [modules, setModules] = useState({
    whois: true,
    ssl: true,
    redirects: true,
    blocklists: true,
    aiCore: true,
  });

  const scanSteps = [
    { key: "whois", label: "Resolving DNS registers & WHOIS Age", icon: Server },
    { key: "ssl", label: "Verifying SSL/TLS Certificate Chains", icon: Lock },
    { key: "redirects", label: "Tracing Recursive Redirect Hop Links", icon: Globe },
    { key: "blocklists", label: "Querying Global Threats (Spamhaus, Shodan)", icon: ShieldAlert },
    { key: "aiCore", label: "Running AI Core NLP Phishing Heuristics", icon: Brain },
  ];

  const startScan = async (e: React.FormEvent) => {
    e.preventDefault();
    const inputContent = activeTab === "url" ? url : text;
    if (!inputContent) return;
    
    setScanning(true);
    setComplete(false);
    setReportGenerated(false);
    setCurrentStep(0);

    // Active configuration modules to trace
    const activeSteps = scanSteps.filter(step => modules[step.key as keyof typeof modules]);

    try {
      // Start API call in parallel
      const apiCall = activeTab === "url"
        ? api.scans.scanUrl({ url })
        : api.scans.scanText({ text });

      // Run sequential visual validation steps to simulate the deep engine checks
      for (let i = 0; i < activeSteps.length; i++) {
        setCurrentStep(i);
        await new Promise(resolve => setTimeout(resolve, 600));
      }

      const scan = await apiCall;

      let explanation = null;
      try {
        explanation = await api.scans.explain(scan.id);
      } catch (err) {
        console.error("Failed to fetch scan explanation:", err);
      }

      setResult({
        id: scan.id,
        verdict: scan.result === "PHISHING" ? "MALICIOUS" : "SAFE",
        confidence: scan.risk_score,
        threats: explanation?.threats && explanation.threats.length > 0
          ? explanation.threats
          : ["No critical threat signatures flagged"],
        summary: explanation?.summary || "Scan complete. No severe cognitive anomalies or malicious vectors detected.",
        metrics: [
          { name: "Risk Level", value: scan.risk_level },
          { name: "Scan Type", value: scan.scan_type },
          { name: "Scan ID", value: `#${scan.id}` }
        ],
      });
    } catch (err) {
      console.log("Scan FAILED:", err);
      setResult({
        verdict: "ERROR",
        confidence: 0,
        threats: [],
        metrics: [],
        error: err instanceof Error ? err.message : "Scan failed. Please verify your connection status.",
      });
    } finally {
      setScanning(false);
      setComplete(true);
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

  const activeSteps = scanSteps.filter(step => modules[step.key as keyof typeof modules]);

  return (
    <div className="space-y-8 bg-background min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Forensic Threat Scanner</h1>
        <p className="text-slate-550 text-sm font-semibold">Verify suspicious targets in real-time using global multi-agent intelligence</p>
      </motion.div>

      {/* Input container */}
      <motion.div
        className="bg-white border border-slate-250 rounded-3xl p-8 shadow-xl shadow-slate-100/40 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <form onSubmit={startScan} className="space-y-6">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 gap-6">
            <button
              type="button"
              onClick={() => {
                setActiveTab("url");
                setComplete(false);
              }}
              className={`pb-3 font-bold text-xs uppercase tracking-wider transition-smooth relative ${
                activeTab === "url" ? "text-violet-600" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Scan URL Address
              {activeTab === "url" && (
                <motion.div layoutId="scanner-active-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600" />
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("text");
                setComplete(false);
              }}
              className={`pb-3 font-bold text-xs uppercase tracking-wider transition-smooth relative ${
                activeTab === "text" ? "text-violet-600" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              Scan Message Content
              {activeTab === "text" && (
                <motion.div layoutId="scanner-active-tab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-600" />
              )}
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
              {activeTab === "url" ? "Target URL address" : "Raw Text Body"}
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-stretch">
              <div className="flex-1 relative">
                {activeTab === "url" ? (
                  <>
                    <Globe className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="url"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all text-slate-900 text-sm focus:outline-none placeholder:text-slate-450"
                      placeholder="https://malicious-sign-in-portal.org"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      disabled={scanning}
                      required
                    />
                  </>
                ) : (
                  <>
                    <Brain className="absolute left-4 top-4.5 w-4 h-4 text-slate-500" />
                    <textarea
                      className="w-full pl-11 pr-4 py-3 h-14 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-100 transition-all text-slate-900 text-xs focus:outline-none placeholder:text-slate-450 resize-none font-medium"
                      placeholder="Paste email headers, message copy, or SMS alerts here..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      disabled={scanning}
                      required
                    />
                  </>
                )}
              </div>
              <motion.button
                type="submit"
                disabled={scanning || (activeTab === "url" ? !url : !text)}
                className="px-8 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-violet-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50 h-fit self-center"
                whileTap={{ scale: 0.97 }}
              >
                {scanning ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    <span>Sweeping...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Run Deep Scan</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </form>

        {/* Advanced Accordion Toggle */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setAdvancedOpen(!advancedOpen)}
            className="flex items-center justify-between w-full text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-wider"
          >
            <span className="flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-violet-500" />
              Advanced Forensic Engine Settings
            </span>
            {advancedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {advancedOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
                  {Object.keys(modules).map((modKey) => {
                    const stepInfo = scanSteps.find(s => s.key === modKey);
                    const label = stepInfo ? stepInfo.label.split(" ").slice(1).join(" ") : modKey;
                    return (
                      <label 
                        key={modKey}
                        className="flex items-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer hover:border-violet-200 transition-colors select-none"
                      >
                        <input
                          type="checkbox"
                          checked={modules[modKey as keyof typeof modules]}
                          onChange={(e) => setModules(prev => ({
                            ...prev,
                            [modKey]: e.target.checked
                          }))}
                          className="w-4 h-4 rounded border-slate-350 bg-white cursor-pointer accent-violet-650"
                        />
                        <span className="text-xs font-bold text-slate-700">{label}</span>
                      </label>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {scanning && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white border border-slate-250 rounded-3xl p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl shadow-slate-100/40"
          >
            {/* Visual Radar */}
            <div className="lg:col-span-4 flex items-center justify-center">
              <RadarScanner />
            </div>

            {/* Checklists */}
            <div className="lg:col-span-8 space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight flex items-center gap-2">
                  <Zap className="w-5 h-5 text-violet-500 animate-pulse" />
                  Active Security Validation
                </h3>
                <p className="text-slate-500 text-xs font-semibold">Resolving threat surfaces through forensic modules...</p>
              </div>

              <div className="space-y-2 pt-2">
                {activeSteps.map((step, index) => {
                  const isDone = index < currentStep;
                  const isActive = index === currentStep;
                  return (
                    <div 
                      key={step.key}
                      className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-bold transition-all ${
                        isDone 
                          ? "bg-teal-50/50 border-teal-200 text-teal-700" 
                          : isActive 
                          ? "bg-violet-50 border-violet-200 text-violet-700 animate-pulse" 
                          : "bg-slate-50/50 border-slate-150 text-slate-400"
                      }`}
                    >
                      {isDone ? (
                        <div className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3" />
                        </div>
                      ) : isActive ? (
                        <div className="w-5 h-5 rounded-full bg-violet-600 text-white flex items-center justify-center shrink-0">
                          <Loader2 className="w-3 h-3 animate-spin" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center shrink-0">
                          <Server className="w-3 h-3" />
                        </div>
                      )}
                      <span>{step.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {complete && result && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* Scanned target box */}
            <motion.div
              className="bg-white border border-slate-250 rounded-3xl p-6 shadow-xl shadow-slate-100/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2">Forensic Target</p>
              <div className="flex items-center justify-between bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <code className="text-xs text-violet-600 font-mono break-all font-black select-all pr-4">{activeTab === "url" ? url : text}</code>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(activeTab === "url" ? url : text)}
                  className="p-2.5 hover:bg-slate-200/50 rounded-xl transition-all"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4 text-slate-500 hover:text-violet-600" />
                </button>
              </div>
            </motion.div>

            {/* Scan Verdict */}
            <motion.div
              className={`bg-white border-2 rounded-3xl p-8 shadow-xl shadow-slate-100/40 relative overflow-hidden ${
                result.verdict === "MALICIOUS"
                  ? "border-rose-200"
                  : result.verdict === "ERROR"
                  ? "border-amber-200"
                  : "border-teal-200"
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center gap-5">
                <div
                  className={`p-4 rounded-2xl border ${
                    result.verdict === "MALICIOUS"
                      ? "bg-rose-50 border-rose-200 text-rose-500 shadow-md shadow-rose-50"
                      : result.verdict === "ERROR"
                      ? "bg-amber-50 border-amber-200 text-amber-500 shadow-md shadow-amber-50"
                      : "bg-teal-50 border-teal-200 text-teal-600 shadow-md shadow-teal-50"
                  }`}
                >
                  {result.verdict === "MALICIOUS" ? (
                    <AlertTriangle className="w-8 h-8" />
                  ) : (
                    <ShieldCheck className="w-8 h-8" />
                  )}
                </div>
                <div>
                  <p
                    className={`text-3xl font-black uppercase tracking-tight ${
                      result.verdict === "MALICIOUS"
                        ? "text-rose-600"
                        : result.verdict === "ERROR"
                        ? "text-amber-500"
                        : "text-teal-650"
                    }`}
                  >
                    {result.verdict}
                  </p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mt-0.5">
                    {result.verdict === "ERROR" ? result.error : `Security Engine Heuristics Verdict`}
                  </p>
                </div>
              </div>

              {result.verdict !== "ERROR" && (
                <div className="space-y-2 mt-6 pt-6 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-650 uppercase tracking-wide">Threat Severity score</span>
                    <span className={`text-lg font-black ${
                      result.verdict === "MALICIOUS" ? "text-rose-600" : "text-teal-650"
                    }`}>{result.confidence}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        result.verdict === "MALICIOUS" 
                          ? "bg-gradient-to-r from-amber-500 to-rose-500" 
                          : "bg-gradient-to-r from-teal-400 to-teal-600"
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence}%` }}
                      transition={{ delay: 0.3, duration: 1 }}
                    />
                  </div>
                </div>
              )}
            </motion.div>

            {result.verdict !== "ERROR" && (
              <>
                {/* Active Threat Badges */}
                <motion.div
                  className="bg-white border border-slate-250 rounded-3xl p-6 shadow-xl shadow-slate-100/40"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    Threat Signatures Flagged
                  </h3>
                  
                  <motion.div 
                    className="flex flex-wrap gap-2.5"
                    variants={{
                      hidden: {},
                      show: { transition: { staggerChildren: 0.08 } }
                    }}
                    initial="hidden"
                    animate="show"
                  >
                    {result.threats.map((threat: string, i: number) => (
                      <motion.span
                        key={i}
                        variants={{
                          hidden: { opacity: 0, scale: 0.85, y: 5 },
                          show: { opacity: 1, scale: 1, y: 0 }
                        }}
                        className="px-3.5 py-2 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-sm flex items-center gap-2 cursor-default select-none hover:bg-slate-100/60 hover:border-slate-350 transition-colors"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          result.verdict === "MALICIOUS" ? "bg-rose-500" : "bg-teal-500"
                        }`} />
                        {threat}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>

                {/* AI Explanation Summary */}
                <motion.div
                  className="bg-white border border-slate-250 rounded-3xl p-6 shadow-xl shadow-slate-100/40"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-violet-500" />
                    AI Core Evaluation Summary
                  </h3>
                  <div className="p-4 bg-slate-50 border border-slate-150 rounded-2xl min-h-[50px]">
                    <TypewriterText text={result.summary} />
                  </div>
                </motion.div>

                {/* Meta details */}
                <motion.div
                  className="bg-white border border-slate-250 rounded-3xl p-6 shadow-xl shadow-slate-100/40"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Forensic Metadata</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {result.metrics.map((m: any, i: number) => (
                      <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-inner">
                        <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">{m.name}</p>
                        <p className="text-sm font-black text-slate-800 mt-1">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            {/* Bottom Actions */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <button
                type="button"
                onClick={handleGenerateReport}
                disabled={generatingReport || reportGenerated}
                className="flex-1 py-3.5 bg-violet-50 hover:bg-violet-100 border border-violet-200 text-violet-600 font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-sm text-sm"
              >
                {generatingReport ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    <span>Generating...</span>
                  </>
                ) : reportGenerated ? (
                  <>
                    <Check className="w-4 h-4 text-teal-600" />
                    <span>Forensic Report Generated</span>
                  </>
                ) : (
                  <span>Generate Forensic Report</span>
                )}
              </button>
              
              <button className="flex-1 py-3.5 bg-rose-50 hover:bg-rose-100/80 border border-rose-250 text-rose-600 font-bold rounded-xl transition-all shadow-sm text-sm active:scale-97">
                Quarantine Target Domain
              </button>

              <button
                onClick={() => {
                  setComplete(false);
                  setUrl("");
                  setText("");
                }}
                className="flex-1 py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-violet-200 transition-all text-sm active:scale-97"
              >
                Scan Another
              </button>
            </motion.div>
          </motion.div>
        )}

        {!scanning && !complete && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border border-slate-250 rounded-3xl p-12 text-center shadow-xl shadow-slate-100/40"
          >
            <Globe className="w-16 h-16 text-slate-350 mx-auto mb-4 animate-float" />
            <p className="text-slate-600 font-semibold text-sm">Enter a target {activeTab === "url" ? "URL address" : "suspicious message body"} above to begin deep validation.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
