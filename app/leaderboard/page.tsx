'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LEADERBOARD_DATA } from '@/lib/constants';
import {
  Trophy, Medal, Search, Filter, Flame,
  Target, Zap, Crown,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'global', label: 'Global' },
  { id: 'tracks', label: 'By Track' },
  { id: 'competitions', label: 'Competitions' },
  { id: 'friends', label: 'Friends' },
];

const rankColors = ['text-amber-400', 'text-gray-300', 'text-amber-600'];

export default function LeaderboardPage() {
  const [tab, setTab] = useState('global');
  const [search, setSearch] = useState('');

  const filtered = LEADERBOARD_DATA.filter(e =>
    e.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="font-space text-3xl sm:text-4xl font-bold text-on-surface">
              <span className="gradient-text-primary">Leaderboard</span>
            </h1>
            <p className="mt-3 text-lg text-on-surface-variant">
              Top performers ranked by XP, accuracy, and problem-solving skills.
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant" />
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-10 pr-4 rounded-xl bg-surface-container-low border border-[rgba(74,69,77,0.3)] text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all text-sm"
              />
            </div>
            <div className="flex gap-1">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all',
                    tab === t.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-on-surface-variant hover:text-on-surface'
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl border border-[rgba(74,69,77,0.2)] overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[rgba(74,69,77,0.2)] text-xs font-medium text-on-surface-variant">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4">User</div>
              <div className="col-span-2 text-right">XP</div>
              <div className="col-span-2 text-right">Solved</div>
              <div className="col-span-1 text-right">Acc.</div>
              <div className="col-span-2 text-right">Streak</div>
            </div>

            {filtered.map((entry, i) => (
              <Link
                key={entry.userId}
                href={`/profile/${entry.username}`}
                className="grid grid-cols-2 sm:grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-white/[0.02] transition-colors border-b border-[rgba(74,69,77,0.05)] last:border-0"
              >
                <div className="col-span-1 flex items-center gap-2">
                  {entry.rank <= 3 ? (
                    <Trophy className={cn('h-5 w-5', rankColors[entry.rank - 1])} />
                  ) : (
                    <span className="text-sm font-mono text-on-surface-variant w-5 text-center">{entry.rank}</span>
                  )}
                </div>
                <div className="col-span-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-fixed-dim text-xs font-bold text-[#010102]">
                    {entry.username[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-on-surface">{entry.username}</div>
                    <div className="text-xs text-on-surface-variant sm:hidden">
                      {entry.xp.toLocaleString()} XP • {entry.solvedProblems} solved
                    </div>
                  </div>
                </div>
                <div className="col-span-2 text-right hidden sm:block">
                  <span className="text-sm font-semibold text-on-surface">{entry.xp.toLocaleString()}</span>
                </div>
                <div className="col-span-2 text-right hidden sm:block">
                  <span className="text-sm text-on-surface">{entry.solvedProblems}</span>
                </div>
                <div className="col-span-1 text-right hidden sm:block">
                  <span className={cn(
                    'text-sm font-medium',
                    entry.accuracy >= 90 ? 'text-emerald-400' :
                    entry.accuracy >= 80 ? 'text-amber-400' : 'text-on-surface'
                  )}>
                    {entry.accuracy}%
                  </span>
                </div>
                <div className="col-span-2 text-right hidden sm:flex items-center justify-end gap-1">
                  <Flame className="h-3.5 w-3.5 text-orange-400" />
                  <span className="text-sm text-on-surface">{entry.winStreak}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
