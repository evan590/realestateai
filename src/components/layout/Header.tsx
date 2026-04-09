'use client';

import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/Button';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Bell, User, Bot, Settings, LogOut, ChevronDown, X, Check, Menu,
} from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showHumanModal, setShowHumanModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="h-16 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 md:px-6">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200 mr-2"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search properties, addresses, or ask AI..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-200"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-6">
          {/* Human Support Button */}
          <button
            onClick={() => setShowHumanModal(true)}
            className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-slate-300 hover:text-white transition-all duration-200"
          >
            <User className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Talk to Human</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-400 rounded-full" />
          </button>

          {/* User menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 p-1.5 pr-3 hover:bg-white/5 rounded-xl transition-all duration-200"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-white font-medium text-sm">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                <p className="text-xs text-slate-400">{user?.email || 'user@email.com'}</p>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 glass-card-strong py-1 z-50 shadow-xl">
                <Link
                  href="/dashboard/my-agent"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Bot className="w-4 h-4" />
                  My Agent
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <hr className="my-1 border-white/10" />
                <button
                  onClick={signOut}
                  className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Human Support Modal */}
      {showHumanModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-card-strong max-w-md w-full overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Talk to a Human Expert</h2>
                    <p className="text-slate-400 text-sm">Licensed real estate professionals</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowHumanModal(false)}
                  className="text-slate-400 hover:text-white p-1 hover:bg-white/10 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-slate-300">
                Our licensed real estate experts are available to help with:
              </p>
              <ul className="space-y-2 text-slate-400">
                {['Complex contract questions', 'Offer review and strategy', 'Negotiation support', 'Legal and compliance questions'].map((item) => (
                  <li key={item} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-emerald-400 mb-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Available Now</span>
                </div>
                <p className="text-slate-300 text-sm">
                  Average response time: under 2 minutes
                </p>
              </div>

              <div className="flex space-x-3">
                <Button className="flex-1" onClick={() => setShowHumanModal(false)}>
                  Start Chat with Expert
                </Button>
                <Button variant="secondary" onClick={() => setShowHumanModal(false)}>
                  Schedule Call
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
