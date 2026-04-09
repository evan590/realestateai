import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getProvider } from '@/lib/providers';
import { buildPropertyContext } from '@/lib/prompts';
import { Property } from '@/types';

const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) return null;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
};

export async function POST(request: NextRequest) {
  try {
    const { property, propertyId } = await request.json();

    // Get enriched property data from provider if we have an ID
    let propertyData = property as Property;
    if (propertyId) {
      try {
        const provider = getProvider();
        const enriched = await provider.getProperty(propertyId);
        if (enriched) propertyData = enriched;
      } catch {
        // Use passed property data as fallback
      }
    }

    if (!propertyData) {
      return NextResponse.json({ error: 'No property data provided' }, { status: 400 });
    }

    const openai = getOpenAIClient();

    if (!openai) {
      // Return mock analysis
      return NextResponse.json({
        analysis: generateMockAnalysis(propertyData),
      });
    }

    const context = buildPropertyContext(propertyData as any);

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: 'You are an AI real estate analyst. Provide comprehensive, data-driven property analysis. Be objective and highlight both positives and negatives.',
        },
        {
          role: 'user',
          content: `Analyze this property and provide a comprehensive AI assessment:\n\n${context}\n\nProvide:\n1. Value Assessment (is it priced fairly?)\n2. Key Strengths\n3. Potential Concerns/Red Flags\n4. Investment Potential\n5. Recommended Offer Strategy (if interested)\n6. Overall AI Rating (1-10) with brief explanation`,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
    });

    return NextResponse.json({
      analysis: response.choices[0].message.content || 'Unable to generate analysis.',
    });
  } catch (error) {
    console.error('AI Analyze Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate analysis' },
      { status: 500 }
    );
  }
}

function generateMockAnalysis(property: Property): string {
  const pricePerSqft = Math.round(property.price / property.sqft);

  return `## Value Assessment
This property is listed at $${property.price.toLocaleString()} ($${pricePerSqft}/sqft). Based on comparable sales in ${property.city}, ${property.state}, this appears to be ${pricePerSqft > 400 ? 'slightly above' : pricePerSqft > 300 ? 'in line with' : 'below'} market value.

## Key Strengths
• ${property.features.slice(0, 3).join('\n• ')}
• ${property.year_built > 2015 ? 'Newer construction with modern amenities' : 'Established property with character'}
• Location in ${property.city} provides good access to amenities

## Potential Concerns
${property.days_on_market && property.days_on_market > 45 ? '• Extended time on market may indicate pricing issues' : '• No major concerns identified'}
${property.year_built < 1990 ? '• Older construction may require system updates' : ''}
${property.hoa_fee && property.hoa_fee > 500 ? '• Higher HOA fees impact monthly costs' : ''}

## Investment Potential
${property.property_type === 'condo' ? 'Condos in this area typically appreciate 3-5% annually.' : 'Single-family homes in this area have shown strong appreciation, averaging 5-7% annually.'}

## Recommended Offer Strategy
${property.days_on_market && property.days_on_market > 30 ? `Given ${property.days_on_market} days on market, consider starting 5-8% below asking.` : 'Newer listing — consider a competitive offer at or near asking.'}

## Overall AI Rating: 7.5/10
Solid opportunity in the ${property.city} market with ${property.bedrooms}bd/${property.bathrooms}ba and ${property.sqft.toLocaleString()} sqft.`;
}
