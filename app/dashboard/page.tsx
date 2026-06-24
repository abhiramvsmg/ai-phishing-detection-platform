"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Brain, Shield, AlertTriangle, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-bold gradient-text">Security Dashboard</h1>
        <p className="text-muted">Real-time threat detection and analysis</p>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <KPICard 
          label="Threats Blocked" 
          value="2,847" 
          icon={Shield}
          trend="+23%"
          color="text-success"
        />
        <KPICard 
          label="AI Confidence" 
          value="99.8%" 
          icon={Brain}
          trend="↑ Excellent"
          color="text-primary"
        />
        <KPICard 
          label="Active Incidents" 
          value="12" 
          icon={AlertTriangle}
          trend="3 Critical"
          color="text-warning"
        />
        <KPICard 
          label="Avg Response" 
          value="45ms" 
          icon={Zap}
          trend="-12ms"
          color="text-primary"
        />
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat Activity Chart */}
        <motion.div
          className="lg:col-span-2 glass rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-1">Threat Activity</h2>
              <p className="text-xs text-muted">Last 24 hours monitoring</p>
            </div>
            <motion.div 
              className="flex items-center gap-2 text-xs font-semibold text-success"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-2 h-2 bg-success rounded-full" />
              LIVE
            </motion.div>
          </div>

          <ThreatChart />
        </motion.div>

        {/* AI Insights */}
        <motion.div
          className="glass rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">AI Insights</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg space-y-2">
              <p className="text-xs font-semibold text-primary">Anomaly Detected</p>
              <p className="text-xs text-muted leading-relaxed">
                Unusual spike in credential harvesting attempts detected at 14:32 UTC
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted">Model Accuracy</span>
                  <span className="text-primary">99.8%</span>
                </div>
                <motion.div
                  className="w-full h-2 bg-white/10 rounded-full overflow-hidden"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                >
                  <div className="h-full w-[99.8%] bg-gradient-to-r from-primary to-secondary" />
                </motion.div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-muted">Detection Rate</span>
                  <span className="text-success">98.5%</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[98.5%] bg-gradient-to-r from-success to-success" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Threats */}
      <motion.div
        className="glass rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-semibold mb-4">Recent Threats</h2>
        
        <div className="space-y-3">
          {[
            { title: "Phishing: Office 365 Clone", time: "2 mins ago", severity: "Critical", details: "Target: Finance Team" },
            { title: "Malware: Trojan Detected", time: "15 mins ago", severity: "High", details: "File: invoice_2024.exe" },
            { title: "Suspicious Login: New IP", time: "1 hour ago", severity: "Medium", details: "From: 185.220.101.45" },
            { title: "URL Scanning: Malicious Domain", time: "2 hours ago", severity: "High", details: "Domain: secure-microsoft.fake" },
          ].map((threat, idx) => (
            <motion.div
              key={idx}
              className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-smooth"
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center gap-3 flex-1">
                <div className={`w-2.5 h-2.5 rounded-full ${
                  threat.severity === "Critical" ? "bg-danger animate-pulse" :
                  threat.severity === "High" ? "bg-warning" : "bg-secondary"
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-semibold">{threat.title}</p>
                  <p className="text-xs text-muted">{threat.details}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  threat.severity === "Critical" ? "bg-danger/20 text-danger" :
                  threat.severity === "High" ? "bg-warning/20 text-warning" : "bg-secondary/20 text-secondary"
                }`}>
                  {threat.severity}
                </span>
                <p className="text-xs text-muted mt-1">{threat.time}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function KPICard({ 
  label, 
  value, 
  icon: Icon, 
  trend, 
  color 
}: {
  label: string;
  value: string;
  icon: React.ElementType;
  trend: string;
  color: string;
}) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
      className="glass rounded-xl p-6 group hover:border-primary/50 transition-smooth"
      whileHover={{ y: -4 }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-lg bg-white/5 group-hover:bg-primary/10 transition-smooth`}>
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <span className="text-xs font-semibold text-success">{trend}</span>
      </div>
      <p className="text-xs text-muted font-semibold uppercase tracking-wide mb-2">{label}</p>
      <h3 className="text-2xl md:text-3xl font-bold">{value}</h3>
    </motion.div>
  );
}

function ThreatChart() {
  const data = [
    { hour: "00", blocked: 120, detected: 45 },
    { hour: "04", blocked: 180, detected: 68 },
    { hour: "08", blocked: 240, detected: 92 },
    { hour: "12", blocked: 380, detected: 145 },
    { hour: "16", blocked: 520, detected: 198 },
    { hour: "20", blocked: 680, detected: 256 },
  ];

  const maxValue = Math.max(...data.map(d => Math.max(d.blocked, d.detected)));

  return (
    <div className="space-y-4">
      <div className="flex gap-4 h-48">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col justify-end gap-2">
            <motion.div
              className="flex-1 bg-gradient-to-t from-primary/60 to-primary/30 rounded-t-lg relative group cursor-pointer"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: (item.blocked / maxValue) || 0.1 }}
              transition={{ delay: idx * 0.05, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100">
                {item.blocked}
              </div>
            </motion.div>
            <motion.div
              className="h-1 bg-secondary/40 rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: (item.detected / maxValue) || 0.1 }}
              transition={{ delay: idx * 0.05 + 0.1, duration: 0.6 }}
            />
            <p className="text-xs text-muted text-center">{item.hour}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-6 justify-center text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary rounded-sm" />
          <span className="text-muted">Blocked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-secondary rounded-sm" />
          <span className="text-muted">Detected</span>
        </div>
      </div>
    </div>
  );
}