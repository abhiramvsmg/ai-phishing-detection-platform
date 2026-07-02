"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ArrowRight, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { signInUser } from '@/lib/auth-client';

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
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

    if (!formData.email.trim() || !formData.password) {
      setError("Enter your email and password to continue.");
      return;
    }

    setIsSubmitting(true);
    const result = await signInUser(formData.email, formData.password);

    if (!result.ok) {
      setError(result.message);
      setIsSubmitting(false);
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Soft gradient blur backdrops */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
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
        {/* Header */}
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
          <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Welcome Back</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to your security dashboard</p>
        </div>

        {/* Form Container */}
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200/60 rounded-3xl p-8 space-y-6 shadow-xl shadow-slate-100/40 relative overflow-hidden"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          {/* Email Field */}
          <div className="space-y-2">
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
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-slate-900 text-sm focus:outline-none placeholder:text-slate-500"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide">Password</label>
              <Link href="#" className="text-xs font-bold text-indigo-650 hover:text-indigo-550">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-slate-900 text-sm focus:outline-none placeholder:text-slate-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-slate-500 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer w-fit select-none">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-slate-350 bg-slate-50 cursor-pointer accent-indigo-650 focus:ring-0 focus:ring-offset-0"
            />
            <span>Remember me</span>
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
            className="w-full py-3.5 bg-gradient-to-r from-primary to-secondary text-white font-bold rounded-xl hover:shadow-lg hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60 text-sm active:scale-97"
            whileTap={{ scale: 0.97 }}
          >
            {isSubmitting ? "Signing in..." : "Sign In"} <ArrowRight className="w-4 h-4" />
          </motion.button>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200/60" />
            </div>
            <div className="relative flex justify-center text-[10px] font-bold uppercase tracking-wider">
              <span className="px-3 bg-white text-slate-400">Or continue with</span>
            </div>
          </div>

          {/* Social Auth */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              type="button" 
              className="py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all text-xs font-bold text-slate-700 active:scale-95 duration-100"
            >
              GitHub
            </button>
            <button 
              type="button" 
              className="py-2.5 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all text-xs font-bold text-slate-700 active:scale-95 duration-100"
            >
              Google
            </button>
          </div>
        </motion.form>

        {/* Footer Link */}
        <div className="text-center mt-6">
          <p className="text-slate-500 text-xs font-semibold">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-indigo-600 hover:text-indigo-500 font-bold">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
