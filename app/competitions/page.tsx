'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { COMPETITIONS } from '@/lib/constants';
import {
  Swords, Clock, Users, Trophy, Calendar,
  ArrowRight, Zap,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  Upcoming: 'text-blue-400 bg-blue-500/10',
  Active: 'text-emerald-400 bg-emerald-500/10',
  Completed: 'text-on-surface-variant bg-white/[0.04]',
};

export default function CompetitionsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <h1 className="font-space text-3xl sm:text-4xl font-bold text-on-surface">
              <span className="gradient-text-primary">Competitions</span>
            </h1>
            <p className="mt-3 text-lg text-on-surface-variant">
              Compete in real-time challenges, weekly sprints, and monthly tournaments.
            </p>
          </motion.div>

          <div className="space-y-4">
            {COMPETITIONS.map((comp, i) => (
              <motion.div
                key={comp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  'glass-card rounded-2xl p-6 border transition-all duration-300',
                  comp.status === 'Active'
                    ? 'border-emerald-500/20'
                    : 'border-[rgba(74,69,77,0.2)] hover:border-[rgba(74,69,77,0.3)]'
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0',
                      comp.status === 'Active' ? 'bg-emerald-500/10' : 'bg-primary/10'
                    )}>
                      <Swords className={cn(
                        'h-6 w-6',
                        comp.status === 'Active' ? 'text-emerald-400' : 'text-primary'
                      )} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-space text-lg font-semibold text-on-surface">{comp.title}</h3>
                        <span className={cn('text-xs font-medium px-2.5 py-0.5 rounded-full', statusColors[comp.status])}>
                          {comp.status}
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant mb-3">{comp.description}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-on-surface-variant">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 text-primary" />
                          {new Date(comp.startTime).toLocaleDateString()} - {new Date(comp.endTime).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-primary" />
                          {comp.participants.toLocaleString()} participants
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Zap className="h-4 w-4 text-primary" />
                          {comp.challenges.length} challenges
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {comp.prizes.map((prize, pi) => (
                          <span key={pi} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <Trophy className="h-3 w-3" />
                            {prize}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {comp.status !== 'Completed' && (
                    <Link
                      href="#"
                      className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-fixed-dim flex-shrink-0"
                    >
                      Register <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
