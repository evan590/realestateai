'use client';

import { useState, useEffect } from 'react';
import { ChatInterface } from '@/components/ai/ChatInterface';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getAgentById } from '@/lib/agents';
import { getConversationsByAgent, deleteConversation, Conversation } from '@/lib/conversation-store';
import { AgentAvatar } from '@/components/ui/AgentAvatar';
import { Check, X } from '@/lib/icons';

export default function SellerChatPage() {
  const agent = getAgentById('morgan')!;
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | undefined>();
  const [convListKey, setConvListKey] = useState(0);

  useEffect(() => {
    setConversations(getConversationsByAgent('morgan'));
  }, [convListKey]);

  return (
    <div className="h-[calc(100vh-7rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Chat area */}
        <div className="lg:col-span-3 h-full">
          <Card className="h-full flex flex-col" padding="none">
            <CardHeader className="border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <AgentAvatar agentId="morgan" size="lg" />
                <div>
                  <CardTitle>{agent.name} — {agent.personality}</CardTitle>
                  <p className="text-sm text-slate-400">{agent.tagline}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                  <span className="text-amber-400 text-sm">Online</span>
                </div>
              </div>
            </CardHeader>
            <div className="flex-1 overflow-hidden">
              <ChatInterface
                key={activeConvId || 'new'}
                agentId="morgan"
                agentName={`${agent.name} — ${agent.personality}`}
                agentAvatar={agent.avatar}
                agentGradient={agent.gradientClass}
                conversationId={activeConvId}
                onConversationCreated={(id) => { setActiveConvId(id); setConvListKey((k) => k + 1); }}
              />
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:flex flex-col gap-4">
          {/* Conversations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Conversations</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => { setActiveConvId(undefined); setConvListKey((k) => k + 1); }}>
                + New
              </Button>
            </CardHeader>
            <CardContent>
              {conversations.length === 0 ? (
                <p className="text-slate-500 text-sm">Start a conversation with Morgan!</p>
              ) : (
                <div className="space-y-1">
                  {conversations.slice(0, 10).map((conv) => (
                    <div
                      key={conv.id}
                      className={`group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                        conv.id === activeConvId ? 'bg-white/5' : 'hover:bg-white/5'
                      }`}
                      onClick={() => setActiveConvId(conv.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">{conv.title}</p>
                        <p className="text-slate-500 text-xs">{conv.messages.length} messages</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); deleteConversation(conv.id); setConvListKey((k) => k + 1); }}
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Capabilities */}
          <Card>
            <CardHeader><CardTitle className="text-base">Seller Agent Capabilities</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {agent.specialties.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{s}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-amber-500/20">
            <CardContent>
              <p className="text-slate-300 text-sm">
                Ask Morgan about pricing strategy, staging tips, offer analysis, or any selling question!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
