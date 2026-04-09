'use client';

import { Transaction, TransactionStage } from '@/types';
import { mockProperties } from './mock-properties';

const STORAGE_KEY = 'realestateai_transactions';

function getStorage(): Transaction[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveStorage(transactions: Transaction[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export function getTransactions(): Transaction[] {
  return getStorage();
}

export function getTransaction(id: string): Transaction | null {
  return getStorage().find((t) => t.id === id) || null;
}

export function createTransaction(tx: Omit<Transaction, 'id' | 'createdAt' | 'updatedAt'>): Transaction {
  const newTx: Transaction = {
    ...tx,
    id: `tx-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const transactions = getStorage();
  transactions.push(newTx);
  saveStorage(transactions);
  return newTx;
}

export function updateTransaction(id: string, updates: Partial<Transaction>): void {
  const transactions = getStorage();
  const idx = transactions.findIndex((t) => t.id === id);
  if (idx !== -1) {
    transactions[idx] = { ...transactions[idx], ...updates, updatedAt: new Date().toISOString() };
    saveStorage(transactions);
  }
}

export const TRANSACTION_STAGES: { name: string; description: string }[] = [
  { name: 'Offer Made', description: 'Your offer has been submitted to the seller' },
  { name: 'Under Contract', description: 'Offer accepted, now in contract period' },
  { name: 'Inspection', description: 'Property inspection and due diligence' },
  { name: 'Appraisal', description: 'Bank appraisal to confirm property value' },
  { name: 'Clear to Close', description: 'All conditions met, preparing for closing' },
  { name: 'Closed', description: 'Congratulations! Transaction complete' },
];

export function seedMockTransactions(): void {
  if (getStorage().length > 0) return;

  const mockTransactions: Transaction[] = [
    {
      id: 'tx-demo-1',
      propertyId: '4',
      property: mockProperties.find((p) => p.id === '4'),
      type: 'buying',
      status: 'inspection',
      offerAmount: 875000,
      closingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      stages: [
        { name: 'Offer Made', status: 'completed', completedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() },
        { name: 'Under Contract', status: 'completed', completedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() },
        { name: 'Inspection', status: 'in_progress', notes: 'Inspection scheduled for this week' },
        { name: 'Appraisal', status: 'pending' },
        { name: 'Clear to Close', status: 'pending' },
        { name: 'Closed', status: 'pending' },
      ],
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'tx-demo-2',
      propertyId: '9',
      property: mockProperties.find((p) => p.id === '9'),
      type: 'buying',
      status: 'offer_made',
      offerAmount: 360000,
      stages: [
        { name: 'Offer Made', status: 'in_progress', notes: 'Waiting for seller response' },
        { name: 'Under Contract', status: 'pending' },
        { name: 'Inspection', status: 'pending' },
        { name: 'Appraisal', status: 'pending' },
        { name: 'Clear to Close', status: 'pending' },
        { name: 'Closed', status: 'pending' },
      ],
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  saveStorage(mockTransactions);
}
