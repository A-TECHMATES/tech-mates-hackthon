'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="relative min-h-screen flex items-center justify-center pt-16 pb-8">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] via-transparent to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 w-full max-w-md mx-6"
        >
          <div className="glass-card rounded-2xl p-8 border border-[rgba(74,69,77,0.2)]">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-fixed-dim">
                  <Code2 className="h-6 w-6 text-[#010102]" />
                </div>
              </div>
              <h1 className="font-space text-2xl font-bold text-on-surface">Welcome back</h1>
              <p className="mt-2 text-sm text-on-surface-variant">Sign in to continue your journey</p>
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-on-surface mb-1.5">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="w-full h-11 pl-10 pr-10 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-[rgba(74,69,77,0.3)] bg-surface-container-low text-primary focus:ring-primary/30" />
                  <span className="text-sm text-on-surface-variant">Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:text-primary-fixed-dim transition-colors">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-gradient-to-br from-primary to-primary-fixed-dim text-[#010102] font-semibold text-sm flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all"
              >
                Sign In
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[rgba(74,69,77,0.2)]">
              <p className="text-center text-sm text-on-surface-variant">
                Don&apos;t have an account?{' '}
                <Link href="/auth/register" className="text-primary hover:text-primary-fixed-dim font-medium transition-colors">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
