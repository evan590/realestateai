'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { mockProperties } from '@/lib/mock-properties';
import { agents, getMockActivities, formatActivityTime, getActivityIcon, AgentActivity, Agent } from '@/lib/agents';

export default function DashboardPage() {
  const { user } = useAuth();
  const [selectedAgent, setSelectedAgent] = useState<Agent>(agents[0]);
  const [activities, setActivities] = useState<AgentActivity[]>([]);

  useEffect(() => {
    const savedAgentId = localStorage.getItem('selectedAgentId');
    if (savedAgentId) {
      const agent = agents.find(a => a.id === savedAgentId);
      if (agent) setSelectedAgent(agent);
    }
  }, []);

  useEffect(() => {
    setActivities(getMockActivities(selectedAgent.id));
  }, [selectedAgent.id]);

  const stats = [
    {
      label: 'Properties Viewed',
      value: '12',
      change: '+3 this week',
      icon: '👁️',
    },
    {
      label: 'Saved Properties',
      value: '5',
      change: '+2 this week',
      icon: '❤️',
    },
    {
      label: 'AI Analyses',
      value: '8',
      change: '+4 this week',
      icon: '🤖',
    },
    {
      label: 'Estimated Savings',
      value: '$24,500',
      change: 'vs traditional agent',
      icon: '💰',
    },
  ];

  const recentProperties = mockProperties.slice(0, 3);
  const unreadActivities = activities.filter(a => !a.read);

  return (
    <div className="space-y-6">
      {/* Welcome header with agent */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {user?.name?.split(' ')[0] || 'there'}
          </h1>
          <p className="text-slate-400 mt-1">
            Here&apos;s what&apos;s happening with your property search
          </p>
        </div>
        <Link
          href="/dashboard/my-agent"
          className={`flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r ${selectedAgent.gradientClass} hover:opacity-90 transition-opacity`}
        >
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-2xl">
            {selectedAgent.avatar}
          </div>
          <div className="text-white">
            <p className="text-sm text-white/80">Your Agent</p>
            <p className="font-semibold">{selectedAgent.name}</p>
          </div>
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:border-slate-600 transition-colors">
            <CardContent>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  <p className="text-emerald-400 text-xs mt-1">{stat.change}</p>
                </div>
                <div className="text-3xl">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Activity + Properties */}
        <div className="lg:col-span-2 space-y-6">
          {/* Agent Activity Feed */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${selectedAgent.gradientClass} flex items-center justify-center text-lg`}>
                  {selectedAgent.avatar}
                </div>
                <div>
                  <CardTitle>{selectedAgent.name}&apos;s Activity</CardTitle>
                  <p className="text-sm text-slate-500">What your agent has been doing</p>
                </div>
              </div>
              {unreadActivities.length > 0 && (
                <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium">
                  {unreadActivities.length} new
                </span>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {activities.slice(0, 4).map((activity) => (
                  <div
                    key={activity.id}
                    className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                      !activity.read ? 'bg-blue-500/10 border border-blue-500/20' : 'hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="text-xl">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <p className={`font-medium ${!activity.read ? 'text-white' : 'text-slate-300'}`}>
                          {activity.title}
                        </p>
                        <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
                          {formatActivityTime(activity.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 mt-0.5">{activity.description}</p>
                      {activity.actionUrl && (
                        <Link
                          href={activity.actionUrl}
                          className="inline-block mt-1 text-xs text-emerald-400 hover:text-emerald-300"
                        >
                          {activity.actionLabel} →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/my-agent">
                <Button variant="ghost" size="sm" className="mt-4 text-slate-400 hover:text-white">
                  View all activity →
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent properties */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recently Viewed Properties</CardTitle>
              <Link href="/dashboard/search" className="text-emerald-400 text-sm hover:underline">
                View all
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProperties.map((property) => (
                  <Link
                    key={property.id}
                    href={`/dashboard/properties/${property.id}`}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-700/50 transition-colors group"
                  >
                    <div
                      className="w-20 h-20 rounded-lg bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${property.images[0]})` }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white group-hover:text-emerald-400 transition-colors truncate">
                        {property.address}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {property.city}, {property.state} {property.zip}
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                        <span>{property.bedrooms} bd</span>
                        <span>{property.bathrooms} ba</span>
                        <span>{property.sqft.toLocaleString()} sqft</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">
                        ${property.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-400">
                        ${Math.round(property.price / property.sqft)}/sqft
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Next Steps */}
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>✨</span>
                <span>Next Steps</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    icon: '💬',
                    title: 'Chat with your agent',
                    description: 'Get personalized recommendations',
                    url: '/dashboard/buyer-agent',
                    priority: true,
                  },
                  {
                    icon: '🔍',
                    title: 'Refine your search',
                    description: 'Update your preferences',
                    url: '/dashboard/search',
                    priority: false,
                  },
                  {
                    icon: '📊',
                    title: 'View market report',
                    description: 'Austin housing trends',
                    url: '/dashboard/buyer-agent',
                    priority: false,
                  },
                ].map((step) => (
                  <Link
                    key={step.title}
                    href={step.url}
                    className={`flex items-start space-x-3 p-3 rounded-lg transition-colors ${
                      step.priority
                        ? 'bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20'
                        : 'hover:bg-slate-700/50'
                    }`}
                  >
                    <span className="text-xl">{step.icon}</span>
                    <div>
                      <p className={`font-medium ${step.priority ? 'text-emerald-400' : 'text-white'}`}>
                        {step.title}
                      </p>
                      <p className="text-sm text-slate-400">{step.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Link href="/dashboard/my-agent" className="block">
                  <Button variant="secondary" className="w-full justify-start gap-2">
                    <span>🤖</span>
                    My Agent Hub
                  </Button>
                </Link>
                <Link href="/dashboard/buyer-agent" className="block">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <span>💬</span>
                    Chat with {selectedAgent.name}
                  </Button>
                </Link>
                <Link href="/dashboard/saved" className="block">
                  <Button variant="ghost" className="w-full justify-start gap-2">
                    <span>❤️</span>
                    Saved Properties
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Human Support */}
          <Card className="bg-gradient-to-br from-gray-700 to-gray-800 border-gray-600">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-xl">
                  👤
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white">Need Human Help?</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Licensed experts are available for complex questions.
                  </p>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="mt-3 bg-white text-gray-900 hover:bg-gray-100"
                  >
                    Talk to an Expert
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
