import { NextRequest, NextResponse } from 'next/server';
import { getProvider } from '@/lib/providers';
import { PropertySearchParams } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const params: PropertySearchParams = {
      query: searchParams.get('query') || undefined,
      city: searchParams.get('city') || undefined,
      state: searchParams.get('state') || undefined,
      zip: searchParams.get('zip') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      minBeds: searchParams.get('minBeds') ? Number(searchParams.get('minBeds')) : undefined,
      maxBeds: searchParams.get('maxBeds') ? Number(searchParams.get('maxBeds')) : undefined,
      minBaths: searchParams.get('minBaths') ? Number(searchParams.get('minBaths')) : undefined,
      maxBaths: searchParams.get('maxBaths') ? Number(searchParams.get('maxBaths')) : undefined,
      minSqft: searchParams.get('minSqft') ? Number(searchParams.get('minSqft')) : undefined,
      maxSqft: searchParams.get('maxSqft') ? Number(searchParams.get('maxSqft')) : undefined,
      propertyType: searchParams.get('propertyType')
        ? (searchParams.get('propertyType')!.split(',') as PropertySearchParams['propertyType'])
        : undefined,
      sort: (searchParams.get('sort') as PropertySearchParams['sort']) || 'newest',
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 20,
    };

    const provider = getProvider();
    const result = await provider.searchProperties(params);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Property search error:', error);
    return NextResponse.json(
      { error: 'Failed to search properties' },
      { status: 500 }
    );
  }
}
