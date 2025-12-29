'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { agents, Agent } from '@/lib/agents';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: '🏠',
  },
  {
    name: 'My Agent',
    href: '/dashboard/my-agent',
    icon: '🤖',
    highlight: true,
  },
  {
    name: 'Search Properties',
    href: '/dashboard/search',
    icon: '🔍',
  },
  {
    name: 'Saved Properties',
    href: '/dashboard/saved',
    icon: '❤️',
  },
  {
    name: 'AI Chat',
    href: '/dashboard/buyer-agent',
    icon: '💬',
  },
  {
    name: 'Transactions',
    href: '/dashboard/transactions',
    icon: '📝',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [selectedAgent, setSelectedAgent] = useState<Agent>(agents[0]);

  useEffect(() => {
    const savedAgentId = localStorage.getItem('selectedAgentId');
    if (savedAgentId) {
      const agent = agents.find(a => a.id === savedAgentId);
      if (agent) setSelectedAgent(agent);
    }
  }, []);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">RE</span>
          </div>
          <span className="text-xl font-bold text-white">
            RealEstate<span className="text-emerald-400">AI</span>
          </span>
        </Link>
      </div>

      {/* Agent Card */}
      <Link
        href="/dashboard/my-agent"
        className={`mx-3 mt-4 p-3 rounded-xl bg-gradient-to-r ${selectedAgent.gradientClass} hover:opacity-90 transition-opacity`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl">
            {selectedAgent.avatar}
          </div>
          <div className="text-white">
            <p className="text-xs text-white/70">Your Agent</p>
            <p className="font-semibold">{selectedAgent.name}</p>
            <p className="text-xs text-white/70">{selectedAgent.personality}</p>
          </div>
        </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href + '/'));
          const isExactDashboard = item.href === '/dashboard' && pathname === '/dashboard';
          const active = isExactDashboard || (item.href !== '/dashboard' && isActive);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${active
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : item.highlight
                    ? 'text-white bg-slate-800 hover:bg-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
              {item.highlight && !active && (
                <span className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Human Support */}
      <div className="p-3 border-t border-slate-800">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
          <span className="text-lg">👤</span>
          Talk to a Human
        </button>
      </div>

      {/* Bottom section */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-emerald-400 text-xs font-medium">{selectedAgent.name} is Active</span>
          </div>
          <p className="text-slate-400 text-xs">
            Your AI agent is monitoring listings and ready to help.
          </p>
        </div>
      </div>
    </aside>
  );
}
