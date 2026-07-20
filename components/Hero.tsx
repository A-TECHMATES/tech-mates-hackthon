'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

function getTimeLeft(target: number) {
  const total = Math.max(0, target - Date.now());
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { total, days, hours, minutes, seconds };
}

export default function Hero() {
  // Target: 14 days from first mount
  const [target] = useState(() => Date.now() + 14 * 24 * 60 * 60 * 1000);
  const [time, setTime] = useState(() => getTimeLeft(target));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      section.style.setProperty('--mx', `${x * 20}px`);
      section.style.setProperty('--my', `${y * 20}px`);
    };
    section.addEventListener('mousemove', onMove);
    return () => section.removeEventListener('mousemove', onMove);
  }, []);

  const units = [
    { label: 'Days', value: time.days },
    { label: 'Hours', value: time.hours },
    { label: 'Minutes', value: time.minutes },
    { label: 'Seconds', value: time.seconds },
  ];

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24 pb-16"
    >
      {/* Soft radial light that follows cursor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(600px circle at calc(50% + var(--mx, 0px)) calc(50% + var(--my, 0px)), rgba(119,101,143,0.18), transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-on-surface/70 backdrop-blur-md">
          <Sparkles size={12} className="text-primary" />
          A 48-hour buildathon
          <span className="h-1 w-1 rounded-full bg-on-surface/30" />
          <span className="text-primary">Edition 04</span>
        </div>

        <h1 className="font-space text-balance text-5xl font-medium leading-[1.05] tracking-tight text-on-surface sm:text-7xl md:text-[5.5rem]">
          <span className="gradient-text">Build the impossible</span>
          <br />
          <span className="gradient-text-primary italic">in hidden corners.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-on-surface/70 sm:text-lg">
          Two days. Two hundred engineers, designers, and dreamers. One old library
          turned studio. No sponsors, no stages — just people who refuse to ship
          average. Bring your strangest idea and leave with something real.
        </p>

        {/* Countdown */}
        <div className="mt-12 flex flex-col items-center gap-3">
          <span className="font-feature-code text-xs uppercase tracking-[0.3em] text-on-surface/40">
            The doors open in
          </span>
          <div className="flex items-end gap-3 sm:gap-6">
            {units.map((u) => (
              <div
                key={u.label}
                className="group relative flex w-[68px] flex-col items-center sm:w-[88px]"
              >
                <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-2 py-4 backdrop-blur-md transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/[0.04]">
                  <div className="absolute inset-x-0 top-1/2 h-px bg-white/5" />
                  <span suppressHydrationWarning className="font-feature-code block text-center text-3xl font-medium tabular-nums text-on-surface sm:text-4xl">
                    {String(u.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="mt-2 text-[10px] uppercase tracking-[0.25em] text-on-surface/50">
                  {u.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#register"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-on-primary transition-transform duration-300 hover:scale-[1.02]"
          >
            <span className="relative z-10">Reserve your corner</span>
            <ArrowDown size={14} className="relative z-10 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#mission"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-medium text-on-surface/80 transition-colors duration-300 hover:border-white/20 hover:text-on-surface"
          >
            Read the mission
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/10 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-on-surface/40" />
        </div>
      </div>
    </section>
  );
}
