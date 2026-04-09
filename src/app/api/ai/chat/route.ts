import { NextRequest } from 'next/server';
import OpenAI from 'openai';
import { getAgentById, getDefaultAgent } from '@/lib/agents';
import { buildSystemPrompt, buildPropertyContext } from '@/lib/prompts';
import { getProvider } from '@/lib/providers';

const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) return null;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
};

export async function POST(request: NextRequest) {
  try {
    const { messages, propertyContext, agentId, propertyId } = await request.json();

    const agent = (agentId ? getAgentById(agentId) : null) || getDefaultAgent();

    // Build property context from provider if propertyId is given
    let enrichedContext = propertyContext || '';
    if (propertyId && !enrichedContext) {
      try {
        const provider = getProvider();
        const property = await provider.getProperty(propertyId);
        if (property) {
          enrichedContext = buildPropertyContext(property);
        }
      } catch {
        // Continue without enriched context
      }
    }

    const systemPrompt = buildSystemPrompt(agent, enrichedContext || undefined);

    const openai = getOpenAIClient();

    if (!openai) {
      return new Response(
        getMockResponse(messages[messages.length - 1]?.content || '', agent.id),
        { headers: { 'Content-Type': 'text/plain' } }
      );
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 1000,
    });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('AI Chat Error:', error);
    return new Response(
      'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.',
      { status: 200, headers: { 'Content-Type': 'text/plain' } }
    );
  }
}

function getMockResponse(input: string, agentId: string): string {
  const lowercaseInput = input.toLowerCase();

  const agentIntros: Record<string, string> = {
    alex: "Let me run the numbers on that.",
    jordan: "Great question! Let me walk you through this.",
    sam: "Here's the strategic play.",
    morgan: "Let me help you maximize your position.",
  };

  const intro = agentIntros[agentId] || '';

  if (lowercaseInput.includes('first home') || lowercaseInput.includes('first-time')) {
    return `${intro ? intro + '\n\n' : ''}Here's what first-time buyers should focus on:

**Financial Preparation**
• Get pre-approved for a mortgage before house hunting
• Aim for a 20% down payment to avoid PMI (though 3-5% is possible)
• Factor in closing costs (2-5% of purchase price)

**Property Priorities**
• Location over cosmetics - you can update a kitchen, not a neighborhood
• Check the "bones" - roof, HVAC, plumbing, electrical
• Consider future resale value

**Due Diligence**
• Always get a home inspection
• Research the neighborhood at different times of day
• Review HOA rules if applicable

Would you like me to elaborate on any of these points?`;
  }

  if (lowercaseInput.includes('overpriced') || lowercaseInput.includes('price')) {
    return `${intro ? intro + '\n\n' : ''}Here's how to evaluate if a property is fairly priced:

**Compare Price Per Square Foot**
• Look at recent sales (last 6 months) within 0.5 miles
• Properties should be similar in age, condition, and features

**Check Days on Market**
• 30+ days may indicate overpricing
• 60+ days is a strong negotiation signal

**Red Flags for Overpricing**
• Price increases after listing
• Multiple price reductions
• Priced significantly above comparable sales

Want me to analyze a specific property for you?`;
  }

  if (lowercaseInput.includes('sell') || lowercaseInput.includes('listing') || lowercaseInput.includes('list my')) {
    return `${intro ? intro + '\n\n' : ''}I can help you with your selling strategy:

**Pricing Strategy**
• I'll analyze comparable sales to find the optimal listing price
• We'll consider market conditions, seasonality, and competition

**Listing Optimization**
• Professional photos and staging recommendations
• Compelling description that highlights key selling points
• Feature emphasis based on what buyers in your market value most

**Offer Management**
• I'll analyze each offer considering price, terms, and buyer strength
• Strategic counter-offer recommendations
• Timeline optimization

What's the address of the property you're looking to sell?`;
  }

  return `${intro ? intro + '\n\n' : ''}I'm your AI Real Estate Agent, here to help you make informed decisions.

I can help you with:
• **Property Analysis** - Evaluate listings for fair pricing and red flags
• **Market Insights** - Understand local trends and timing
• **Offer Strategy** - Craft competitive bids without overpaying
• **Selling Strategy** - Price, list, and negotiate for maximum value
• **Due Diligence** - Know what to look for in inspections

Ask me anything specific, or share a listing you'd like me to analyze!`;
}
