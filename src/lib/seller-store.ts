'use client';

import { SellerListing, Showing, SellerOffer } from '@/types';

const LISTINGS_KEY = 'realestateai_seller_listings';
const SHOWINGS_KEY = 'realestateai_showings';
const OFFERS_KEY = 'realestateai_offers';

function getStorage<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function setStorage<T>(key: string, data: T[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(data));
}

// Listings
export function getListings(): SellerListing[] {
  return getStorage<SellerListing>(LISTINGS_KEY);
}

export function getListing(id: string): SellerListing | null {
  return getListings().find((l) => l.id === id) || null;
}

export function createListing(listing: Omit<SellerListing, 'id' | 'createdAt' | 'updatedAt'>): SellerListing {
  const newListing: SellerListing = {
    ...listing,
    id: `listing-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const listings = getListings();
  listings.push(newListing);
  setStorage(LISTINGS_KEY, listings);
  return newListing;
}

export function updateListing(id: string, updates: Partial<SellerListing>): SellerListing | null {
  const listings = getListings();
  const idx = listings.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  listings[idx] = { ...listings[idx], ...updates, updatedAt: new Date().toISOString() };
  setStorage(LISTINGS_KEY, listings);
  return listings[idx];
}

export function deleteListing(id: string): void {
  setStorage(LISTINGS_KEY, getListings().filter((l) => l.id !== id));
}

// Showings
export function getShowings(listingId?: string): Showing[] {
  const showings = getStorage<Showing>(SHOWINGS_KEY);
  return listingId ? showings.filter((s) => s.listingId === listingId) : showings;
}

export function createShowing(showing: Omit<Showing, 'id'>): Showing {
  const newShowing: Showing = { ...showing, id: `showing-${Date.now()}` };
  const showings = getStorage<Showing>(SHOWINGS_KEY);
  showings.push(newShowing);
  setStorage(SHOWINGS_KEY, showings);
  return newShowing;
}

export function updateShowing(id: string, updates: Partial<Showing>): void {
  const showings = getStorage<Showing>(SHOWINGS_KEY);
  const idx = showings.findIndex((s) => s.id === id);
  if (idx !== -1) {
    showings[idx] = { ...showings[idx], ...updates };
    setStorage(SHOWINGS_KEY, showings);
  }
}

// Offers
export function getOffers(listingId?: string): SellerOffer[] {
  const offers = getStorage<SellerOffer>(OFFERS_KEY);
  return listingId ? offers.filter((o) => o.listingId === listingId) : offers;
}

export function createOffer(offer: Omit<SellerOffer, 'id' | 'createdAt'>): SellerOffer {
  const newOffer: SellerOffer = { ...offer, id: `offer-${Date.now()}`, createdAt: new Date().toISOString() };
  const offers = getStorage<SellerOffer>(OFFERS_KEY);
  offers.push(newOffer);
  setStorage(OFFERS_KEY, offers);
  return newOffer;
}

export function updateOffer(id: string, updates: Partial<SellerOffer>): void {
  const offers = getStorage<SellerOffer>(OFFERS_KEY);
  const idx = offers.findIndex((o) => o.id === id);
  if (idx !== -1) {
    offers[idx] = { ...offers[idx], ...updates };
    setStorage(OFFERS_KEY, offers);
  }
}

// Mock data for demo
export function seedMockSellerData(): void {
  if (getListings().length > 0) return; // Already seeded

  const mockListings: SellerListing[] = [
    {
      id: 'listing-demo-1',
      userId: 'demo-user',
      address: '742 Evergreen Terrace',
      city: 'Austin',
      state: 'TX',
      zip: '78704',
      propertyType: 'single_family',
      bedrooms: 4,
      bathrooms: 2.5,
      sqft: 2200,
      yearBuilt: 2015,
      lotSize: 7500,
      features: ['Updated Kitchen', 'Hardwood Floors', 'Backyard', 'Garage', 'Smart Home'],
      description: 'Beautiful family home in South Austin with modern updates and a spacious backyard.',
      photos: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
      ],
      askingPrice: 625000,
      aiSuggestedPrice: 615000,
      status: 'active',
      createdAt: '2024-01-10T10:00:00Z',
      updatedAt: '2024-01-10T10:00:00Z',
    },
  ];

  const mockShowings: Showing[] = [
    {
      id: 'showing-demo-1',
      listingId: 'listing-demo-1',
      buyerName: 'Sarah Johnson',
      buyerEmail: 'sarah@email.com',
      scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'confirmed',
    },
    {
      id: 'showing-demo-2',
      listingId: 'listing-demo-1',
      buyerName: 'Mike Chen',
      buyerEmail: 'mike@email.com',
      scheduledAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'requested',
    },
  ];

  const mockOffers: SellerOffer[] = [
    {
      id: 'offer-demo-1',
      listingId: 'listing-demo-1',
      buyerName: 'Emily Rodriguez',
      buyerEmail: 'emily@email.com',
      amount: 600000,
      terms: 'Conventional 30-year, 20% down, closing in 45 days',
      contingencies: ['Inspection', 'Appraisal', 'Financing'],
      expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'pending',
      aiAnalysis: 'Solid offer at 96% of asking price. Conventional financing with 20% down indicates strong buyer. Three standard contingencies. Recommended: counter at $615,000 or accept with shorter closing timeline.',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  setStorage(LISTINGS_KEY, mockListings);
  setStorage(SHOWINGS_KEY, mockShowings);
  setStorage(OFFERS_KEY, mockOffers);
}
