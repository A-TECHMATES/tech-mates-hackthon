'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Sidebar } from '@/components/layout/Sidebar';
import { MOCK_DASHBOARD, MOCK_USER } from '@/lib/constants';
import {
  Zap, Flame, Target, Code2, TrendingUp,
  Trophy, Clock, CheckCircle, XCircle, AlertTriangle,
  Star, Layers, ArrowRight, ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const data = MOCK_DASHBOARD;
  const user = MOCK_USER;

  const stats = [
    { icon: Zap, label: 'Total XP', value: data.totalXp.toLocaleString(), gradient: 'from-amber-500 to-orange-500' },
    { icon: TrendingUp, label: 'Level', value: data.level.toString(), gradient: 'from-violet-500 to-purple-500' },
    { icon: Flame, label: 'Win Streak', value: `${data.winStreak} days`, gradient: 'from-red-500 to-rose-500' },
    { icon: Target, label: 'Accuracy', value: `${data.accuracy}%`, gradient: 'from-emerald-500 to-teal-500' },
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      <Sidebar />
      <div className="lg:pl-64 pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-space text-2xl font-bold text-on-surface">Dashboard</h1>
                <p className="text-sm text-on-surface-variant mt-1">Welcome back, {user.username}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                  <Trophy className="h-3.5 w-3.5" />
                  Rank #{data.leaderboardPosition}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                  <Star className="h-3.5 w-3.5 fill-emerald-400" />
                  {user.rank}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="glass-card rounded-2xl p-5 border border-[rgba(74,69,77,0.2)]">
                    <div className="flex items-center gap-3">
                      <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-on-surface">{stat.value}</div>
                        <div className="text-xs text-on-surface-variant">{stat.label}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="glass-card rounded-2xl p-6 border border-[rgba(74,69,77,0.2)]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-space text-lg font-semibold text-on-surface">Recent Submissions</h2>
                    <Link href="#" className="text-xs text-primary hover:text-primary-fixed-dim">View all</Link>
                  </div>
                  <div className="space-y-2">
                    {data.recentSubmissions.map((sub) => (
                      <div key={sub.id} className="flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'h-2 w-2 rounded-full',
                            sub.status === 'Accepted' ? 'bg-emerald-400' :
                            sub.status === 'Wrong Answer' ? 'bg-red-400' :
                            sub.status === 'Time Limit Exceeded' ? 'bg-amber-400' :
                            'bg-orange-400'
                          )} />
                          <div>
                            <div className="text-sm font-medium text-on-surface">Challenge #{sub.challengeId.slice(-3)}</div>
                            <div className="text-xs text-on-surface-variant">{sub.language} • {sub.runtime}ms • {sub.memory}MB</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={cn(
                            'text-xs font-medium px-2 py-0.5 rounded-full',
                            sub.status === 'Accepted' ? 'bg-emerald-500/10 text-emerald-400' :
                            sub.status === 'Wrong Answer' ? 'bg-red-500/10 text-red-400' :
                            sub.status === 'Time Limit Exceeded' ? 'bg-amber-500/10 text-amber-400' :
                            'bg-orange-500/10 text-orange-400'
                          )}>
                            {sub.status}
                          </span>
                          <span className="text-xs text-on-surface-variant">{new Date(sub.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 border border-[rgba(74,69,77,0.2)]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-space text-lg font-semibold text-on-surface">Current Track</h2>
                    <Link href={`/tracks/${data.currentTrack?.slug}`} className="flex items-center gap-1 text-xs text-primary hover:text-primary-fixed-dim">
                      Continue <ChevronRight className="h-3 w-3" />
                    </Link>
                  </div>
                  {data.currentTrack && (
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                        <Layers className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-on-surface">{data.currentTrack.title}</div>
                        <div className="text-xs text-on-surface-variant mb-2">{data.currentTrack.description}</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                            <div className="h-full w-[35%] rounded-full bg-gradient-to-r from-primary to-primary-fixed-dim" />
                          </div>
                          <span className="text-xs text-on-surface-variant">35%</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="glass-card rounded-2xl p-6 border border-[rgba(74,69,77,0.2)]">
                  <h2 className="font-space text-lg font-semibold text-on-surface mb-4">Daily Challenge</h2>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500">
                      <Code2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-on-surface">{data.dailyChallenge?.title}</div>
                      <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                        <span className="text-emerald-400">Easy</span>
                        <span>•</span>
                        <span>100 XP</span>
                      </div>
                    </div>
                  </div>
                  <Link
                    href={`/challenges/${data.dailyChallenge?.slug}`}
                    className="flex items-center justify-center gap-2 w-full h-10 rounded-xl bg-gradient-to-br from-primary to-primary-fixed-dim text-[#010102] font-medium text-sm hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all"
                  >
                    Solve Now
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                <div className="glass-card rounded-2xl p-6 border border-[rgba(74,69,77,0.2)]">
                  <h2 className="font-space text-lg font-semibold text-on-surface mb-4">Achievements</h2>
                  <div className="space-y-3">
                    {data.achievements.slice(0, 4).map((ach) => (
                      <div key={ach.id} className="flex items-center gap-3">
                        <div className={cn(
                          'flex h-8 w-8 items-center justify-center rounded-lg',
                          ach.unlocked ? 'bg-primary/10' : 'bg-surface-container-high'
                        )}>
                          <Star className={cn('h-4 w-4', ach.unlocked ? 'text-primary' : 'text-outline-variant')} />
                        </div>
                        <div>
                          <div className={cn('text-sm', ach.unlocked ? 'text-on-surface' : 'text-outline-variant')}>{ach.title}</div>
                          {ach.unlocked && ach.unlockedAt && (
                            <div className="text-xs text-on-surface-variant">Unlocked {ach.unlockedAt}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6 border border-[rgba(74,69,77,0.2)]">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-space text-lg font-semibold text-on-surface">Badges</h2>
                    <Link href="#" className="text-xs text-primary">View all</Link>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {data.badges.map((badge) => (
                      <div key={badge.id} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-[rgba(74,69,77,0.2)]">
                        <div className={`h-2 w-2 rounded-full bg-gradient-to-br ${badge.color}`} />
                        <span className="text-xs text-on-surface-variant">{badge.title}</span>
                      </div>
                    ))}
                  </div>
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
