'use client';

import { useState, useEffect } from 'react';
import { getShowings, updateShowing, seedMockSellerData } from '@/lib/seller-store';
import { Showing } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar } from '@/lib/icons';

export default function ShowingsPage() {
  const [showings, setShowings] = useState<Showing[]>([]);

  useEffect(() => {
    seedMockSellerData();
    setShowings(getShowings());
  }, []);

  const handleUpdateStatus = (id: string, status: Showing['status']) => {
    updateShowing(id, { status });
    setShowings(getShowings());
  };

  const statusColors: Record<string, string> = {
    requested: 'bg-yellow-500/10 text-yellow-400',
    confirmed: 'bg-emerald-500/10 text-emerald-400',
    completed: 'bg-blue-500/10 text-blue-400',
    cancelled: 'bg-red-500/10 text-red-400',
  };

  const upcoming = showings.filter((s) => s.status !== 'cancelled' && s.status !== 'completed');
  const past = showings.filter((s) => s.status === 'completed' || s.status === 'cancelled');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Showings</h1>
        <p className="text-slate-400 mt-1">Manage property viewings and open houses</p>
      </div>

      {/* Upcoming */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Upcoming ({upcoming.length})</h2>
        {upcoming.length === 0 ? (
          <Card>
            <CardContent>
              <p className="text-slate-400 text-center py-6">No upcoming showings</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {upcoming.map((showing) => (
              <Card key={showing.id}>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{showing.buyerName[0]}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{showing.buyerName}</p>
                        <p className="text-slate-400 text-sm">{showing.buyerEmail}</p>
                        <p className="text-slate-400 text-sm">
                          <Calendar className="w-3 h-3 inline mr-1" />{new Date(showing.scheduledAt).toLocaleDateString('en-US', {
                            weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusColors[showing.status]}`}>
                        {showing.status}
                      </span>
                      {showing.status === 'requested' && (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleUpdateStatus(showing.id, 'confirmed')}>Confirm</Button>
                          <Button size="sm" variant="danger" onClick={() => handleUpdateStatus(showing.id, 'cancelled')}>Decline</Button>
                        </div>
                      )}
                      {showing.status === 'confirmed' && (
                        <Button size="sm" variant="secondary" onClick={() => handleUpdateStatus(showing.id, 'completed')}>Mark Complete</Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Past */}
      {past.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Past ({past.length})</h2>
          <div className="space-y-3">
            {past.map((showing) => (
              <Card key={showing.id} className="opacity-60">
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{showing.buyerName[0]}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{showing.buyerName}</p>
                        <p className="text-slate-400 text-sm">
                          {new Date(showing.scheduledAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${statusColors[showing.status]}`}>
                      {showing.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
