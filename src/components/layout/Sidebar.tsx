'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { agents, Agent } from '@/lib/agents';
import { AgentAvatar } from '@/components/ui/AgentAvatar';
import {
  Home, Bot, Search, Heart, MessageSquare, Footprints, FolderOpen,
  Wrench, Landmark, Tag, Plus, Calendar, DollarSign, User, ClipboardList,
  type LucideIcon,
} from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  highlight?: boolean;
}

const mainNavigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'My Agent', href: '/dashboard/my-agent', icon: Bot, highlight: true },
];

const buyerNavigation: NavItem[] = [
  { name: 'Search Properties', href: '/dashboard/search', icon: Search },
  { name: 'Saved Properties', href: '/dashboard/saved', icon: Heart },
  { name: 'AI Chat', href: '/dashboard/buyer-agent', icon: MessageSquare },
];

const transactionNavigation: NavItem[] = [
  { name: 'Transactions', href: '/dashboard/transactions', icon: ClipboardList },
  { name: 'Walkthroughs', href: '/dashboard/walkthrough', icon: Footprints },
  { name: 'Documents', href: '/dashboard/documents', icon: FolderOpen },
  { name: 'Professionals', href: '/dashboard/professionals', icon: Wrench },
  { name: 'Mortgage', href: '/dashboard/mortgage', icon: Landmark },
];

const sellerNavigation: NavItem[] = [
  { name: 'My Listings', href: '/dashboard/seller/listings', icon: Tag },
  { name: 'Create Listing', href: '/dashboard/seller/listings/new', icon: Plus },
  { name: 'Showings', href: '/dashboard/seller/showings', icon: Calendar },
  { name: 'Offers', href: '/dashboard/seller/offers', icon: DollarSign },
  { name: 'Seller AI Chat', href: '/dashboard/seller/chat', icon: MessageSquare },
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

  useEffect(() => {
    if (pathname.startsWith('/dashboard/seller')) setRole('seller');
  }, [pathname]);

  useEffect(() => {
    onClose?.();
  }, [pathname]);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem('userRole', newRole);
    if (newRole === 'seller') {
      const morgan = agents.find(a => a.id === 'morgan');
      if (morgan) { setSelectedAgent(morgan); localStorage.setItem('selectedAgentId', 'morgan'); }
    } else {
      const buyer = agents.find(a => a.agentRole === 'buyer');
      if (buyer) { setSelectedAgent(buyer); localStorage.setItem('selectedAgentId', buyer.id); }
    }
  };

  const renderNavItem = (item: NavItem) => {
    const isActive = item.href === '/dashboard'
      ? pathname === '/dashboard'
      : pathname === item.href || pathname.startsWith(item.href + '/');
    const Icon = item.icon;

    return (
      <Link
        key={item.name}
        href={item.href}
        className={`
          flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
          ${isActive
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
            : item.highlight
              ? 'text-white bg-white/5 hover:bg-white/10'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }
        `}
      >
        <Icon className="w-[18px] h-[18px]" />
        {item.name}
        {item.highlight && !isActive && (
          <span className="ml-auto w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
        )}
      </Link>
    );
  };

  const renderNavSection = (title: string, items: NavItem[]) => (
    <div>
      <p className="px-3 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {title}
      </p>
      <div className="space-y-1">
        {items.map(renderNavItem)}
      </div>
    </div>
  );

  return (
    <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-950/95 backdrop-blur-xl border-r border-white/5 flex flex-col transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <span className="text-white font-bold text-sm">RE</span>
          </div>
          <span className="text-xl font-bold text-white">
            RealEstate<span className="gradient-text">AI</span>
          </span>
        </Link>
      </div>

      {/* Role Toggle */}
      <div className="mx-3 mt-4 p-1 bg-white/5 rounded-xl flex border border-white/5">
        <button
          onClick={() => handleRoleChange('buyer')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            role === 'buyer'
              ? 'bg-emerald-500 text-white shadow-sm shadow-emerald-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Buying
        </button>
        <button
          onClick={() => handleRoleChange('seller')}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
            role === 'seller'
              ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          Selling
        </button>
      </div>

      {/* Agent Card */}
      <Link
        href="/dashboard/my-agent"
        className={`mx-3 mt-3 p-3 rounded-xl bg-gradient-to-r ${selectedAgent.gradientClass} hover:opacity-90 transition-all duration-200 shadow-lg`}
      >
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <AgentAvatar agentId={selectedAgent.id} size="md" gradient="from-transparent to-transparent" />
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
        <div className="space-y-1">
          {mainNavigation.map(renderNavItem)}
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
      <div className="p-3 border-t border-white/5">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200">
          <User className="w-[18px] h-[18px]" />
          Talk to a Human
        </button>
      </div>

      {/* Bottom section */}
      <div className="p-4 border-t border-white/5">
        <div className={`glass-card p-4 ${
          role === 'seller' ? 'border-amber-500/20' : 'border-emerald-500/20'
        }`}>
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
