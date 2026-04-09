import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { sqft, bedrooms, bathrooms, yearBuilt, city, state, propertyType } = data;

    // Mock pricing logic based on property attributes
    let basePricePerSqft = 350;
    if (state === 'CA') basePricePerSqft = 600;
    if (state === 'NY') basePricePerSqft = 500;
    if (yearBuilt > 2015) basePricePerSqft *= 1.1;
    if (yearBuilt < 1990) basePricePerSqft *= 0.85;
    if (propertyType === 'condo') basePricePerSqft *= 1.15;

    const suggestedPrice = Math.round((sqft * basePricePerSqft) / 5000) * 5000;

    return NextResponse.json({
      suggestedPrice,
      pricePerSqft: Math.round(suggestedPrice / sqft),
      reasoning: `Based on comparable ${propertyType?.replace('_', ' ') || 'properties'} in ${city || 'the area'}, ${state || 'US'} with ${bedrooms}bd/${bathrooms}ba, the suggested list price is $${suggestedPrice.toLocaleString()}.`,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to generate pricing' }, { status: 500 });
  }
}
