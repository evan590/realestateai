import { PropertyProvider } from './types';
import {
  Property,
  PropertyDetail,
  PropertySearchParams,
  PropertySearchResult,
  ValuationData,
  NeighborhoodData,
} from '@/types';
import { mockProperties, filterProperties } from '@/lib/mock-properties';

export class MockProvider implements PropertyProvider {
  name = 'mock';

  async searchProperties(params: PropertySearchParams): Promise<PropertySearchResult> {
    const page = params.page || 1;
    const limit = params.limit || 20;

    // Map search params to the existing filter format
    let results = filterProperties(mockProperties, {
      minPrice: params.minPrice,
      maxPrice: params.maxPrice,
      minBeds: params.minBeds,
      maxBeds: params.maxBeds,
      minBaths: params.minBaths,
      maxBaths: params.maxBaths,
      minSqft: params.minSqft,
      maxSqft: params.maxSqft,
      propertyType: params.propertyType,
      city: params.city || params.query,
      state: params.state,
    });

    // Sort
    switch (params.sort) {
      case 'price_asc':
        results = [...results].sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        results = [...results].sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        results = [...results].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        break;
      case 'sqft':
        results = [...results].sort((a, b) => b.sqft - a.sqft);
        break;
      case 'days_on_market':
        results = [...results].sort(
          (a, b) => (b.days_on_market || 0) - (a.days_on_market || 0)
        );
        break;
    }

    const total = results.length;
    const start = (page - 1) * limit;
    const paged = results.slice(start, start + limit);

    return {
      properties: paged,
      total,
      page,
      limit,
      hasMore: start + limit < total,
    };
  }

  async getProperty(id: string): Promise<PropertyDetail | null> {
    const property = mockProperties.find((p) => p.id === id);
    if (!property) return null;

    return {
      ...property,
      neighborhood: this.getMockNeighborhood(property),
      schools: [
        { name: 'Austin Elementary', type: 'elementary', rating: 8, distance: 0.5 },
        { name: 'Travis Middle School', type: 'middle', rating: 7, distance: 1.2 },
        { name: 'Austin High School', type: 'high', rating: 8, distance: 2.1 },
      ],
      estimatedValue: {
        estimatedValue: Math.round(property.price * (0.95 + Math.random() * 0.1)),
        lowEstimate: Math.round(property.price * 0.9),
        highEstimate: Math.round(property.price * 1.1),
        confidence: 'medium',
        lastUpdated: new Date().toISOString(),
      },
      priceHistory: [
        { date: property.created_at, price: property.price, event: 'listed' },
      ],
      taxHistory: property.tax_annual
        ? [
            { year: 2024, amount: property.tax_annual, assessedValue: Math.round(property.price * 0.85) },
            { year: 2023, amount: Math.round(property.tax_annual * 0.95), assessedValue: Math.round(property.price * 0.8) },
          ]
        : [],
    };
  }

  async getComparables(propertyId: string, limit = 5): Promise<Property[]> {
    const property = mockProperties.find((p) => p.id === propertyId);
    if (!property) return [];

    return mockProperties
      .filter(
        (p) =>
          p.id !== propertyId &&
          p.property_type === property.property_type &&
          Math.abs(p.price - property.price) / property.price < 0.3
      )
      .slice(0, limit);
  }

  async getPropertyValuation(propertyId: string): Promise<ValuationData | null> {
    const property = mockProperties.find((p) => p.id === propertyId);
    if (!property) return null;

    return {
      estimatedValue: Math.round(property.price * (0.95 + Math.random() * 0.1)),
      lowEstimate: Math.round(property.price * 0.9),
      highEstimate: Math.round(property.price * 1.1),
      confidence: 'medium',
      lastUpdated: new Date().toISOString(),
    };
  }

  async getNeighborhoodData(lat: number, lng: number): Promise<NeighborhoodData | null> {
    return {
      name: 'Central Austin',
      walkScore: 72,
      transitScore: 45,
      bikeScore: 65,
      medianHomeValue: 585000,
      medianRent: 2200,
      crimeRate: 'moderate',
      description: 'A vibrant urban neighborhood with excellent dining, nightlife, and cultural attractions. Close to downtown with good walkability.',
    };
  }

  private getMockNeighborhood(property: Property): NeighborhoodData {
    const neighborhoods: Record<string, NeighborhoodData> = {
      '78701': { name: 'Downtown Austin', walkScore: 92, transitScore: 62, bikeScore: 78, medianHomeValue: 650000, medianRent: 2800, crimeRate: 'moderate', description: 'The heart of Austin with world-class dining, entertainment, and tech companies.' },
      '78704': { name: 'South Austin', walkScore: 68, transitScore: 38, bikeScore: 72, medianHomeValue: 575000, medianRent: 2200, crimeRate: 'low', description: 'Eclectic neighborhood known for food trucks, live music, and Zilker Park access.' },
      '78703': { name: 'Tarrytown / West Austin', walkScore: 55, transitScore: 28, bikeScore: 52, medianHomeValue: 950000, medianRent: 3200, crimeRate: 'low', description: 'Established, affluent neighborhood with tree-lined streets and Lake Austin access.' },
      '78702': { name: 'East Austin', walkScore: 82, transitScore: 42, bikeScore: 80, medianHomeValue: 520000, medianRent: 2000, crimeRate: 'moderate', description: 'Rapidly developing area with craft breweries, galleries, and diverse dining.' },
    };
    return neighborhoods[property.zip] || {
      name: `${property.city} Area`,
      walkScore: 60,
      transitScore: 35,
      bikeScore: 50,
      medianHomeValue: 500000,
      medianRent: 2000,
      crimeRate: 'low',
      description: `A residential area in ${property.city} with good access to local amenities.`,
    };
  }
}
