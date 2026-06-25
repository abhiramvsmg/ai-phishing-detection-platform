"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight, Mail, Lock, User, Building2 } from "lucide-react";
import { registerUser } from "@/lib/auth-client";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    password: "",
    confirmPassword: "",
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
const handleSubmit = async (e: React.FormEvent) => {    e.preventDefault();
    setError("");

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.company.trim()) {
      setError("Fill in your name, email, and company.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError("Accept the terms to create your account.");
      return;
    }

    setIsSubmitting(true);
   const result = await registerUser({
      fullName: formData.fullName,
      email: formData.email,
      company: formData.company,
      password: formData.password,
    });

    if (!result.ok) {
      setError(result.message);
      setIsSubmitting(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center gap-2 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold gradient-text">Sentinel</span>
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Get Started</h1>
          <p className="text-muted">Create your security dashboard account</p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="space-y-2">
            <label className="block text-sm font-semibold">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-muted" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                autoComplete="name"
                required
                className="w-full pl-10 pr-4 py-2.5 glass-sm bg-white/[0.05] focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-muted" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                autoComplete="email"
                required
                className="w-full pl-10 pr-4 py-2.5 glass-sm bg-white/[0.05] focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold">Company</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3 w-5 h-5 text-muted" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company"
                autoComplete="organization"
                required
                className="w-full pl-10 pr-4 py-2.5 glass-sm bg-white/[0.05] focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-muted" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full pl-10 pr-4 py-2.5 glass-sm bg-white/[0.05] focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-muted" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full pl-10 pr-4 py-2.5 glass-sm bg-white/[0.05] focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth text-sm"
              />
            </div>
          </div>

          <label className="flex items-start gap-2 text-xs cursor-pointer pt-2">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              required
              className="w-4 h-4 rounded border border-primary/30 bg-primary/5 cursor-pointer accent-primary mt-0.5"
            />
            <span className="text-muted">
              I agree to the{" "}
              <Link href="#" className="text-primary hover:text-primary/80">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary hover:text-primary/80">
                Privacy Policy
              </Link>
            </span>
          </label>

          {error && (
            <p className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-red-200" role="alert">
              {error}
            </p>
          )}

          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 mt-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-smooth flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? "Creating account..." : "Create Account"} <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.form>

        <div className="text-center mt-6">
          <p className="text-muted text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:text-primary/80 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
