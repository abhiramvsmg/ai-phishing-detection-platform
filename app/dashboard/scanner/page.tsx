"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Loader2, ShieldCheck, AlertTriangle, Globe, Brain, Check, Copy } from "lucide-react";

export default function ScannerPage() {
  const [scanning, setScanning] = useState(false);
  const [complete, setComplete] = useState(false);
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<any>(null);

  const startScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setScanning(true);
    setComplete(false);
    
    // Simulate AI scanning
    setTimeout(() => {
      setResult({
        verdict: "MALICIOUS",
        confidence: 94,
        threats: [
          { type: "Phishing", severity: "Critical", details: "Mimics Microsoft login page" },
          { type: "Credential Harvesting", severity: "High", details: "Hidden form fields detected" },
          { type: "Domain Spoofing", severity: "High", details: "Domain registered 14 days ago" },
        ],
        metrics: [
          { label: "Domain Age", value: "14 days", risk: "CRITICAL" },
          { label: "SSL Certificate", value: "Self-Signed", risk: "HIGH" },
          { label: "IP Reputation", value: "Blocked", risk: "CRITICAL" },
          { label: "Content Analysis", value: "Malicious", risk: "HIGH" },
        ]
      });
      setScanning(false);
      setComplete(true);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-bold gradient-text">URL Scanner</h1>
        <p className="text-muted">Advanced AI-powered threat detection and analysis</p>
      </motion.div>

      {/* Scanner Form */}
      <motion.form 
        onSubmit={startScan} 
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <label className="block text-sm font-semibold mb-3">Enter URL to Scan</label>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input 
              type="url"
              className="w-full pl-12 pr-4 py-3 glass-sm bg-white/[0.05] focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth placeholder:text-muted"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={scanning}
            />
          </div>
          <motion.button 
            type="submit"
            disabled={scanning || !url}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-smooth flex items-center gap-2 disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {scanning ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" />
                Scanning...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Scan
              </>
            )}
          </motion.button>
        </div>
      </motion.form>

      <AnimatePresence mode="wait">
        {/* Scanning State */}
        {scanning && (
          <motion.div 
            key="scanning"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="glass rounded-2xl p-12 flex flex-col items-center justify-center min-h-64"
          >
            <motion.div 
              className="mb-6 relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Brain className="w-16 h-16 text-primary" />
            </motion.div>
            
            <div className="text-center space-y-3">
              <h3 className="text-xl font-semibold">Scanning URL</h3>
              <p className="text-muted">Analyzing with AI threat detection engine...</p>
              <div className="flex gap-2 justify-center pt-4">
                {[1,2,3].map(i => (
                  <motion.div 
                    key={i}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity }}
                    className="w-2 h-2 bg-primary rounded-full"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Results State */}
        {complete && result && (
          <motion.div 
            key="complete"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            {/* URL Display */}
            <motion.div
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-xs text-muted font-semibold mb-2">Scanned URL</p>
              <div className="flex items-center justify-between bg-white/5 rounded-lg p-4">
                <code className="text-sm text-primary font-mono break-all">{url}</code>
                <button className="p-2 hover:bg-white/10 rounded transition-smooth">
                  <Copy className="w-4 h-4 text-muted hover:text-primary" />
                </button>
              </div>
            </motion.div>

            {/* Verdict */}
            <motion.div
              className={`glass rounded-2xl p-8 border-t-4 ${
                result.verdict === "MALICIOUS" ? "border-t-danger" : 
                result.verdict === "SUSPICIOUS" ? "border-t-warning" : "border-t-success"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-3 rounded-lg ${
                  result.verdict === "MALICIOUS" ? "bg-danger/10" : 
                  result.verdict === "SUSPICIOUS" ? "bg-warning/10" : "bg-success/10"
                }`}>
                  {result.verdict === "MALICIOUS" ? (
                    <AlertTriangle className="w-8 h-8 text-danger" />
                  ) : result.verdict === "SUSPICIOUS" ? (
                    <AlertTriangle className="w-8 h-8 text-warning" />
                  ) : (
                    <Check className="w-8 h-8 text-success" />
                  )}
                </div>
                <div>
                  <p className={`text-3xl font-bold ${
                    result.verdict === "MALICIOUS" ? "text-danger" : 
                    result.verdict === "SUSPICIOUS" ? "text-warning" : "text-success"
                  }`}>
                    {result.verdict}
                  </p>
                  <p className="text-sm text-muted">Threat Level: {result.verdict}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold">AI Confidence Score</span>
                  <span className="text-lg font-bold text-primary">{result.confidence}%</span>
                </div>
                <motion.div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-danger"
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence}%` }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  />
                </motion.div>
              </div>
            </motion.div>

            {/* Threats Detected */}
            {result.threats.length > 0 && (
              <motion.div
                className="glass rounded-2xl p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  Threats Detected
                </h3>
                
                <div className="space-y-3">
                  {result.threats.map((threat: any, idx: number) => (
                    <motion.div
                      key={idx}
                      className="p-4 bg-white/5 border border-white/10 rounded-lg hover:border-warning/50 transition-smooth"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-warning">{threat.type}</h4>
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          threat.severity === "Critical" ? "bg-danger/20 text-danger" :
                          threat.severity === "High" ? "bg-warning/20 text-warning" : "bg-secondary/20 text-secondary"
                        }`}>
                          {threat.severity}
                        </span>
                      </div>
                      <p className="text-sm text-muted">{threat.details}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Analysis Metrics */}
            <motion.div
              className="glass rounded-2xl p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold mb-4">Analysis Metrics</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {result.metrics.map((metric: any, idx: number) => (
                  <div key={idx} className="p-4 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-xs text-muted font-semibold uppercase mb-2">{metric.label}</p>
                    <p className="text-sm font-semibold mb-3">{metric.value}</p>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      metric.risk === "CRITICAL" ? "bg-danger/20 text-danger" :
                      metric.risk === "HIGH" ? "bg-warning/20 text-warning" : "bg-secondary/20 text-secondary"
                    }`}>
                      {metric.risk}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <button className="flex-1 py-3 glass hover:bg-white/[0.12] rounded-lg font-semibold transition-smooth">
                Report URL
              </button>
              <button className="flex-1 py-3 bg-danger/20 hover:bg-danger/30 text-danger font-semibold rounded-lg transition-smooth">
                Block Domain
              </button>
              <button 
                onClick={() => { setComplete(false); setUrl(""); }}
                className="flex-1 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-smooth"
              >
                Scan Another
              </button>
            </motion.div>
          </motion.div>
        )}

        {/* Empty State */}
        {!scanning && !complete && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-12 text-center"
          >
            <Globe className="w-16 h-16 text-muted/50 mx-auto mb-4" />
            <p className="text-muted">Enter a URL above to begin scanning</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}