'use client';

import Link from 'next/link';
import { Code2, Github, Twitter, Heart } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

const footerLinks = {
  Platform: NAV_LINKS.map(l => ({ label: l.label, href: l.href })),
  Resources: [
    { label: 'Documentation', href: '#' },
    { label: 'API Reference', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Community', href: '#' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-[rgba(74,69,77,0.2)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-fixed-dim">
                <Code2 className="h-4 w-4 text-[#010102]" />
              </div>
              <span className="font-space text-lg font-semibold text-on-surface">
                Code<span className="text-primary">Arena</span>
              </span>
            </Link>
            <p className="text-sm text-on-surface-variant leading-relaxed max-w-xs">
              Master algorithms through guided learning tracks, dynamic challenges, and friendly competitions.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-on-surface-variant hover:text-on-surface transition-all">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-on-surface-variant hover:text-on-surface transition-all">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="text-sm font-semibold text-on-surface">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-on-surface-variant hover:text-on-surface transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[rgba(74,69,77,0.2)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-on-surface-variant">
            &copy; {new Date().getFullYear()} CodeArena. All rights reserved.
          </p>
          <p className="text-sm text-on-surface-variant flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 text-red-400 fill-red-400" /> for the algorithm community
          </p>
        </div>
      </div>
    </footer>
  );
}
