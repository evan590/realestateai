'use client';

import { useParams } from 'next/navigation';
import { useProperty, useComparables } from '@/lib/hooks/use-properties';
import { formatPrice, formatNumber } from '@/lib/utils';
import { AIInsightsPanel } from '@/components/ai/AIInsightsPanel';
import { PropertyCard } from '@/components/property/PropertyCard';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import Link from 'next/link';
import { useState } from 'react';

export default function PropertyDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { property, isLoading, error } = useProperty(id);
  const { comps } = useComparables(id);
  const [activeImage, setActiveImage] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-4 w-32 bg-slate-700 rounded animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="h-96 bg-slate-800 rounded-xl animate-pulse" />
            <div className="space-y-4">
              <div className="h-8 bg-slate-700 rounded w-2/3 animate-pulse" />
              <div className="h-6 bg-slate-700 rounded w-1/3 animate-pulse" />
              <div className="flex gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-16 w-16 bg-slate-700 rounded animate-pulse" />
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-48 bg-slate-800 rounded-xl animate-pulse" />
            <div className="h-64 bg-slate-800 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-white mb-4">Property not found</h1>
        <Link href="/dashboard/search">
          <Button>Back to Search</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Link
        href="/dashboard/search"
        className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Search
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image gallery */}
          <div className="space-y-2">
            <div className="relative h-96 bg-slate-800 rounded-xl overflow-hidden">
              {property.images.length > 0 ? (
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${property.images[activeImage]})` }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}

              {/* Navigation arrows */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((prev) => (prev === 0 ? property.images.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-slate-900/75 hover:bg-slate-900 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveImage((prev) => (prev === property.images.length - 1 ? 0 : prev + 1))}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-slate-900/75 hover:bg-slate-900 rounded-full transition-colors"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              {/* Image counter */}
              {property.images.length > 0 && (
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-slate-900/75 text-white text-sm rounded-full">
                  {activeImage + 1} / {property.images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {property.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      index === activeImage ? 'border-emerald-500' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property header */}
          <div>
            <div className="flex items-start justify-between">
              <div>
                <span
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full mb-2 ${
                    property.status === 'for_sale'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : property.status === 'pending'
                      ? 'bg-yellow-500/10 text-yellow-400'
                      : 'bg-slate-500/10 text-slate-400'
                  }`}
                >
                  {property.status === 'for_sale' ? 'For Sale' : property.status === 'pending' ? 'Pending' : 'Sold'}
                </span>
                <h1 className="text-2xl font-bold text-white">{property.address}</h1>
                <p className="text-slate-400">
                  {property.city}, {property.state} {property.zip}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-white">{formatPrice(property.price)}</p>
                <p className="text-slate-400">${Math.round(property.price / property.sqft)}/sqft</p>
              </div>
            </div>

            {/* Quick stats */}
            <div className="flex items-center gap-6 mt-4 py-4 border-y border-slate-700/50">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{property.bedrooms}</p>
                <p className="text-slate-400 text-sm">Beds</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{property.bathrooms}</p>
                <p className="text-slate-400 text-sm">Baths</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{formatNumber(property.sqft)}</p>
                <p className="text-slate-400 text-sm">Sqft</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{property.year_built}</p>
                <p className="text-slate-400 text-sm">Built</p>
              </div>
              {property.lot_size && (
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{formatNumber(property.lot_size)}</p>
                  <p className="text-slate-400 text-sm">Lot Sqft</p>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold text-white mb-3">About This Property</h2>
              <p className="text-slate-300 leading-relaxed">{property.description}</p>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold text-white mb-3">Features</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-2 text-slate-300"
                  >
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Details */}
          <Card>
            <CardContent>
              <h2 className="text-lg font-semibold text-white mb-3">Property Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <DetailRow label="Property Type" value={property.property_type.replace('_', ' ')} />
                <DetailRow label="Year Built" value={property.year_built.toString()} />
                <DetailRow label="Days on Market" value={property.days_on_market?.toString() || 'N/A'} />
                <DetailRow label="Price per Sqft" value={`$${Math.round(property.price / property.sqft)}`} />
                {property.hoa_fee && <DetailRow label="HOA Fee" value={`$${property.hoa_fee}/month`} />}
                {property.tax_annual && <DetailRow label="Annual Taxes" value={`$${formatNumber(property.tax_annual)}`} />}
              </div>
            </CardContent>
          </Card>

          {/* Neighborhood Data */}
          {property.neighborhood && (
            <Card>
              <CardHeader>
                <CardTitle>Neighborhood: {property.neighborhood.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm mb-4">{property.neighborhood.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.neighborhood.walkScore !== undefined && (
                    <ScoreCard label="Walk Score" score={property.neighborhood.walkScore} />
                  )}
                  {property.neighborhood.transitScore !== undefined && (
                    <ScoreCard label="Transit Score" score={property.neighborhood.transitScore} />
                  )}
                  {property.neighborhood.bikeScore !== undefined && (
                    <ScoreCard label="Bike Score" score={property.neighborhood.bikeScore} />
                  )}
                  {property.neighborhood.medianHomeValue !== undefined && (
                    <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                      <p className="text-slate-400 text-xs mb-1">Median Home Value</p>
                      <p className="text-white font-bold">{formatPrice(property.neighborhood.medianHomeValue)}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Schools */}
          {property.schools && property.schools.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Nearby Schools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {property.schools.map((school) => (
                    <div key={school.name} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{school.name}</p>
                        <p className="text-slate-400 text-xs capitalize">{school.type} &middot; {school.distance} mi away</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className={`text-lg font-bold ${school.rating >= 7 ? 'text-emerald-400' : school.rating >= 5 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {school.rating}
                        </span>
                        <span className="text-slate-400 text-xs">/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Comparable Properties */}
          {(property.comps?.length || comps.length) > 0 && (
            <div>
              <h2 className="text-lg font-semibold text-white mb-4">Comparable Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(property.comps || comps).slice(0, 3).map((comp) => (
                  <PropertyCard key={comp.id} property={comp} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  Schedule a Tour
                </Button>
                <Button
                  variant="secondary"
                  className="w-full"
                  size="lg"
                  onClick={() => setIsSaved(!isSaved)}
                >
                  <svg
                    className={`w-5 h-5 mr-2 ${isSaved ? 'fill-red-500 text-red-500' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {isSaved ? 'Saved' : 'Save Property'}
                </Button>
                <Link href="/dashboard/buyer-agent" className="block">
                  <Button variant="ghost" className="w-full" size="lg">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    Ask AI About This Property
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Valuation */}
          {property.estimatedValue && (
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="text-emerald-400">AI Valuation Estimate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold text-white">{formatPrice(property.estimatedValue.estimatedValue)}</p>
                  <p className="text-slate-400 text-sm">
                    Range: {formatPrice(property.estimatedValue.lowEstimate)} - {formatPrice(property.estimatedValue.highEstimate)}
                  </p>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Confidence</span>
                  <span className={`font-medium capitalize ${
                    property.estimatedValue.confidence === 'high' ? 'text-emerald-400' :
                    property.estimatedValue.confidence === 'medium' ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {property.estimatedValue.confidence}
                  </span>
                </div>
                {property.price !== property.estimatedValue.estimatedValue && (
                  <div className="mt-3 p-2 bg-slate-700/50 rounded-lg text-center">
                    <p className={`text-sm font-medium ${
                      property.price > property.estimatedValue.estimatedValue ? 'text-yellow-400' : 'text-emerald-400'
                    }`}>
                      {property.price > property.estimatedValue.estimatedValue
                        ? `Listed ${formatPrice(property.price - property.estimatedValue.estimatedValue)} above estimate`
                        : `Listed ${formatPrice(property.estimatedValue.estimatedValue - property.price)} below estimate`
                      }
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* AI Insights */}
          <AIInsightsPanel property={property} />
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-slate-700/50 last:border-0">
      <span className="text-slate-400">{label}</span>
      <span className="text-white font-medium capitalize">{value}</span>
    </div>
  );
}

function ScoreCard({ label, score }: { label: string; score: number }) {
  const color = score >= 70 ? 'text-emerald-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400';
  return (
    <div className="bg-slate-700/50 rounded-lg p-3 text-center">
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{score}</p>
    </div>
  );
}
