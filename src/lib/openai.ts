import OpenAI from 'openai';
import { Property } from '@/types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const BUYER_AGENT_SYSTEM_PROMPT = `You are an AI Buyer Agent for RealEstateAI, an unbiased real estate platform. Your role is to help users make informed property decisions based on data and facts, not emotions or sales pressure.

Your core principles:
- Be objective and data-driven
- Highlight both positives AND negatives of properties
- Never push users toward a purchase - help them decide if it's right for them
- Provide honest valuations and risk assessments
- Suggest when to walk away from a deal

When analyzing properties, consider:
- Price per square foot compared to market averages
- Days on market and what that signals
- Neighborhood trends and comparable sales
- Potential red flags (age, condition, location issues)
- Investment potential and resale value
- Hidden costs (HOA, taxes, maintenance)

Be concise but thorough. Use specific numbers and percentages when possible. Format responses with clear sections when appropriate.`;

export async function streamBuyerAgentResponse(
  messages: { role: 'user' | 'assistant'; content: string }[],
  propertyContext?: Property
) {
  const contextMessage = propertyContext
    ? `\n\nCurrent property context:\n${JSON.stringify(propertyContext, null, 2)}`
    : '';

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: BUYER_AGENT_SYSTEM_PROMPT + contextMessage },
      ...messages,
    ],
    stream: true,
    temperature: 0.7,
    max_tokens: 1000,
  });

  return response;
}

export async function getPropertyAnalysis(property: Property): Promise<string> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: BUYER_AGENT_SYSTEM_PROMPT },
      {
        role: 'user',
        content: `Analyze this property and provide a comprehensive AI assessment:

Property: ${property.address}, ${property.city}, ${property.state} ${property.zip}
Price: $${property.price.toLocaleString()}
Beds/Baths: ${property.bedrooms}bd / ${property.bathrooms}ba
Size: ${property.sqft.toLocaleString()} sqft
Year Built: ${property.year_built}
Type: ${property.property_type.replace('_', ' ')}
Days on Market: ${property.days_on_market || 'Unknown'}
Price/sqft: $${property.price_per_sqft || Math.round(property.price / property.sqft)}
HOA: ${property.hoa_fee ? `$${property.hoa_fee}/mo` : 'None'}
Annual Taxes: ${property.tax_annual ? `$${property.tax_annual.toLocaleString()}` : 'Unknown'}

Features: ${property.features.join(', ')}

Description: ${property.description}

Provide:
1. Value Assessment (is it priced fairly?)
2. Key Strengths
3. Potential Concerns/Red Flags
4. Investment Potential
5. Recommended Offer Strategy (if interested)
6. Overall AI Rating (1-10) with brief explanation`,
      },
    ],
    temperature: 0.7,
    max_tokens: 1500,
  });

  return response.choices[0].message.content || 'Unable to generate analysis.';
}

export { openai };
