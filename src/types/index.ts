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

export interface PropertyDetail extends Property {
  neighborhood?: NeighborhoodData;
  schools?: SchoolData[];
  comps?: Property[];
  taxHistory?: TaxRecord[];
  priceHistory?: PriceRecord[];
  estimatedValue?: ValuationData;
  photoAttribution?: string;
}

export interface PropertySearchParams {
  query?: string;
  city?: string;
  state?: string;
  zip?: string;
  minPrice?: number;
  maxPrice?: number;
  minBeds?: number;
  maxBeds?: number;
  minBaths?: number;
  maxBaths?: number;
  minSqft?: number;
  maxSqft?: number;
  propertyType?: Property['property_type'][];
  status?: Property['status'];
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'sqft' | 'days_on_market';
  page?: number;
  limit?: number;
}

export interface PropertySearchResult {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface ValuationData {
  estimatedValue: number;
  lowEstimate: number;
  highEstimate: number;
  confidence: 'low' | 'medium' | 'high';
  lastUpdated: string;
}

export interface NeighborhoodData {
  name: string;
  walkScore?: number;
  transitScore?: number;
  bikeScore?: number;
  medianHomeValue?: number;
  medianRent?: number;
  crimeRate?: 'low' | 'moderate' | 'high';
  description?: string;
}

export interface SchoolData {
  name: string;
  type: 'elementary' | 'middle' | 'high';
  rating: number;
  distance: number;
}

export interface TaxRecord {
  year: number;
  amount: number;
  assessedValue: number;
}

export interface PriceRecord {
  date: string;
  price: number;
  event: 'listed' | 'sold' | 'price_change' | 'delisted';
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

// Seller types
export interface SellerListing {
  id: string;
  userId: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  propertyType: Property['property_type'];
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  yearBuilt: number;
  lotSize?: number;
  features: string[];
  description: string;
  photos: string[];
  askingPrice: number;
  aiSuggestedPrice?: number;
  status: 'draft' | 'active' | 'pending' | 'sold' | 'delisted';
  createdAt: string;
  updatedAt: string;
}

export interface Showing {
  id: string;
  listingId: string;
  buyerName: string;
  buyerEmail: string;
  scheduledAt: string;
  status: 'requested' | 'confirmed' | 'completed' | 'cancelled';
  feedback?: string;
}

export interface SellerOffer {
  id: string;
  listingId: string;
  buyerName: string;
  buyerEmail?: string;
  amount: number;
  terms: string;
  contingencies: string[];
  expiresAt: string;
  status: 'pending' | 'accepted' | 'countered' | 'rejected' | 'expired';
  aiAnalysis?: string;
  createdAt: string;
}

// Transaction types
export interface Transaction {
  id: string;
  propertyId: string;
  property?: Property;
  type: 'buying' | 'selling';
  status: 'offer_made' | 'under_contract' | 'inspection' | 'appraisal' | 'clear_to_close' | 'closed';
  offerAmount: number;
  closingDate?: string;
  stages: TransactionStage[];
  createdAt: string;
  updatedAt: string;
}

export interface TransactionStage {
  name: string;
  status: 'pending' | 'in_progress' | 'completed';
  completedAt?: string;
  notes?: string;
}
