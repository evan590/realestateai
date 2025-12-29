export interface Property {
  id: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lot_size?: number;
  year_built: number;
  property_type: 'single_family' | 'condo' | 'townhouse' | 'multi_family' | 'land';
  status: 'for_sale' | 'pending' | 'sold';
  description: string;
  images: string[];
  features: string[];
  lat: number;
  lng: number;
  days_on_market?: number;
  price_per_sqft?: number;
  hoa_fee?: number;
  tax_annual?: number;
  created_at: string;
}

export interface SavedProperty {
  id: string;
  user_id: string;
  property_id: string;
  notes?: string;
  created_at: string;
  property?: Property;
}

export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export interface AISession {
  id: string;
  user_id: string;
  property_id?: string;
  messages: AIMessage[];
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface PropertyFilters {
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  maxBeds?: number;
  minBaths?: number;
  maxBaths?: number;
  minSqft?: number;
  maxSqft?: number;
  propertyType?: Property['property_type'][];
  city?: string;
  state?: string;
}
