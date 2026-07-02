"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Brain, Shield, AlertTriangle, Zap, Clock, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/lib/api";
import { TiltCard } from "@/components/ui/TiltCard";

interface RecentThreat {
  title: string;
  time: string;
  severity: string;
  details: string;
}

export default function Dashboard() {
  const [phishingCount, setPhishingCount] = useState<number | null>(null);
  const [recentThreats, setRecentThreats] = useState<RecentThreat[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    api.dashboard
      .stats()
      .then((stats) => setPhishingCount(stats.phishing_scans))
      .catch((err) => setLoadError(err.message ?? "Failed to load stats"));

    api.dashboard
      .recentScans()
      .then((scans) => {
        const mapped: RecentThreat[] = scans.slice(0, 4).map((scan) => ({
          title: `${scan.scan_type}: ${scan.result === "PHISHING" ? "Flagged" : "Scanned"}`,
          time: new Date(scan.created_at).toLocaleString(),
          severity:
            scan.risk_level === "CRITICAL"
              ? "Critical"
              : scan.risk_level === "HIGH"
              ? "High"
              : scan.risk_level === "MEDIUM"
              ? "Medium"
              : "Safe",
          details: scan.content,
        }));
        setRecentThreats(mapped);
      })
      .catch((err) => setLoadError(err.message ?? "Failed to load recent scans"));
  }, []);

  return (
    <div className="space-y-8 bg-background min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">Security Dashboard</h1>
        <p className="text-slate-500 text-sm font-medium">Real-time threat detection and forensic analysis</p>
      </motion.div>

      {loadError && (
        <motion.p 
          className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          {loadError} — log in first, or check the backend is running.
        </motion.p>
      )}

      {/* KPI stats section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.08 } },
        }}
      >
        <KPICard
          label="Threats Blocked"
          value={phishingCount !== null ? String(phishingCount) : "—"}
          icon={Shield}
          trend={phishingCount !== null ? "Live Feed" : "..."}
          color="text-teal-600"
        />
        <KPICard
          label="AI Confidence"
          value="99.8%"
          icon={Brain}
          trend="Excellent"
          color="text-indigo-600"
        />
        <KPICard
          label="Active Incidents"
          value="12"
          icon={AlertTriangle}
          trend="3 Critical"
          color="text-amber-600"
        />
        <KPICard
          label="Avg Response"
          value="45ms"
          icon={Zap}
          trend="Optimized"
          color="text-indigo-600"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat activity chart */}
        <motion.div
          className="lg:col-span-2 bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-100/40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Threat Activity</h2>
              <p className="text-xs text-slate-500 font-medium">Last 24 hours monitoring</p>
            </div>
            <motion.div
              className="flex items-center gap-2 text-xs font-bold text-teal-600 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-1"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full" />
              LIVE TELEMETRY
            </motion.div>
          </div>

          <ThreatChart />
        </motion.div>

        {/* AI Insights Card */}
        <motion.div
          className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-100/40 flex flex-col justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <Brain className="w-5 h-5 text-indigo-500" />
              <h2 className="text-lg font-bold text-slate-800">AI Guardrail Insights</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-indigo-50/60 border border-indigo-100 rounded-2xl space-y-2">
                <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Anomaly Alert</p>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Unusual spike in credential harvesting attempts detected at 14:32 UTC. Shield algorithms engaged.
                </p>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Model Precision</span>
                    <span className="text-indigo-600">99.8%</span>
                  </div>
                  <motion.div
                    className="w-full h-2 bg-slate-100 rounded-full overflow-hidden"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                  >
                    <div className="h-full w-[99.8%] bg-gradient-to-r from-primary to-secondary" />
                  </motion.div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Defensive Capture Rate</span>
                    <span className="text-teal-600">98.5%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-[98.5%] bg-teal-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center">
            System Operational status: normal
          </div>
        </motion.div>
      </div>

      {/* Recent Threats Table list */}
      <motion.div
        className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-100/40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-indigo-500" />
          Recent Detections & Scans
        </h2>

        {recentThreats === null ? (
          <p className="text-sm text-slate-500">Loading recent platform activity...</p>
        ) : recentThreats.length === 0 ? (
          <p className="text-sm text-slate-500">No scans logged yet. Initiate your first scan to see live reports.</p>
        ) : (
          <div className="space-y-3">
            {recentThreats.map((threat, idx) => (
              <motion.div
                key={idx}
                className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-50 border border-slate-150 rounded-2xl transition-all"
                whileHover={{ x: 4 }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                      threat.severity === "Critical"
                        ? "bg-rose-500 animate-pulse"
                        : threat.severity === "High"
                        ? "bg-danger"
                        : threat.severity === "Safe"
                        ? "bg-success"
                        : "bg-warning"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800">{threat.title}</p>
                    <p className="text-xs text-slate-500 truncate max-w-lg font-mono mt-0.5">{threat.details}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border ${
                      threat.severity === "Critical" || threat.severity === "High"
                        ? "bg-rose-50 border-rose-200 text-rose-600"
                        : threat.severity === "Safe"
                        ? "bg-teal-50 border-teal-200 text-teal-700"
                        : "bg-amber-50 border-amber-200 text-amber-700"
                    }`}
                  >
                    {threat.severity}
                  </span>
                  <p className="text-[10px] text-slate-400 font-mono mt-1">{threat.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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
  icon: React.ComponentType<any>;
  trend: string;
  color: string;
}) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
    >
      <TiltCard className="p-6 h-full group hover:border-indigo-300">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-indigo-50 border border-slate-100 transition-smooth">
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <span className={`text-[10px] font-bold ${
            trend.includes('Critical') || trend.includes('↓') || trend.includes('-')
              ? 'bg-rose-50 border border-rose-100 text-rose-600'
              : 'bg-teal-50 border border-teal-100 text-teal-700'
          } px-2 py-0.5 rounded-full uppercase tracking-wide`}>{trend}</span>
        </div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">{label}</p>
        <h3 className="text-2xl md:text-3xl font-black text-slate-800">{value}</h3>
      </TiltCard>
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
      <div className="flex gap-4 h-48 items-end">
        {data.map((item, idx) => (
          <div key={idx} className="flex-1 flex flex-col justify-end gap-2 h-full">
            <div className="flex-1 flex items-end gap-1">
              <motion.div
                className="w-full bg-gradient-to-t from-indigo-500 to-indigo-300 rounded-t-md relative group cursor-pointer"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: (item.blocked / maxValue) || 0.1 }}
                transition={{ delay: idx * 0.05, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                style={{ originY: 1 }}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.blocked}
                </div>
              </motion.div>
              <motion.div
                className="w-full bg-gradient-to-t from-cyan-400 to-cyan-200 rounded-t-md relative group cursor-pointer"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: (item.detected / maxValue) || 0.1 }}
                transition={{ delay: idx * 0.05 + 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                style={{ originY: 1 }}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-bold text-cyan-600 bg-cyan-50 border border-cyan-100 rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.detected}
                </div>
              </motion.div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 text-center">{item.hour}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-6 justify-center text-[10px] font-bold uppercase tracking-wider text-slate-500 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-indigo-500 rounded-sm" />
          <span>Threats Blocked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-cyan-400 rounded-sm" />
          <span>Incidents Detected</span>
        </div>
      </div>
    </div>
  );
}