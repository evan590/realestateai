'use client';

import { useState } from 'react';
import { PropertyCard } from '@/components/property/PropertyCard';
import { mockProperties } from '@/lib/mock-properties';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';

export default function SavedPropertiesPage() {
  // Mock saved properties - in production, fetch from Supabase
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(['1', '3', '5', '7', '10']);
  const savedProperties = mockProperties.filter((p) => savedPropertyIds.includes(p.id));

  const handleRemove = (propertyId: string) => {
    setSavedPropertyIds((prev) => prev.filter((id) => id !== propertyId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Saved Properties</h1>
          <p className="text-slate-400 mt-1">
            {savedProperties.length} properties saved
          </p>
        </div>
        {savedProperties.length > 0 && (
          <Link href="/dashboard/buyer-agent">
            <Button>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Compare with AI
            </Button>
          </Link>
        )}
      </div>

      {savedProperties.length > 0 ? (
        <>
          {/* Properties grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={true}
                onSave={() => handleRemove(property.id)}
              />
            ))}
          </div>

          {/* Quick comparison */}
          <Card className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border-emerald-500/20">
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
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
          <div className="w-16 h-16 mx-auto mb-4 bg-slate-800 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No saved properties</h3>
          <p className="text-slate-400 mb-4">
            Start browsing and save properties you&apos;re interested in
          </p>
          <Link href="/dashboard/search">
            <Button>Search Properties</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
