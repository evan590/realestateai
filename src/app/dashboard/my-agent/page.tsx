'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { agents, Agent, getMockActivities, formatActivityTime, getActivityIcon, AgentActivity } from '@/lib/agents';

export default function MyAgentPage() {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(agents[0]);
  const [activities, setActivities] = useState<AgentActivity[]>([]);
  const [isAssigning, setIsAssigning] = useState(false);
  const [showChangeAgent, setShowChangeAgent] = useState(false);

  useEffect(() => {
    // Load saved agent preference
    const savedAgentId = localStorage.getItem('selectedAgentId');
    if (savedAgentId) {
      const agent = agents.find(a => a.id === savedAgentId);
      if (agent) setSelectedAgent(agent);
    }

    // Load activities
    setActivities(getMockActivities(selectedAgent.id));
  }, [selectedAgent.id]);

  const handleSelectAgent = (agent: Agent) => {
    setIsAssigning(true);
    setTimeout(() => {
      setSelectedAgent(agent);
      localStorage.setItem('selectedAgentId', agent.id);
      setActivities(getMockActivities(agent.id));
      setIsAssigning(false);
      setShowChangeAgent(false);
    }, 1000);
  };

  const unreadCount = activities.filter(a => !a.read).length;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Agent</h1>
        <p className="text-gray-600">Your personal AI assistant for finding the perfect home</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Agent Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {/* Agent Header */}
            <div className={`bg-gradient-to-br ${selectedAgent.gradientClass} p-6 text-white`}>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                  {selectedAgent.avatar}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{selectedAgent.name}</h2>
                  <p className="text-white/80">{selectedAgent.personality}</p>
                </div>
              </div>
              <p className="mt-4 text-white/90 text-sm italic">"{selectedAgent.tagline}"</p>
            </div>

            {/* Agent Details */}
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">About</h3>
                <p className="text-gray-700 text-sm">{selectedAgent.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Traits</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.traits.map((trait) => (
                    <span
                      key={trait}
                      className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t space-y-3">
                <Link
                  href="/dashboard/buyer-agent"
                  className={`w-full flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors bg-gradient-to-r ${selectedAgent.gradientClass} text-white hover:opacity-90`}
                >
                  <span>💬</span>
                  <span>Chat with {selectedAgent.name}</span>
                </Link>
                <button
                  onClick={() => setShowChangeAgent(true)}
                  className="w-full py-2 text-gray-600 hover:text-gray-900 text-sm"
                >
                  Change Agent
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                href="/dashboard/search"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl">🔍</span>
                <div>
                  <p className="font-medium text-gray-900">Search Properties</p>
                  <p className="text-sm text-gray-500">Find your next home</p>
                </div>
              </Link>
              <Link
                href="/dashboard/saved"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <span className="text-xl">❤️</span>
                <div>
                  <p className="font-medium text-gray-900">Saved Properties</p>
                  <p className="text-sm text-gray-500">View your favorites</p>
                </div>
              </Link>
              <button
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <span className="text-xl">👤</span>
                <div>
                  <p className="font-medium text-gray-900">Talk to a Human</p>
                  <p className="text-sm text-gray-500">Get expert support</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          {/* Activity Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Agent Activity</h2>
                <p className="text-sm text-gray-500">
                  What {selectedAgent.name} has been doing for you
                </p>
              </div>
              {unreadCount > 0 && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className={`flex items-start space-x-4 p-4 rounded-lg transition-colors ${
                    !activity.read ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="text-2xl">{getActivityIcon(activity.type)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className={`font-medium ${!activity.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {activity.title}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-4">
                        {formatActivityTime(activity.timestamp)}
                      </span>
                    </div>
                    {activity.actionUrl && (
                      <Link
                        href={activity.actionUrl}
                        className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {activity.actionLabel} →
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Suggested Next Steps</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                {
                  icon: '🔍',
                  title: 'Refine Your Search',
                  description: 'Update your preferences to get better matches',
                  action: 'Update Criteria',
                  url: '/dashboard/search',
                },
                {
                  icon: '📊',
                  title: 'Get Market Insights',
                  description: 'Ask your agent about Austin market trends',
                  action: 'Chat Now',
                  url: '/dashboard/buyer-agent',
                },
                {
                  icon: '📝',
                  title: 'Complete Your Profile',
                  description: 'Add more details to get personalized recommendations',
                  action: 'Edit Profile',
                  url: '/dashboard',
                },
                {
                  icon: '❓',
                  title: 'Have Questions?',
                  description: 'Your agent is ready to help 24/7',
                  action: 'Ask Agent',
                  url: '/dashboard/buyer-agent',
                },
              ].map((step) => (
                <Link
                  key={step.title}
                  href={step.url}
                  className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  <span className="text-2xl">{step.icon}</span>
                  <div>
                    <p className="font-medium text-gray-900">{step.title}</p>
                    <p className="text-sm text-gray-500 mt-1">{step.description}</p>
                    <p className="text-sm text-blue-600 font-medium mt-2">{step.action} →</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Human Support Card */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-white">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-2xl">
                👤
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg">Need Human Expert Help?</h3>
                <p className="text-gray-300 text-sm mt-1">
                  Licensed real estate professionals are available to review your offers,
                  answer complex questions, or provide a second opinion.
                </p>
                <button className="mt-4 px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  Request Expert Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change Agent Modal */}
      {showChangeAgent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Choose Your Agent</h2>
                <button
                  onClick={() => setShowChangeAgent(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <p className="text-gray-600 mt-1">
                Select the agent personality that best matches your style
              </p>
            </div>

            <div className="p-6 space-y-4">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => handleSelectAgent(agent)}
                  disabled={isAssigning}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    selectedAgent.id === agent.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${isAssigning ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${agent.gradientClass} flex items-center justify-center text-2xl`}>
                      {agent.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{agent.name}</h3>
                          <p className="text-sm text-blue-600">{agent.personality}</p>
                        </div>
                        {selectedAgent.id === agent.id && (
                          <span className="text-blue-600">✓ Current</span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-2">{agent.tagline}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {isAssigning && (
              <div className="p-6 border-t text-center">
                <div className="inline-flex items-center space-x-2 text-blue-600">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Assigning your new agent...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
