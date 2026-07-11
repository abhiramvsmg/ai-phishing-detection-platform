"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Brain, Shield, AlertTriangle, Zap, Clock, Activity, Target, ShieldCheck } from "lucide-react";
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
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
          <ShieldCheck className="w-8 h-8 text-primary animate-glow-pulse" />
          Security Dashboard
        </h1>
        <p className="text-slate-500 text-sm font-semibold">Real-time threat detection and forensic analysis</p>
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

      {/* KPI stats section using 3D TiltCards with custom glows */}
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
          glowColor="13, 148, 136"
          color="text-teal-600"
        />
        <KPICard
          label="AI Confidence"
          value="99.8%"
          icon={Brain}
          trend="Excellent"
          glowColor="99, 102, 241"
          color="text-violet-600"
        />
        <KPICard
          label="Active Incidents"
          value="12"
          icon={AlertTriangle}
          trend="3 Critical"
          glowColor="217, 119, 6"
          color="text-amber-600"
        />
        <KPICard
          label="Avg Response"
          value="45ms"
          icon={Zap}
          trend="Optimized"
          glowColor="6, 182, 212"
          color="text-emerald-600"
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Threat activity chart in 3D Card */}
        <TiltCard
          glowColor="6, 182, 212"
          className="lg:col-span-2 bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-100/40 relative overflow-hidden"
          maxRotation={3}
          depthZ={8}
        >
          <div className="cyber-grid absolute inset-0 pointer-events-none opacity-20" />
          <div className="flex justify-between items-center mb-6 relative z-20">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Threat Activity</h2>
              <p className="text-xs text-slate-500 font-medium">Last 24 hours monitoring</p>
            </div>
            <motion.div
              className="flex items-center gap-2 text-xs font-bold text-teal-600 bg-teal-50 border border-teal-100 rounded-full px-2.5 py-1 select-none"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-ping" />
              LIVE TELEMETRY
            </motion.div>
          </div>

          <div className="relative z-20">
            <ThreatChart />
          </div>
        </TiltCard>

        {/* AI Insights Card in 3D Card */}
        <TiltCard
          glowColor="99, 102, 241"
          className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-100/40 flex flex-col justify-between h-full"
          maxRotation={4}
          depthZ={10}
        >
          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
              <Brain className="w-5 h-5 text-violet-500 animate-float" />
              <h2 className="text-lg font-bold text-slate-800 font-black tracking-tight">AI Guardrail Insights</h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-violet-50/60 border border-violet-100 rounded-2xl space-y-2 hover:border-violet-300 transition-colors">
                <p className="text-xs font-black text-violet-600 uppercase tracking-wider">Anomaly Alert</p>
                <p className="text-xs text-slate-600 leading-relaxed font-semibold">
                  Unusual spike in credential harvesting attempts detected at 14:32 UTC. Shield algorithms engaged.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Model Precision</span>
                    <span className="text-violet-600">99.8%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-secondary"
                      initial={{ width: "0%" }}
                      animate={{ width: "99.8%" }}
                      transition={{ delay: 0.5, duration: 1 }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-700">
                    <span>Defensive Capture Rate</span>
                    <span className="text-teal-600">98.5%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-teal-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "98.5%" }}
                      transition={{ delay: 0.6, duration: 1 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider text-center select-none">
            System Operational status: normal
          </div>
        </TiltCard>
      </div>

      {/* Recent Threats Table list wrapped in a light 3D card */}
      <TiltCard
        glowColor="99, 102, 241"
        className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-xl shadow-slate-100/40 relative overflow-hidden"
        maxRotation={2}
        depthZ={5}
      >
        <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-violet-500" />
          Recent Detections & Scans
        </h2>

        {recentThreats === null ? (
          <p className="text-sm text-slate-500 font-semibold">Loading recent platform activity...</p>
        ) : recentThreats.length === 0 ? (
          <p className="text-sm text-slate-500 font-semibold">No scans logged yet. Initiate your first scan to see live reports.</p>
        ) : (
          <div className="space-y-3">
            {recentThreats.map((threat, idx) => (
              <motion.div
                key={idx}
                className="flex items-center justify-between p-4 bg-slate-50/50 hover:bg-white border border-slate-100 hover:border-violet-200 hover:shadow-md hover:shadow-violet-50/20 rounded-2xl transition-all duration-300"
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
      </TiltCard>
    </div>
  );
}

function KPICard({
  label,
  value,
  icon: Icon,
  trend,
  glowColor,
  color
}: {
  label: string;
  value: string;
  icon: React.ComponentType<any>;
  trend: string;
  glowColor: string;
  color: string;
}) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
    >
      <TiltCard glowColor={glowColor} className="p-6 h-full border border-slate-200/60 bg-white">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 rounded-xl bg-slate-50 group-hover:bg-violet-50 border border-slate-100 transition-all duration-300">
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <span className={`text-[10px] font-bold ${
            trend.includes('Critical') || trend.includes('↓') || trend.includes('-')
              ? 'bg-rose-50 border border-rose-100 text-rose-600'
              : 'bg-teal-50 border border-teal-100 text-teal-700'
          } px-2 py-0.5 rounded-full uppercase tracking-wide`}>{trend}</span>
        </div>
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">{label}</p>
        <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">{value}</h3>
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
            <div className="flex-1 flex items-end gap-1.5">
              <motion.div
                className="w-full bg-gradient-to-t from-violet-500 to-violet-300 rounded-t-md relative group cursor-pointer hover:shadow-lg hover:shadow-violet-500/20"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: (item.blocked / maxValue) || 0.1 }}
                transition={{ delay: idx * 0.05, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                style={{ originY: 1 }}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-bold text-violet-600 bg-violet-50 border border-violet-100 rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 shadow-md">
                  {item.blocked}
                </div>
              </motion.div>
              <motion.div
                className="w-full bg-gradient-to-t from-emerald-400 to-emerald-200 rounded-t-md relative group cursor-pointer hover:shadow-lg hover:shadow-emerald-500/20"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: (item.detected / maxValue) || 0.1 }}
                transition={{ delay: idx * 0.05 + 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05 }}
                style={{ originY: 1 }}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 shadow-md">
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
          <div className="w-2.5 h-2.5 bg-violet-500 rounded-sm" />
          <span>Threats Blocked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-emerald-400 rounded-sm" />
          <span>Incidents Detected</span>
        </div>
      </div>
    </div>
  );
}