'use client';

import { useState, useEffect } from 'react';
import { getListings, seedMockSellerData } from '@/lib/seller-store';
import { SellerListing } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function SellerListingsPage() {
  const [listings, setListings] = useState<SellerListing[]>([]);

  useEffect(() => {
    seedMockSellerData();
    setListings(getListings());
  }, []);

  const statusColors: Record<string, string> = {
    draft: 'bg-slate-500/10 text-slate-400',
    active: 'bg-emerald-500/10 text-emerald-400',
    pending: 'bg-yellow-500/10 text-yellow-400',
    sold: 'bg-blue-500/10 text-blue-400',
    delisted: 'bg-red-500/10 text-red-400',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Listings</h1>
          <p className="text-slate-400 mt-1">Manage your property listings</p>
        </div>
        <Link href="/dashboard/seller/listings/new">
          <Button>+ Create Listing</Button>
        </Link>
      </div>

      {listings.length === 0 ? (
        <Card>
          <CardContent>
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center">
                <span className="text-3xl">🏷️</span>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No listings yet</h3>
              <p className="text-slate-400 mb-4">Create your first listing to get started</p>
              <Link href="/dashboard/seller/listings/new">
                <Button>Create Your First Listing</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <Link key={listing.id} href={`/dashboard/seller/listings/${listing.id}`}>
              <Card className="hover:border-amber-500/50 transition-all cursor-pointer">
                <CardContent>
                  <div className="flex gap-4">
                    {/* Photo */}
                    <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-slate-700">
                      {listing.photos[0] ? (
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${listing.photos[0]})` }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                          <span className="text-2xl">📷</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize ${statusColors[listing.status]}`}>
                          {listing.status}
                        </span>
                      </div>
                      <h3 className="text-white font-medium truncate">{listing.address}</h3>
                      <p className="text-slate-400 text-sm">
                        {listing.city}, {listing.state} {listing.zip}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-white font-bold">{formatPrice(listing.askingPrice)}</span>
                        <span className="text-slate-400 text-sm">
                          {listing.bedrooms}bd / {listing.bathrooms}ba / {listing.sqft.toLocaleString()} sqft
                        </span>
                      </div>
                      {listing.aiSuggestedPrice && listing.aiSuggestedPrice !== listing.askingPrice && (
                        <p className="text-amber-400 text-xs mt-1">
                          AI suggests: {formatPrice(listing.aiSuggestedPrice)}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
