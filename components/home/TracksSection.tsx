'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { TRACKS } from '@/lib/constants';
import { ArrowRight, Layers, Type, ArrowUpDown, Search, GitBranch, Share2, GitFork, Zap, RotateCcw, Binary, Sigma } from 'lucide-react';

const trackIcons: Record<string, React.ElementType> = {
  Layers, Type, ArrowUpDown, Search, GitBranch, Share2, GitFork, Zap, RotateCcw, Binary, Sigma,
};

export function TracksSection() {
  const displayedTracks = TRACKS.slice(0, 6);

  return (
    <section className="relative py-24" id="tracks">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <h2 className="font-space text-3xl sm:text-4xl font-bold text-on-surface">
              Learning <span className="gradient-text-primary">Tracks</span>
            </h2>
            <p className="mt-3 text-lg text-on-surface-variant max-w-xl">
              Structured paths from fundamentals to advanced topics. Complete levels to unlock the next.
            </p>
          </div>
          <Link
            href="/tracks"
            className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-fixed-dim transition-colors"
          >
            View all tracks
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedTracks.map((track, i) => {
            const Icon = trackIcons[track.icon] || Layers;
            return (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/tracks/${track.slug}`}
                  className="glass-card group relative overflow-hidden rounded-2xl p-6 block hover:border-[rgba(211,190,237,0.15)] transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${track.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/[0.04] text-on-surface-variant border border-[rgba(74,69,77,0.2)]">
                      {track.difficulty}
                    </span>
                  </div>
                  <h3 className="font-space text-lg font-semibold text-on-surface mb-1.5">{track.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed mb-4 line-clamp-2">{track.description}</p>
                  <div className="flex items-center gap-4 text-xs text-on-surface-variant">
                    <span>{track.levelCount} Levels</span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant" />
                    <span>{track.challengeCount} Challenges</span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant" />
                    <span>{track.xpReward} XP</span>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Start track <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/tracks"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-fixed-dim transition-colors"
          >
            View all tracks
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
