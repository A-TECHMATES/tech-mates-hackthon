'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import { Menu, X, Code2, User, LogIn } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass-strong border-b border-[rgba(74,69,77,0.2)]'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-fixed-dim">
            <Code2 className="h-4 w-4 text-[#010102]" />
          </div>
          <span className="font-space text-lg font-semibold tracking-tight text-on-surface">
            Code<span className="text-primary">Arena</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                pathname === link.href
                  ? 'text-primary bg-primary/10'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04]'
              )}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-6 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-on-surface-variant hover:text-on-surface rounded-lg transition-colors"
          >
            <LogIn className="h-4 w-4" />
            Sign In
          </Link>
          <Link
            href="/register"
            className="relative overflow-hidden rounded-lg bg-gradient-to-br from-primary to-primary-fixed-dim px-4 py-2 text-sm font-medium text-[#010102] transition-all hover:shadow-lg hover:shadow-primary/20 active:scale-95"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex items-center justify-center h-9 w-9 rounded-lg text-on-surface-variant hover:bg-white/[0.04] transition-colors"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-[rgba(74,69,77,0.2)] animate-in">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                  pathname === link.href
                    ? 'text-primary bg-primary/10'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04]'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 px-4 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border border-[rgba(74,69,77,0.4)] text-on-surface hover:bg-white/[0.04] transition-colors"
              >
                <User className="h-4 w-4" />
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg bg-gradient-to-br from-primary to-primary-fixed-dim text-[#010102] transition-all active:scale-95"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
