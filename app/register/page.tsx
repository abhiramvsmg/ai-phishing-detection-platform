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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Soft gradient blur backdrops */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[50%] aspect-square rounded-full bg-indigo-100/30 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[40%] aspect-square rounded-full bg-cyan-100/25 blur-3xl" />
      </div>

      {/* Cyber Grid background */}
      <div className="absolute inset-0 cyber-grid -z-20 pointer-events-none" />

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center gap-2 mb-4 cursor-pointer"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <ShieldCheck className="w-8 h-8 text-primary" />
            <span className="text-2xl font-black gradient-text uppercase tracking-tight">Sentinel</span>
          </motion.div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Get Started</h1>
          <p className="text-slate-500 text-sm mt-1">Create your security dashboard account</p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200/60 rounded-3xl p-8 space-y-4 shadow-xl shadow-slate-100/40 relative overflow-hidden"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                autoComplete="name"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-slate-900 text-xs focus:outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@company.com"
                autoComplete="email"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-slate-900 text-xs focus:outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Company */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Company</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your Company"
                autoComplete="organization"
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-slate-900 text-xs focus:outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-slate-900 text-xs focus:outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="new-password"
                minLength={8}
                required
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-slate-900 text-xs focus:outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Accept Terms */}
          <label className="flex items-start gap-2 text-xs font-semibold text-slate-600 cursor-pointer pt-2 select-none w-fit">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => setAcceptedTerms(event.target.checked)}
              required
              className="w-4 h-4 rounded border-slate-300 bg-slate-50 cursor-pointer accent-indigo-600 focus:ring-0 focus:ring-offset-0 mt-0.5"
            />
            <span>
              I agree to the{" "}
              <Link href="#" className="text-indigo-600 hover:text-indigo-500 font-bold">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-indigo-600 hover:text-indigo-500 font-bold">
                Privacy Policy
              </Link>
            </span>
          </label>

          {error && (
            <motion.p 
              className="rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-3 text-xs font-bold text-rose-600" 
              role="alert"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 mt-4 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60 text-sm active:scale-97"
            whileTap={{ scale: 0.97 }}
          >
            {isSubmitting ? "Creating account..." : "Create Account"} <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.form>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-xs font-semibold">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-500 font-bold">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
