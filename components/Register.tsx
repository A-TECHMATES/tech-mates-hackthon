'use client';

import { useState } from 'react';
import { useInViewport } from '@/hooks/use-in-viewport';
import { ArrowRight, Check, Github, MessageCircle } from 'lucide-react';

const perks = [
  'A desk in a forgotten library for 48 hours',
  'Three meals a day, endless coffee, one candle',
  'A prompt revealed at sunset on Friday',
  'A room of two hundred people worth building beside',
];

export default function Register() {
  const { ref, visible } = useInViewport(0.15);
  const [email, setEmail] = useState('');
  const [github, setGithub] = useState('');
  const [discord, setDiscord] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !github.trim() || !discord.trim()) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, github, discord }),
      });
      if (!res.ok) {
        const data = await res.json();
        console.error('Registration failed:', data.error);
        setStatus('error');
        return;
      }
      setStatus('done');
    } catch (err) {
      console.error('Network error:', err);
      setStatus('error');
    }
  };

  return (
    <section id="register" ref={ref} className="relative px-6 py-section-gap">
      <div className="section-divider mb-16" />
      <div className="mx-auto max-w-5xl">
        <div
          className={`relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-8 transition-all duration-1000 sm:p-14 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-tertiary/10 blur-3xl" />

          <div className="relative grid gap-12 lg:grid-cols-2">
            {/* Left: pitch */}
            <div className="flex flex-col gap-6">
              <span className="font-feature-code text-xs uppercase tracking-[0.3em] text-primary/80">
                Reserve a corner
              </span>
              <h2 className="font-space text-balance text-4xl font-medium leading-tight tracking-tight text-on-surface sm:text-5xl">
                Two hundred corners. <span className="gradient-text-primary italic">Thirty-one left.</span>
              </h2>
              <p className="text-pretty text-base leading-relaxed text-on-surface/70">
                Drop your email and we will hold a desk for forty-eight hours.
                No payment, no commitment — just a corner waiting for you.
              </p>
              <ul className="mt-2 flex flex-col gap-3">
                {perks.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-on-surface/80">
                    <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                      <Check size={11} className="text-primary" />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: form */}
            <div className="flex flex-col justify-center">
              {status === 'done' ? (
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15">
                    <Check size={24} className="text-primary" />
                  </div>
                  <h3 className="font-space text-xl font-medium text-on-surface">
                    Your corner is held
                  </h3>
                  <p className="text-sm text-on-surface/60">
                    We sent the details to {email}. Check your inbox in the morning.
                    We will find you on GitHub ({github}) and Discord ({discord}).
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-surface/40 p-6 backdrop-blur-md"
                >
                  <label className="flex flex-col gap-2">
                    <span className="font-feature-code text-xs uppercase tracking-[0.2em] text-on-surface/50">
                      Your email
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setStatus('idle');
                      }}
                      placeholder="you@hidden.corner"
                      className="w-full rounded-xl border border-white/10 bg-background/60 px-4 py-3.5 text-sm text-on-surface outline-none transition-all duration-300 placeholder:text-on-surface/30 focus:border-primary/50 focus:bg-background/80 focus:ring-2 focus:ring-primary/20"
                    />
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="font-feature-code text-xs uppercase tracking-[0.2em] text-on-surface/50">
                      GitHub username
                    </span>
                    <div className="relative">
                      <Github size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface/30" />
                      <input
                        type="text"
                        required
                        value={github}
                        onChange={(e) => {
                          setGithub(e.target.value);
                          setStatus('idle');
                        }}
                        placeholder="your-github"
                        className="w-full rounded-xl border border-white/10 bg-background/60 pl-9 pr-4 py-3.5 text-sm text-on-surface outline-none transition-all duration-300 placeholder:text-on-surface/30 focus:border-primary/50 focus:bg-background/80 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </label>

                  <label className="flex flex-col gap-2">
                    <span className="font-feature-code text-xs uppercase tracking-[0.2em] text-on-surface/50">
                      Discord username
                    </span>
                    <div className="relative">
                      <MessageCircle size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface/30" />
                      <input
                        type="text"
                        required
                        value={discord}
                        onChange={(e) => {
                          setDiscord(e.target.value);
                          setStatus('idle');
                        }}
                        placeholder="your.discord"
                        className="w-full rounded-xl border border-white/10 bg-background/60 pl-9 pr-4 py-3.5 text-sm text-on-surface outline-none transition-all duration-300 placeholder:text-on-surface/30 focus:border-primary/50 focus:bg-background/80 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </label>

                  {status === 'error' && (
                    <p className="text-xs text-error">Please fill in all fields with valid info.</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-on-primary transition-all duration-300 hover:scale-[1.02] disabled:opacity-60"
                  >
                    {status === 'loading' ? 'Holding your corner…' : 'Hold my corner'}
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </button>

                  <p className="text-center text-[11px] text-on-surface/40">
                    No spam. One email before the doors open, that is it.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
