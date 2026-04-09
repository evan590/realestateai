import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { offer, listing } = await request.json();

    const offerPercent = listing?.askingPrice ? Math.round((offer.amount / listing.askingPrice) * 100) : 0;
    const contingencyCount = offer.contingencies?.length || 0;

    let strength = 'moderate';
    let recommendation = 'counter';

    if (offerPercent >= 98 && contingencyCount <= 2) {
      strength = 'strong';
      recommendation = 'accept';
    } else if (offerPercent >= 95) {
      strength = 'good';
      recommendation = 'accept or counter slightly';
    } else if (offerPercent < 90) {
      strength = 'weak';
      recommendation = 'counter significantly or reject';
    }

    const analysis = `**Offer Strength: ${strength.charAt(0).toUpperCase() + strength.slice(1)}**

This offer at $${offer.amount?.toLocaleString()} represents ${offerPercent}% of your asking price ($${listing?.askingPrice?.toLocaleString()}).

**Terms Analysis:**
- ${offer.terms || 'Standard terms'}
- ${contingencyCount} contingencies: ${offer.contingencies?.join(', ') || 'None'}

**Recommendation:** ${recommendation.charAt(0).toUpperCase() + recommendation.slice(1)}
${offerPercent < 95 ? `Consider countering at $${Math.round((listing?.askingPrice * 0.97) / 1000) * 1000} (97% of asking).` : 'This is a competitive offer worth serious consideration.'}`;

    return NextResponse.json({ analysis, strength, recommendation });
  } catch {
    return NextResponse.json({ error: 'Failed to analyze offer' }, { status: 500 });
  }
}
