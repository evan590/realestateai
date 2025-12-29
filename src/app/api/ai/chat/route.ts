import { NextRequest } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client only when API key is available
const getOpenAIClient = () => {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
};

const BUYER_AGENT_SYSTEM_PROMPT = `You are an AI Buyer Agent for RealEstateAI, an unbiased real estate platform. Your role is to help users make informed property decisions based on data and facts, not emotions or sales pressure.

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

export async function POST(request: NextRequest) {
  try {
    const { messages, propertyContext } = await request.json();

    const openai = getOpenAIClient();

    // Check if OpenAI API key is configured
    if (!openai) {
      // Return a mock streaming response if no API key
      return new Response(
        getMockResponse(messages[messages.length - 1]?.content || ''),
        {
          headers: {
            'Content-Type': 'text/plain',
          },
        }
      );
    }

    const contextMessage = propertyContext
      ? `\n\nCurrent property context:\n${propertyContext}`
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

    // Create a readable stream from the OpenAI response
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

    // Return mock response on error
    return new Response(
      'I apologize, but I\'m having trouble connecting right now. Please try again in a moment, or check that the OpenAI API key is configured in your environment variables.',
      {
        status: 200,
        headers: {
          'Content-Type': 'text/plain',
        },
      }
    );
  }
}

function getMockResponse(input: string): string {
  const lowercaseInput = input.toLowerCase();

  if (lowercaseInput.includes('first home') || lowercaseInput.includes('first-time')) {
    return `Great question! Here's what first-time buyers should focus on:

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
    return `Here's how to evaluate if a property is fairly priced:

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

  return `I'm your AI Buyer Agent, here to help you make informed real estate decisions.

I can help you with:
• **Property Analysis** - Evaluate listings for fair pricing and red flags
• **Market Insights** - Understand local trends and timing
• **Offer Strategy** - Craft competitive bids without overpaying
• **Due Diligence** - Know what to look for in inspections

Ask me anything specific about buying property, or share a listing you'd like me to analyze!`;
}
