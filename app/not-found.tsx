'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Code2, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="min-h-[80vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-container-low">
              <Code2 className="h-10 w-10 text-outline-variant" />
            </div>
          </div>
          <h1 className="font-space text-5xl font-bold text-on-surface mb-3">404</h1>
          <p className="text-lg text-on-surface-variant mb-8">This page doesn&apos;t exist</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-xl bg-gradient-to-br from-primary to-primary-fixed-dim text-[#010102] font-medium text-sm hover:shadow-lg hover:shadow-primary/20 transition-all"
          >
            <ArrowLeft className="h-4 w-4" /> Go Home
          </Link>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
