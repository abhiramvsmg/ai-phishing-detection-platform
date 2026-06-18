"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Globe,
  Lock,
  Unlock,
  AlertTriangle,
  History,
  ExternalLink,
  Info,
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  Filter,
  Zap
} from "lucide-react";

// --- Types ---

interface ScanResult {
  url: string;
  score: number;
  threatLevel: "Low" | "Medium" | "High" | "Critical";
  status: "Safe" | "Suspicious" | "Malicious";
  domainAge: string;
  sslStatus: "Valid" | "Expired" | "None";
  blacklistStatus: "Clean" | "Flagged";
  registrar: string;
  location: string;
  ipAddress: string;
}

interface HistoryItem {
  id: string;
  url: string;
  timestamp: string;
  score: number;
  status: "Safe" | "Suspicious" | "Malicious";
}

// --- Mock Data ---

const MOCK_HISTORY: HistoryItem[] = [
  { id: "1", url: "https://secure-login-bank.com", timestamp: "2 mins ago", score: 88, status: "Malicious" },
  { id: "2", url: "https://github.com/updates", timestamp: "15 mins ago", score: 2, status: "Safe" },
  { id: "3", url: "http://unverified-portal.net/auth", timestamp: "1 hour ago", score: 64, status: "Suspicious" },
  { id: "4", url: "https://microsoft-office-verify.org", timestamp: "3 hours ago", score: 92, status: "Malicious" },
  { id: "5", url: "https://app.stripe.com", timestamp: "5 hours ago", score: 0, status: "Safe" },
];

const MOCK_RESULT: ScanResult = {
  url: "https://verify-account-security.com/login",
  score: 84,
  threatLevel: "High",
  status: "Malicious",
  domainAge: "14 days",
  sslStatus: "Valid",
  blacklistStatus: "Flagged",
  registrar: "NameCheap, Inc.",
  location: "Reykjavik, Iceland",
  ipAddress: "192.164.22.101",
};

// --- Helper Components ---

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    Safe: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    Suspicious: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    Malicious: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status as keyof typeof styles]}`}>
      {status}
    </span>
  );
};

const MetricCard = ({ label, value, icon: Icon, subValue }: any) => (
  <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-slate-50 rounded-lg text-slate-500">
        <Icon size={18} />
      </div>
      <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-xl font-bold text-slate-900">{value}</span>
      {subValue && <span className="text-xs text-slate-400">{subValue}</span>}
    </div>
  </div>
);

// --- Main Page ---

export default function ScannerPage() {
  const [url, setUrl] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [history, setHistory] = useState(MOCK_HISTORY);

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    setIsScanning(true);
    setResult(null);
    
    // Simulate API delay
    setTimeout(() => {
      setIsScanning(false);
      setResult(MOCK_RESULT);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      
      {/* 1. Scanner Hero Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-widest">System Operational</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">URL Threat Scanner</h1>
          <p className="text-slate-500 mt-1 max-w-2xl">
            Analyze URLs and domains in real-time using our multi-vector AI engine. Detect phishing, malware, and deceptive redirects before they impact your organization.
          </p>
        </div>
      </section>

      {/* 2. URL Analysis Form */}
      <section>
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
          <form onSubmit={handleScan} className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                <Globe size={20} />
              </div>
              <input
                type="text"
                placeholder="Enter URL to analyze (e.g., https://secure-portal.com)"
                className="w-full bg-transparent pl-12 pr-4 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none rounded-xl"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button
              disabled={isScanning || !url}
              className={`px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                isScanning 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200"
              }`}
            >
              {isScanning ? (
                <>
                  <div className="h-5 w-5 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
                  Analyzing Engine...
                </>
              ) : (
                <>
                  <Zap size={18} fill="currentColor" />
                  Start Security Scan
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* 3. Analysis Results Panel */}
      <AnimatePresence mode="wait">
        {result && !isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Risk Summary */}
            <div className="lg:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
              <div className="relative mb-6">
                <svg className="w-40 h-40 transform -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
                  <motion.circle
                    cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" fill="transparent"
                    strokeDasharray={440}
                    initial={{ strokeDashoffset: 440 }}
                    animate={{ strokeDashoffset: 440 - (440 * result.score) / 100 }}
                    className={result.score > 70 ? "text-rose-500" : result.score > 40 ? "text-amber-500" : "text-emerald-500"}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-slate-900">{result.score}</span>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Risk Score</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">{result.status} Threat Detected</h3>
              <p className="text-slate-500 text-sm mb-6 px-4">Our engine identified several indicators of a sophisticated phishing attempt.</p>
              <div className="w-full flex gap-2">
                <div className="flex-1 p-3 bg-rose-50 border border-rose-100 rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-rose-600 tracking-wider mb-1">Threat Level</div>
                  <div className="text-lg font-bold text-rose-700">{result.threatLevel}</div>
                </div>
                <div className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Confidence</div>
                  <div className="text-lg font-bold text-slate-700">99.8%</div>
                </div>
              </div>
            </div>

            {/* Technical Breakdown */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <MetricCard icon={ShieldAlert} label="Blacklist Status" value={result.blacklistStatus} subValue="Engines: 4/128" />
              <MetricCard icon={Lock} label="SSL Certificate" value={result.sslStatus} subValue="DV Verified" />
              <MetricCard icon={Clock} label="Domain Age" value={result.domainAge} subValue={`Reg: ${result.registrar}`} />
              <MetricCard icon={Globe} label="IP Location" value={result.location} subValue={result.ipAddress} />
              
              {/* 4. Security Intelligence Cards */}
              <div className="md:col-span-2 bg-indigo-900 rounded-2xl p-6 text-white overflow-hidden relative">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <Info size={18} className="text-indigo-300" />
                    <h4 className="font-semibold">Security Intelligence Insights</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 bg-white/10 p-3 rounded-lg border border-white/10">
                      <AlertTriangle className="text-amber-400 shrink-0" size={18} />
                      <p className="text-sm text-indigo-50">This domain uses a typosquatting technique resembling <span className="font-mono bg-white/20 px-1 rounded">microsoft.com</span>.</p>
                    </div>
                    <div className="flex items-start gap-3 bg-white/10 p-3 rounded-lg border border-white/10">
                      <ShieldX className="text-rose-400 shrink-0" size={18} />
                      <p className="text-sm text-indigo-50">Suspicious Javascript behavior detected: Automated form submission hooks found.</p>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <ShieldCheck size={160} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Recent Scan History */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <History size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Recent Scans</h2>
              <p className="text-xs text-slate-500">History of your organization's URL analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                type="text" 
                placeholder="Filter history..." 
                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
              <Filter size={18} className="text-slate-500" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">URL Domain</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Risk Score</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Time Analyzed</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 rounded ${item.status === 'Safe' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        <Globe size={14} />
                      </div>
                      <span className="text-sm font-medium text-slate-700 truncate max-w-[200px] md:max-w-xs">{item.url}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <div className="w-12 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className={`h-full ${item.score > 70 ? 'bg-rose-500' : item.score > 30 ? 'bg-amber-500' : 'bg-emerald-500'}`} 
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="ml-2 text-xs font-bold text-slate-600">{item.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-500 flex items-center gap-1.5">
                      <Clock size={14} />
                      {item.timestamp}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
                      <ArrowRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-500 font-medium">Showing 5 of 1,284 total scans</p>
          <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
            View full audit log <ExternalLink size={12} />
          </button>
        </div>
      </section>
    </div>
  );
}
