'use client';

import { useState, useEffect } from 'react';
import { getOffers, updateOffer, seedMockSellerData, getListings } from '@/lib/seller-store';
import { SellerOffer, SellerListing } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DollarSign, Bot } from '@/lib/icons';

export default function OffersPage() {
  const [offers, setOffers] = useState<SellerOffer[]>([]);
  const [listings, setListings] = useState<SellerListing[]>([]);

  useEffect(() => {
    seedMockSellerData();
    setOffers(getOffers());
    setListings(getListings());
  }, []);

  const handleUpdateStatus = (id: string, status: SellerOffer['status']) => {
    updateOffer(id, { status });
    setOffers(getOffers());
  };

  const getListingForOffer = (offer: SellerOffer) => listings.find((l) => l.id === offer.listingId);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    accepted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    countered: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    rejected: 'bg-red-500/10 text-red-400 border-red-500/20',
    expired: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Offers</h1>
        <p className="text-slate-400 mt-1">Review and manage offers on your properties</p>
      </div>

      {offers.length === 0 ? (
        <Card>
          <CardContent>
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center">
                <DollarSign className="w-8 h-8 text-slate-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No offers yet</h3>
              <p className="text-slate-400">Offers will appear here when buyers make them on your listings</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {offers.map((offer) => {
            const listing = getListingForOffer(offer);
            const offerPercent = listing ? Math.round((offer.amount / listing.askingPrice) * 100) : 0;

            return (
              <Card key={offer.id}>
                <CardContent>
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 text-xs font-medium rounded-full border capitalize ${statusColors[offer.status]}`}>
                            {offer.status}
                          </span>
                          {listing && (
                            <span className="text-slate-500 text-xs">{listing.address}</span>
                          )}
                        </div>
                        <p className="text-white font-medium">From: {offer.buyerName}</p>
                        <p className="text-slate-400 text-sm">{new Date(offer.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">{formatPrice(offer.amount)}</p>
                        {listing && (
                          <p className={`text-sm ${offerPercent >= 100 ? 'text-emerald-400' : offerPercent >= 95 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {offerPercent}% of asking
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Terms */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-700/30 rounded-lg">
                        <p className="text-slate-400 text-xs mb-1">Terms</p>
                        <p className="text-white text-sm">{offer.terms}</p>
                      </div>
                      <div className="p-3 bg-slate-700/30 rounded-lg">
                        <p className="text-slate-400 text-xs mb-1">Contingencies</p>
                        <div className="flex flex-wrap gap-1">
                          {offer.contingencies.map((c) => (
                            <span key={c} className="px-1.5 py-0.5 text-xs bg-slate-600 text-slate-300 rounded">{c}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* AI Analysis */}
                    {offer.aiAnalysis && (
                      <div className="p-3 bg-gradient-to-r from-amber-500/5 to-orange-500/5 border border-amber-500/20 rounded-lg">
                        <p className="text-amber-400 text-xs font-medium mb-1 flex items-center gap-1"><Bot className="w-3.5 h-3.5" /> AI Analysis</p>
                        <p className="text-slate-300 text-sm">{offer.aiAnalysis}</p>
                      </div>
                    )}

                    {/* Actions */}
                    {offer.status === 'pending' && (
                      <div className="flex gap-3">
                        <Button onClick={() => handleUpdateStatus(offer.id, 'accepted')} className="flex-1">Accept</Button>
                        <Button variant="secondary" onClick={() => handleUpdateStatus(offer.id, 'countered')} className="flex-1">Counter</Button>
                        <Button variant="danger" onClick={() => handleUpdateStatus(offer.id, 'rejected')}>Reject</Button>
                      </div>
                    )}

                    {/* Expiry */}
                    <p className="text-slate-500 text-xs">
                      Expires: {new Date(offer.expiresAt).toLocaleDateString('en-US', {
                        weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
