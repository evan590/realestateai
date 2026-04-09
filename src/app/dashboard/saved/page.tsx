'use client';

import { useState, useEffect } from 'react';
import { PropertyCard } from '@/components/property/PropertyCard';
import { mockProperties } from '@/lib/mock-properties';
import { getSavedPropertyIds, toggleSaveProperty, seedSavedProperties } from '@/lib/saved-properties-store';
import { Property } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { Heart, Bot, BarChart3 } from '@/lib/icons';

export default function SavedPropertiesPage() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedProperties, setSavedProperties] = useState<Property[]>([]);

  useEffect(() => {
    seedSavedProperties();
    const ids = getSavedPropertyIds();
    setSavedIds(ids);
    setSavedProperties(mockProperties.filter((p) => ids.includes(p.id)));
  }, []);

  const handleToggle = (propertyId: string) => {
    const isSaved = toggleSaveProperty(propertyId);
    const newIds = getSavedPropertyIds();
    setSavedIds(newIds);
    setSavedProperties(mockProperties.filter((p) => newIds.includes(p.id)));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Saved Properties</h1>
          <p className="text-slate-400 mt-1">{savedProperties.length} properties saved</p>
        </div>
        {savedProperties.length > 0 && (
          <Link href="/dashboard/buyer-agent">
            <Button>
              <Bot className="w-4 h-4 mr-2" />
              Compare with AI
            </Button>
          </Link>
        )}
      </div>

      {savedProperties.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={true}
                onSave={() => handleToggle(property.id)}
              />
            ))}
          </div>

          {/* Quick comparison */}
          <Card className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-emerald-400 mb-1">Quick Comparison</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                    <div>
                      <p className="text-slate-400 text-xs">Avg. Price</p>
                      <p className="text-white font-bold">
                        ${Math.round(savedProperties.reduce((sum, p) => sum + p.price, 0) / savedProperties.length).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Avg. $/sqft</p>
                      <p className="text-white font-bold">
                        ${Math.round(savedProperties.reduce((sum, p) => sum + (p.price / p.sqft), 0) / savedProperties.length)}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Avg. Size</p>
                      <p className="text-white font-bold">
                        {Math.round(savedProperties.reduce((sum, p) => sum + p.sqft, 0) / savedProperties.length).toLocaleString()} sqft
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Price Range</p>
                      <p className="text-white font-bold">
                        ${(Math.min(...savedProperties.map(p => p.price)) / 1000).toFixed(0)}k - ${(Math.max(...savedProperties.map(p => p.price)) / 1000).toFixed(0)}k
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No saved properties</h3>
          <p className="text-slate-400 mb-4">Start browsing and save properties you&apos;re interested in</p>
          <Link href="/dashboard/search">
            <Button>Search Properties</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
