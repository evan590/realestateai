'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Transactions</h1>
        <p className="text-slate-400 mt-1">
          Manage your active and completed transactions
        </p>
      </div>

      {/* Coming soon state */}
      <Card className="border-dashed">
        <CardContent className="py-12">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-white mb-2">Transaction Management</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-6">
              Full transaction management is coming soon. This will include offer tracking,
              document management, timeline monitoring, and automated workflows.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-emerald-400 font-bold text-2xl mb-1">0</div>
                <div className="text-slate-400 text-sm">Active Transactions</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-emerald-400 font-bold text-2xl mb-1">0</div>
                <div className="text-slate-400 text-sm">Pending Offers</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="text-emerald-400 font-bold text-2xl mb-1">0</div>
                <div className="text-slate-400 text-sm">Completed</div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-slate-500 text-sm">Ready to start?</p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/dashboard/search">
                  <Button>Find a Property</Button>
                </Link>
                <Link href="/dashboard/buyer-agent">
                  <Button variant="secondary">Talk to AI Agent</Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feature preview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            ),
            title: 'Offer Tracking',
            description: 'Track all your offers and counter-offers in one place',
          },
          {
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            ),
            title: 'Document Hub',
            description: 'E-signatures, contracts, and disclosures all organized',
          },
          {
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            ),
            title: 'Timeline View',
            description: 'Visual timeline from offer to closing',
          },
          {
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            ),
            title: 'Smart Alerts',
            description: 'Never miss a deadline or important update',
          },
        ].map((feature) => (
          <Card key={feature.title} className="hover:border-slate-600 transition-colors">
            <CardContent>
              <div className="text-emerald-400 mb-3">{feature.icon}</div>
              <h3 className="font-medium text-white mb-1">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
