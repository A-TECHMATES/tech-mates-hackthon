'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import {
  LayoutDashboard, Route, Code2, Users, Trophy,
  Plus, Settings, BarChart3, Ban, Eye,
  TrendingUp, Activity, UserCheck, AlertTriangle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const adminNav = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: Route, label: 'Tracks', id: 'tracks' },
  { icon: Code2, label: 'Challenges', id: 'challenges' },
  { icon: Users, label: 'Users', id: 'users' },
  { icon: Trophy, label: 'Competitions', id: 'competitions' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

export default function AdminPage() {
  const [tab, setTab] = useState('overview');

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="font-space text-2xl font-bold text-on-surface">Admin Panel</h1>
                <p className="text-sm text-on-surface-variant mt-1">Manage your platform</p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/tracks/new"
                  className="flex items-center gap-2 h-10 px-4 rounded-xl bg-gradient-to-br from-primary to-primary-fixed-dim text-[#010102] text-sm font-medium hover:shadow-lg hover:shadow-primary/20 transition-all"
                >
                  <Plus className="h-4 w-4" /> New Track
                </Link>
                <Link
                  href="/admin/challenges/new"
                  className="flex items-center gap-2 h-10 px-4 rounded-xl bg-white/[0.04] border border-[rgba(74,69,77,0.3)] text-on-surface text-sm font-medium hover:bg-white/[0.08] transition-all"
                >
                  <Plus className="h-4 w-4" /> New Challenge
                </Link>
              </div>
            </div>

            <div className="flex gap-1 mb-8 flex-wrap">
              {adminNav.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setTab(item.id)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      tab === item.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04]'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {tab === 'overview' && (
              <div className="space-y-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { icon: Users, label: 'Total Users', value: '10,847', change: '+12%', gradient: 'from-blue-500 to-cyan-500' },
                    { icon: Code2, label: 'Challenges', value: '156', change: '+5', gradient: 'from-violet-500 to-purple-500' },
                    { icon: Route, label: 'Tracks', value: '11', change: '+2', gradient: 'from-emerald-500 to-teal-500' },
                    { icon: Activity, label: 'Submissions Today', value: '1,284', change: '+8%', gradient: 'from-amber-500 to-orange-500' },
                  ].map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="glass-card rounded-2xl p-5 border border-[rgba(74,69,77,0.2)]">
                        <div className="flex items-center justify-between mb-3">
                          <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-xs font-medium text-emerald-400">{stat.change}</span>
                        </div>
                        <div className="text-2xl font-bold text-on-surface">{stat.value}</div>
                        <div className="text-xs text-on-surface-variant">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>

                <div className="glass-card rounded-2xl p-6 border border-[rgba(74,69,77,0.2)]">
                  <h2 className="font-space text-lg font-semibold text-on-surface mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    {[
                      { action: 'New user registered', user: 'coder123', time: '2 min ago' },
                      { action: 'Challenge solved', user: 'algomaster', time: '15 min ago' },
                      { action: 'New track created', user: 'admin', time: '1 hour ago' },
                      { action: 'Competition started', user: 'system', time: '3 hours ago' },
                      { action: 'Reported issue resolved', user: 'admin', time: '5 hours ago' },
                    ].map((activity, i) => (
                      <div key={i} className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/[0.03] transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <span className="text-sm text-on-surface">{activity.action}</span>
                          <span className="text-xs text-on-surface-variant">by {activity.user}</span>
                        </div>
                        <span className="text-xs text-on-surface-variant">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === 'users' && (
              <div className="glass-card rounded-2xl border border-[rgba(74,69,77,0.2)] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[rgba(74,69,77,0.2)]">
                        <th className="text-left px-6 py-3 text-xs font-medium text-on-surface-variant">User</th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-on-surface-variant">Email</th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-on-surface-variant">XP</th>
                        <th className="text-left px-6 py-3 text-xs font-medium text-on-surface-variant">Status</th>
                        <th className="text-right px-6 py-3 text-xs font-medium text-on-surface-variant">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'algomaster', email: 'algomaster@example.com', xp: 4520, status: 'Active' },
                        { name: 'code_ninja', email: 'ninja@example.com', xp: 15200, status: 'Active' },
                        { name: 'hacker_123', email: 'hacker@example.com', xp: 890, status: 'Banned' },
                      ].map((user) => (
                        <tr key={user.name} className="border-b border-[rgba(74,69,77,0.05)] hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                                {user.name[0].toUpperCase()}
                              </div>
                              <span className="font-medium text-on-surface">{user.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-on-surface-variant">{user.email}</td>
                          <td className="px-6 py-4 text-on-surface">{user.xp.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className={cn(
                              'text-xs font-medium px-2.5 py-0.5 rounded-full',
                              user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' :
                              'bg-red-500/10 text-red-400'
                            )}>
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button className="h-8 px-3 rounded-lg text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04] transition-all">
                                <Eye className="h-3.5 w-3.5" />
                              </button>
                              <button className="h-8 px-3 rounded-lg text-xs font-medium text-red-400 hover:bg-red-500/10 transition-all">
                                <Ban className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {(tab === 'tracks' || tab === 'challenges' || tab === 'competitions' || tab === 'settings') && (
              <div className="glass-card rounded-2xl p-12 border border-[rgba(74,69,77,0.2)] text-center">
                <BarChart3 className="h-12 w-12 text-on-surface-variant mx-auto mb-4" />
                <h3 className="font-space text-lg font-semibold text-on-surface mb-2">Management Interface</h3>
                <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                  Full CRUD management for {tab} is available through the dedicated management interface.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
