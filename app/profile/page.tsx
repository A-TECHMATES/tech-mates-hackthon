'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MOCK_USER, ACHIEVEMENTS, BADGES } from '@/lib/constants';
import {
  MapPin, Star, Trophy, Target, Flame, Zap,
  Code2, Calendar, CheckCircle, Award, GitCommit,
  Settings, Share2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const user = MOCK_USER;

  const stats = [
    { icon: Trophy, label: 'XP', value: user.xp.toLocaleString(), gradient: 'from-amber-500 to-orange-500' },
    { icon: CheckCircle, label: 'Solved', value: user.solvedProblems, gradient: 'from-emerald-500 to-teal-500' },
    { icon: Target, label: 'Accuracy', value: `${user.accuracy}%`, gradient: 'from-violet-500 to-purple-500' },
    { icon: Flame, label: 'Streak', value: `${user.winStreak} days`, gradient: 'from-red-500 to-rose-500' },
    { icon: Zap, label: 'Level', value: user.level.toString(), gradient: 'from-blue-500 to-cyan-500' },
    { icon: Star, label: 'Rank', value: user.rank, gradient: 'from-pink-500 to-fuchsia-500' },
  ];

  const heatmapData = Array.from({ length: 52 }, () =>
    Array.from({ length: 7 }, () => Math.random() > 0.6 ? Math.floor(Math.random() * 5) : 0)
  );

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
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h1 className="font-space text-2xl font-bold text-on-surface">{user.username}</h1>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-on-surface-variant">
                        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {user.country}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Joined {user.createdAt}</span>
                        <span className="flex items-center gap-1"><Code2 className="h-3.5 w-3.5" /> {user.favoriteLanguage}</span>
                      </div>
                      {user.bio && (
                        <p className="mt-3 text-sm text-on-surface-variant">{user.bio}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-all">
                        <Settings className="h-4 w-4" /> Edit
                      </button>
                      <button className="flex items-center gap-1.5 h-9 px-4 rounded-xl bg-white/[0.04] text-on-surface-variant hover:text-on-surface text-sm font-medium transition-all">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
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

            <div className="glass-card rounded-2xl p-6 border border-[rgba(74,69,77,0.2)] mb-8">
              <h2 className="font-space text-lg font-semibold text-on-surface mb-4">Activity</h2>
              <div className="overflow-x-auto">
                <div className="flex gap-[3px] min-w-[720px]">
                  {heatmapData.map((week, wi) => (
                    <div key={wi} className="flex flex-col gap-[3px]">
                      {week.map((day, di) => (
                        <div
                          key={di}
                          className={cn(
                            'h-3 w-3 rounded-sm transition-colors',
                            day === 0 ? 'bg-surface-container-high' :
                            day <= 2 ? 'bg-primary/30' :
                            day <= 4 ? 'bg-primary/60' :
                            'bg-primary'
                          )}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-end gap-1.5 mt-3 text-xs text-on-surface-variant">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((v) => (
                  <div key={v} className={cn(
                    'h-3 w-3 rounded-sm',
                    v === 0 ? 'bg-surface-container-high' :
                    v <= 2 ? 'bg-primary/30' :
                    v <= 4 ? 'bg-primary/60' :
                    'bg-primary'
                  )} />
                ))}
                <span>More</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-2xl p-6 border border-[rgba(74,69,77,0.2)]">
                <h2 className="font-space text-lg font-semibold text-on-surface mb-4">Achievements</h2>
                <div className="space-y-3">
                  {ACHIEVEMENTS.map((ach) => (
                    <div key={ach.id} className="flex items-center gap-3">
                      <div className={cn(
                        'flex h-9 w-9 items-center justify-center rounded-lg',
                        ach.unlocked ? 'bg-primary/10' : 'bg-surface-container-high'
                      )}>
                        <Star className={cn('h-4 w-4', ach.unlocked ? 'text-primary fill-primary' : 'text-outline-variant')} />
                      </div>
                      <div className="flex-1">
                        <div className={cn('text-sm font-medium', ach.unlocked ? 'text-on-surface' : 'text-outline-variant')}>
                          {ach.title}
                        </div>
                        <div className="text-xs text-on-surface-variant">{ach.description}</div>
                      </div>
                      {ach.unlockedAt && (
                        <span className="text-xs text-on-surface-variant">{ach.unlockedAt}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card rounded-2xl p-6 border border-[rgba(74,69,77,0.2)]">
                <h2 className="font-space text-lg font-semibold text-on-surface mb-4">Badges</h2>
                <div className="grid grid-cols-2 gap-3">
                  {BADGES.map((badge) => (
                    <div key={badge.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-[rgba(74,69,77,0.1)]">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${badge.color}`}>
                        <Award className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-on-surface">{badge.title}</div>
                        <div className="text-xs text-on-surface-variant">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
