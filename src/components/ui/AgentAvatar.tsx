'use client';

import { agentIcons, Bot, type LucideIcon } from '@/lib/icons';

interface AgentAvatarProps {
  agentId: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  gradient?: string;
  className?: string;
}

const sizes = {
  sm: { container: 'w-6 h-6', icon: 'w-3 h-3' },
  md: { container: 'w-8 h-8', icon: 'w-4 h-4' },
  lg: { container: 'w-10 h-10', icon: 'w-5 h-5' },
  xl: { container: 'w-16 h-16', icon: 'w-8 h-8' },
};

export function AgentAvatar({ agentId, size = 'md', gradient, className = '' }: AgentAvatarProps) {
  const Icon = agentIcons[agentId] || Bot;
  const s = sizes[size];

  const defaultGradients: Record<string, string> = {
    alex: 'from-blue-500 to-blue-600',
    jordan: 'from-emerald-500 to-emerald-600',
    sam: 'from-purple-500 to-purple-600',
    morgan: 'from-amber-500 to-orange-600',
  };

  const gradientClass = gradient || defaultGradients[agentId] || 'from-emerald-400 to-cyan-500';

  return (
    <div className={`${s.container} bg-gradient-to-br ${gradientClass} rounded-full flex items-center justify-center ${className}`}>
      <Icon className={`${s.icon} text-white`} />
    </div>
  );
}
