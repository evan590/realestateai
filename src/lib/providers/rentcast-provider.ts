import { PropertyProvider } from './types';
import {
  Property,
  PropertyDetail,
  PropertySearchParams,
  PropertySearchResult,
  ValuationData,
  NeighborhoodData,
} from '@/types';

const RENTCAST_BASE = 'https://api.rentcast.io/v1';

interface RentCastListing {
  id: string;
  formattedAddress: string;
  addressLine1: string;
  city: string;
  state: string;
  zipCode: string;
  county: string;
  latitude: number;
  longitude: number;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  lotSize: number;
  yearBuilt: number;
  price: number;
  listingType: string;
  status: string;
  daysOnMarket: number;
  createdDate: string;
  lastSeenDate: string;
  removedDate: string | null;
  description: string;
  photos: string[];
  features: string[];
  taxAssessedValue?: number;
  taxAnnualAmount?: number;
  hoaFee?: number;
}

export class RentCastProvider implements PropertyProvider {
  name = 'rentcast';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async fetch<T>(endpoint: string, params: Record<string, string | number | undefined> = {}): Promise<T> {
    const url = new URL(`${RENTCAST_BASE}${endpoint}`);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        url.searchParams.set(k, String(v));
      }
    });

    const res = await fetch(url.toString(), {
      headers: {
        'Accept': 'application/json',
        'X-Api-Key': this.apiKey,
      },
    });

    if (!res.ok) {
      throw new Error(`RentCast API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }

  async searchProperties(params: PropertySearchParams): Promise<PropertySearchResult> {
    const limit = params.limit || 20;
    const offset = ((params.page || 1) - 1) * limit;

    const apiParams: Record<string, string | number | undefined> = {
      city: params.city || undefined,
      state: params.state || undefined,
      zipCode: params.zip || undefined,
      bedrooms: params.minBeds,
      bathrooms: params.minBaths,
      status: 'Active',
      limit,
      offset,
    };

    // RentCast uses propertyType as a string
    if (params.propertyType?.length) {
      apiParams.propertyType = this.mapPropertyType(params.propertyType[0]);
    }

    try {
      const listings = await this.fetch<RentCastListing[]>('/listings/sale', apiParams);

      const properties = listings.map((l) => this.mapToProperty(l));

      // Client-side filtering for params RentCast doesn't support directly
      let filtered = properties;
      if (params.minPrice) filtered = filtered.filter((p) => p.price >= params.minPrice!);
      if (params.maxPrice) filtered = filtered.filter((p) => p.price <= params.maxPrice!);
      if (params.minSqft) filtered = filtered.filter((p) => p.sqft >= params.minSqft!);
      if (params.maxSqft) filtered = filtered.filter((p) => p.sqft <= params.maxSqft!);

      // Sort
      switch (params.sort) {
        case 'price_asc':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price_desc':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          break;
        case 'sqft':
          filtered.sort((a, b) => b.sqft - a.sqft);
          break;
      }

      return {
        properties: filtered,
        total: filtered.length,
        page: params.page || 1,
        limit,
        hasMore: listings.length === limit,
      };
    } catch (error) {
      console.error('RentCast search error:', error);
      throw error;
    }
  }

  async getProperty(id: string): Promise<PropertyDetail | null> {
    try {
      const listings = await this.fetch<RentCastListing[]>('/listings/sale', { id });
      if (!listings.length) return null;

      const property = this.mapToProperty(listings[0]);
      return { ...property };
    } catch {
      return null;
    }
  }

  async getComparables(propertyId: string, limit = 5): Promise<Property[]> {
    // RentCast doesn't have a direct comps endpoint on the basic plan
    // Would need to search nearby properties with similar criteria
    return [];
  }

  async getPropertyValuation(propertyId: string): Promise<ValuationData | null> {
    // RentCast AVM requires address-based lookup
    // This would be implemented with the /avm/value endpoint
    return null;
  }

  async getNeighborhoodData(lat: number, lng: number): Promise<NeighborhoodData | null> {
    // Would need a separate neighborhood data provider
    return null;
  }

  private mapToProperty(listing: RentCastListing): Property {
    return {
      id: listing.id || `rc-${listing.formattedAddress}`,
      address: listing.addressLine1 || listing.formattedAddress,
      city: listing.city,
      state: listing.state,
      zip: listing.zipCode,
      price: listing.price,
      bedrooms: listing.bedrooms || 0,
      bathrooms: listing.bathrooms || 0,
      sqft: listing.squareFootage || 0,
      lot_size: listing.lotSize,
      year_built: listing.yearBuilt || 0,
      property_type: this.reverseMapPropertyType(listing.propertyType),
      status: this.mapStatus(listing.status),
      description: listing.description || `${listing.bedrooms}bd/${listing.bathrooms}ba home in ${listing.city}, ${listing.state}`,
      images: listing.photos?.length ? listing.photos : ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800'],
      features: listing.features || [],
      lat: listing.latitude,
      lng: listing.longitude,
      days_on_market: listing.daysOnMarket,
      price_per_sqft: listing.squareFootage ? Math.round(listing.price / listing.squareFootage) : undefined,
      hoa_fee: listing.hoaFee,
      tax_annual: listing.taxAnnualAmount,
      created_at: listing.createdDate || new Date().toISOString(),
    };
  }

  private mapPropertyType(type: Property['property_type']): string {
    const map: Record<string, string> = {
      single_family: 'Single Family',
      condo: 'Condo',
      townhouse: 'Townhouse',
      multi_family: 'Multi-Family',
      land: 'Land',
    };
    return map[type] || type;
  }

  private reverseMapPropertyType(type: string): Property['property_type'] {
    const normalized = type?.toLowerCase() || '';
    if (normalized.includes('single') || normalized.includes('sfr')) return 'single_family';
    if (normalized.includes('condo')) return 'condo';
    if (normalized.includes('town')) return 'townhouse';
    if (normalized.includes('multi') || normalized.includes('duplex') || normalized.includes('triplex')) return 'multi_family';
    if (normalized.includes('land') || normalized.includes('lot')) return 'land';
    return 'single_family';
  }

  private mapStatus(status: string): Property['status'] {
    const normalized = status?.toLowerCase() || '';
    if (normalized.includes('active') || normalized.includes('sale')) return 'for_sale';
    if (normalized.includes('pending') || normalized.includes('contingent')) return 'pending';
    if (normalized.includes('sold') || normalized.includes('closed')) return 'sold';
    return 'for_sale';
  }
}
