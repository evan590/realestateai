'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Input';
import { AIMessage } from '@/types';
import {
  Conversation,
  createConversation,
  addMessage,
  updateConversationMessage,
  getConversation,
} from '@/lib/conversation-store';

interface ChatInterfaceProps {
  agentId?: string;
  agentName?: string;
  agentAvatar?: string;
  agentGradient?: string;
  conversationId?: string;
  propertyId?: string;
  propertyContext?: string;
  onConversationCreated?: (conversationId: string) => void;
}

export function ChatInterface({
  agentId = 'alex',
  agentName = 'AI Agent',
  agentAvatar = '🤖',
  agentGradient = 'from-emerald-400 to-cyan-500',
  conversationId,
  propertyId,
  propertyContext,
  onConversationCreated,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentConvId, setCurrentConvId] = useState(conversationId);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Load conversation messages
  useEffect(() => {
    if (conversationId) {
      const conv = getConversation(conversationId);
      if (conv) {
        setMessages(conv.messages);
        setCurrentConvId(conversationId);
      }
    } else {
      setMessages([]);
      setCurrentConvId(undefined);
    }
  }, [conversationId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const ensureConversation = useCallback((): string => {
    if (currentConvId) return currentConvId;
    const conv = createConversation(agentId, propertyId);
    setCurrentConvId(conv.id);
    onConversationCreated?.(conv.id);
    return conv.id;
  }, [currentConvId, agentId, propertyId, onConversationCreated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;

    const convId = ensureConversation();

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    addMessage(convId, userMessage);
    setInput('');
    setIsStreaming(true);

    const assistantId = (Date.now() + 1).toString();

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          agentId,
          propertyId,
          propertyContext,
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: 'assistant', content: '', timestamp: new Date().toISOString() },
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

      // Save final assistant message
      const finalMsg: AIMessage = {
        id: assistantId,
        role: 'assistant',
        content: assistantMessage,
        timestamp: new Date().toISOString(),
      };
      addMessage(convId, finalMsg);
    } catch {
      const mockResponse = getFallbackResponse(input);
      const errorMsg: AIMessage = {
        id: assistantId,
        role: 'assistant',
        content: mockResponse,
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => {
        const existing = prev.find((m) => m.id === assistantId);
        if (existing) {
          return prev.map((m) => (m.id === assistantId ? errorMsg : m));
        }
        return [...prev, errorMsg];
      });
      addMessage(convId, errorMsg);
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
            <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${agentGradient} rounded-full flex items-center justify-center`}>
              <span className="text-2xl">{agentAvatar}</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">{agentName}</h3>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              I&apos;m your AI real estate assistant. Ask me anything about buying or selling property,
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
                    <div className={`w-6 h-6 bg-gradient-to-br ${agentGradient} rounded-full flex items-center justify-center`}>
                      <span className="text-xs">{agentAvatar}</span>
                    </div>
                    <span className="text-emerald-400 text-xs font-medium">{agentName}</span>
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

function getFallbackResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('first home') || lower.includes('first-time')) {
    return `Here's what first-time buyers should focus on:\n\n• Get pre-approved for a mortgage\n• Aim for 20% down to avoid PMI\n• Location over cosmetics\n• Always get a home inspection\n• Don't max out your budget\n\nWould you like me to elaborate on any of these?`;
  }
  if (lower.includes('price') || lower.includes('overpriced')) {
    return `To evaluate pricing:\n\n• Compare price/sqft to recent sales nearby\n• Check days on market (30+ may signal overpricing)\n• Look for price reductions in listing history\n• Consider condition relative to comps\n\nWant me to analyze a specific property?`;
  }
  return `I'm your AI Real Estate Agent. I can help with:\n\n• Property Analysis & Valuations\n• Market Insights & Trends\n• Offer Strategy\n• Selling Strategy\n• Due Diligence\n\nAsk me anything specific!`;
}
