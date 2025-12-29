// Agent System - Defines AI agent personalities and data

export interface Agent {
  id: string;
  name: string;
  avatar: string;
  color: string;
  gradientClass: string;
  personality: string;
  tagline: string;
  description: string;
  traits: string[];
  specialties: string[];
  style: string;
}

export interface AgentActivity {
  id: string;
  agentId: string;
  type: 'search' | 'analysis' | 'alert' | 'recommendation' | 'message' | 'update';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export const agents: Agent[] = [
  {
    id: 'alex',
    name: 'Alex',
    avatar: '🤖',
    color: '#3B82F6',
    gradientClass: 'from-blue-500 to-blue-600',
    personality: 'The Analyst',
    tagline: 'Data-driven decisions, zero guesswork',
    description: 'Alex excels at crunching numbers and finding hidden value. Perfect for investors and analytical buyers who want every decision backed by hard data.',
    traits: ['Highly analytical', 'Detail-oriented', 'Risk-aware', 'Market-focused'],
    specialties: ['Investment analysis', 'Comparable market analysis', 'ROI calculations', 'Risk assessment'],
    style: 'Straightforward and precise. Alex presents information with clear metrics and actionable insights.',
  },
  {
    id: 'jordan',
    name: 'Jordan',
    avatar: '🏠',
    color: '#10B981',
    gradientClass: 'from-emerald-500 to-emerald-600',
    personality: 'The Guide',
    tagline: 'Your patient partner through every step',
    description: 'Jordan specializes in guiding first-time buyers through the entire process. Patient, thorough, and always ready to explain things in plain English.',
    traits: ['Patient', 'Educational', 'Supportive', 'Thorough'],
    specialties: ['First-time buyer guidance', 'Process explanation', 'Neighborhood research', 'Lifestyle matching'],
    style: 'Warm and educational. Jordan breaks down complex topics and ensures you understand every step.',
  },
  {
    id: 'sam',
    name: 'Sam',
    avatar: '⚡',
    color: '#8B5CF6',
    gradientClass: 'from-purple-500 to-purple-600',
    personality: 'The Negotiator',
    tagline: 'Maximum value, minimum nonsense',
    description: 'Sam is laser-focused on getting you the best deal. Direct, strategic, and always looking for leverage points in every transaction.',
    traits: ['Strategic', 'Direct', 'Results-driven', 'Assertive'],
    specialties: ['Offer strategy', 'Negotiation tactics', 'Deal structuring', 'Closing optimization'],
    style: 'Confident and strategic. Sam cuts to the chase and focuses on winning you the best possible terms.',
  },
];

export function getAgentById(id: string): Agent | undefined {
  return agents.find((agent) => agent.id === id);
}

export function getDefaultAgent(): Agent {
  return agents[0]; // Alex is the default
}

// Mock activity data for demonstration
export function getMockActivities(agentId: string): AgentActivity[] {
  const now = new Date();
  const agent = getAgentById(agentId);
  if (!agent) return [];

  return [
    {
      id: '1',
      agentId,
      type: 'search',
      title: 'Found 3 new listings matching your criteria',
      description: 'Properties in Austin under $600k with 3+ bedrooms',
      timestamp: new Date(now.getTime() - 30 * 60 * 1000), // 30 mins ago
      read: false,
      actionUrl: '/dashboard/search',
      actionLabel: 'View Properties',
    },
    {
      id: '2',
      agentId,
      type: 'alert',
      title: 'Price drop on saved property',
      description: '2508 Wheless Lane reduced by $15,000',
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: false,
      actionUrl: '/dashboard/properties/1',
      actionLabel: 'View Property',
    },
    {
      id: '3',
      agentId,
      type: 'analysis',
      title: 'Market report ready',
      description: 'Austin housing market analysis for December 2024',
      timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000), // 5 hours ago
      read: true,
      actionUrl: '/dashboard/buyer-agent',
      actionLabel: 'View Report',
    },
    {
      id: '4',
      agentId,
      type: 'recommendation',
      title: 'Recommended: Schedule viewing',
      description: 'Based on your activity, 1847 Lynnbrook Dr might be a good fit',
      timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      actionUrl: '/dashboard/properties/3',
      actionLabel: 'View Property',
    },
    {
      id: '5',
      agentId,
      type: 'message',
      title: `${agent.name} has tips for your search`,
      description: 'Based on the homes you\'ve saved, I have some insights to share',
      timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      read: true,
      actionUrl: '/dashboard/buyer-agent',
      actionLabel: 'Chat with Agent',
    },
  ];
}

export function formatActivityTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) {
    return `${diffMins}m ago`;
  } else if (diffHours < 24) {
    return `${diffHours}h ago`;
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays}d ago`;
  } else {
    return date.toLocaleDateString();
  }
}

export function getActivityIcon(type: AgentActivity['type']): string {
  switch (type) {
    case 'search':
      return '🔍';
    case 'analysis':
      return '📊';
    case 'alert':
      return '🔔';
    case 'recommendation':
      return '💡';
    case 'message':
      return '💬';
    case 'update':
      return '📝';
    default:
      return '📌';
  }
}
