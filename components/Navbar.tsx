'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { label: 'Mission', href: '#mission' },
  { label: 'The Build', href: '#build' },
  { label: 'Architects', href: '#architects' },
  { label: 'Register', href: '#register' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="group flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <div className="h-2.5 w-2.5 rounded-full bg-primary transition-all duration-700 group-hover:scale-150" />
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-md transition-opacity duration-700 group-hover:opacity-100 opacity-0" />
          </div>
          <span className="font-space text-lg font-medium tracking-tight text-on-surface">
            Hidden Corners
          </span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative px-4 py-2 text-sm font-medium text-on-surface/70 transition-colors duration-300 hover:text-on-surface"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#register"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-medium text-primary transition-all duration-300 hover:border-primary/60 hover:bg-primary/10"
          >
            <span>Reserve a spot</span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-on-surface md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <div className="glass-strong border-t border-white/5 md:hidden">
          <div className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-4 py-3 text-base font-medium text-on-surface/80 transition-colors hover:bg-white/5 hover:text-on-surface"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#register"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-3 text-center text-sm font-medium text-primary"
            >
              Reserve a spot
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
