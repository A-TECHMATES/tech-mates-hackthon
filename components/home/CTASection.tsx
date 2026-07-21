'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  return (
    <section className="relative py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-space text-3xl sm:text-5xl font-bold text-on-surface text-glow">
            Ready to master algorithms?
          </h2>
          <p className="mt-6 text-lg text-on-surface-variant max-w-xl mx-auto">
            Join thousands of developers who are leveling up their problem-solving skills with structured tracks and real competitions.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-fixed-dim px-8 py-3.5 text-base font-semibold text-[#010102] transition-all hover:shadow-xl hover:shadow-primary/25 active:scale-[0.97]"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link
              href="/tracks"
              className="rounded-xl border border-[rgba(74,69,77,0.4)] px-8 py-3.5 text-base font-medium text-on-surface hover:bg-white/[0.04] transition-all active:scale-[0.97]"
            >
              Explore Tracks
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
