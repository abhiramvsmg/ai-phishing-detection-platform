"use client";

import { motion } from "framer-motion";
import { ExternalLink, Filter, MoreHorizontal } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import {
  riskLevelStyles,
  scanHistory,
  statusStyles,
} from "@/lib/dashboard-data";

export function ScanHistoryTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
    >
      <GlassCard className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-white/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold text-white">
              Scan History
            </h2>
            <p className="text-xs text-zinc-500">
              Recent URL, email, and domain scans across all integrations
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-white">
              <Filter className="h-3.5 w-3.5" />
              Filter
            </button>
            <button className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-1.5 text-zinc-400 transition-colors hover:text-white">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.04] bg-white/[0.02]">
                {[
                  "Scan ID",
                  "Target",
                  "Type",
                  "Status",
                  "Risk",
                  "Source",
                  "Timestamp",
                  "",
                ].map((col) => (
                  <th
                    key={col}
                    className="px-5 py-3 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {scanHistory.map((scan, i) => (
                <motion.tr
                  key={scan.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.04 }}
                  className="group border-b border-white/[0.04] transition-colors hover:bg-white/[0.03]"
                >
                  <td className="px-5 py-3.5">
                    <span className="font-mono text-xs text-cyan-400/90">
                      {scan.id}
                    </span>
                  </td>
                  <td className="max-w-[220px] px-5 py-3.5">
                    <span className="block truncate font-mono text-xs text-zinc-300">
                      {scan.target}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="rounded border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[11px] font-medium text-zinc-400">
                      {scan.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex rounded border px-2 py-0.5 text-[11px] font-semibold ${statusStyles[scan.status]}`}
                    >
                      {scan.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/[0.06]">
                        <div
                          className={`h-full rounded-full ${
                            scan.risk >= 80
                              ? "bg-red-500"
                              : scan.risk >= 60
                                ? "bg-orange-500"
                                : scan.risk >= 30
                                  ? "bg-yellow-500"
                                  : "bg-emerald-500"
                          }`}
                          style={{ width: `${scan.risk}%` }}
                        />
                      </div>
                      <span
                        className={`rounded border px-1.5 py-0.5 text-[10px] font-bold ${riskLevelStyles[scan.riskLevel]}`}
                      >
                        {scan.risk}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-zinc-500">
                    {scan.source}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-xs text-zinc-500">
                    {scan.timestamp}
                  </td>
                  <td className="px-5 py-3.5">
                    <button className="rounded p-1 text-zinc-600 opacity-0 transition-all group-hover:opacity-100 hover:bg-white/[0.06] hover:text-cyan-400">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-3">
          <p className="text-xs text-zinc-500">
            Showing {scanHistory.length} of 12,483 scans today
          </p>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button
                key={p}
                className={`rounded px-2.5 py-1 text-xs font-medium ${
                  p === 1
                    ? "bg-cyan-500/15 text-cyan-400"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
