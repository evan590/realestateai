'use client';

import { useState, useEffect } from 'react';
import { ChatInterface } from '@/components/ai/ChatInterface';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { getAgentById, getDefaultAgent, agents } from '@/lib/agents';
import {
  getConversationsByAgent,
  deleteConversation,
  Conversation,
} from '@/lib/conversation-store';

export default function BuyerAgentPage() {
  const [selectedAgentId, setSelectedAgentId] = useState('alex');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | undefined>();
  const [convListKey, setConvListKey] = useState(0);

  // Load agent from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('selectedAgentId');
    if (saved) setSelectedAgentId(saved);
  }, []);

  // Load conversations when agent changes
  useEffect(() => {
    const convs = getConversationsByAgent(selectedAgentId);
    setConversations(convs);
  }, [selectedAgentId, convListKey]);

  const agent = getAgentById(selectedAgentId) || getDefaultAgent();
  const buyerAgents = agents.filter((a) => !(a as any).agentRole || (a as any).agentRole === 'buyer');

  const handleNewConversation = () => {
    setActiveConvId(undefined);
    setConvListKey((k) => k + 1);
  };

  const handleConversationCreated = (convId: string) => {
    setActiveConvId(convId);
    setConvListKey((k) => k + 1);
  };

  const handleDeleteConversation = (convId: string) => {
    deleteConversation(convId);
    if (activeConvId === convId) setActiveConvId(undefined);
    setConvListKey((k) => k + 1);
  };

  return (
    <div className="h-[calc(100vh-7rem)]">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Chat area */}
        <div className="lg:col-span-3 h-full">
          <Card className="h-full flex flex-col" padding="none">
            <CardHeader className="border-b border-slate-700/50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${agent.gradientClass} rounded-full flex items-center justify-center`}>
                  <span className="text-lg">{agent.avatar}</span>
                </div>
                <div>
                  <CardTitle>{agent.name} — {agent.personality}</CardTitle>
                  <p className="text-sm text-slate-400">{agent.tagline}</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-emerald-400 text-sm">Online</span>
                </div>
              </div>
            </CardHeader>
            <div className="flex-1 overflow-hidden">
              <ChatInterface
                key={activeConvId || 'new'}
                agentId={selectedAgentId}
                agentName={`${agent.name} — ${agent.personality}`}
                agentAvatar={agent.avatar}
                agentGradient={agent.gradientClass}
                conversationId={activeConvId}
                onConversationCreated={handleConversationCreated}
              />
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-7rem)]">
          {/* Agent Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Your Agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {buyerAgents.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => {
                      setSelectedAgentId(a.id);
                      localStorage.setItem('selectedAgentId', a.id);
                      setActiveConvId(undefined);
                    }}
                    className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                      a.id === selectedAgentId
                        ? 'bg-slate-700/50 border border-emerald-500/30'
                        : 'hover:bg-slate-700/30'
                    }`}
                  >
                    <div className={`w-8 h-8 bg-gradient-to-br ${a.gradientClass} rounded-full flex items-center justify-center`}>
                      <span className="text-sm">{a.avatar}</span>
                    </div>
                    <div className="text-left">
                      <p className="text-white text-sm font-medium">{a.name}</p>
                      <p className="text-slate-400 text-xs">{a.personality}</p>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Conversations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Conversations</CardTitle>
              <Button variant="ghost" size="sm" onClick={handleNewConversation}>
                + New
              </Button>
            </CardHeader>
            <CardContent>
              {conversations.length === 0 ? (
                <p className="text-slate-500 text-sm">No conversations yet. Start chatting!</p>
              ) : (
                <div className="space-y-1">
                  {conversations.slice(0, 10).map((conv) => (
                    <div
                      key={conv.id}
                      className={`group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                        conv.id === activeConvId ? 'bg-slate-700/50' : 'hover:bg-slate-700/30'
                      }`}
                      onClick={() => setActiveConvId(conv.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm truncate">{conv.title}</p>
                        <p className="text-slate-500 text-xs">
                          {conv.messages.length} messages
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteConversation(conv.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Capabilities */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Agent Capabilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {agent.specialties.map((s) => (
                  <li key={s} className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300">{s}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-800/50 border-slate-700">
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
                <span className="text-white font-medium">Pro Tip</span>
              </div>
              <p className="text-slate-400 text-sm">
                Share a property address and I&apos;ll provide a comprehensive
                analysis including fair value estimate, comparable sales, and negotiation strategy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
