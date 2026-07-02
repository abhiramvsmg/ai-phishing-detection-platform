"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ShieldCheck, 
  ArrowRight,
  Zap,
  Brain,
  Lock,
  Activity,
  BarChart3,
  Sparkles,
  Globe,
  Clock
} from 'lucide-react';
import { TiltCard } from '@/components/ui/TiltCard';

// Choreographed entries
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring" as const, stiffness: 100, damping: 16 } 
  },
};

const HeroVisual = () => {
  return (
    <div className="relative w-full max-w-[420px] aspect-square mx-auto flex items-center justify-center">
      {/* Soft gradient blur backdrops */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200/30 to-cyan-200/30 rounded-full blur-3xl opacity-60 animate-pulse-glow" />

      {/* Concentric design details */}
      <motion.div
        className="absolute w-80 h-80 rounded-full border border-indigo-200/40 border-dashed"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full border border-cyan-200/30"
        animate={{ scale: [0.95, 1.05, 0.95] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pulsing main core (Shield container) */}
      <motion.div
        className="relative z-10 w-36 h-36 rounded-3xl bg-white shadow-2xl shadow-indigo-150 border border-slate-100 flex items-center justify-center"
        animate={{ y: [-8, 8, -8] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-cyan-500/5"
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <ShieldCheck className="w-16 h-16 text-indigo-500 drop-shadow-[0_4px_12px_rgba(99,102,241,0.3)]" />
      </motion.div>

      {/* Floating threat nodes */}
      <motion.div
        className="absolute top-10 left-12 w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center shadow-lg"
        animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-danger animate-pulse" />
      </motion.div>

      <motion.div
        className="absolute bottom-16 right-10 w-9 h-9 rounded-full bg-teal-50 border border-teal-200 flex items-center justify-center shadow-lg"
        animate={{ x: [0, -40, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-3.5 h-3.5 rounded-full bg-success" />
      </motion.div>

      <motion.div
        className="absolute top-20 right-16 w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shadow-lg"
        animate={{ x: [0, -45, 0], y: [0, 40, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-2.5 h-2.5 bg-warning rounded-full animate-ping" />
      </motion.div>
    </div>
  );
};

export default function Home() {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Detection",
      description: "Advanced ML models detect phishing attempts with 99.8% accuracy in real-time",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-grade encryption and security protocols for maximum protection",
    },
    {
      icon: Zap,
      title: "Instant Analysis",
      description: "Analyze URLs and emails in milliseconds with our lightning-fast engine",
    },
    {
      icon: Globe,
      title: "Global Threat Intel",
      description: "Access real-time threat intelligence from across the globe",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive dashboards with actionable insights and trends",
    },
    {
      icon: Activity,
      title: "Live Monitoring",
      description: "24/7 monitoring with instant alerts and automated response",
    },
  ];

  const stats = [
    { label: "Threats Blocked", value: "2.4M+", icon: ShieldCheck },
    { label: "ML Accuracy", value: "99.8%", icon: Brain },
    { label: "Response Time", value: "<50ms", icon: Clock },
    { label: "Enterprise Clients", value: "1000+", icon: Globe },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient gradient backdrops */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] aspect-square rounded-full bg-indigo-100/30 blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] aspect-square rounded-full bg-cyan-100/20 blur-3xl" />
        <div className="absolute top-[40%] right-[20%] w-[30%] aspect-square rounded-full bg-rose-100/10 blur-3xl" />
      </div>

      {/* Cyber Grid background */}
      <div className="absolute inset-0 cyber-grid -z-20 pointer-events-none" />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <motion.div
          className="text-2xl font-black gradient-text flex items-center gap-2 tracking-tight uppercase"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <ShieldCheck className="w-8 h-8 text-primary" />
          Sentinel
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <Link
            href="/login"
            className="px-6 py-2.5 bg-indigo-50 border border-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-100 shadow-sm hover:shadow-indigo-50 transition-all font-bold text-sm active:scale-95 duration-150"
          >
            Sign In
          </Link>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center min-h-[calc(100vh-80px)]">
        <motion.div
          className="lg:col-span-7 space-y-8 text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-indigo-100 rounded-full shadow-sm text-xs font-semibold text-indigo-600"
            whileHover={{ scale: 1.02 }}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Powered by Advanced AI Core</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight uppercase">
            Protect Your Organization from
            <span className="gradient-text block mt-1">Phishing Threats</span>
          </h1>

          <p className="text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
            AI-powered phishing detection that catches threats before they reach your inbox. 
            Real-time URL analyses, email forensics, and actionable security metrics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 active:scale-97"
            >
              Launch Platform <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/register"
              className="px-8 py-4 bg-white border border-slate-200 text-slate-800 font-bold rounded-xl hover:bg-slate-50 transition-all text-center active:scale-97 shadow-sm shadow-slate-100"
            >
              Get Started Free
            </Link>
          </div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {stats.map((stat, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <TiltCard className="p-4 text-center border-slate-250 shadow-md">
                  <stat.icon className="w-5 h-5 text-indigo-500 mx-auto mb-2" />
                  <div className="text-2xl font-black text-slate-800">{stat.value}</div>
                  <div className="text-[10px] text-slate-600 font-bold uppercase tracking-wider mt-1">{stat.label}</div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Hero Visual side */}
        <motion.div
          className="lg:col-span-5 flex justify-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <HeroVisual />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-3">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">Powerful Features</h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto">
            Everything you need to secure your organization against malicious payloads and phishing attempts.
          </p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <TiltCard className="h-full border-slate-250 shadow-md hover:border-indigo-300">
                <div className="mb-4 inline-block p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="relative max-w-4xl mx-auto px-6 py-20">
        <motion.div 
          className="bg-white border border-slate-200/60 rounded-3xl p-12 text-center shadow-xl shadow-slate-100/50 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-100/20 rounded-full blur-xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-100/20 rounded-full blur-2xl" />

          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-3 uppercase tracking-tight">Ready to Secure Your Org?</h2>
          <p className="text-slate-500 mb-8 max-w-lg mx-auto text-sm leading-relaxed">
            Join thousands of enterprise users protecting their workflows and email domains with Sentinel AI.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all active:scale-97"
          >
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 mt-20 py-8 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto text-center text-slate-500 text-xs font-semibold">
          <p>&copy; 2026 Sentinel AI. Advanced Phishing Detection & Telemetry. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}