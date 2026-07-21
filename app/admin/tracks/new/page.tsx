'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ArrowLeft, Save, Layers } from 'lucide-react';

export default function NewTrackPage() {
  const [form, setForm] = useState({
    title: '', slug: '', description: '', difficulty: 'Beginner',
    icon: 'Layers', levels: 5, challengesPerLevel: 5, xpReward: 2500,
  });

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Admin
            </Link>

            <div className="glass-card rounded-2xl p-8 border border-[rgba(74,69,77,0.2)]">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-fixed-dim">
                  <Layers className="h-5 w-5 text-[#010102]" />
                </div>
                <div>
                  <h1 className="font-space text-xl font-bold text-on-surface">Create Track</h1>
                  <p className="text-sm text-on-surface-variant">Define a new learning track</p>
                </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Track Title</label>
                    <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g., Dynamic Programming"
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Slug</label>
                    <input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })}
                      placeholder="dynamic-programming"
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Difficulty</label>
                    <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface focus:outline-none focus:border-primary/50 text-sm">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                      <option>Expert</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Description</label>
                    <textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                      placeholder="Describe what this track covers..."
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm resize-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Number of Levels</label>
                    <input type="number" value={form.levels} onChange={e => setForm({ ...form, levels: parseInt(e.target.value) || 0 })}
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface focus:outline-none focus:border-primary/50 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Challenges per Level</label>
                    <input type="number" value={form.challengesPerLevel} onChange={e => setForm({ ...form, challengesPerLevel: parseInt(e.target.value) || 0 })}
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface focus:outline-none focus:border-primary/50 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Total XP Reward</label>
                    <input type="number" value={form.xpReward} onChange={e => setForm({ ...form, xpReward: parseInt(e.target.value) || 0 })}
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface focus:outline-none focus:border-primary/50 text-sm" />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <Link href="/admin"
                    className="h-11 px-6 rounded-xl border border-[rgba(74,69,77,0.3)] text-sm font-medium text-on-surface hover:bg-white/[0.04] transition-all flex items-center">
                    Cancel
                  </Link>
                  <button type="submit"
                    className="h-11 px-6 rounded-xl bg-gradient-to-br from-primary to-primary-fixed-dim text-[#010102] text-sm font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all">
                    <Save className="h-4 w-4" /> Create Track
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
