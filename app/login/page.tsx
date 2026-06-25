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
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-6 py-12">
      {/* Animated Background */}
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
        {/* Header */}
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
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted">Sign in to your security dashboard</p>
        </div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="glass rounded-2xl p-8 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {/* Email Field */}
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
                className="w-full pl-10 pr-4 py-3 glass-sm bg-white/[0.05] focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold">Password</label>
              <Link href="/forgot-password" className="text-xs text-primary hover:text-primary/80">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                autoComplete="current-password"
                required
                className="w-full pl-10 pr-10 py-3 glass-sm bg-white/[0.05] focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-smooth"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted hover:text-primary transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border border-primary/30 bg-primary/5 cursor-pointer accent-primary"
            />
            <span>Remember me</span>
          </label>

          {error && (
            <p className="rounded-lg border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-red-200" role="alert">
              {error}
            </p>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-smooth flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? "Signing in..." : "Sign In"} <ArrowRight className="w-5 h-5" />
          </motion.button>

          {/* Divider */}
          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-gradient-dark text-muted">Or continue with</span>
            </div>
          </div>

          {/* Social Auth */}
          <div className="grid grid-cols-2 gap-4">
            <button type="button" className="glass-sm py-2.5 rounded-lg hover:bg-white/[0.12] transition-smooth text-sm font-medium">
              GitHub
            </button>
            <button type="button" className="glass-sm py-2.5 rounded-lg hover:bg-white/[0.12] transition-smooth text-sm font-medium">
              Google
            </button>
          </div>
        </motion.form>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-muted text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-primary hover:text-primary/80 font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
