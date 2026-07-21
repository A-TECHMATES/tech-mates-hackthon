'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, Route, Trophy, User, Swords,
  Award, BookOpen, Settings, LogOut, Code2,
} from 'lucide-react';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Route, label: 'Tracks', href: '/tracks' },
  { icon: Trophy, label: 'Leaderboard', href: '/leaderboard' },
  { icon: Swords, label: 'Competitions', href: '/competitions' },
  { icon: Award, label: 'Achievements', href: '/dashboard?tab=achievements' },
  { icon: BookOpen, label: 'My Profile', href: '/profile' },
  { icon: Settings, label: 'Settings', href: '#' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 z-30 h-[calc(100vh-4rem)] w-64 border-r border-[rgba(74,69,77,0.2)] bg-surface/50 backdrop-blur-xl hidden lg:block">
      <div className="flex flex-col h-full py-4 px-3">
        <div className="flex items-center gap-3 px-3 py-3 mb-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-fixed-dim">
            <Code2 className="h-5 w-5 text-[#010102]" />
          </div>
          <div>
            <div className="text-sm font-medium text-on-surface">algomaster</div>
            <div className="text-xs text-primary">Level 7 Expert</div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04]'
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04] rounded-xl transition-all">
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
