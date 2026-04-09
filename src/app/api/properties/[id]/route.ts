import { NextRequest, NextResponse } from 'next/server';
import { getProvider } from '@/lib/providers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const provider = getProvider();

    const [property, comps] = await Promise.all([
      provider.getProperty(id),
      provider.getComparables(id),
    ]);

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Enrich with comps if not already included
    if (!property.comps?.length && comps.length) {
      property.comps = comps;
    }

    // Enrich with neighborhood if we have coordinates
    if (!property.neighborhood && property.lat && property.lng) {
      property.neighborhood = (await provider.getNeighborhoodData(property.lat, property.lng)) ?? undefined;
    }

    return NextResponse.json(property);
  } catch (error) {
    console.error('Property detail error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch property' },
      { status: 500 }
    );
  }
}
