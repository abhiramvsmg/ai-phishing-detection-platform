"use client";
import React, { useState } from 'react';
import { Search, ShieldAlert, Globe, Cpu, History, AlertCircle } from 'lucide-react';

export default function URLScanner() {
  const [url, setUrl] = useState('');

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tighter">URL Threat Scanner</h1>
        <p className="text-muted text-sm uppercase tracking-widest font-bold">Deep Neural Inspection Engine</p>
      </div>

      {/* Main Scanner Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search className="h-6 w-6 text-primary" />
        </div>
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter suspicious URL (e.g. https://secure-login-microsoft.net)"
          className="w-full bg-[#0F172A] border border-[#1E293B] rounded-2xl py-6 pl-14 pr-40 text-lg focus:ring-2 focus:ring-primary/50 outline-none transition-all shadow-2xl"
        />
        <button className="absolute right-3 top-3 bottom-3 bg-primary text-black font-black px-8 rounded-xl hover:bg-cyan-400 transition-all uppercase tracking-tighter text-sm">
          Analyze Link
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Score Card */}
        <div className="bg-[#111827] border border-[#1E293B] rounded-2xl p-8 flex flex-col items-center justify-center text-center">
          <h3 className="text-xs font-black text-muted uppercase tracking-[0.2em] mb-6">Threat Probability</h3>
          <div className="relative w-40 h-40 flex items-center justify-center">
             <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        strokeDasharray="440" strokeDashoffset="80" className="text-danger" strokeLinecap="round" />
             </svg>
             <span className="absolute text-5xl font-black text-danger">82%</span>
          </div>
          <p className="mt-6 text-danger font-bold text-sm uppercase">High Risk Detected</p>
        </div>

        {/* AI Investigation Summary */}
        <div className="lg:col-span-2 bg-[#111827] border border-[#1E293B] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1E293B] bg-[#0F172A]/50 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-300">AI Forensic Summary</h3>
          </div>
          <div className="p-6 space-y-4 text-sm leading-relaxed text-slate-300">
            <p>Our neural network identified <span className="text-warning font-bold">Domain Squatting</span> patterns targeting Enterprise O365 users.</p>
            <ul className="space-y-2 border-l-2 border-primary/20 pl-4">
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-danger rounded-full" /> Punycode detected: Mimics "microsoft.com"</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-warning rounded-full" /> Domain age: 48 hours old</li>
              <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-success rounded-full" /> SSL Certificate: Issued via Let's Encrypt</li>
            </ul>
            <div className="pt-4 flex gap-2">
              <span className="bg-danger/10 text-danger text-[10px] px-2 py-1 rounded border border-danger/20 font-bold uppercase">Phishing</span>
              <span className="bg-warning/10 text-warning text-[10px] px-2 py-1 rounded border border-warning/20 font-bold uppercase">Credential Theft</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}