import Link from 'next/link';

const steps = [
  {
    number: 1,
    title: 'Sign Up & Get Matched',
    description: 'Create your free account and tell us about your real estate goals. We\'ll match you with an AI agent that fits your style.',
    details: [
      'Answer a few questions about your preferences',
      'Choose your agent personality (Analyst, Guide, or Negotiator)',
      'Your agent is ready to work in under 2 minutes',
    ],
    icon: '👤',
  },
  {
    number: 2,
    title: 'Tell Your Agent What You Need',
    description: 'Chat naturally with your AI agent about what you\'re looking for. No forms, no pressure - just a conversation.',
    details: [
      'Describe your ideal property in plain English',
      'Set your budget and must-haves',
      'Get instant clarifying questions to refine the search',
    ],
    icon: '💬',
  },
  {
    number: 3,
    title: 'Get Curated Matches',
    description: 'Your agent searches thousands of listings and surfaces only the ones that truly fit your criteria - with honest analysis.',
    details: [
      'AI-filtered results based on YOUR priorities',
      'Each listing includes pros AND cons',
      'Market analysis and fair price assessment',
    ],
    icon: '🔍',
  },
  {
    number: 4,
    title: 'Deep-Dive Analysis',
    description: 'Found something interesting? Your agent provides comprehensive analysis before you even schedule a showing.',
    details: [
      'Comparable sales and pricing analysis',
      'Neighborhood trends and future projections',
      'Potential red flags and risk assessment',
      'Investment return calculations',
    ],
    icon: '📊',
  },
  {
    number: 5,
    title: 'Strategic Offer Preparation',
    description: 'When you\'re ready to make an offer, your agent crafts a data-backed strategy designed to win at the right price.',
    details: [
      'Optimal offer price recommendation',
      'Contingency and terms strategy',
      'Negotiation playbook based on seller signals',
      'Human expert review before submission',
    ],
    icon: '📝',
  },
  {
    number: 6,
    title: 'Guided Closing',
    description: 'Your agent walks you through every step of closing, translating jargon and ensuring nothing falls through the cracks.',
    details: [
      'Inspection coordination and red flag alerts',
      'Document review and explanation',
      'Timeline tracking and deadline reminders',
      'Final walkthrough checklist',
    ],
    icon: '🎉',
  },
];

const faqs = [
  {
    question: 'How is this different from Zillow or Redfin?',
    answer: 'Those platforms show you listings. We give you a dedicated AI agent that actively helps you evaluate, negotiate, and close - without the bias of commission-driven human agents. Your agent\'s only goal is helping you make the right decision.',
  },
  {
    question: 'Do I still need a real estate agent?',
    answer: 'For most transactions, your AI agent handles everything a traditional agent would - searching, analyzing, negotiating, and guiding you through closing. For complex situations or when you want human consultation, licensed experts are always available.',
  },
  {
    question: 'How do you make money if you\'re unbiased?',
    answer: 'We charge a flat fee or subscription (see pricing). Unlike traditional agents who earn more when you pay more, our revenue doesn\'t depend on your purchase price. This aligns our interests with yours.',
  },
  {
    question: 'Can the AI actually negotiate?',
    answer: 'Your AI agent provides negotiation strategy, optimal pricing, and prepared responses. For the actual back-and-forth with sellers/agents, you can communicate directly with our guidance, or request a human agent to handle negotiations on your behalf.',
  },
  {
    question: 'What if I have questions the AI can\'t answer?',
    answer: 'Human experts are always available. Click "Talk to a Human" anytime to connect with a licensed real estate professional. Complex legal or financial questions are automatically escalated for human review.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. We use bank-level encryption, never sell your data, and you can delete your account and all associated data at any time. See our Trust & Safety page for details.',
  },
];

export default function HowItWorksPage() {
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
              <Link href="/meet-your-agent" className="text-gray-600 hover:text-gray-900">
                Meet Your Agent
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
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            How RealEstateAI Works
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            From first search to closing day, your AI agent guides you through
            every step - with data, not sales pitches.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-full bg-gray-200 -z-10" />
                )}

                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-2xl shadow-lg p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                        Step {step.number}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start text-gray-700">
                          <span className="text-green-500 mr-2 mt-1">✓</span>
                          <span className="text-sm">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The AI Advantage */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The AI Advantage</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See how AI-powered real estate compares to the traditional process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-3xl mb-4">⏱️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Faster Response</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Traditional Agent</span>
                  <span className="text-gray-900">Hours to days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">AI Agent</span>
                  <span className="text-green-600 font-semibold">Instant</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Data Analysis</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Traditional Agent</span>
                  <span className="text-gray-900">Manual, limited</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">AI Agent</span>
                  <span className="text-green-600 font-semibold">Thousands of data points</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bias Level</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Traditional Agent</span>
                  <span className="text-gray-900">Commission-driven</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">AI Agent</span>
                  <span className="text-green-600 font-semibold">Zero bias</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Human Backup Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Human Experts, When You Need Them</h2>
              <p className="text-gray-300 mb-8">
                AI handles the routine. Humans handle the complex. Our hybrid approach
                gives you the best of both worlds.
              </p>
              <div className="space-y-4">
                {[
                  { icon: '👤', text: 'Licensed agents review every offer' },
                  { icon: '⚖️', text: 'Legal experts for contract questions' },
                  { icon: '💬', text: '24/7 human support available' },
                  { icon: '🚨', text: 'Automatic escalation for unusual situations' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center space-x-3">
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-gray-200">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-700/50 rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  💬
                </div>
                <span className="text-gray-300 text-sm">Example human escalation</span>
              </div>
              <div className="space-y-4">
                <div className="bg-blue-600 rounded-lg p-3 ml-8">
                  <p className="text-sm">This property has some unusual deed restrictions. Can I talk to someone about this?</p>
                </div>
                <div className="bg-gray-600 rounded-lg p-3 mr-8">
                  <p className="text-sm">Absolutely. I'm connecting you with Sarah, one of our licensed experts who specializes in title issues. She'll be with you in under 2 minutes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of buyers who've found their perfect home with AI-powered guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Free Today
            </Link>
            <Link
              href="/meet-your-agent"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Meet Your Agent First
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
              <Link href="/meet-your-agent" className="hover:text-white">Meet Your Agent</Link>
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
