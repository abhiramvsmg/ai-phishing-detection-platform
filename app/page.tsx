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
  CheckCircle,
  Sparkles,
  Globe,
  Clock
} from 'lucide-react';

// Landing Page with Modern UI
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
    <div className="min-h-screen bg-gradient-dark overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4">
        <motion.div
          className="text-2xl font-bold gradient-text flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <ShieldCheck className="w-8 h-8 text-primary" />
          Sentinel
        </motion.div>
        <Link
          href="/login"
          className="px-6 py-2 glass hover:bg-white/[0.12] transition-smooth text-sm font-semibold"
        >
          Sign In
        </Link>
      </nav>

      {/* Hero Section */}
      <motion.section
        className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="max-w-4xl text-center space-y-8"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Powered by Advanced AI</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            Protect Your Organization from
            <span className="gradient-text block">Phishing Threats</span>
          </h1>

          <p className="text-xl text-muted max-w-2xl mx-auto">
            AI-powered phishing detection that catches threats before they reach your inbox. 
            Real-time analysis, enterprise-grade security, and actionable intelligence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-smooth flex items-center justify-center gap-2"
            >
              Launch Platform <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/register"
              className="px-8 py-4 glass font-semibold rounded-xl hover:bg-white/[0.12] transition-smooth"
            >
              Get Started Free
            </Link>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {stats.map((stat, idx) => (
              <div key={idx} className="glass p-4 text-center">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="relative z-10 max-w-7xl mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            Everything you need to secure your organization against phishing attacks
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="glass p-6 rounded-2xl group hover:border-primary/50 transition-smooth"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 inline-block p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-smooth">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="relative max-w-4xl mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="glass rounded-3xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Secure Your Organization?</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Join thousands of enterprises protecting their teams with Sentinel AI.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-smooth"
          >
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-muted text-sm">
          <p>&copy; 2026 Sentinel AI. Advanced Phishing Detection. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}