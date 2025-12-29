'use client';

import { Property } from '@/types';
import { formatPrice, formatNumber } from '@/lib/mock-properties';
import Link from 'next/link';
import { useState } from 'react';

interface PropertyCardProps {
  property: Property;
  onSave?: (propertyId: string) => void;
  isSaved?: boolean;
}

export function PropertyCard({ property, onSave, isSaved = false }: PropertyCardProps) {
  const [saved, setSaved] = useState(isSaved);
  const [imageIndex, setImageIndex] = useState(0);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
    onSave?.(property.id);
  };

  const pricePerSqft = Math.round(property.price / property.sqft);

  return (
    <Link href={`/dashboard/properties/${property.id}`}>
      <div className="group bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/5">
        {/* Image */}
        <div className="relative h-48 bg-slate-700">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105"
            style={{ backgroundImage: `url(${property.images[imageIndex]})` }}
          />

          {/* Image navigation dots */}
          {property.images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {property.images.slice(0, 5).map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setImageIndex(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                    i === imageIndex ? 'bg-white w-3' : 'bg-white/50 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Save button */}
          <button
            onClick={handleSave}
            className="absolute top-3 right-3 p-2 bg-slate-900/75 backdrop-blur-sm rounded-full hover:bg-slate-900 transition-colors"
          >
            <svg
              className={`w-5 h-5 transition-colors ${
                saved ? 'text-red-500 fill-red-500' : 'text-white'
              }`}
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
          </button>

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                property.status === 'for_sale'
                  ? 'bg-emerald-500/90 text-white'
                  : property.status === 'pending'
                  ? 'bg-yellow-500/90 text-slate-900'
                  : 'bg-slate-500/90 text-white'
              }`}
            >
              {property.status === 'for_sale' ? 'For Sale' : property.status === 'pending' ? 'Pending' : 'Sold'}
            </span>
          </div>

          {/* Days on market */}
          {property.days_on_market && (
            <div className="absolute bottom-3 left-3">
              <span className="px-2 py-1 text-xs bg-slate-900/75 backdrop-blur-sm text-slate-300 rounded-full">
                {property.days_on_market} days on market
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xl font-bold text-white">{formatPrice(property.price)}</span>
            <span className="text-sm text-slate-400">${pricePerSqft}/sqft</span>
          </div>

          {/* Details */}
          <div className="flex items-center gap-3 text-sm text-slate-400 mb-2">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {property.bedrooms} bd
            </span>
            <span>|</span>
            <span>{property.bathrooms} ba</span>
            <span>|</span>
            <span>{formatNumber(property.sqft)} sqft</span>
          </div>

          {/* Address */}
          <p className="text-white font-medium truncate">{property.address}</p>
          <p className="text-slate-400 text-sm">
            {property.city}, {property.state} {property.zip}
          </p>

          {/* Features preview */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {property.features.slice(0, 3).map((feature) => (
              <span
                key={feature}
                className="px-2 py-0.5 text-xs bg-slate-700/50 text-slate-300 rounded-full"
              >
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="px-2 py-0.5 text-xs bg-slate-700/50 text-slate-400 rounded-full">
                +{property.features.length - 3} more
              </span>
            )}
          </div>

          {/* AI indicator */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-700/50">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              AI Analysis Available
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
