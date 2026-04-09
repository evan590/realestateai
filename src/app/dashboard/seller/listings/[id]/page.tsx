'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getListing, updateListing, deleteListing, seedMockSellerData } from '@/lib/seller-store';
import { getOffers, getShowings } from '@/lib/seller-store';
import { SellerListing } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowLeft } from '@/lib/icons';

export default function ListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<SellerListing | null>(null);

  useEffect(() => {
    seedMockSellerData();
    const data = getListing(params.id as string);
    setListing(data);
  }, [params.id]);

  if (!listing) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-white mb-4">Listing not found</h1>
        <Link href="/dashboard/seller/listings">
          <Button>Back to Listings</Button>
        </Link>
      </div>
    );
  }

  const offers = getOffers(listing.id);
  const showings = getShowings(listing.id);

  const handleStatusChange = (status: SellerListing['status']) => {
    const updated = updateListing(listing.id, { status });
    if (updated) setListing(updated);
  };

  const handleDelete = () => {
    deleteListing(listing.id);
    router.push('/dashboard/seller/listings');
  };

  const statusColors: Record<string, string> = {
    draft: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
    active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    pending: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    sold: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    delisted: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  return (
    <div className="space-y-6">
      <Link
        href="/dashboard/seller/listings"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border capitalize mb-2 ${statusColors[listing.status]}`}>
                {listing.status}
              </span>
              <h1 className="text-2xl font-bold text-white">{listing.address}</h1>
              <p className="text-slate-400">{listing.city}, {listing.state} {listing.zip}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-white">{formatPrice(listing.askingPrice)}</p>
              <p className="text-slate-400">${Math.round(listing.askingPrice / listing.sqft)}/sqft</p>
            </div>
          </div>

          {/* Photos */}
          {listing.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {listing.photos.map((photo, i) => (
                <div key={i} className="aspect-video rounded-lg overflow-hidden bg-slate-700">
                  <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${photo})` }} />
                </div>
              ))}
            </div>
          )}

          {/* Details */}
          <Card>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-2xl font-bold text-white">{listing.bedrooms}</p>
                  <p className="text-slate-400 text-sm">Beds</p>
                </div>
                <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-2xl font-bold text-white">{listing.bathrooms}</p>
                  <p className="text-slate-400 text-sm">Baths</p>
                </div>
                <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-2xl font-bold text-white">{listing.sqft.toLocaleString()}</p>
                  <p className="text-slate-400 text-sm">Sqft</p>
                </div>
                <div className="text-center p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-2xl font-bold text-white">{listing.yearBuilt}</p>
                  <p className="text-slate-400 text-sm">Built</p>
                </div>
              </div>
              {listing.description && (
                <p className="text-slate-300 text-sm leading-relaxed">{listing.description}</p>
              )}
              {listing.features.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {listing.features.map((f) => (
                    <span key={f} className="px-2 py-0.5 text-xs bg-slate-700/50 text-slate-300 rounded-full">{f}</span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Actions */}
          <Card>
            <CardHeader><CardTitle>Actions</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-2">
                {listing.status === 'active' && (
                  <Button variant="secondary" className="w-full" onClick={() => handleStatusChange('delisted')}>Delist Property</Button>
                )}
                {listing.status === 'delisted' && (
                  <Button className="w-full" onClick={() => handleStatusChange('active')}>Relist Property</Button>
                )}
                <Link href="/dashboard/seller/chat" className="block">
                  <Button variant="ghost" className="w-full">Ask AI About This Listing</Button>
                </Link>
                <Button variant="danger" size="sm" className="w-full" onClick={handleDelete}>Delete Listing</Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Pricing */}
          {listing.aiSuggestedPrice && (
            <Card variant="elevated">
              <CardHeader><CardTitle className="text-amber-400">AI Price Analysis</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Your Price</span>
                    <span className="text-white font-medium">{formatPrice(listing.askingPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">AI Suggested</span>
                    <span className="text-amber-400 font-medium">{formatPrice(listing.aiSuggestedPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Difference</span>
                    <span className={listing.askingPrice > listing.aiSuggestedPrice ? 'text-yellow-400' : 'text-emerald-400'}>
                      {listing.askingPrice > listing.aiSuggestedPrice ? '+' : ''}{formatPrice(listing.askingPrice - listing.aiSuggestedPrice)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Stats */}
          <Card>
            <CardHeader><CardTitle>Activity</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between p-2 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-400 text-sm">Showings</span>
                  <span className="text-white font-medium">{showings.length}</span>
                </div>
                <div className="flex justify-between p-2 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-400 text-sm">Offers</span>
                  <span className="text-white font-medium">{offers.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
