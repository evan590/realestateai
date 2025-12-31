'use client';

import { useState } from 'react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get started with AI-powered property search',
    features: [
      'AI property search & filtering',
      'Basic market analysis',
      'Save up to 10 properties',
      'Email support',
    ],
    limitations: [
      'Limited AI chat (20 messages/month)',
      'No walkthrough tools',
      'No document center',
      'No human expert access',
    ],
    cta: 'Start Free',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '$79',
    period: '/month',
    description: 'Full AI agent + complete transaction tools',
    features: [
      'Unlimited AI chat & analysis',
      'AI-Guided Walkthroughs',
      'Document Command Center',
      'E-Signature integration',
      'Proactive AI Advisor',
      'Professionals Marketplace',
      'Mortgage Rate Comparison',
      'Offer strategy & preparation',
      'Priority support',
    ],
    limitations: [],
    cta: 'Start 14-Day Trial',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Premium Pro',
    price: '$299',
    period: '/transaction',
    description: 'Everything + human experts on call',
    features: [
      'Everything in Premium',
      'Dedicated human agent backup',
      'Licensed agent offer review',
      'Contract negotiation support',
      'Closing coordination',
      'Home warranty included',
      'Post-purchase support (90 days)',
    ],
    limitations: [],
    cta: 'Get Started',
    highlighted: false,
  },
];

const addOns = [
  {
    name: 'Home Inspection Coordination',
    price: '$49',
    description: 'We schedule and coordinate inspectors from our vetted network',
    icon: '🔍',
  },
  {
    name: 'Legal Document Review',
    price: '$149',
    description: 'Real estate attorney reviews all contracts before signing',
    icon: '⚖️',
  },
  {
    name: 'Moving Concierge',
    price: '$99',
    description: 'Full-service moving coordination with vetted movers',
    icon: '📦',
  },
  {
    name: 'Home Setup Package',
    price: '$79',
    description: 'Utility transfers, service setup, and new homeowner checklist',
    icon: '🏠',
  },
];

export default function PricingPage() {
  const [homePrice, setHomePrice] = useState(500000);
  const traditionalCommission = homePrice * 0.03;
  const aiCost = 299;
  const savings = traditionalCommission - aiCost;

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
              <Link href="/meet-your-agent" className="text-gray-600 hover:text-gray-900">
                Meet Your Agent
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
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Save thousands compared to traditional agent commissions.
            No hidden fees, no percentage of your home price.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl shadow-xl overflow-hidden ${
                  plan.highlighted ? 'ring-2 ring-blue-600 scale-105' : ''
                }`}
              >
                {plan.badge && (
                  <div className="bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                    {plan.badge}
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <Link
                    href="/sign-up"
                    className={`block text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
                      plan.highlighted
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <div className="mt-8 space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-start">
                        <span className="text-green-500 mr-2">✓</span>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations.map((limitation) => (
                      <div key={limitation} className="flex items-start">
                        <span className="text-gray-400 mr-2">○</span>
                        <span className="text-gray-500 text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Add-Ons */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pro Add-Ons</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Enhance your experience with optional services. Available with any paid plan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon) => (
              <div
                key={addon.name}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="text-3xl mb-3">{addon.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{addon.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{addon.description}</p>
                <p className="text-2xl font-bold text-blue-600">{addon.price}</p>
                <p className="text-gray-500 text-xs">one-time</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Calculate Your Savings</h2>
            <p className="text-gray-600">
              See how much you could save compared to a traditional buyer's agent commission
            </p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-4">
                Home Price: ${homePrice.toLocaleString()}
              </label>
              <input
                type="range"
                min="100000"
                max="2000000"
                step="10000"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full h-3 bg-white rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>$100k</span>
                <span>$2M</span>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 text-center">
                <p className="text-gray-600 text-sm mb-2">Traditional Agent (3%)</p>
                <p className="text-3xl font-bold text-red-600">
                  ${traditionalCommission.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 text-center">
                <p className="text-gray-600 text-sm mb-2">RealEstateAI (Buyer Pro)</p>
                <p className="text-3xl font-bold text-green-600">
                  ${aiCost}
                </p>
              </div>
              <div className="bg-blue-600 rounded-xl p-6 text-center text-white">
                <p className="text-blue-100 text-sm mb-2">Your Savings</p>
                <p className="text-3xl font-bold">
                  ${savings.toLocaleString()}
                </p>
              </div>
            </div>

            <p className="text-center text-gray-600 mt-6 text-sm">
              * Based on typical 3% buyer's agent commission. Actual savings may vary.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What's Included</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-gray-900 font-semibold">Feature</th>
                    <th className="px-6 py-4 text-center text-gray-900 font-semibold">Free</th>
                    <th className="px-6 py-4 text-center text-gray-900 font-semibold bg-blue-50">Premium</th>
                    <th className="px-6 py-4 text-center text-gray-900 font-semibold">Premium Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    { feature: 'AI Property Search', free: true, premium: true, pro: true },
                    { feature: 'Market Analysis', free: 'Basic', premium: true, pro: true },
                    { feature: 'AI Chat Messages', free: '20/mo', premium: 'Unlimited', pro: 'Unlimited' },
                    { feature: 'Saved Properties', free: '10', premium: 'Unlimited', pro: 'Unlimited' },
                    { feature: 'AI-Guided Walkthroughs', free: false, premium: true, pro: true },
                    { feature: 'Document Command Center', free: false, premium: true, pro: true },
                    { feature: 'E-Signature Integration', free: false, premium: true, pro: true },
                    { feature: 'Proactive AI Advisor', free: false, premium: true, pro: true },
                    { feature: 'Professionals Marketplace', free: false, premium: true, pro: true },
                    { feature: 'Mortgage Rate Comparison', free: false, premium: true, pro: true },
                    { feature: 'Offer Preparation', free: false, premium: true, pro: true },
                    { feature: 'Negotiation Strategy', free: false, premium: true, pro: true },
                    { feature: 'Human Agent Backup', free: false, premium: false, pro: true },
                    { feature: 'Licensed Agent Review', free: false, premium: false, pro: true },
                    { feature: 'Closing Coordination', free: false, premium: false, pro: true },
                    { feature: 'Home Warranty Included', free: false, premium: false, pro: true },
                    { feature: 'Support', free: 'Email', premium: 'Priority', pro: 'Dedicated' },
                  ].map((row) => (
                    <tr key={row.feature}>
                      <td className="px-6 py-4 text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        {row.free === true ? (
                          <span className="text-green-500">✓</span>
                        ) : row.free === false ? (
                          <span className="text-gray-300">—</span>
                        ) : (
                          <span className="text-gray-600 text-sm">{row.free}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center bg-blue-50">
                        {row.premium === true ? (
                          <span className="text-green-500">✓</span>
                        ) : row.premium === false ? (
                          <span className="text-gray-300">—</span>
                        ) : (
                          <span className="text-gray-600 text-sm">{row.premium}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {row.pro === true ? (
                          <span className="text-green-500">✓</span>
                        ) : row.pro === false ? (
                          <span className="text-gray-300">—</span>
                        ) : (
                          <span className="text-gray-600 text-sm">{row.pro}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pricing FAQs</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                q: 'Can I switch plans anytime?',
                a: 'Yes! Upgrade or downgrade at any time. If you upgrade mid-month, you\'ll be prorated. If you downgrade, your current plan continues until the end of the billing period.',
              },
              {
                q: 'Is there a free trial for paid plans?',
                a: 'The Buyer plan comes with a 14-day free trial. No credit card required to start. Cancel anytime during the trial with no charge.',
              },
              {
                q: 'What happens if I find a home while on the Free plan?',
                a: 'You can upgrade to Buyer or Buyer Pro at any point. We recommend upgrading when you\'re ready to make offers, as you\'ll get full negotiation and offer support.',
              },
              {
                q: 'Do you charge a percentage like traditional agents?',
                a: 'Never. Our flat pricing means you pay the same whether you buy a $200k condo or a $2M house. Traditional agent commissions scale with price - ours don\'t.',
              },
              {
                q: 'What\'s included in "human agent backup"?',
                a: 'Buyer Pro includes access to licensed real estate professionals who review your offers, answer complex questions, and can step in for negotiations when needed. It\'s like having an agent on-call without the full commission.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-green-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🛡️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">30-Day Money-Back Guarantee</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Try any paid plan risk-free. If you're not completely satisfied within 30 days,
            we'll refund your payment in full. No questions asked.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Finding Your Home Today
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join for free and upgrade when you're ready. No commitment, no pressure.
          </p>
          <Link
            href="/sign-up"
            className="inline-block px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started Free
          </Link>
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
              <Link href="/meet-your-agent" className="hover:text-white">Meet Your Agent</Link>
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
