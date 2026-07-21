'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { TRACKS } from '@/lib/constants';
import {
  Layers, CheckCircle, Lock, Clock, Zap, ArrowLeft,
  ChevronRight, Trophy, Star, Code2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const trackIcons: Record<string, string> = {
  '1': 'from-blue-500 to-cyan-500',
  '2': 'from-green-500 to-emerald-500',
  '3': 'from-orange-500 to-red-500',
  '4': 'from-purple-500 to-violet-500',
  '5': 'from-pink-500 to-rose-500',
  '6': 'from-indigo-500 to-blue-500',
  '7': 'from-teal-500 to-green-500',
  '8': 'from-yellow-500 to-amber-500',
  '9': 'from-cyan-500 to-blue-500',
  '10': 'from-fuchsia-500 to-purple-500',
  '11': 'from-sky-500 to-indigo-500',
};

export default function TrackDetailPage() {
  const params = useParams();
  const track = TRACKS.find(t => t.slug === params.slug);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  if (!track) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="pt-32 text-center">
          <h1 className="font-space text-2xl font-bold text-on-surface">Track not found</h1>
          <Link href="/tracks" className="mt-4 inline-flex items-center gap-2 text-primary">Back to tracks</Link>
        </div>
        <Footer />
      </main>
    );
  }

  const progressPercent = Math.round((track.levels.filter(l => !l.locked).length / track.levels.length) * 100);

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link href="/tracks" className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" /> All Tracks
            </Link>

            <div className="glass-card rounded-2xl p-8 border border-[rgba(74,69,77,0.2)] mb-8">
              <div className="flex items-start gap-5">
                <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${track.color} flex-shrink-0`}>
                  <Layers className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-1">
                    <h1 className="font-space text-2xl sm:text-3xl font-bold text-on-surface">{track.title}</h1>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/[0.04] text-on-surface-variant border border-[rgba(74,69,77,0.2)]">
                      {track.difficulty}
                    </span>
                  </div>
                  <p className="text-on-surface-variant mt-2">{track.description}</p>
                  <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-on-surface-variant">
                    <span className="flex items-center gap-1.5"><Layers className="h-4 w-4 text-primary" />{track.levelCount} Levels</span>
                    <span className="flex items-center gap-1.5"><Code2 className="h-4 w-4 text-primary" />{track.challengeCount} Challenges</span>
                    <span className="flex items-center gap-1.5"><Zap className="h-4 w-4 text-primary" />{track.xpReward} XP</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" />~{track.estimatedHours} hours</span>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-on-surface-variant">Progress</span>
                      <span className="text-primary font-medium">{progressPercent}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-container-high overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-fixed-dim transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {track.levels.map((level, i) => (
                <motion.div
                  key={level.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className={cn(
                    'glass-card rounded-2xl border transition-all duration-300 overflow-hidden',
                    level.locked ? 'border-[rgba(74,69,77,0.1)] opacity-60' :
                    selectedLevel === level.id ? 'border-primary/20' : 'border-[rgba(74,69,77,0.2)] hover:border-[rgba(74,69,77,0.3)]'
                  )}>
                    <button
                      onClick={() => !level.locked && setSelectedLevel(selectedLevel === level.id ? null : level.id)}
                      className="w-full flex items-center gap-4 p-5 text-left"
                      disabled={level.locked}
                    >
                      <div className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-xl flex-shrink-0',
                        level.completed ? 'bg-emerald-500/10' :
                        level.locked ? 'bg-surface-container-high' :
                        'bg-primary/10'
                      )}>
                        {level.completed ? (
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                        ) : level.locked ? (
                          <Lock className="h-5 w-5 text-outline-variant" />
                        ) : (
                          <span className="font-space text-sm font-bold text-primary">{level.order}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className={cn(
                            'font-space font-semibold',
                            level.locked ? 'text-outline-variant' : 'text-on-surface'
                          )}>
                            Level {level.order}: {level.title}
                          </h3>
                          <span className={cn(
                            'text-xs font-medium px-2 py-0.5 rounded-full',
                            level.completed ? 'bg-emerald-500/10 text-emerald-400' :
                            level.locked ? 'bg-white/[0.04] text-outline-variant' :
                            'bg-primary/10 text-primary'
                          )}>
                            {level.challengeCount} challenges
                          </span>
                        </div>
                        <p className={cn(
                          'text-sm mt-0.5',
                          level.locked ? 'text-outline-variant' : 'text-on-surface-variant'
                        )}>
                          {level.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-on-surface-variant flex-shrink-0">
                        <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5" />{level.xpReward} XP</span>
                        {!level.locked && (
                          <ChevronRight className={cn(
                            'h-4 w-4 transition-transform',
                            selectedLevel === level.id ? 'rotate-90' : ''
                          )} />
                        )}
                      </div>
                    </button>

                    {selectedLevel === level.id && !level.locked && (
                      <div className="px-5 pb-5 pt-0 border-t border-[rgba(74,69,77,0.1)] mt-0">
                        <div className="pt-4 grid gap-2">
                          {level.challenges.length > 0 ? level.challenges.map((ch) => (
                            <Link
                              key={ch.id}
                              href={`/challenges/${ch.slug}`}
                              className="flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.03] transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <Code2 className="h-4 w-4 text-primary" />
                                <span className="text-sm text-on-surface">{ch.title}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className={cn(
                                  'text-xs font-medium px-2 py-0.5 rounded-full',
                                  ch.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                                  ch.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-400' :
                                  ch.difficulty === 'Hard' ? 'bg-red-500/10 text-red-400' :
                                  'bg-rose-500/10 text-rose-400'
                                )}>
                                  {ch.difficulty}
                                </span>
                                <span className="text-xs text-on-surface-variant">{ch.xpReward} XP</span>
                              </div>
                            </Link>
                          )) : (
                            <p className="text-sm text-on-surface-variant text-center py-4">
                              Challenges coming soon...
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
