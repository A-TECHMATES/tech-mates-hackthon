'use client';

import { motion } from 'framer-motion';
import { FEATURES } from '@/lib/constants';
import { Shuffle, Shield, Trophy, Award, Route, Swords } from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Shuffle, Shield, Trophy, Award, Route, Swords,
};

export function FeaturesSection() {
  return (
    <section className="relative py-24" id="features">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-space text-3xl sm:text-4xl font-bold text-on-surface">
            Everything you need to{' '}
            <span className="gradient-text-primary">master algorithms</span>
          </h2>
          <p className="mt-4 text-lg text-on-surface-variant max-w-2xl mx-auto">
            Built for competitive programmers and algorithm enthusiasts who want structured learning with real challenges.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon] || Shield;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card group relative overflow-hidden rounded-2xl p-6 hover:border-[rgba(211,190,237,0.15)] transition-all duration-300 cursor-default"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10">
                  <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} mb-4`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-space text-lg font-semibold text-on-surface mb-2">{feature.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
