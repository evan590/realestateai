'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Scale, Package, Home, Shield, Check, X as XIcon } from 'lucide-react';
import MarketingNav from '@/components/layout/MarketingNav';
import MarketingFooter from '@/components/layout/MarketingFooter';
import { FadeInView } from '@/components/ui/AnimatedSection';

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
    Icon: Search,
  },
  {
    name: 'Legal Document Review',
    price: '$149',
    description: 'Real estate attorney reviews all contracts before signing',
    Icon: Scale,
  },
  {
    name: 'Moving Concierge',
    price: '$99',
    description: 'Full-service moving coordination with vetted movers',
    Icon: Package,
  },
  {
    name: 'Home Setup Package',
    price: '$79',
    description: 'Utility transfers, service setup, and new homeowner checklist',
    Icon: Home,
  },
];

export default function PricingPage() {
  const [homePrice, setHomePrice] = useState(500000);
  const traditionalCommission = homePrice * 0.03;
  const aiCost = 299;
  const savings = traditionalCommission - aiCost;

  return (
    <div className="min-h-screen bg-slate-950">
      <MarketingNav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInView>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Save thousands compared to traditional agent commissions.
              No hidden fees, no percentage of your home price.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <FadeInView key={plan.name} delay={index * 0.1}>
                <div
                  className={`bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/20 overflow-hidden ${
                    plan.highlighted ? 'ring-2 ring-emerald-500 scale-105' : ''
                  }`}
                >
                  {plan.badge && (
                    <div className="bg-emerald-500 text-white text-center py-2 text-sm font-semibold">
                      {plan.badge}
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      <span className="text-slate-400 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-slate-400 mb-6">{plan.description}</p>

                    <Link
                      href="/sign-up"
                      className={`block text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
                        plan.highlighted
                          ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                          : 'bg-white/5 text-white hover:bg-white/10'
                      }`}
                    >
                      {plan.cta}
                    </Link>

                    <div className="mt-8 space-y-3">
                      {plan.features.map((feature) => (
                        <div key={feature} className="flex items-start">
                          <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-200 text-sm">{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation) => (
                        <div key={limitation} className="flex items-start">
                          <span className="text-slate-500 mr-2 text-sm">&#9675;</span>
                          <span className="text-slate-500 text-sm">{limitation}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Pro Add-Ons */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Pro Add-Ons</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Enhance your experience with optional services. Available with any paid plan.
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <FadeInView key={addon.name} delay={index * 0.1}>
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-3">
                    <addon.Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{addon.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{addon.description}</p>
                  <p className="text-2xl font-bold text-emerald-400">{addon.price}</p>
                  <p className="text-slate-500 text-xs">one-time</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Calculator */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Calculate Your Savings</h2>
              <p className="text-slate-400">
                See how much you could save compared to a traditional buyer&apos;s agent commission
              </p>
            </div>

            <div className="bg-emerald-500/10 border border-white/10 backdrop-blur-sm rounded-2xl p-8">
              <div className="mb-8">
                <label className="block text-slate-200 font-semibold mb-4">
                  Home Price: ${homePrice.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="100000"
                  max="2000000"
                  step="10000"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full h-3 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-sm text-slate-500 mt-2">
                  <span>$100k</span>
                  <span>$2M</span>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                  <p className="text-slate-400 text-sm mb-2">Traditional Agent (3%)</p>
                  <p className="text-3xl font-bold text-red-400">
                    ${traditionalCommission.toLocaleString()}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                  <p className="text-slate-400 text-sm mb-2">RealEstateAI (Buyer Pro)</p>
                  <p className="text-3xl font-bold text-emerald-400">
                    ${aiCost}
                  </p>
                </div>
                <div className="bg-emerald-500 rounded-xl p-6 text-center text-white">
                  <p className="text-emerald-100 text-sm mb-2">Your Savings</p>
                  <p className="text-3xl font-bold">
                    ${savings.toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="text-center text-slate-400 mt-6 text-sm">
                * Based on typical 3% buyer&apos;s agent commission. Actual savings may vary.
              </p>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">What&apos;s Included</h2>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-white/5">
                      <th className="px-6 py-4 text-left text-white font-semibold">Feature</th>
                      <th className="px-6 py-4 text-center text-white font-semibold">Free</th>
                      <th className="px-6 py-4 text-center text-white font-semibold bg-emerald-500/10">Premium</th>
                      <th className="px-6 py-4 text-center text-white font-semibold">Premium Pro</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
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
                        <td className="px-6 py-4 text-white">{row.feature}</td>
                        <td className="px-6 py-4 text-center">
                          {row.free === true ? (
                            <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                          ) : row.free === false ? (
                            <span className="text-slate-600">&mdash;</span>
                          ) : (
                            <span className="text-slate-400 text-sm">{row.free}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center bg-emerald-500/5">
                          {row.premium === true ? (
                            <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                          ) : row.premium === false ? (
                            <span className="text-slate-600">&mdash;</span>
                          ) : (
                            <span className="text-slate-400 text-sm">{row.premium}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {row.pro === true ? (
                            <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                          ) : row.pro === false ? (
                            <span className="text-slate-600">&mdash;</span>
                          ) : (
                            <span className="text-slate-400 text-sm">{row.pro}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Pricing FAQs</h2>
            </div>
          </FadeInView>

          <div className="space-y-6">
            {[
              {
                q: 'Can I switch plans anytime?',
                a: "Yes! Upgrade or downgrade at any time. If you upgrade mid-month, you'll be prorated. If you downgrade, your current plan continues until the end of the billing period.",
              },
              {
                q: 'Is there a free trial for paid plans?',
                a: 'The Buyer plan comes with a 14-day free trial. No credit card required to start. Cancel anytime during the trial with no charge.',
              },
              {
                q: 'What happens if I find a home while on the Free plan?',
                a: "You can upgrade to Buyer or Buyer Pro at any point. We recommend upgrading when you're ready to make offers, as you'll get full negotiation and offer support.",
              },
              {
                q: 'Do you charge a percentage like traditional agents?',
                a: "Never. Our flat pricing means you pay the same whether you buy a $200k condo or a $2M house. Traditional agent commissions scale with price - ours don't.",
              },
              {
                q: 'What\'s included in "human agent backup"?',
                a: "Buyer Pro includes access to licensed real estate professionals who review your offers, answer complex questions, and can step in for negotiations when needed. It's like having an agent on-call without the full commission.",
              },
            ].map((faq, index) => (
              <FadeInView key={faq.q} delay={index * 0.08}>
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-slate-400">{faq.a}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 bg-emerald-500/10 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInView>
            <div className="w-16 h-16 mx-auto bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">30-Day Money-Back Guarantee</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Try any paid plan risk-free. If you&apos;re not completely satisfied within 30 days,
              we&apos;ll refund your payment in full. No questions asked.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInView>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Finding Your Home Today
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Join for free and upgrade when you&apos;re ready. No commitment, no pressure.
            </p>
            <Link
              href="/sign-up"
              className="inline-block px-8 py-4 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-white/90 transition-colors"
            >
              Get Started Free
            </Link>
          </FadeInView>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
