'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LEADERBOARD_DATA } from '@/lib/constants';
import {
  MapPin, Star, Trophy, Target, Flame, Zap,
  Code2, Calendar, CheckCircle, Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function UserProfilePage() {
  const params = useParams();
  const user = LEADERBOARD_DATA.find(e => e.username === params.username);

  if (!user) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="font-space text-2xl font-bold text-on-surface">User not found</h1>
          <Link href="/leaderboard" className="mt-4 inline-flex items-center gap-2 text-primary">Back to leaderboard</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const stats = [
    { icon: Trophy, label: 'XP', value: user.xp.toLocaleString(), gradient: 'from-amber-500 to-orange-500' },
    { icon: CheckCircle, label: 'Solved', value: user.solvedProblems, gradient: 'from-emerald-500 to-teal-500' },
    { icon: Target, label: 'Accuracy', value: `${user.accuracy}%`, gradient: 'from-violet-500 to-purple-500' },
    { icon: Flame, label: 'Streak', value: `${user.winStreak} days`, gradient: 'from-red-500 to-rose-500' },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="glass-card rounded-2xl p-8 border border-[rgba(74,69,77,0.2)] mb-8">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-fixed-dim text-2xl font-bold text-[#010102] flex-shrink-0">
                  {user.username[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="font-space text-2xl font-bold text-on-surface">{user.username}</h1>
                      <div className="flex items-center gap-3 mt-1 text-sm text-on-surface-variant">
                        <span className="flex items-center gap-1"><Trophy className="h-3.5 w-3.5 text-primary" /> Rank #{user.rank}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="glass-card rounded-2xl p-4 border border-[rgba(74,69,77,0.2)] text-center">
                    <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} mb-2`}>
                      <Icon className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-lg font-bold text-on-surface">{stat.value}</div>
                    <div className="text-xs text-on-surface-variant">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
