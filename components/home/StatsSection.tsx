'use client';

import { motion } from 'framer-motion';
import { Users, CheckCircle, Zap, BookOpen } from 'lucide-react';

const stats = [
  { icon: Users, value: '10,000+', label: 'Active Users', gradient: 'from-blue-500 to-cyan-500' },
  { icon: CheckCircle, value: '250,000+', label: 'Challenges Solved', gradient: 'from-emerald-500 to-teal-500' },
  { icon: Zap, value: '24', label: 'Active Competitions', gradient: 'from-amber-500 to-orange-500' },
  { icon: BookOpen, value: '15', label: 'Learning Tracks', gradient: 'from-purple-500 to-pink-500' },
];

export function StatsSection() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card group relative overflow-hidden rounded-2xl p-6 hover:border-[rgba(211,190,237,0.15)] transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:via-white/[0.01] transition-all duration-500" />
                <div className="relative z-10">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient} mb-4`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="font-space text-2xl font-bold text-on-surface">{stat.value}</div>
                  <div className="mt-1 text-sm text-on-surface-variant">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
