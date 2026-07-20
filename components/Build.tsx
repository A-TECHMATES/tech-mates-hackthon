'use client';

import { useInViewport } from '@/hooks/use-in-viewport';

const schedule = [
  {
    time: '17:00',
    title: 'Doors open',
    body: 'Find a corner. Claim a desk. Meet the person next to you — you will be building with them for the next two days.',
    tag: 'Friday',
  },
  {
    time: '19:30',
    title: 'The briefing',
    body: 'A single prompt, revealed by candlelight. No themes, no tracks. One sentence that changes the shape of your weekend.',
    tag: 'Friday',
  },
  {
    time: '20:00',
    title: 'Building begins',
    body: 'The lights go low. Coffee appears. Forty-eight hours starts now.',
    tag: 'Friday',
  },
  {
    time: '09:00',
    title: 'Morning circle',
    body: 'Optional stand-up in the old reading room. Share where you are stuck, borrow a pair of hands, trade a problem.',
    tag: 'Saturday',
  },
  {
    time: '14:00',
    title: 'The dark hour',
    body: 'A surprise constraint drops halfway through. Adapt in an hour or ignore it entirely — both are valid answers.',
    tag: 'Saturday',
  },
  {
    time: '17:00',
    title: 'Final demos',
    body: 'No slides allowed. Plug in, show the thing running, tell us what surprised you. Then we clean up together.',
    tag: 'Sunday',
  },
];

export default function Build() {
  const { ref, visible } = useInViewport(0.1);

  return (
    <section id="build" ref={ref} className="relative px-6 py-section-gap">
      <div className="section-divider mb-16" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-4">
          <span className="font-feature-code text-xs uppercase tracking-[0.3em] text-primary/80">
            The build
          </span>
          <h2 className="max-w-2xl font-space text-balance text-4xl font-medium leading-tight tracking-tight text-on-surface sm:text-5xl">
            Forty-eight hours, one old library, six moments that matter.
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[88px] top-0 hidden h-full w-px bg-gradient-to-b from-transparent via-white/10 to-transparent md:block" />

          <div className="flex flex-col">
            {schedule.map((s, i) => (
              <div
                key={s.title}
                className={`group relative grid grid-cols-1 gap-4 border-b border-white/5 py-8 transition-all duration-700 md:grid-cols-[120px_1fr] md:gap-12 ${
                  visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <div className="flex items-center gap-4 md:flex-col md:items-end md:text-right">
                  <span className="font-feature-code text-2xl font-medium tabular-nums text-on-surface">
                    {s.time}
                  </span>
                  <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.2em] text-on-surface/50">
                    {s.tag}
                  </span>
                </div>

                <div className="relative pl-0 md:pl-8">
                  {/* Node on timeline */}
                  <div className="absolute -left-[9px] top-2 hidden h-3 w-3 rounded-full border border-white/20 bg-surface transition-all duration-300 group-hover:border-primary group-hover:bg-primary md:block" />
                  <h3 className="font-space text-xl font-medium text-on-surface transition-colors duration-300 group-hover:text-primary">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-on-surface/60">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
