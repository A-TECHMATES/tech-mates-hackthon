'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ALL_TRACKS_LIST } from '@/lib/constants';
import { ArrowLeft, Save, Code2, Plus, X } from 'lucide-react';

export default function NewChallengePage() {
  const [form, setForm] = useState({
    title: '', slug: '', track: '', difficulty: 'Easy',
    description: '', story: '', inputFormat: '', outputFormat: '',
    constraints: '', timeLimit: 1000, memoryLimit: 256, xpReward: 100,
    hints: [''],
    tags: [''],
  });

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/admin" className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> Back to Admin
            </Link>

            <div className="glass-card rounded-2xl p-8 border border-[rgba(74,69,77,0.2)]">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-fixed-dim">
                  <Code2 className="h-5 w-5 text-[#010102]" />
                </div>
                <div>
                  <h1 className="font-space text-xl font-bold text-on-surface">Create Challenge</h1>
                  <p className="text-sm text-on-surface-variant">Add a new algorithm challenge</p>
                </div>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Title</label>
                    <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g., Two Sum"
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Slug</label>
                    <input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })}
                      placeholder="two-sum"
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Track</label>
                    <select value={form.track} onChange={e => setForm({ ...form, track: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface focus:outline-none focus:border-primary/50 text-sm">
                      <option value="">None</option>
                      {ALL_TRACKS_LIST.map(t => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Difficulty</label>
                    <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })}
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface focus:outline-none focus:border-primary/50 text-sm">
                      <option>Easy</option>
                      <option>Medium</option>
                      <option>Hard</option>
                      <option>Extreme</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Time Limit (ms)</label>
                    <input type="number" value={form.timeLimit} onChange={e => setForm({ ...form, timeLimit: parseInt(e.target.value) || 0 })}
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface focus:outline-none focus:border-primary/50 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Memory Limit (MB)</label>
                    <input type="number" value={form.memoryLimit} onChange={e => setForm({ ...form, memoryLimit: parseInt(e.target.value) || 0 })}
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface focus:outline-none focus:border-primary/50 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-on-surface mb-1.5">XP Reward</label>
                    <input type="number" value={form.xpReward} onChange={e => setForm({ ...form, xpReward: parseInt(e.target.value) || 0 })}
                      className="w-full h-11 px-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface focus:outline-none focus:border-primary/50 transition-all text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Description</label>
                    <textarea rows={4} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}
                      placeholder="Describe the challenge..."
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-all text-sm resize-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Story</label>
                    <textarea rows={3} value={form.story} onChange={e => setForm({ ...form, story: e.target.value })}
                      placeholder="Thematic story for the challenge..."
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-all text-sm resize-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Input Format</label>
                    <textarea rows={2} value={form.inputFormat} onChange={e => setForm({ ...form, inputFormat: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-all text-sm resize-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Output Format</label>
                    <textarea rows={2} value={form.outputFormat} onChange={e => setForm({ ...form, outputFormat: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-all text-sm resize-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Constraints</label>
                    <textarea rows={3} value={form.constraints} onChange={e => setForm({ ...form, constraints: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-all text-sm resize-none" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Hints</label>
                    <div className="space-y-2">
                      {form.hints.map((hint, i) => (
                        <div key={i} className="flex gap-2">
                          <input type="text" value={hint} onChange={e => {
                            const newHints = [...form.hints];
                            newHints[i] = e.target.value;
                            setForm({ ...form, hints: newHints });
                          }}
                            placeholder={`Hint ${i + 1}`}
                            className="flex-1 h-10 px-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-all text-sm" />
                          {form.hints.length > 1 && (
                            <button onClick={() => setForm({ ...form, hints: form.hints.filter((_, j) => j !== i) })}
                              className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button onClick={() => setForm({ ...form, hints: [...form.hints, ''] })}
                        className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-fixed-dim transition-colors">
                        <Plus className="h-3.5 w-3.5" /> Add hint
                      </button>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-on-surface mb-1.5">Tags</label>
                    <div className="space-y-2">
                      {form.tags.map((tag, i) => (
                        <div key={i} className="flex gap-2">
                          <input type="text" value={tag} onChange={e => {
                            const newTags = [...form.tags];
                            newTags[i] = e.target.value;
                            setForm({ ...form, tags: newTags });
                          }}
                            placeholder={`Tag ${i + 1}`}
                            className="flex-1 h-10 px-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 transition-all text-sm" />
                          {form.tags.length > 1 && (
                            <button onClick={() => setForm({ ...form, tags: form.tags.filter((_, j) => j !== i) })}
                              className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                              <X className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button onClick={() => setForm({ ...form, tags: [...form.tags, ''] })}
                        className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-fixed-dim transition-colors">
                        <Plus className="h-3.5 w-3.5" /> Add tag
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <Link href="/admin"
                    className="h-11 px-6 rounded-xl border border-[rgba(74,69,77,0.3)] text-sm font-medium text-on-surface hover:bg-white/[0.04] transition-all flex items-center">
                    Cancel
                  </Link>
                  <button type="submit"
                    className="h-11 px-6 rounded-xl bg-gradient-to-br from-primary to-primary-fixed-dim text-[#010102] text-sm font-medium flex items-center gap-2 hover:shadow-lg hover:shadow-primary/20 transition-all">
                    <Save className="h-4 w-4" /> Create Challenge
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
