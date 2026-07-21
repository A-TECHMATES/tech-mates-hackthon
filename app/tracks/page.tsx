'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TRACKS } from '@/lib/constants';
import {
  Search, Layers, Type, ArrowUpDown,
  GitBranch, Share2, GitFork, Zap, RotateCcw, Binary, Sigma,
  Filter, ArrowRight, Clock, CheckCircle,
} from 'lucide-react';

const trackIcons: Record<string, React.ElementType> = {
  Layers, Type, ArrowUpDown, Search, GitBranch, Share2, GitFork, Zap, RotateCcw, Binary, Sigma,
};

const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function TracksPage() {
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');

  const filtered = TRACKS.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());
    const matchesDifficulty = difficulty === 'All' || t.difficulty === difficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="font-space text-3xl sm:text-4xl font-bold text-on-surface">
              Learning <span className="gradient-text-primary">Tracks</span>
            </h1>
            <p className="mt-3 text-lg text-on-surface-variant max-w-2xl">
              Structured learning paths designed to take you from fundamentals to advanced algorithmic mastery.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search tracks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
              />
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="h-4 w-4 text-on-surface-variant" />
              {difficulties.map((d) => (
                <button
                  key={d}
                  onClick={() => setDifficulty(d)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    difficulty === d
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'bg-white/[0.04] text-on-surface-variant border border-[rgba(74,69,77,0.2)] hover:border-[rgba(74,69,77,0.4)]'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((track, i) => {
              const Icon = trackIcons[track.icon] || Layers;
              return (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={`/tracks/${track.slug}`}
                    className="glass-card group relative overflow-hidden rounded-2xl p-6 block hover:border-[rgba(211,190,237,0.15)] transition-all duration-300 h-full"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${track.color}`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/[0.04] text-on-surface-variant border border-[rgba(74,69,77,0.2)]">
                        {track.difficulty}
                      </span>
                    </div>
                    <h3 className="font-space text-lg font-semibold text-on-surface mb-2">{track.title}</h3>
                    <p className="text-sm text-on-surface-variant leading-relaxed mb-5 line-clamp-2">{track.description}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-on-surface-variant mb-4">
                      <span className="flex items-center gap-1">
                        <Layers className="h-3.5 w-3.5" />
                        {track.levelCount} Levels
                      </span>
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-3.5 w-3.5" />
                        {track.challengeCount} Challenges
                      </span>
                      <span className="flex items-center gap-1">
                        <Zap className="h-3.5 w-3.5" />
                        {track.xpReward} XP
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        ~{track.estimatedHours}h
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Start track <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
