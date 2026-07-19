'use client';

import { useInViewport } from '@/hooks/use-in-viewport';

const architects = [
  {
    name: 'Mira Okafor',
    initials: 'MO',
    role: 'Founder, Ledger Studio',
    quote: 'The best weekend I have wasted all year.',
    gradient: 'from-primary/30 to-tertiary/20',
  },
  {
    name: 'Theo Lindqvist',
    initials: 'TL',
    role: 'Systems engineer, Volta',
    quote: 'I came for the coffee. I left with a co-founder.',
    gradient: 'from-tertiary/30 to-primary/20',
  },
  {
    name: 'Sana Verma',
    initials: 'SV',
    role: 'Designer, Plinth',
    quote: 'No swag, no stages. Just the work. Finally.',
    gradient: 'from-primary/20 to-secondary/20',
  },
  {
    name: 'Jonas Brandt',
    initials: 'JB',
    role: 'Independent, ex-Atlas',
    quote: 'I shipped a thing I had been postponing for two years.',
    gradient: 'from-secondary/30 to-primary/20',
  },
];

export default function Architects() {
  const { ref, visible } = useInViewport(0.1);

  return (
    <section id="architects" ref={ref} className="relative px-6 py-section-gap">
      <div className="section-divider mb-16" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-4">
          <span className="font-feature-code text-xs uppercase tracking-[0.3em] text-primary/80">
            The architects
          </span>
          <h2 className="max-w-2xl font-space text-balance text-4xl font-medium leading-tight tracking-tight text-on-surface sm:text-5xl">
            People who have already built in the dark.
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-on-surface/60">
            A few of the makers from past editions. They will be back this year,
            finding a new corner.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {architects.map((a, i) => (
            <article
              key={a.name}
              className={`group relative flex flex-col bg-white/[0.02] p-6 transition-all duration-700 hover:bg-white/[0.04] ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative mb-5 aspect-[4/5] overflow-hidden rounded-xl border border-white/10">
                <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${a.gradient}`}>
                  <span className="font-space text-5xl font-bold tracking-wider text-on-surface/40 sm:text-6xl">
                    {a.initials}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
              <h3 className="font-space text-lg font-medium text-on-surface">
                {a.name}
              </h3>
              <p className="text-xs uppercase tracking-[0.15em] text-on-surface/50">
                {a.role}
              </p>
              <p className="mt-4 text-sm italic leading-relaxed text-on-surface/70">
                &ldquo;{a.quote}&rdquo;
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
