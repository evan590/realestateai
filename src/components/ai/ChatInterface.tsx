'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { AIMessage } from '@/types';

interface ChatInterfaceProps {
  initialMessages?: AIMessage[];
  onSendMessage?: (message: string) => void;
  isLoading?: boolean;
  propertyContext?: string;
}

export function ChatInterface({
  initialMessages = [],
  onSendMessage,
  isLoading = false,
  propertyContext,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<AIMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          propertyContext,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: 'assistant',
          content: '',
          timestamp: new Date().toISOString(),
        },
      ]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          assistantMessage += chunk;

          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: assistantMessage } : m
            )
          );
        }
      }
    } catch (error) {
      // Use mock response if API fails
      const mockResponse = getMockResponse(input);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: mockResponse,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const suggestedQuestions = [
    'What should I look for in a first home?',
    'How do I know if a property is overpriced?',
    'What questions should I ask during a showing?',
    'How do I make a competitive offer?',
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Buyer Agent</h3>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              I&apos;m your unbiased real estate AI assistant. Ask me anything about buying property,
              market analysis, or get advice on specific listings.
            </p>

            {/* Suggested questions */}
            <div className="flex flex-wrap justify-center gap-2">
              {suggestedQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => setInput(question)}
                  className="px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-full transition-colors"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-slate-800 text-slate-200'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">AI</span>
                    </div>
                    <span className="text-emerald-400 text-xs font-medium">Buyer Agent</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                  {message.content}
                  {isStreaming && message.role === 'assistant' && message.id === messages[messages.length - 1].id && (
                    <span className="inline-block w-2 h-4 ml-1 bg-emerald-400 animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-700/50 p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="flex-1 relative">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about properties, market trends, or get buying advice..."
              rows={1}
              className="resize-none min-h-[44px] max-h-32 pr-12"
              disabled={isStreaming}
            />
          </div>
          <Button
            type="submit"
            disabled={!input.trim() || isStreaming}
            className="px-4"
          >
            {isStreaming ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </Button>
        </form>
        <p className="text-xs text-slate-500 mt-2 text-center">
          AI provides analysis for informational purposes. Always verify important details independently.
        </p>
      </div>
    </div>
  );
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

**Common Mistakes to Avoid**
• Don't max out your budget - leave room for unexpected costs
• Don't skip the inspection to win a bid
• Don't let emotions override data

Would you like me to elaborate on any of these points?`;
  }

  if (lowercaseInput.includes('overpriced') || lowercaseInput.includes('price')) {
    return `Here's how to evaluate if a property is fairly priced:

**Compare Price Per Square Foot**
• Look at recent sales (last 6 months) within 0.5 miles
• Properties should be similar in age, condition, and features
• Austin average is around $350-400/sqft depending on area

**Check Days on Market**
• 30+ days may indicate overpricing
• 60+ days is a strong negotiation signal
• Below 14 days suggests high demand or fair pricing

**Red Flags for Overpricing**
• Price increases after listing
• Multiple price reductions
• Priced significantly above comparable sales
• Seller unwilling to negotiate

**Market Conditions**
• In buyer's markets, expect 5-10% below asking
• In seller's markets, expect to pay at or above asking

Want me to analyze a specific property for you?`;
  }

  if (lowercaseInput.includes('offer') || lowercaseInput.includes('bid')) {
    return `Here's my strategy for making competitive offers:

**Before Making an Offer**
• Get fully pre-approved (not just pre-qualified)
• Understand the seller's motivation
• Research comparable sales

**Offer Strategy**
• In competitive markets: offer at or slightly above asking
• Properties 30+ days on market: start 5-8% below
• Properties 60+ days: start 10-15% below

**Strengthen Your Offer Without Overpaying**
• Larger earnest money deposit (1-3% shows commitment)
• Flexible closing timeline
• Minimize contingencies (if comfortable)
• Write a personal letter (some sellers appreciate it)

**Know Your Walk-Away Point**
• Set a maximum price before negotiating
• Factor in repair costs from inspection
• Don't let emotions push you past your limit

Would you like help analyzing a specific property to determine an offer strategy?`;
  }

  return `I'm your AI Buyer Agent, here to help you make informed real estate decisions without bias or pressure.

I can help you with:
• **Property Analysis** - Evaluate listings for fair pricing and red flags
• **Market Insights** - Understand local trends and timing
• **Offer Strategy** - Craft competitive bids without overpaying
• **Due Diligence** - Know what to look for in inspections
• **Financial Planning** - Understand true costs of ownership

Ask me anything specific about buying property, or share a listing you'd like me to analyze!`;
}
