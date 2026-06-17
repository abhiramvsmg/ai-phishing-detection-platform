"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronRight,
  Globe,
  Lock,
  Mail,
  MessageSquare,
  Radar,
  ScanSearch,
  Send,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ─── Animation helpers ─── */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 2200, bounce: 0 });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, motionVal, value]);

  useEffect(() => {
    const unsub = spring.on("change", (v) => {
      setDisplay(Math.floor(v).toLocaleString());
    });
    return unsub;
  }, [spring]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${className}`}
    >
      {children}
    </div>
  );
}

function NeonBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium tracking-wide text-cyan-300 uppercase">
      {children}
    </span>
  );
}

/* ─── Navbar ─── */

function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#030712]/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight text-white">
            PhishGuard<span className="text-cyan-400">AI</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          {["Features", "Dashboard", "Copilot", "Pricing"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="transition-colors hover:text-cyan-300"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="/dashboard" className="hidden rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:text-white sm:block">
            Sign in
          </a>
          <a href="/dashboard" className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_24px_rgba(6,182,212,0.35)] transition-all hover:shadow-[0_0_32px_rgba(6,182,212,0.5)]">
            Get Started
          </a>
        </div>
      </div>
    </motion.header>
  );
}

/* ─── Hero ─── */

function HeroSection() {
  const trustBadges = [
    { icon: ShieldCheck, label: "SOC 2 Type II" },
    { icon: Lock, label: "GDPR Compliant" },
    { icon: CheckCircle2, label: "ISO 27001" },
    { icon: Zap, label: "99.99% Uptime" },
  ];

  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(6,182,212,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp} custom={0} className="mb-6 flex justify-center">
            <NeonBadge>
              <Sparkles className="h-3 w-3" />
              AI-Powered Threat Detection
            </NeonBadge>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Stop Phishing Attacks{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Before They Strike
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 sm:text-xl"
          >
            Enterprise-grade AI that scans URLs, analyzes emails, and assesses
            risk in real time — protecting your organization from the most
            sophisticated phishing campaigns.
          </motion.p>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <button className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 text-base font-semibold text-white shadow-[0_0_40px_rgba(6,182,212,0.4)] transition-all hover:shadow-[0_0_56px_rgba(6,182,212,0.55)] sm:w-auto">
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-cyan-500/30 hover:bg-white/[0.07] sm:w-auto">
              Watch Demo
              <ChevronRight className="h-4 w-4 text-cyan-400" />
            </button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={4}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-4"
          >
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm text-zinc-500"
              >
                <Icon className="h-4 w-4 text-cyan-500/70" />
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero visual — radar scan */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative mx-auto mt-16 max-w-3xl"
        >
          <GlassCard className="overflow-hidden p-1">
            <div className="relative flex aspect-[2/1] items-center justify-center overflow-hidden rounded-xl bg-[#0a1628]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08)_0%,transparent_70%)]" />
              {[1, 2, 3].map((ring) => (
                <motion.div
                  key={ring}
                  animate={{ scale: [0.5, 1.2], opacity: [0.6, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: ring * 1,
                    ease: "easeOut",
                  }}
                  className="absolute h-48 w-48 rounded-full border border-cyan-500/30 sm:h-64 sm:w-64"
                />
              ))}
              <Radar className="relative z-10 h-16 w-16 text-cyan-400/80 sm:h-20 sm:w-20" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-lg border border-white/[0.06] bg-black/40 px-4 py-2 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  <span className="font-mono text-xs text-emerald-400">
                    LIVE MONITORING
                  </span>
                </div>
                <span className="font-mono text-xs text-zinc-500">
                  847 threats neutralized today
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Live Stats ─── */

function StatsSection() {
  const stats = [
    {
      label: "Threats Scanned",
      value: 2847593,
      suffix: "+",
      icon: ScanSearch,
      color: "text-cyan-400",
      glow: "shadow-[0_0_24px_rgba(6,182,212,0.15)]",
    },
    {
      label: "Threats Blocked",
      value: 98421,
      suffix: "+",
      icon: ShieldAlert,
      color: "text-red-400",
      glow: "shadow-[0_0_24px_rgba(248,113,113,0.12)]",
    },
    {
      label: "Safe Websites",
      value: 1204567,
      suffix: "+",
      icon: Globe,
      color: "text-emerald-400",
      glow: "shadow-[0_0_24px_rgba(52,211,153,0.12)]",
    },
    {
      label: "Emails Analyzed",
      value: 5678901,
      suffix: "+",
      icon: Mail,
      color: "text-blue-400",
      glow: "shadow-[0_0_24px_rgba(96,165,250,0.12)]",
    },
  ];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="mb-12 text-center"
        >
          <motion.div variants={fadeUp} custom={0}>
            <NeonBadge>
              <Activity className="h-3 w-3" />
              Live Security Statistics
            </NeonBadge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Real-Time Threat Intelligence
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-3 max-w-xl text-zinc-400"
          >
            Our global sensor network processes millions of signals every day to
            keep your organization secure.
          </motion.p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.5 }}
            >
              <GlassCard
                className={`group p-6 transition-all hover:border-cyan-500/20 hover:bg-white/[0.05] ${stat.glow}`}
              >
                <div className="mb-4 flex items-center justify-between">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <TrendingUp className="h-4 w-4 text-zinc-600" />
                </div>
                <p className="text-3xl font-bold text-white sm:text-4xl">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="mt-1 text-sm text-zinc-500">{stat.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ─── */

function FeaturesSection() {
  const features = [
    {
      icon: ScanSearch,
      title: "URL Scanner",
      description:
        "Deep-scan any link against 50M+ known malicious domains, homograph attacks, and newly registered threat indicators in milliseconds.",
      tags: ["Real-time", "Zero-day detection"],
    },
    {
      icon: Mail,
      title: "Email Analysis",
      description:
        "Parse headers, body content, attachments, and sender reputation to flag spear-phishing, BEC, and credential harvesting attempts.",
      tags: ["Header forensics", "Attachment sandbox"],
    },
    {
      icon: Radar,
      title: "Threat Intelligence",
      description:
        "Continuously updated feeds from global honeypots, dark web monitoring, and industry ISACs power your defense posture.",
      tags: ["Global feeds", "Auto-updated"],
    },
    {
      icon: Sparkles,
      title: "AI Risk Assessment",
      description:
        "Our proprietary LLM ensemble scores behavioral anomalies, urgency language, and social engineering patterns with 99.7% accuracy.",
      tags: ["LLM-powered", "Explainable AI"],
    },
  ];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(59,130,246,0.08),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="mb-16 text-center"
        >
          <motion.div variants={fadeUp} custom={0}>
            <NeonBadge>
              <Shield className="h-3 w-3" />
              Platform Capabilities
            </NeonBadge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Complete Phishing Defense Suite
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-3 max-w-2xl text-zinc-400"
          >
            Four integrated modules working in concert to detect, analyze, and
            neutralize threats across every attack vector.
          </motion.p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 + 0.15, duration: 0.5 }}
            >
              <GlassCard className="group h-full p-8 transition-all hover:border-cyan-500/20 hover:bg-white/[0.05]">
                <div className="mb-5 inline-flex rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
                  <feature.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-relaxed text-zinc-400">
                  {feature.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {feature.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/[0.06] bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Dashboard Preview ─── */

function DashboardPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const barHeights = [40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 68];

  const recentThreats = [
    { url: "paypa1-secure.com/login", risk: "Critical", score: 98 },
    { url: "microsft-update.net/verify", risk: "High", score: 91 },
    { url: "amazon-prize.claim/offer", risk: "High", score: 87 },
    { url: "linkedin-msg.io/auth", risk: "Medium", score: 72 },
  ];

  const riskColor: Record<string, string> = {
    Critical: "text-red-400 bg-red-500/10 border-red-500/20",
    High: "text-orange-400 bg-orange-500/10 border-orange-500/20",
    Medium: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  };

  return (
    <section id="dashboard" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
          className="mb-12 text-center"
        >
          <motion.div variants={fadeUp} custom={0}>
            <NeonBadge>
              <Activity className="h-3 w-3" />
              Security Operations Center
            </NeonBadge>
          </motion.div>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Command Center Dashboard
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mx-auto mt-3 max-w-xl text-zinc-400"
          >
            Unified visibility into threats, trends, and response actions — all
            from a single pane of glass.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <GlassCard className="overflow-hidden">
            {/* Dashboard chrome */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="ml-3 font-mono text-xs text-zinc-500">
                phishguard.ai/dashboard
              </span>
            </div>

            <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-3">
              {/* Mini stat cards */}
              {[
                { label: "Active Threats", value: "23", change: "+4 today", color: "text-red-400" },
                { label: "Blocked Today", value: "847", change: "↑ 12%", color: "text-emerald-400" },
                { label: "Avg Response", value: "1.2s", change: "↓ 0.3s", color: "text-cyan-400" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                >
                  <p className="text-xs text-zinc-500">{card.label}</p>
                  <p className={`mt-1 text-2xl font-bold ${card.color}`}>
                    {card.value}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-600">{card.change}</p>
                </div>
              ))}

              {/* Chart */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 lg:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-sm font-medium text-zinc-300">
                    Threat Activity — Last 12 Hours
                  </p>
                  <span className="font-mono text-xs text-cyan-400">LIVE</span>
                </div>
                <div className="flex h-32 items-end gap-1.5 sm:h-40">
                  {barHeights.map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={inView ? { height: `${h}%` } : { height: 0 }}
                      transition={{ delay: 0.5 + i * 0.05, duration: 0.6, ease: "easeOut" }}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-600/40 to-cyan-400/80"
                    />
                  ))}
                </div>
              </div>

              {/* Threat feed */}
              <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="mb-3 text-sm font-medium text-zinc-300">
                  Recent Detections
                </p>
                <div className="space-y-2">
                  {recentThreats.map((t) => (
                    <div
                      key={t.url}
                      className="flex items-center justify-between gap-2 rounded-lg border border-white/[0.04] bg-black/20 px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-mono text-xs text-zinc-400">
                          {t.url}
                        </p>
                      </div>
                      <span
                        className={`shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase ${riskColor[t.risk]}`}
                      >
                        {t.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── AI Copilot Preview ─── */

function CopilotPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const messages = [
    {
      role: "user" as const,
      text: "Analyze this suspicious email from ceo@company-secure.net asking me to wire $50,000 urgently.",
    },
    {
      role: "assistant" as const,
      text: "⚠️ High-risk BEC attempt detected. Sender domain registered 3 days ago. SPF/DKIM fail. Urgency language score: 94/100. Recommend: quarantine email, alert finance team, block domain.",
    },
    {
      role: "user" as const,
      text: "Block the domain and generate an incident report.",
    },
    {
      role: "assistant" as const,
      text: "✅ Domain company-secure.net added to blocklist. Incident #INC-2024-8847 created. Finance team notified via Slack. Full forensics report ready for export.",
    },
  ];

  return (
    <section id="copilot" className="relative py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(6,182,212,0.06),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            ref={ref}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={stagger}
          >
            <motion.div variants={fadeUp} custom={0}>
              <NeonBadge>
                <Bot className="h-3 w-3" />
                AI Security Copilot
              </NeonBadge>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl"
            >
              Your 24/7 AI Security Analyst
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-4 leading-relaxed text-zinc-400"
            >
              Ask questions in plain English, triage incidents, and execute
              response actions — all through a conversational interface trained
              on billions of threat signals.
            </motion.p>

            <motion.ul
              variants={fadeUp}
              custom={3}
              className="mt-8 space-y-3"
            >
              {[
                "Natural language threat investigation",
                "One-click remediation actions",
                "Automated incident documentation",
                "Context-aware security recommendations",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-zinc-300">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-cyan-400" />
                  {item}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <GlassCard className="overflow-hidden">
              <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-5 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20">
                  <MessageSquare className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    Security Copilot
                  </p>
                  <p className="text-xs text-emerald-400">Online · Ready</p>
                </div>
              </div>

              <div className="max-h-[360px] space-y-4 overflow-y-auto p-5">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "rounded-br-md bg-gradient-to-r from-cyan-600/30 to-blue-600/30 text-zinc-200"
                          : "rounded-bl-md border border-white/[0.06] bg-white/[0.04] text-zinc-300"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="border-t border-white/[0.06] p-4">
                <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3">
                  <input
                    type="text"
                    readOnly
                    placeholder="Ask about a threat, URL, or email..."
                    className="flex-1 bg-transparent text-sm text-zinc-400 outline-none placeholder:text-zinc-600"
                  />
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600">
                    <Send className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─── */

function Footer() {
  const links = {
    Product: ["Features", "Dashboard", "Copilot", "Integrations", "API"],
    Company: ["About", "Careers", "Blog", "Press", "Contact"],
    Resources: ["Documentation", "Security", "Status", "Community", "Support"],
    Legal: ["Privacy", "Terms", "Compliance", "DPA"],
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#020617]/80">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-white">
                PhishGuard<span className="text-cyan-400">AI</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-500">
              Enterprise AI phishing detection platform trusted by security
              teams worldwide to stop attacks before they reach your users.
            </p>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white">{category}</h4>
              <ul className="mt-4 space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-zinc-500 transition-colors hover:text-cyan-400"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-sm text-zinc-600">
            © {new Date().getFullYear()} PhishGuard AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-zinc-600">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ─── */

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#030712] font-sans text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-blue-600/[0.04] blur-[150px]" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-cyan-600/[0.04] blur-[150px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <DashboardPreview />
        <CopilotPreview />
        <Footer />
      </div>
    </main>
  );
}
