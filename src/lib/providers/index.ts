import { PropertyProvider } from './types';
import { MockProvider } from './mock-provider';
import { RentCastProvider } from './rentcast-provider';
import { ProviderCache } from './cache';
import {
  Property,
  PropertyDetail,
  PropertySearchParams,
  PropertySearchResult,
  ValuationData,
  NeighborhoodData,
} from '@/types';

class CachedProvider implements PropertyProvider {
  private provider: PropertyProvider;
  private cache: ProviderCache;

  get name() {
    return this.provider.name;
  }

  constructor(provider: PropertyProvider, cache: ProviderCache) {
    this.provider = provider;
    this.cache = cache;
  }

  async searchProperties(params: PropertySearchParams): Promise<PropertySearchResult> {
    const key = ProviderCache.buildKey('search', params as Record<string, unknown>);
    const cached = this.cache.get<PropertySearchResult>(key);
    if (cached) return cached;

    const result = await this.provider.searchProperties(params);
    this.cache.setSearch(key, result);
    return result;
  }

  async getProperty(id: string): Promise<PropertyDetail | null> {
    const key = `detail:${id}`;
    const cached = this.cache.get<PropertyDetail>(key);
    if (cached) return cached;

    const result = await this.provider.getProperty(id);
    if (result) this.cache.setDetail(key, result);
    return result;
  }

  async getComparables(propertyId: string, limit?: number): Promise<Property[]> {
    const key = `comps:${propertyId}:${limit || 5}`;
    const cached = this.cache.get<Property[]>(key);
    if (cached) return cached;

    const result = await this.provider.getComparables(propertyId, limit);
    if (result.length) this.cache.setDetail(key, result);
    return result;
  }

  async getPropertyValuation(propertyId: string): Promise<ValuationData | null> {
    const key = `valuation:${propertyId}`;
    const cached = this.cache.get<ValuationData>(key);
    if (cached) return cached;

    const result = await this.provider.getPropertyValuation(propertyId);
    if (result) this.cache.setValuation(key, result);
    return result;
  }

  async getNeighborhoodData(lat: number, lng: number): Promise<NeighborhoodData | null> {
    const key = `neighborhood:${lat.toFixed(3)}:${lng.toFixed(3)}`;
    const cached = this.cache.get<NeighborhoodData>(key);
    if (cached) return cached;

    const result = await this.provider.getNeighborhoodData(lat, lng);
    if (result) this.cache.setDetail(key, result);
    return result;
  }
}

// Singleton cache shared across requests
const cache = new ProviderCache();

export function getProvider(): PropertyProvider {
  // Try RentCast first
  const rentcastKey = process.env.RENTCAST_API_KEY;
  if (rentcastKey) {
    return new CachedProvider(new RentCastProvider(rentcastKey), cache);
  }

  // Fall back to mock
  return new CachedProvider(new MockProvider(), cache);
}

export { MockProvider } from './mock-provider';
export { RentCastProvider } from './rentcast-provider';
export type { PropertyProvider } from './types';
