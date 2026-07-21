'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Trophy, Route, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(211, 190, 237, ${p.alpha})`;
        ctx.fill();
      });

      particles.forEach((a, i) => {
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(211, 190, 237, ${0.06 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(211,190,237,0.03)] via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <ParticleField />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-1.5 text-sm text-primary font-medium">
            <Zap className="h-3.5 w-3.5" />
            New: Dynamic Input Generator
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-space text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-glow"
        >
          Master Algorithms
          <br />
          <span className="gradient-text-primary">One Challenge at a Time</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 mx-auto max-w-2xl text-lg text-on-surface-variant leading-relaxed"
        >
          Guided learning tracks, unique input generation, and real competitions — 
          a modern platform designed to transform how you master algorithms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/register"
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-primary to-primary-fixed-dim px-8 py-3.5 text-base font-semibold text-[#010102] transition-all hover:shadow-xl hover:shadow-primary/25 active:scale-[0.97]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Challenges
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          <Link
            href="/leaderboard"
            className="flex items-center gap-2 rounded-xl border border-[rgba(74,69,77,0.4)] px-8 py-3.5 text-base font-medium text-on-surface hover:bg-white/[0.04] transition-all active:scale-[0.97]"
          >
            <Trophy className="h-4 w-4 text-primary" />
            Leaderboard
          </Link>
          <Link
            href="/tracks"
            className="flex items-center gap-2 rounded-xl border border-[rgba(74,69,77,0.4)] px-8 py-3.5 text-base font-medium text-on-surface hover:bg-white/[0.04] transition-all active:scale-[0.97]"
          >
            <Route className="h-4 w-4 text-primary" />
            Browse Tracks
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
        >
          {[
            { value: '10,000+', label: 'Active Users' },
            { value: '250K+', label: 'Challenges Solved' },
            { value: '24', label: 'Active Competitions' },
            { value: '15', label: 'Learning Tracks' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-space text-2xl sm:text-3xl font-bold gradient-text-primary">{stat.value}</div>
              <div className="mt-1 text-sm text-on-surface-variant">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
