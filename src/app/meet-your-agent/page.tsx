'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Bot, Home, Zap, Search, BarChart3, DollarSign, FileText, Check, User, MessageSquare } from 'lucide-react';
import MarketingNav from '@/components/layout/MarketingNav';
import MarketingFooter from '@/components/layout/MarketingFooter';
import { FadeInView } from '@/components/ui/AnimatedSection';

const agents = [
  {
    id: 'alex',
    name: 'Alex',
    Icon: Bot,
    color: 'from-blue-500 to-blue-600',
    personality: 'The Analyst',
    tagline: 'Data-driven decisions, zero guesswork',
    description: 'Alex excels at crunching numbers and finding hidden value. Perfect for investors and analytical buyers who want every decision backed by hard data.',
    traits: ['Highly analytical', 'Detail-oriented', 'Risk-aware', 'Market-focused'],
    specialties: ['Investment analysis', 'Comparable market analysis', 'ROI calculations', 'Risk assessment'],
    style: 'Straightforward and precise. Alex presents information with clear metrics and actionable insights.',
    sampleMessages: [
      { role: 'user', content: 'Is this property a good investment?' },
      { role: 'agent', content: "Based on comparable sales data, this property is priced 8% above market average for the area. However, the price-per-sqft of $285 is actually competitive when you factor in the recent renovation. Key metrics:\n\n- Cap rate: 5.2% (above 4.8% area average)\n- Estimated rental yield: $2,400/month\n- 3-year appreciation forecast: 12-15%\n\nThe numbers suggest this could be a solid investment, but I'd recommend negotiating 5-7% below asking to improve your margins." },
    ],
  },
  {
    id: 'jordan',
    name: 'Jordan',
    Icon: Home,
    color: 'from-emerald-500 to-emerald-600',
    personality: 'The Guide',
    tagline: 'Your patient partner through every step',
    description: 'Jordan specializes in guiding first-time buyers through the entire process. Patient, thorough, and always ready to explain things in plain English.',
    traits: ['Patient', 'Educational', 'Supportive', 'Thorough'],
    specialties: ['First-time buyer guidance', 'Process explanation', 'Neighborhood research', 'Lifestyle matching'],
    style: 'Warm and educational. Jordan breaks down complex topics and ensures you understand every step.',
    sampleMessages: [
      { role: 'user', content: "I'm buying my first home. Where do I start?" },
      { role: 'agent', content: "Congratulations on taking this exciting step! Let me break down the process into manageable phases:\n\n**Phase 1: Financial Prep (1-2 weeks)**\n- Check your credit score (aim for 620+, ideally 740+)\n- Calculate your budget (typically 3-4x annual income)\n- Get pre-approved for a mortgage\n\n**Phase 2: House Hunting**\n- Define your must-haves vs nice-to-haves\n- Research neighborhoods that fit your lifestyle\n- I'll help you analyze each property objectively\n\nWant me to start with a budget calculator, or would you prefer to discuss what neighborhoods might work for you?" },
    ],
  },
  {
    id: 'sam',
    name: 'Sam',
    Icon: Zap,
    color: 'from-purple-500 to-purple-600',
    personality: 'The Negotiator',
    tagline: 'Maximum value, minimum nonsense',
    description: 'Sam is laser-focused on getting you the best deal. Direct, strategic, and always looking for leverage points in every transaction.',
    traits: ['Strategic', 'Direct', 'Results-driven', 'Assertive'],
    specialties: ['Offer strategy', 'Negotiation tactics', 'Deal structuring', 'Closing optimization'],
    style: 'Confident and strategic. Sam cuts to the chase and focuses on winning you the best possible terms.',
    sampleMessages: [
      { role: 'user', content: 'How much should I offer on this house?' },
      { role: 'agent', content: "Let's be strategic here. This property has been on market for 47 days - that's leverage.\n\n**My recommendation: Start at $465,000** (7% below asking)\n\nHere's why:\n- Days on market signals motivated seller\n- Recent price reduction shows flexibility\n- Comparable sales support $470-480k range\n\n**Negotiation strategy:**\n1. Open at $465k with 10-day close flexibility\n2. Counter expected around $485k\n3. Target settlement: $475k with seller credits for closing costs\n\nThis could save you $20-25k vs. accepting list price. Ready to draft the offer?" },
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
    <div className="min-h-screen bg-slate-950">
      <MarketingNav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInView>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Meet Your AI Agent
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Choose the personality that matches your style. Each agent brings unique strengths
              to help you navigate real estate with confidence.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Agent Selection */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
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
                      ? 'bg-white/5 border border-white/10 backdrop-blur-sm shadow-lg shadow-black/20 ring-2 ring-emerald-500'
                      : 'bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4`}>
                    <agent.Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{agent.name}</h3>
                  <p className="text-sm font-medium text-emerald-400 mb-2">{agent.personality}</p>
                  <p className="text-slate-400 text-sm">{agent.tagline}</p>
                </button>
              ))}
            </div>
          </FadeInView>

          {/* Selected Agent Details */}
          <FadeInView>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Agent Profile */}
              <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/20 p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${selectedAgent.color} flex items-center justify-center`}>
                    <selectedAgent.Icon className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedAgent.name}</h2>
                    <p className="text-emerald-400 font-medium">{selectedAgent.personality}</p>
                  </div>
                </div>

                <p className="text-slate-200 mb-6">{selectedAgent.description}</p>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Personality Traits</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgent.traits.map((trait) => (
                      <span key={trait} className="px-3 py-1 bg-white/5 text-slate-200 rounded-full text-sm">
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-white mb-3">Specialties</h4>
                  <ul className="space-y-2">
                    {selectedAgent.specialties.map((specialty) => (
                      <li key={specialty} className="flex items-center text-slate-200">
                        <Check className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" />
                        {specialty}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Communication Style</h4>
                  <p className="text-slate-200 italic">&quot;{selectedAgent.style}&quot;</p>
                </div>
              </div>

              {/* Demo Chat */}
              <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/20 overflow-hidden flex flex-col">
                <div className={`bg-gradient-to-r ${selectedAgent.color} text-white p-4`}>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <selectedAgent.Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Chat with {selectedAgent.name}</h3>
                      <p className="text-sm text-white/80">Try a demo conversation</p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-4 space-y-4 min-h-[400px] max-h-[500px] overflow-y-auto bg-slate-900/50">
                  {/* Sample conversation */}
                  {selectedAgent.sampleMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                        msg.role === 'user'
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/5 border border-white/10 text-slate-200'
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
                          ? 'bg-emerald-500 text-white'
                          : 'bg-white/5 border border-white/10 text-slate-200'
                      }`}>
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4 border-t border-white/10">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={demoInput}
                      onChange={(e) => setDemoInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleDemoChat()}
                      placeholder="Try asking a question..."
                      className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      onClick={handleDemoChat}
                      disabled={isTyping}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50"
                    >
                      Send
                    </button>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 text-center">
                    This is a demo. Sign up to get your own personal AI agent.
                  </p>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* How Agents Work Together */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">One Agent, Complete Coverage</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                While each agent has a distinct personality, they all have full capabilities
                to help you through every step of your real estate journey.
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { Icon: Search, title: 'Property Search', desc: 'Find and filter properties that match your criteria' },
              { Icon: BarChart3, title: 'Market Analysis', desc: 'Get data-driven insights on pricing and trends' },
              { Icon: DollarSign, title: 'Negotiation', desc: 'Strategic offer advice to maximize your value' },
              { Icon: FileText, title: 'Transaction Support', desc: 'Guidance through paperwork and closing' },
            ].map((item, index) => (
              <FadeInView key={item.title} delay={index * 0.1}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 mx-auto bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                    <item.Icon className="w-7 h-7 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Human Backup */}
      <section className="py-16 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/20 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Human Experts Always Available
                  </h2>
                  <p className="text-slate-400 mb-6">
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
                        <Check className="w-5 h-5 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-emerald-500/10 border border-white/10 rounded-xl p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">Human Expert</p>
                      <p className="text-sm text-slate-400">Available when you need them</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-slate-200 text-sm">
                      &quot;I&apos;ve reviewed your agent&apos;s analysis and the offer strategy looks solid.
                      One thing I&apos;d add - this seller has been flexible on closing dates in past
                      negotiations. We might be able to use that as leverage.&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-emerald-500 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInView>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Meet Your Agent?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Sign up today and get matched with an AI agent that fits your style.
              No commitments, no pressure - just smarter real estate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="px-8 py-4 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Get Your Agent - It&apos;s Free
              </Link>
              <Link
                href="/how-it-works"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Learn How It Works
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
