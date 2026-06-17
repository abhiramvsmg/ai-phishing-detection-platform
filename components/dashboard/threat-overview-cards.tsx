"use client";

import { motion } from "framer-motion";
import {
  Clock,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { threatStats } from "@/lib/dashboard-data";

const iconMap = {
  "shield-alert": ShieldAlert,
  "shield-check": ShieldCheck,
  scan: ScanSearch,
  clock: Clock,
};

export function ThreatOverviewCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {threatStats.map((stat, i) => {
        const Icon = iconMap[stat.icon];
        const TrendIcon =
          stat.trend === "up"
            ? TrendingUp
            : stat.trend === "down"
              ? TrendingDown
              : null;

        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.08,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <GlassCard
              hover
              className={`border bg-gradient-to-br p-5 ${stat.cardClass}`}
            >
              <div className="flex items-start justify-between">
                <div className={`rounded-lg border p-2.5 ${stat.iconClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                {TrendIcon && (
                  <TrendIcon
                    className={`h-4 w-4 ${
                      stat.id === "avg-response"
                        ? "text-emerald-500"
                        : stat.id === "active-threats"
                          ? "text-red-400"
                          : "text-emerald-400"
                    }`}
                  />
                )}
              </div>
              <p className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-0.5 text-sm font-medium text-zinc-300">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-zinc-500">{stat.change}</p>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}
