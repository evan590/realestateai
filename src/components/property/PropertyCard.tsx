'use client';

import { Property } from '@/types';
import { formatPrice, formatNumber } from '@/lib/utils';
import Link from 'next/link';
import { useState } from 'react';
import { Heart, Home } from '@/lib/icons';
import { motion } from '@/components/ui/AnimatedSection';

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
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/5"
      >
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
            <Heart
              className={`w-5 h-5 transition-colors ${
                saved ? 'text-red-500 fill-red-500' : 'text-white'
              }`}
            />
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
              <Home className="w-4 h-4" />
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
                className="px-2 py-0.5 text-xs bg-white/5 text-slate-300 rounded-full"
              >
                {feature}
              </span>
            ))}
            {property.features.length > 3 && (
              <span className="px-2 py-0.5 text-xs bg-white/5 text-slate-400 rounded-full">
                +{property.features.length - 3} more
              </span>
            )}
          </div>

          {/* AI indicator */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              AI Analysis Available
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
