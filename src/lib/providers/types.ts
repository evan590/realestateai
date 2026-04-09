import {
  Property,
  PropertyDetail,
  PropertySearchParams,
  PropertySearchResult,
  ValuationData,
  NeighborhoodData,
} from '@/types';

export interface PropertyProvider {
  name: string;

  searchProperties(params: PropertySearchParams): Promise<PropertySearchResult>;

  getProperty(id: string): Promise<PropertyDetail | null>;

  getComparables(propertyId: string, limit?: number): Promise<Property[]>;

  getPropertyValuation(propertyId: string): Promise<ValuationData | null>;

  getNeighborhoodData(lat: number, lng: number): Promise<NeighborhoodData | null>;
}
