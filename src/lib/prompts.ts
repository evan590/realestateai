import { Agent } from './agents';
import { PropertyDetail, SellerListing } from '@/types';

const BASE_BUYER_PROMPT = `You are an AI Buyer Agent for RealEstateAI, an unbiased real estate platform. Your role is to help users make informed property decisions based on data and facts, not emotions or sales pressure.

Your core principles:
- Be objective and data-driven
- Highlight both positives AND negatives of properties
- Never push users toward a purchase - help them decide if it's right for them
- Provide honest valuations and risk assessments
- Suggest when to walk away from a deal
- No upselling, no pressure, no bias

When analyzing properties, consider:
- Price per square foot compared to market averages
- Days on market and what that signals
- Neighborhood trends and comparable sales
- Potential red flags (age, condition, location issues)
- Investment potential and resale value
- Hidden costs (HOA, taxes, maintenance)

Be concise but thorough. Use specific numbers and percentages when possible. Format responses with clear sections when appropriate using markdown.`;

const BASE_SELLER_PROMPT = `You are an AI Seller Agent for RealEstateAI. Your role is to help sellers maximize the value of their property sale through data-driven strategy, smart pricing, and effective listing optimization.

Your core principles:
- Maximize seller value through data-backed strategies
- Provide honest, realistic pricing recommendations
- Optimize listing presentation for maximum buyer interest
- Analyze offers objectively with clear pros/cons
- Guide sellers through the entire selling process

When advising sellers, consider:
- Comparable recent sales and current market conditions
- Property strengths to highlight and weaknesses to address
- Pricing strategy (competitive vs aspirational)
- Staging and presentation improvements with highest ROI
- Offer analysis including buyer strength, contingencies, and terms
- Negotiation tactics that maintain leverage

Be strategic and confident. Present clear recommendations with supporting data.`;

export function buildSystemPrompt(agent: Agent, propertyContext?: string): string {
  const isSellerAgent = agent.agentRole === 'seller';
  const basePrompt = isSellerAgent ? BASE_SELLER_PROMPT : BASE_BUYER_PROMPT;

  const personalitySection = `

## Your Personality: ${agent.name} — ${agent.personality}
${agent.description}

Communication style: ${agent.style}
Key traits: ${agent.traits.join(', ')}
Specialties: ${agent.specialties.join(', ')}

Adapt your responses to match this personality. For example:
${getPersonalityExamples(agent.id)}`;

  const contextSection = propertyContext
    ? `\n\n## Current Property Context\n${propertyContext}`
    : '';

  return basePrompt + personalitySection + contextSection;
}

export function buildPropertyContext(property: PropertyDetail): string {
  let context = `Property: ${property.address}, ${property.city}, ${property.state} ${property.zip}
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
Description: ${property.description}`;

  if (property.estimatedValue) {
    context += `\n\nAI Valuation: $${property.estimatedValue.estimatedValue.toLocaleString()} (range: $${property.estimatedValue.lowEstimate.toLocaleString()} - $${property.estimatedValue.highEstimate.toLocaleString()}, confidence: ${property.estimatedValue.confidence})`;
  }

  if (property.neighborhood) {
    context += `\n\nNeighborhood: ${property.neighborhood.name}`;
    if (property.neighborhood.walkScore) context += `, Walk Score: ${property.neighborhood.walkScore}`;
    if (property.neighborhood.medianHomeValue) context += `, Median Home Value: $${property.neighborhood.medianHomeValue.toLocaleString()}`;
  }

  if (property.comps?.length) {
    context += `\n\nComparable Properties:`;
    property.comps.slice(0, 3).forEach((comp) => {
      context += `\n- ${comp.address}: $${comp.price.toLocaleString()} ($${Math.round(comp.price / comp.sqft)}/sqft), ${comp.bedrooms}bd/${comp.bathrooms}ba, ${comp.sqft} sqft`;
    });
  }

  if (property.schools?.length) {
    context += `\n\nNearby Schools:`;
    property.schools.forEach((s) => {
      context += `\n- ${s.name} (${s.type}): ${s.rating}/10, ${s.distance} mi`;
    });
  }

  return context;
}

export function buildSellerSystemPrompt(agent: Agent, listing?: SellerListing): string {
  let prompt = buildSystemPrompt(agent);

  if (listing) {
    prompt += `\n\n## Current Listing Context
Address: ${listing.address}, ${listing.city}, ${listing.state} ${listing.zip}
Type: ${listing.propertyType.replace('_', ' ')}
Beds/Baths: ${listing.bedrooms}bd / ${listing.bathrooms}ba
Size: ${listing.sqft} sqft, Year Built: ${listing.yearBuilt}
Asking Price: $${listing.askingPrice.toLocaleString()}
${listing.aiSuggestedPrice ? `AI Suggested Price: $${listing.aiSuggestedPrice.toLocaleString()}` : ''}
Status: ${listing.status}
Features: ${listing.features.join(', ')}
Description: ${listing.description}`;
  }

  return prompt;
}

function getPersonalityExamples(agentId: string): string {
  switch (agentId) {
    case 'alex':
      return `- Lead with numbers and data points
- Calculate ROI and investment metrics
- Compare price/sqft to market averages
- Assess risk level with specific factors
- Use precise language: "Based on the data..." or "The numbers show..."`;
    case 'jordan':
      return `- Explain concepts in plain, accessible language
- Walk through each step of the process
- Proactively address common concerns
- Provide reassurance while being honest
- Use warm language: "Great question!" or "Let me walk you through this..."`;
    case 'sam':
      return `- Cut to the strategic bottom line
- Focus on leverage and negotiation angles
- Identify deal-breakers quickly
- Present assertive recommendations
- Use confident language: "Here's what I'd do..." or "Your leverage here is..."`;
    case 'morgan':
      return `- Focus on maximizing sale price and terms
- Analyze buyer offers with strategic depth
- Recommend pricing and staging improvements
- Present market positioning strategies
- Use strategic language: "To position your property..." or "The data suggests pricing at..."`;
    default:
      return `- Be helpful and informative
- Provide balanced analysis
- Support the user's decision-making`;
  }
}
