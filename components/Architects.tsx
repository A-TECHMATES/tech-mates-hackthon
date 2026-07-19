'use client';

import { useEffect, useRef, useState } from 'react';

const architects = [
  {
    name: 'Mira Okafor',
    role: 'Founder, Ledger Studio',
    quote: 'The best weekend I have wasted all year.',
    img: 'https://images.pexels.com/photos/4158298/pexels-photo-4158298.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Theo Lindqvist',
    role: 'Systems engineer, Volta',
    quote: 'I came for the coffee. I left with a co-founder.',
    img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Sana Verma',
    role: 'Designer, Plinth',
    quote: 'No swag, no stages. Just the work. Finally.',
    img: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    name: 'Jonas Brandt',
    role: 'Independent, ex-Atlas',
    quote: 'I shipped a thing I had been postponing for two years.',
    img: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function Architects() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={a.img}
                  alt={a.name}
                  className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                />
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
