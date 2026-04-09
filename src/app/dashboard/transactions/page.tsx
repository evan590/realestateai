'use client';

import { useState, useEffect } from 'react';
import { getTransactions, seedMockTransactions } from '@/lib/transactions';
import { Transaction } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    seedMockTransactions();
    setTransactions(getTransactions());
  }, []);

  const active = transactions.filter((t) => t.status !== 'closed');
  const completed = transactions.filter((t) => t.status === 'closed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Transactions</h1>
          <p className="text-slate-400 mt-1">Track your active and completed transactions</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="text-center">
            <p className="text-2xl font-bold text-white">{active.length}</p>
            <p className="text-slate-400 text-sm">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <p className="text-2xl font-bold text-white">{transactions.filter((t) => t.status === 'offer_made').length}</p>
            <p className="text-slate-400 text-sm">Pending Offers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <p className="text-2xl font-bold text-white">{completed.length}</p>
            <p className="text-slate-400 text-sm">Completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Active transactions */}
      {active.length > 0 ? (
        <div className="space-y-4">
          {active.map((tx) => (
            <TransactionCard key={tx.id} transaction={tx} />
          ))}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardContent>
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">📋</span>
              <h3 className="text-lg font-medium text-white mb-2">No active transactions</h3>
              <p className="text-slate-400 mb-4">Find a property and make an offer to start a transaction</p>
              <div className="flex justify-center gap-3">
                <Link href="/dashboard/search"><Button>Search Properties</Button></Link>
                <Link href="/dashboard/buyer-agent"><Button variant="secondary">Talk to AI Agent</Button></Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Completed</h2>
          {completed.map((tx) => (
            <TransactionCard key={tx.id} transaction={tx} />
          ))}
        </div>
      )}
    </div>
  );
}

function TransactionCard({ transaction: tx }: { transaction: Transaction }) {
  const completedStages = tx.stages.filter((s) => s.status === 'completed').length;
  const totalStages = tx.stages.length;
  const progress = Math.round((completedStages / totalStages) * 100);

  const currentStage = tx.stages.find((s) => s.status === 'in_progress') || tx.stages.find((s) => s.status === 'pending');

  return (
    <Card className="hover:border-emerald-500/30 transition-all">
      <CardContent>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              {tx.property && (
                <>
                  <h3 className="text-white font-medium">{tx.property.address}</h3>
                  <p className="text-slate-400 text-sm">{tx.property.city}, {tx.property.state} {tx.property.zip}</p>
                </>
              )}
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${
                  tx.type === 'buying' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                }`}>
                  {tx.type}
                </span>
                {currentStage && (
                  <span className="text-slate-400 text-xs">Current: {currentStage.name}</span>
                )}
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-white">{formatPrice(tx.offerAmount)}</p>
              {tx.closingDate && (
                <p className="text-slate-400 text-xs">
                  Closing: {new Date(tx.closingDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-400 text-xs">Progress</span>
              <span className="text-slate-400 text-xs">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="flex items-center gap-1">
            {tx.stages.map((stage, i) => (
              <div key={stage.name} className="flex items-center flex-1">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  stage.status === 'completed'
                    ? 'bg-emerald-500 text-white'
                    : stage.status === 'in_progress'
                    ? 'bg-amber-500 text-white animate-pulse'
                    : 'bg-slate-700 text-slate-500'
                }`}>
                  {stage.status === 'completed' ? '✓' : i + 1}
                </div>
                {i < tx.stages.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 ${
                    stage.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-700'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Stage labels */}
          <div className="flex items-center gap-1 text-xs">
            {tx.stages.map((stage) => (
              <div key={stage.name} className="flex-1 text-center">
                <span className={stage.status === 'completed' ? 'text-emerald-400' : stage.status === 'in_progress' ? 'text-amber-400' : 'text-slate-600'}>
                  {stage.name}
                </span>
              </div>
            ))}
          </div>

          {/* Notes */}
          {currentStage?.notes && (
            <div className="p-2 bg-slate-700/30 rounded-lg">
              <p className="text-slate-300 text-sm">{currentStage.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
