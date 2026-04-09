'use client';

import { useState, useMemo } from 'react';
import { PropertyCard } from '@/components/property/PropertyCard';
import { PropertyFilters } from '@/components/property/PropertyFilters';
import { usePropertySearch } from '@/lib/hooks/use-properties';
import { PropertyFilters as Filters, PropertySearchParams } from '@/types';
import { Button } from '@/components/ui/Button';
import { Search, Grid3X3, List, AlertTriangle, Bot } from '@/lib/icons';

type SortOption = 'price_asc' | 'price_desc' | 'newest' | 'sqft';

export default function SearchPage() {
  const [filters, setFilters] = useState<Filters>({});
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);

  const searchParams = useMemo<PropertySearchParams>(
    () => ({
      city: filters.city,
      state: filters.state,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minBeds: filters.minBeds,
      maxBeds: filters.maxBeds,
      minBaths: filters.minBaths,
      maxBaths: filters.maxBaths,
      minSqft: filters.minSqft,
      maxSqft: filters.maxSqft,
      propertyType: filters.propertyType,
      sort: sortBy,
      page,
      limit: 20,
    }),
    [filters, sortBy, page]
  );

  const { data, isLoading, error } = usePropertySearch(searchParams);
  const properties = data?.properties || [];
  const total = data?.total || 0;
  const hasMore = data?.hasMore || false;

  const handleSave = (propertyId: string) => {
    console.log('Save property:', propertyId);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Search Properties</h1>
        <p className="text-slate-400 mt-1">
          Find your perfect property with AI-powered insights
        </p>
      </div>

      {/* Filters */}
      <PropertyFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={() => { setFilters({}); setPage(1); }}
      />

      {/* Results header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-slate-400">
            {isLoading ? (
              'Searching...'
            ) : (
              <>
                <span className="text-white font-medium">{total}</span> properties found
              </>
            )}
          </span>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="sqft">Square Feet</option>
          </select>

          {/* View toggle */}
          <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
        }>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden animate-pulse">
              <div className="h-48 bg-slate-700" />
              <div className="p-4 space-y-3">
                <div className="h-6 bg-slate-700 rounded w-2/3" />
                <div className="h-4 bg-slate-700 rounded w-1/2" />
                <div className="h-4 bg-slate-700 rounded w-3/4" />
                <div className="flex gap-2">
                  <div className="h-5 bg-slate-700 rounded-full w-16" />
                  <div className="h-5 bg-slate-700 rounded-full w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error state */}
      {error && !isLoading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">Search Error</h3>
          <p className="text-slate-400 mb-4">{error}</p>
        </div>
      )}

      {/* Results grid */}
      {!isLoading && !error && properties.length > 0 && (
        <>
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
            }
          >
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} onSave={handleSave} />
            ))}
          </div>

          {/* Pagination */}
          {(hasMore || page > 1) && (
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button
                variant="secondary"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Previous
              </Button>
              <span className="text-slate-400">Page {page}</span>
              <Button
                variant="secondary"
                disabled={!hasMore}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Empty state */}
      {!isLoading && !error && properties.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/5 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-medium text-white mb-2">No properties found</h3>
          <p className="text-slate-400 mb-4">Try adjusting your filters to see more results</p>
          <Button variant="secondary" onClick={() => { setFilters({}); setPage(1); }}>
            Clear Filters
          </Button>
        </div>
      )}

      {/* AI suggestion */}
      {!isLoading && properties.length > 0 && (
        <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Bot className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <h4 className="font-medium text-emerald-400 mb-1">AI Buyer Agent Tip</h4>
              <p className="text-slate-300 text-sm">
                Based on your search, I recommend focusing on properties with 30+ days on market -
                they often have more negotiation room. Want me to analyze these properties and
                identify the best investment opportunities?
              </p>
              <Button variant="ghost" size="sm" className="mt-2 text-emerald-400 hover:text-emerald-300">
                Get AI Analysis →
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
