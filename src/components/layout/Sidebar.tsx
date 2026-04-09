'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { agents, Agent } from '@/lib/agents';

const mainNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: '🏠' },
  { name: 'My Agent', href: '/dashboard/my-agent', icon: '🤖', highlight: true },
];

const buyerNavigation = [
  { name: 'Search Properties', href: '/dashboard/search', icon: '🔍' },
  { name: 'Saved Properties', href: '/dashboard/saved', icon: '❤️' },
  { name: 'AI Chat', href: '/dashboard/buyer-agent', icon: '💬' },
];

const transactionNavigation = [
  { name: 'Transactions', href: '/dashboard/transactions', icon: '📋' },
  { name: 'Walkthroughs', href: '/dashboard/walkthrough', icon: '🚶' },
  { name: 'Documents', href: '/dashboard/documents', icon: '📁' },
  { name: 'Professionals', href: '/dashboard/professionals', icon: '🔧' },
  { name: 'Mortgage', href: '/dashboard/mortgage', icon: '🏦' },
];

const sellerNavigation = [
  { name: 'My Listings', href: '/dashboard/seller/listings', icon: '🏷️' },
  { name: 'Create Listing', href: '/dashboard/seller/listings/new', icon: '➕' },
  { name: 'Showings', href: '/dashboard/seller/showings', icon: '📅' },
  { name: 'Offers', href: '/dashboard/seller/offers', icon: '💰' },
  { name: 'Seller AI Chat', href: '/dashboard/seller/chat', icon: '💬' },
];

type UserRole = 'buyer' | 'seller';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [selectedAgent, setSelectedAgent] = useState<Agent>(agents[0]);
  const [role, setRole] = useState<UserRole>('buyer');

  useEffect(() => {
    const savedAgentId = localStorage.getItem('selectedAgentId');
    if (savedAgentId) {
      const agent = agents.find(a => a.id === savedAgentId);
      if (agent) setSelectedAgent(agent);
    }
    const savedRole = localStorage.getItem('userRole') as UserRole | null;
    if (savedRole) setRole(savedRole);
  }, []);

  // Auto-detect role from URL
  useEffect(() => {
    if (pathname.startsWith('/dashboard/seller')) {
      setRole('seller');
    }
  }, [pathname]);

  // Close sidebar on navigation (mobile)
  useEffect(() => {
    onClose?.();
  }, [pathname]);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
    // Update agent for seller mode
    if (newRole === 'seller') {
      const morgan = agents.find(a => a.id === 'morgan');
      if (morgan) {
        setSelectedAgent(morgan);
        localStorage.setItem('selectedAgentId', 'morgan');
      }
    } else {
      const buyer = agents.find(a => a.agentRole === 'buyer');
      if (buyer) {
        setSelectedAgent(buyer);
        localStorage.setItem('selectedAgentId', buyer.id);
      }
    }
  };

  const renderNavSection = (title: string, items: typeof mainNavigation) => (
    <div>
      <p className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {title}
      </p>
      <div className="space-y-1">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const isExactDashboard = item.href === '/dashboard' && pathname === '/dashboard';
          const active = item.href === '/dashboard' ? isExactDashboard : isActive;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                ${active
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                  : (item as any).highlight
                    ? 'text-white bg-slate-800 hover:bg-slate-700'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {item.name}
              {(item as any).highlight && !active && (
                <span className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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

      {/* Role Toggle */}
      <div className="mx-3 mt-4 p-1 bg-slate-800 rounded-lg flex">
        <button
          onClick={() => handleRoleChange('buyer')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            role === 'buyer'
              ? 'bg-emerald-500 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Buying
        </button>
        <button
          onClick={() => handleRoleChange('seller')}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
            role === 'seller'
              ? 'bg-amber-500 text-white shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Selling
        </button>
      </div>

      {/* Agent Card */}
      <Link
        href="/dashboard/my-agent"
        className={`mx-3 mt-3 p-3 rounded-xl bg-gradient-to-r ${selectedAgent.gradientClass} hover:opacity-90 transition-opacity`}
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
      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {/* Main - always visible */}
        <div className="space-y-1">
          {mainNavigation.map((item) => {
            const isActive = item.href === '/dashboard'
              ? pathname === '/dashboard'
              : pathname === item.href || pathname.startsWith(item.href + '/');

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                  ${isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : item.highlight
                      ? 'text-white bg-slate-800 hover:bg-slate-700'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
                {item.highlight && !isActive && (
                  <span className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>

        {role === 'buyer' ? (
          <>
            {renderNavSection('Properties', buyerNavigation)}
            {renderNavSection('Transaction Tools', transactionNavigation)}
          </>
        ) : (
          <>
            {renderNavSection('Seller Tools', sellerNavigation)}
            {renderNavSection('Transaction Tools', transactionNavigation)}
          </>
        )}
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
        <div className={`bg-gradient-to-r ${
          role === 'seller' ? 'from-amber-500/10 to-orange-500/10 border-amber-500/20' : 'from-emerald-500/10 to-cyan-500/10 border-emerald-500/20'
        } border rounded-xl p-4`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 ${role === 'seller' ? 'bg-amber-400' : 'bg-emerald-400'} rounded-full animate-pulse`} />
            <span className={`${role === 'seller' ? 'text-amber-400' : 'text-emerald-400'} text-xs font-medium`}>{selectedAgent.name} is Active</span>
          </div>
          <p className="text-slate-400 text-xs">
            {role === 'seller'
              ? 'Your AI agent is monitoring offers and ready to help.'
              : 'Your AI agent is monitoring listings and ready to help.'}
          </p>
        </div>
      </div>
    </aside>
  );
}
