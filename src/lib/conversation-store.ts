'use client';

import { AIMessage } from '@/types';

export interface Conversation {
  id: string;
  agentId: string;
  propertyId?: string;
  title: string;
  messages: AIMessage[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'realestateai_conversations';

function getConversations(): Conversation[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveConversations(conversations: Conversation[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
}

export function getConversationsByAgent(agentId: string): Conversation[] {
  return getConversations()
    .filter((c) => c.agentId === agentId)
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export function getConversation(id: string): Conversation | null {
  return getConversations().find((c) => c.id === id) || null;
}

export function createConversation(agentId: string, propertyId?: string): Conversation {
  const conversation: Conversation = {
    id: `conv-${Date.now()}`,
    agentId,
    propertyId,
    title: 'New Conversation',
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const conversations = getConversations();
  conversations.push(conversation);
  saveConversations(conversations);
  return conversation;
}

export function addMessage(conversationId: string, message: AIMessage): void {
  const conversations = getConversations();
  const conv = conversations.find((c) => c.id === conversationId);
  if (!conv) return;

  conv.messages.push(message);
  conv.updatedAt = new Date().toISOString();

  // Update title from first user message
  if (conv.title === 'New Conversation' && message.role === 'user') {
    conv.title = message.content.slice(0, 50) + (message.content.length > 50 ? '...' : '');
  }

  saveConversations(conversations);
}

export function updateConversationMessage(conversationId: string, messageId: string, content: string): void {
  const conversations = getConversations();
  const conv = conversations.find((c) => c.id === conversationId);
  if (!conv) return;

  const msg = conv.messages.find((m) => m.id === messageId);
  if (msg) {
    msg.content = content;
    conv.updatedAt = new Date().toISOString();
    saveConversations(conversations);
  }
}

export function deleteConversation(id: string): void {
  const conversations = getConversations().filter((c) => c.id !== id);
  saveConversations(conversations);
}
