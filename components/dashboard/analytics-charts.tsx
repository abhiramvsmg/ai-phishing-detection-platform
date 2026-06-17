"use client";

import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GlassCard } from "@/components/ui/glass-card";
import {
  scanVolumeData,
  threatActivityData,
  threatCategoryData,
} from "@/lib/dashboard-data";

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-white/[0.08] bg-[#030712]/95 px-3 py-2 shadow-xl backdrop-blur-xl">
      <p className="mb-1.5 text-xs font-semibold text-white">{label}</p>
      {payload.map((entry) => (
        <p key={entry.name} className="text-xs text-zinc-400">
          <span style={{ color: entry.color }}>{entry.name}: </span>
          {entry.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
}

export function AnalyticsCharts() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* Threat Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
      >
        <GlassCard className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Threat Activity
              </h3>
              <p className="text-xs text-zinc-500">Last 24 hours</p>
            </div>
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              LIVE
            </span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={threatActivityData}>
              <defs>
                <linearGradient id="threatGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="blockedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="rgba(255,255,255,0.04)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="time"
                tick={{ fill: "#71717a", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#71717a", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={30}
              />
              <Tooltip content={<ChartTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }}
                formatter={(value) => (
                  <span className="text-zinc-400">{value}</span>
                )}
              />
              <Area
                type="monotone"
                dataKey="threats"
                name="Detected"
                stroke="#ef4444"
                strokeWidth={2}
                fill="url(#threatGrad)"
              />
              <Area
                type="monotone"
                dataKey="blocked"
                name="Blocked"
                stroke="#06b6d4"
                strokeWidth={2}
                fill="url(#blockedGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </GlassCard>
      </motion.div>

      {/* Scan Volume */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <GlassCard className="p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-white">Scan Volume</h3>
            <p className="text-xs text-zinc-500">Weekly breakdown by type</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={scanVolumeData} barGap={4}>
              <CartesianGrid
                stroke="rgba(255,255,255,0.04)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                tick={{ fill: "#71717a", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#71717a", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                width={40}
              />
              <Tooltip content={<ChartTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }}
                formatter={(value) => (
                  <span className="text-zinc-400">{value}</span>
                )}
              />
              <Bar
                dataKey="urls"
                name="URLs"
                fill="#06b6d4"
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
              <Bar
                dataKey="emails"
                name="Emails"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </motion.div>

      {/* Threat Categories — full width on large screens in a 3-col grid parent */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="lg:col-span-2"
      >
        <GlassCard className="p-5">
          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-white">
                Threat Categories
              </h3>
              <p className="text-xs text-zinc-500">
                Distribution of blocked threats this month
              </p>
            </div>
            <p className="text-2xl font-bold text-white">
              927{" "}
              <span className="text-sm font-normal text-zinc-500">
                total blocked
              </span>
            </p>
          </div>

          <div className="grid items-center gap-6 md:grid-cols-2">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={threatCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {threatCategoryData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip />} />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-3">
              {threatCategoryData.map((cat) => (
                <div key={cat.name} className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="flex-1 text-sm text-zinc-400">
                    {cat.name}
                  </span>
                  <span className="font-mono text-sm font-semibold text-white">
                    {cat.value}
                  </span>
                  <span className="w-10 text-right text-xs text-zinc-600">
                    {Math.round((cat.value / 927) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
