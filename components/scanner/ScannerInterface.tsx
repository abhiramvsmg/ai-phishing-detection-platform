"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  Globe, 
  Lock, 
  Cpu, 
  History, 
  ExternalLink,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Zap,
  RefreshCcw
} from 'lucide-react';

type ScanStatus = 'idle' | 'scanning' | 'complete';
type ThreatLevel = 'safe' | 'suspicious' | 'malicious';

interface ScanResult {
  url: string;
  score: number;
  threatLevel: ThreatLevel;
  timestamp: string;
  details: {
    dns: boolean;
    ssl: boolean;
    blacklist: boolean;
    aiVerdict: string;
  };
}

export function ScannerInterface() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState<ScanStatus>('idle');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const scanSteps = [
    "Initializing Neural Analysis...",
    "Querying Global Threat Databases...",
    "Verifying SSL/TLS Handshake...",
    "Executing Heuristic Sandbox...",
    "Finalizing AI Safety Verdict..."
  ];

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setStatus('scanning');
    setActiveStep(0);
    setResult(null);

    // Simulate multi-step enterprise scanning process
    for (let i = 0; i < scanSteps.length; i++) {
      await new Promise(r => setTimeout(r, 800));
      setActiveStep(prev => prev + 1);
    }

    // Mock logic: URLs containing 'phish' or 'test' are flagged
    const isMalicious = url.toLowerCase().includes('phish');
    const isSuspicious = url.toLowerCase().includes('test');
    
    const mockResult: ScanResult = {
      url,
      score: isMalicious ? 98 : (isSuspicious ? 45 : 0.2),
      threatLevel: isMalicious ? 'malicious' : (isSuspicious ? 'suspicious' : 'safe'),
      timestamp: new Date().toISOString(),
      details: {
        dns: true,
        ssl: !isMalicious,
        blacklist: isMalicious,
        aiVerdict: isMalicious 
          ? "Phishing pattern detected via credential harvesting heuristics." 
          : "URL matches legitimate corporate patterns."
      }
    };

    setResult(mockResult);
    setStatus('complete');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Search Header Section */}
      <div className="glass-card p-1 rounded-2xl glow-cyan">
        <form onSubmit={handleScan} className="relative flex items-center">
          <div className="absolute left-6 text-slate-500">
            <Globe className={`w-5 h-5 ${status === 'scanning' ? 'animate-pulse text-brand-cyan' : ''}`} />
          </div>
          <input 
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL for Deep Packet Inspection (e.g., https://security-verify-login.com)"
            className="w-full bg-transparent py-6 pl-14 pr-48 text-lg text-white font-medium focus:outline-none placeholder:text-slate-600"
          />
          <div className="absolute right-2 flex gap-2">
            {status === 'complete' && (
              <button 
                type="button" 
                onClick={() => { setStatus('idle'); setUrl(''); }}
                className="p-3 text-slate-400 hover:text-white transition-colors"
              >
                <RefreshCcw className="w-5 h-5" />
              </button>
            )}
            <button 
              disabled={status === 'scanning' || !url}
              className="bg-brand-cyan hover:bg-cyan-400 text-black px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {status === 'scanning' ? (
                <>
                  <Zap className="w-4 h-4 animate-spin" />
                  ANALYZING...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  INITIATE SCAN
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <AnimatePresence mode="wait">
        {/* Scanning State UI */}
        {status === 'scanning' && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-card p-12 rounded-2xl flex flex-col items-center justify-center space-y-8 overflow-hidden relative"
          >
            {/* Animated Scanning Beam */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-brand-cyan/5 to-transparent h-40 w-full"
              animate={{ y: [0, 400] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative">
               <div className="w-24 h-24 rounded-full border-2 border-brand-cyan/20 flex items-center justify-center">
                 <Cpu className="w-10 h-10 text-brand-cyan animate-pulse" />
                 <motion.div 
                   className="absolute inset-0 border-t-2 border-brand-cyan rounded-full"
                   animate={{ rotate: 360 }}
                   transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                 />
               </div>
            </div>

            <div className="text-center space-y-2 relative z-10">
              <h3 className="text-xl font-bold tracking-[0.2em] uppercase text-white">Advanced Engine Scan</h3>
              <p className="text-brand-cyan font-mono text-sm h-5">{scanSteps[activeStep] || "Processing..."}</p>
            </div>

            {/* Progress Micro-bars */}
            <div className="flex gap-1 w-full max-w-md h-1.5">
              {scanSteps.map((_, i) => (
                <div key={i} className="flex-1 rounded-full bg-slate-800 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: i <= activeStep ? '100%' : '0%' }}
                    className="h-full bg-brand-cyan shadow-[0_0_10px_rgba(0,242,255,0.5)]"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Results State UI */}
        {status === 'complete' && result && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-12 gap-6"
          >
            {/* Verdict Card */}
            <div className="col-span-12 lg:col-span-4 glass-card p-8 rounded-2xl flex flex-col items-center text-center justify-center border-t-4 border-t-brand-cyan" 
              style={{ borderTopColor: result.threatLevel === 'malicious' ? 'var(--color-threat-critical)' : 'var(--color-brand-cyan)' }}>
              
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 ${
                result.threatLevel === 'malicious' ? 'bg-threat-critical/20 text-threat-critical' : 'bg-brand-cyan/20 text-brand-cyan'
              }`}>
                {result.threatLevel === 'malicious' ? <ShieldAlert className="w-10 h-10" /> : <ShieldCheck className="w-10 h-10" />}
              </div>
              
              <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-1">Threat Probability</h2>
              <div className={`text-6xl font-black mb-2 tracking-tighter ${
                result.threatLevel === 'malicious' ? 'text-threat-critical' : 'text-brand-cyan'
              }`}>
                {result.score}%
              </div>
              <div className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${
                result.threatLevel === 'malicious' ? 'bg-threat-critical text-white' : 'bg-brand-cyan text-black'
              }`}>
                {result.threatLevel} Result
              </div>
              
              <p className="text-slate-400 text-sm leading-relaxed italic">
                &quot;{result.details.aiVerdict}&quot;
              </p>
            </div>

            {/* Detailed Intelligence Card */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                  <History className="w-4 h-4 text-brand-cyan" />
                  Security Indicators
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <IndicatorRow 
                    icon={<Lock className="w-4 h-4" />} 
                    label="SSL Certificate" 
                    status={result.details.ssl ? 'safe' : 'fail'} 
                    value={result.details.ssl ? "Valid/Trusted" : "Invalid/Self-signed"}
                  />
                  <IndicatorRow 
                    icon={<Globe className="w-4 h-4" />} 
                    label="Global Blacklist" 
                    status={result.details.blacklist ? 'fail' : 'safe'} 
                    value={result.details.blacklist ? "Flagged (GTI)" : "Clean Status"}
                  />
                  <IndicatorRow 
                    icon={<CheckCircle2 className="w-4 h-4" />} 
                    label="DNS Security" 
                    status="safe" 
                    value="SPF/DMARC Pass"
                  />
                  <IndicatorRow 
                    icon={<ExternalLink className="w-4 h-4" />} 
                    label="Redirections" 
                    status="safe" 
                    value="0 Hops Detected"
                  />
                </div>
              </div>

              {/* Recommendations */}
              <div className="glass-card p-6 rounded-2xl bg-white/[0.02]">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-brand-blue" />
                  Recommended Action
                </h3>
                <div className="flex items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                    <span className="text-sm text-slate-300">
                      {result.threatLevel === 'malicious' 
                        ? "Immediately block this domain at the firewall level and revoke active sessions." 
                        : "No further action required. This asset is marked as trusted for organization-wide use."}
                    </span>
                  </div>
                  <button className="text-brand-cyan text-xs font-bold flex items-center gap-1 hover:underline">
                    FULL DOCS <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function IndicatorRow({ icon, label, status, value }: { icon: React.ReactNode, label: string, status: 'safe' | 'fail', value: string }) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
      <div className="flex items-center gap-3">
        <div className="text-slate-500">{icon}</div>
        <span className="text-xs font-medium text-slate-400 uppercase tracking-tighter">{label}</span>
      </div>
      <div className="text-right">
        <div className={`text-xs font-bold ${status === 'safe' ? 'text-threat-low' : 'text-threat-critical'}`}>
          {value}
        </div>
      </div>
    </div>
  );
}