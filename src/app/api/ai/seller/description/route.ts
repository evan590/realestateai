import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { address, city, state, bedrooms, bathrooms, sqft, yearBuilt, propertyType, features } = data;

    const featureList = (features || []).slice(0, 5).join(', ');
    const typeLabel = (propertyType || 'home').replace('_', ' ');

    const description = `Welcome to ${address || 'this beautiful property'} — a stunning ${bedrooms}-bedroom, ${bathrooms}-bathroom ${typeLabel} in the heart of ${city || 'the city'}, ${state || 'US'}. This ${sqft?.toLocaleString() || ''} square foot home, built in ${yearBuilt || 'recent years'}, offers the perfect blend of modern comfort and timeless appeal.

Step inside to discover ${featureList ? `standout features including ${featureList}` : 'thoughtfully designed living spaces'}. The open-concept layout creates an inviting atmosphere perfect for both everyday living and entertaining. Natural light fills every room, highlighting the quality finishes throughout.

Located in one of ${city || "the area"}'s most sought-after neighborhoods, you'll enjoy easy access to top-rated schools, dining, shopping, and recreation. Whether you're a growing family, a young professional, or looking for your next investment, this property checks all the boxes.

Don't miss this opportunity — schedule your showing today!`;

    return NextResponse.json({ description });
  } catch {
    return NextResponse.json({ error: 'Failed to generate description' }, { status: 500 });
  }
}
