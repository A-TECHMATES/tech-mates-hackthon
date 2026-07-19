'use client';

import { useEffect, useRef, useState } from 'react';
import MissionOrb from './MissionOrb';

const pillars = [
  {
    n: '01',
    title: 'Craft over hype',
    body: 'No keynotes, no swag booths. Just makers, raw materials, and the time to make something they are proud to sign.',
  },
  {
    n: '02',
    title: 'Small rooms, big ideas',
    body: 'Two hundred people. Old library, creaking floors, candle-lit corners. The kind of space where strange ideas feel safe.',
  },
  {
    n: '03',
    title: 'Ship something real',
    body: 'Forty-eight hours later you walk out with a working prototype — not a slide deck, not a pitch, a thing that runs.',
  },
];

export default function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="mission" ref={ref} className="relative px-6 py-section-gap">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left: copy */}
          <div
            className={`flex flex-col gap-8 transition-all duration-1000 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <span className="font-feature-code text-xs uppercase tracking-[0.3em] text-primary/80">
              The mission
            </span>
            <h2 className="font-space text-balance text-4xl font-medium leading-tight tracking-tight text-on-surface sm:text-5xl">
              We believe the best things are built in <span className="gradient-text-primary italic">hidden corners</span> — away from the noise.
            </h2>
            <p className="max-w-xl text-pretty text-base leading-relaxed text-on-surface/70 sm:text-lg">
              Most hackathons are spectacles. Banners, sponsor booths, judges
              looking for the next pitch deck. Hidden Corners is the opposite.
              We rent a forgotten building, turn off the spotlight, and give
              two hundred people two days to make something that would not
              exist otherwise.
            </p>

            <div className="mt-4 flex flex-col gap-px overflow-hidden rounded-2xl border border-white/10">
              {pillars.map((p) => (
                <div
                  key={p.n}
                  className="group flex gap-6 bg-white/[0.02] p-6 transition-colors duration-300 hover:bg-white/[0.04]"
                >
                  <span className="font-feature-code text-sm font-medium text-primary/70">
                    {p.n}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-space text-base font-medium text-on-surface">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-on-surface/60">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: 3D orb */}
          <div
            className={`relative flex items-center justify-center transition-all duration-1000 delay-200 ${
              visible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
            }`}
          >
            <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl" />
            <div className="glow-ring relative rounded-full">
              <MissionOrb />
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-feature-code text-[10px] uppercase tracking-[0.3em] text-on-surface/40">
              fig.01 — the shape of an idea
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
