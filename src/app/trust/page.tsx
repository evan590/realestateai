'use client';

import Link from 'next/link';
import { Shield, User, Scale, AlertTriangle, Check, Lock, Building2, Ban, Trash2, MessageSquare } from 'lucide-react';
import MarketingNav from '@/components/layout/MarketingNav';
import MarketingFooter from '@/components/layout/MarketingFooter';
import { FadeInView } from '@/components/ui/AnimatedSection';

export default function TrustPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <MarketingNav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInView>
            <div className="w-16 h-16 mx-auto bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Trust & Safety
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Your biggest financial decision deserves the highest standards of
              security, transparency, and human oversight.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Human Oversight */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Human-in-the-Loop</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                AI handles the analysis and routine tasks. Humans verify the important stuff.
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                Icon: User,
                title: 'Licensed Agent Review',
                description: 'Every offer is reviewed by a licensed real estate professional before submission. They catch what AI might miss and ensure legal compliance.',
              },
              {
                Icon: Scale,
                title: 'Legal Expert Access',
                description: 'Contract questions? Unusual terms? Our legal team is available to review documents and explain complex clauses in plain English.',
              },
              {
                Icon: AlertTriangle,
                title: 'Automatic Escalation',
                description: 'Our AI is trained to recognize when a situation needs human judgment. Complex scenarios are automatically flagged for expert review.',
              },
            ].map((item, index) => (
              <FadeInView key={item.title} delay={index * 0.1}>
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-8">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                    <item.Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* What Humans Review */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">
                  What Humans Always Review
                </h2>
                <p className="text-slate-400 mb-8">
                  We believe AI should augment human judgment, not replace it for critical decisions.
                  Here&apos;s what always gets human eyes:
                </p>
                <div className="space-y-4">
                  {[
                    'All purchase offers before submission',
                    'Contract terms and contingencies',
                    'Price negotiations over $10,000',
                    'Unusual property situations or red flags',
                    'Final closing documents',
                    'Any transaction you request review for',
                  ].map((text) => (
                    <div key={text} className="flex items-center">
                      <Check className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                      <span className="text-slate-200">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl shadow-lg shadow-black/20 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Human Review Complete</p>
                    <p className="text-sm text-slate-500">Reviewed by Sarah M., Licensed Agent</p>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                  <p className="text-sm text-slate-200">
                    &quot;I&apos;ve reviewed your offer for 123 Oak Street. The AI&apos;s price recommendation
                    looks solid based on comps. One suggestion: given the seller&apos;s timeline
                    mentioned in the listing, adding a flexible close date could strengthen your position.&quot;
                  </p>
                </div>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm">Price Verified</span>
                  <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-sm">Terms Checked</span>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">Security & Privacy</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Bank-level security for your most sensitive information
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { Icon: Lock, title: 'End-to-End Encryption', description: 'All data encrypted in transit and at rest using AES-256' },
              { Icon: Building2, title: 'SOC 2 Compliant', description: 'Enterprise-grade security controls and regular audits' },
              { Icon: Ban, title: 'Never Sold', description: 'Your data is never sold to third parties, ever' },
              { Icon: Trash2, title: 'Right to Delete', description: 'Request deletion of all your data at any time' },
            ].map((item, index) => (
              <FadeInView key={item.title} delay={index * 0.1}>
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                  <div className="w-12 h-12 mx-auto bg-emerald-500/10 rounded-lg flex items-center justify-center mb-3">
                    <item.Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* AI Ethics */}
      <section className="py-20 bg-emerald-500/10 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our AI Ethics Commitment</h2>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/20 p-8 md:p-12">
              <div className="space-y-8">
                {[
                  {
                    title: 'No Hidden Incentives',
                    description: "Our AI is never incentivized to push you toward any particular property or decision. We don't receive kickbacks, referral fees, or commissions from sellers or lenders.",
                  },
                  {
                    title: 'Transparent Reasoning',
                    description: "When our AI makes a recommendation, it explains why. You'll see the data, the logic, and the factors considered - not just a black-box answer.",
                  },
                  {
                    title: 'Bias Monitoring',
                    description: 'We actively monitor our AI for potential biases in recommendations. Our models are regularly audited to ensure fair treatment across all neighborhoods and price points.',
                  },
                  {
                    title: "You're in Control",
                    description: "Our AI advises, you decide. We'll never take action on your behalf without explicit approval. Major decisions always require your confirmation.",
                  },
                ].map((item, index) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                      <p className="text-slate-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Request Human Review */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 md:p-12 text-white">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">
                    Request Human Review Anytime
                  </h2>
                  <p className="text-slate-300 mb-6">
                    Every screen in RealEstateAI includes a &quot;Talk to a Human&quot; button.
                    Whether you want a second opinion, have a complex question, or just
                    prefer human interaction - help is always one click away.
                  </p>
                  <div className="flex items-center space-x-4">
                    <div className="bg-emerald-500 rounded-lg px-4 py-2 flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span className="font-medium">Talk to a Human</span>
                    </div>
                    <span className="text-slate-400">Available on every page</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    { time: '< 2 min', text: 'Average response time during business hours' },
                    { time: '24/7', text: 'Support available around the clock' },
                    { time: '100%', text: 'Of requests answered by real humans' },
                  ].map((stat) => (
                    <div key={stat.text} className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-emerald-400">{stat.time}</div>
                      <div className="text-slate-300">{stat.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Compliance & Licensing</h2>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl shadow-lg shadow-black/20 p-8">
              <div className="space-y-6">
                {[
                  {
                    title: 'Real Estate Brokerage',
                    description: 'RealEstateAI operates under a licensed real estate brokerage in all states where we operate. All human agents hold valid state licenses.',
                  },
                  {
                    title: 'Fair Housing',
                    description: 'We are committed to the Fair Housing Act. Our AI is designed and tested to ensure no discrimination based on race, color, religion, sex, national origin, disability, or familial status.',
                  },
                  {
                    title: 'Data Protection',
                    description: 'We comply with CCPA, GDPR (where applicable), and state-specific data protection regulations. You have full control over your personal information.',
                  },
                ].map((item) => (
                  <div key={item.title} className="border-b border-white/5 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInView>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience Trustworthy AI?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Join the thousands of buyers who trust RealEstateAI for their home search.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="px-8 py-4 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Get Started Free
              </Link>
              <Link
                href="/how-it-works"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                See How It Works
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
