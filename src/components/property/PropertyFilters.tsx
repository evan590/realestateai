'use client';

import { PropertyFilters as Filters } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';

interface PropertyFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
}

export function PropertyFilters({ filters, onChange, onReset }: PropertyFiltersProps) {
  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: '0-300000', label: 'Under $300k' },
    { value: '300000-500000', label: '$300k - $500k' },
    { value: '500000-750000', label: '$500k - $750k' },
    { value: '750000-1000000', label: '$750k - $1M' },
    { value: '1000000-2000000', label: '$1M - $2M' },
    { value: '2000000-', label: '$2M+' },
  ];

  const bedroomOptions = [
    { value: '', label: 'Any Beds' },
    { value: '1', label: '1+ Beds' },
    { value: '2', label: '2+ Beds' },
    { value: '3', label: '3+ Beds' },
    { value: '4', label: '4+ Beds' },
    { value: '5', label: '5+ Beds' },
  ];

  const bathroomOptions = [
    { value: '', label: 'Any Baths' },
    { value: '1', label: '1+ Baths' },
    { value: '2', label: '2+ Baths' },
    { value: '3', label: '3+ Baths' },
    { value: '4', label: '4+ Baths' },
  ];

  const propertyTypes = [
    { value: '', label: 'All Types' },
    { value: 'single_family', label: 'Single Family' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'multi_family', label: 'Multi-Family' },
    { value: 'land', label: 'Land' },
  ];

  const handlePriceChange = (value: string) => {
    if (!value) {
      onChange({ ...filters, minPrice: undefined, maxPrice: undefined });
      return;
    }
    const [min, max] = value.split('-').map((v) => (v ? parseInt(v) : undefined));
    onChange({ ...filters, minPrice: min, maxPrice: max });
  };

  const getCurrentPriceValue = () => {
    if (!filters.minPrice && !filters.maxPrice) return '';
    return `${filters.minPrice || 0}-${filters.maxPrice || ''}`;
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">Filters</h3>
        <Button variant="ghost" size="sm" onClick={onReset}>
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Location */}
        <div className="col-span-2">
          <Input
            placeholder="City or ZIP"
            value={filters.city || ''}
            onChange={(e) => onChange({ ...filters, city: e.target.value || undefined })}
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
          />
        </div>

        {/* Price Range */}
        <Select
          options={priceRanges}
          value={getCurrentPriceValue()}
          onChange={(e) => handlePriceChange(e.target.value)}
        />

        {/* Bedrooms */}
        <Select
          options={bedroomOptions}
          value={filters.minBeds?.toString() || ''}
          onChange={(e) => onChange({ ...filters, minBeds: e.target.value ? parseInt(e.target.value) : undefined })}
        />

        {/* Bathrooms */}
        <Select
          options={bathroomOptions}
          value={filters.minBaths?.toString() || ''}
          onChange={(e) => onChange({ ...filters, minBaths: e.target.value ? parseInt(e.target.value) : undefined })}
        />

        {/* Property Type */}
        <Select
          options={propertyTypes}
          value={filters.propertyType?.[0] || ''}
          onChange={(e) =>
            onChange({
              ...filters,
              propertyType: e.target.value ? [e.target.value as any] : undefined,
            })
          }
        />
      </div>

      {/* Active filters count */}
      {Object.values(filters).some((v) => v !== undefined && (Array.isArray(v) ? v.length > 0 : true)) && (
        <div className="mt-4 pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <span>Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {filters.city && (
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs">
                  {filters.city}
                </span>
              )}
              {(filters.minPrice || filters.maxPrice) && (
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs">
                  {filters.minPrice ? `$${(filters.minPrice / 1000).toFixed(0)}k` : '$0'} -{' '}
                  {filters.maxPrice ? `$${(filters.maxPrice / 1000).toFixed(0)}k` : 'Any'}
                </span>
              )}
              {filters.minBeds && (
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs">
                  {filters.minBeds}+ beds
                </span>
              )}
              {filters.minBaths && (
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs">
                  {filters.minBaths}+ baths
                </span>
              )}
              {filters.propertyType?.[0] && (
                <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs">
                  {filters.propertyType[0].replace('_', ' ')}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
