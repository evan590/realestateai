'use client';

import { useState } from 'react';
import Link from 'next/link';

const agents = [
  {
    id: 'alex',
    name: 'Alex',
    avatar: '🤖',
    color: 'from-blue-500 to-blue-600',
    personality: 'The Analyst',
    tagline: 'Data-driven decisions, zero guesswork',
    description: 'Alex excels at crunching numbers and finding hidden value. Perfect for investors and analytical buyers who want every decision backed by hard data.',
    traits: ['Highly analytical', 'Detail-oriented', 'Risk-aware', 'Market-focused'],
    specialties: ['Investment analysis', 'Comparable market analysis', 'ROI calculations', 'Risk assessment'],
    style: 'Straightforward and precise. Alex presents information with clear metrics and actionable insights.',
    sampleMessages: [
      { role: 'user', content: 'Is this property a good investment?' },
      { role: 'agent', content: "Based on comparable sales data, this property is priced 8% above market average for the area. However, the price-per-sqft of $285 is actually competitive when you factor in the recent renovation. Key metrics:\n\n• Cap rate: 5.2% (above 4.8% area average)\n• Estimated rental yield: $2,400/month\n• 3-year appreciation forecast: 12-15%\n\nThe numbers suggest this could be a solid investment, but I'd recommend negotiating 5-7% below asking to improve your margins." },
    ],
  },
  {
    id: 'jordan',
    name: 'Jordan',
    avatar: '🏠',
    color: 'from-emerald-500 to-emerald-600',
    personality: 'The Guide',
    tagline: 'Your patient partner through every step',
    description: 'Jordan specializes in guiding first-time buyers through the entire process. Patient, thorough, and always ready to explain things in plain English.',
    traits: ['Patient', 'Educational', 'Supportive', 'Thorough'],
    specialties: ['First-time buyer guidance', 'Process explanation', 'Neighborhood research', 'Lifestyle matching'],
    style: 'Warm and educational. Jordan breaks down complex topics and ensures you understand every step.',
    sampleMessages: [
      { role: 'user', content: "I'm buying my first home. Where do I start?" },
      { role: 'agent', content: "Congratulations on taking this exciting step! Let me break down the process into manageable phases:\n\n**Phase 1: Financial Prep (1-2 weeks)**\n• Check your credit score (aim for 620+, ideally 740+)\n• Calculate your budget (typically 3-4x annual income)\n• Get pre-approved for a mortgage\n\n**Phase 2: House Hunting**\n• Define your must-haves vs nice-to-haves\n• Research neighborhoods that fit your lifestyle\n• I'll help you analyze each property objectively\n\nWant me to start with a budget calculator, or would you prefer to discuss what neighborhoods might work for you?" },
    ],
  },
  {
    id: 'sam',
    name: 'Sam',
    avatar: '⚡',
    color: 'from-purple-500 to-purple-600',
    personality: 'The Negotiator',
    tagline: 'Maximum value, minimum nonsense',
    description: 'Sam is laser-focused on getting you the best deal. Direct, strategic, and always looking for leverage points in every transaction.',
    traits: ['Strategic', 'Direct', 'Results-driven', 'Assertive'],
    specialties: ['Offer strategy', 'Negotiation tactics', 'Deal structuring', 'Closing optimization'],
    style: 'Confident and strategic. Sam cuts to the chase and focuses on winning you the best possible terms.',
    sampleMessages: [
      { role: 'user', content: 'How much should I offer on this house?' },
      { role: 'agent', content: "Let's be strategic here. This property has been on market for 47 days - that's leverage.\n\n**My recommendation: Start at $465,000** (7% below asking)\n\nHere's why:\n• Days on market signals motivated seller\n• Recent price reduction shows flexibility\n• Comparable sales support $470-480k range\n\n**Negotiation strategy:**\n1. Open at $465k with 10-day close flexibility\n2. Counter expected around $485k\n3. Target settlement: $475k with seller credits for closing costs\n\nThis could save you $20-25k vs. accepting list price. Ready to draft the offer?" },
    ],
  },
];

export default function MeetYourAgentPage() {
  const [selectedAgent, setSelectedAgent] = useState(agents[0]);
  const [demoMessages, setDemoMessages] = useState<{role: string; content: string}[]>([]);
  const [demoInput, setDemoInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleDemoChat = () => {
    if (!demoInput.trim()) return;

    const userMessage = { role: 'user', content: demoInput };
    setDemoMessages(prev => [...prev, userMessage]);
    setDemoInput('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const responses = [
        `Great question! As ${selectedAgent.name}, I'd approach this by first analyzing the key data points. What specific property or situation are you looking at?`,
        `I hear you. Let me break this down step by step so we can make the best decision together. Can you share more details about what you're considering?`,
        `That's exactly the kind of question I love tackling. My ${selectedAgent.personality.toLowerCase()} approach means I'll give you a clear, data-backed answer. What's the property address?`,
      ];
      const response = {
        role: 'agent',
        content: responses[Math.floor(Math.random() * responses.length)]
      };
      setDemoMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl">🏠</span>
              <span className="text-xl font-bold text-gray-900">RealEstateAI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/how-it-works" className="text-gray-600 hover:text-gray-900">
                How It Works
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                Pricing
              </Link>
              <Link href="/sign-up" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Meet Your AI Agent
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose the personality that matches your style. Each agent brings unique strengths
            to help you navigate real estate with confidence.
          </p>
        </div>
      </section>

      {/* Agent Selection */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => {
                  setSelectedAgent(agent);
                  setDemoMessages([]);
                }}
                className={`p-6 rounded-2xl text-left transition-all ${
                  selectedAgent.id === agent.id
                    ? 'bg-white shadow-xl ring-2 ring-blue-500'
                    : 'bg-white shadow hover:shadow-lg'
                }`}
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${agent.color} flex items-center justify-center text-3xl mb-4`}>
                  {agent.avatar}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{agent.name}</h3>
                <p className="text-sm font-medium text-blue-600 mb-2">{agent.personality}</p>
                <p className="text-gray-600 text-sm">{agent.tagline}</p>
              </button>
            ))}
          </div>

          {/* Selected Agent Details */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Agent Profile */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${selectedAgent.color} flex items-center justify-center text-4xl`}>
                  {selectedAgent.avatar}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedAgent.name}</h2>
                  <p className="text-blue-600 font-medium">{selectedAgent.personality}</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{selectedAgent.description}</p>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Personality Traits</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.traits.map((trait) => (
                    <span key={trait} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Specialties</h4>
                <ul className="space-y-2">
                  {selectedAgent.specialties.map((specialty) => (
                    <li key={specialty} className="flex items-center text-gray-700">
                      <span className="text-green-500 mr-2">✓</span>
                      {specialty}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Communication Style</h4>
                <p className="text-gray-700 italic">"{selectedAgent.style}"</p>
              </div>
            </div>

            {/* Demo Chat */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
              <div className={`bg-gradient-to-r ${selectedAgent.color} text-white p-4`}>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">
                    {selectedAgent.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold">Chat with {selectedAgent.name}</h3>
                    <p className="text-sm text-white/80">Try a demo conversation</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 p-4 space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto bg-gray-50">
                {/* Sample conversation */}
                {selectedAgent.sampleMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white shadow'
                    }`}>
                      <p className="whitespace-pre-line text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}

                {/* Demo messages */}
                {demoMessages.map((msg, idx) => (
                  <div key={`demo-${idx}`} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white shadow'
                    }`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white shadow rounded-2xl px-4 py-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleDemoChat()}
                    placeholder="Try asking a question..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleDemoChat}
                    disabled={isTyping}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    Send
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  This is a demo. Sign up to get your own personal AI agent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How Agents Work Together */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">One Agent, Complete Coverage</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              While each agent has a distinct personality, they all have full capabilities
              to help you through every step of your real estate journey.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: '🔍', title: 'Property Search', desc: 'Find and filter properties that match your criteria' },
              { icon: '📊', title: 'Market Analysis', desc: 'Get data-driven insights on pricing and trends' },
              { icon: '💰', title: 'Negotiation', desc: 'Strategic offer advice to maximize your value' },
              { icon: '📝', title: 'Transaction Support', desc: 'Guidance through paperwork and closing' },
            ].map((item) => (
              <div key={item.title} className="text-center p-6">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Human Backup */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Human Experts Always Available
                </h2>
                <p className="text-gray-600 mb-6">
                  Your AI agent handles the day-to-day, but real humans are always in the loop.
                  Request a human review anytime, or let your agent escalate complex situations automatically.
                </p>
                <ul className="space-y-3">
                  {[
                    'Licensed agents review all offers before submission',
                    'Legal experts available for contract questions',
                    'Human support accessible 24/7 via chat',
                    'Automatic escalation for unusual situations',
                  ].map((item) => (
                    <li key={item} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">
                    👤
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Human Expert</p>
                    <p className="text-sm text-gray-600">Available when you need them</p>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-gray-700 text-sm">
                    "I've reviewed your agent's analysis and the offer strategy looks solid.
                    One thing I'd add - this seller has been flexible on closing dates in past
                    negotiations. We might be able to use that as leverage."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Meet Your Agent?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Sign up today and get matched with an AI agent that fits your style.
            No commitments, no pressure - just smarter real estate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Your Agent - It's Free
            </Link>
            <Link
              href="/how-it-works"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <span className="text-2xl">🏠</span>
              <span className="text-xl font-bold text-white">RealEstateAI</span>
            </div>
            <div className="flex space-x-6">
              <Link href="/how-it-works" className="hover:text-white">How It Works</Link>
              <Link href="/pricing" className="hover:text-white">Pricing</Link>
              <Link href="/trust" className="hover:text-white">Trust & Safety</Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            © 2024 RealEstateAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
