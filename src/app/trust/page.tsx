import Link from 'next/link';

export default function TrustPage() {
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
          <div className="text-5xl mb-6">🛡️</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Trust & Safety
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Your biggest financial decision deserves the highest standards of
            security, transparency, and human oversight.
          </p>
        </div>
      </section>

      {/* Human Oversight */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Human-in-the-Loop</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              AI handles the analysis and routine tasks. Humans verify the important stuff.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '👤',
                title: 'Licensed Agent Review',
                description: 'Every offer is reviewed by a licensed real estate professional before submission. They catch what AI might miss and ensure legal compliance.',
              },
              {
                icon: '⚖️',
                title: 'Legal Expert Access',
                description: 'Contract questions? Unusual terms? Our legal team is available to review documents and explain complex clauses in plain English.',
              },
              {
                icon: '🚨',
                title: 'Automatic Escalation',
                description: 'Our AI is trained to recognize when a situation needs human judgment. Complex scenarios are automatically flagged for expert review.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-8">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Humans Review */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                What Humans Always Review
              </h2>
              <p className="text-gray-600 mb-8">
                We believe AI should augment human judgment, not replace it for critical decisions.
                Here's what always gets human eyes:
              </p>
              <div className="space-y-4">
                {[
                  { text: 'All purchase offers before submission', check: true },
                  { text: 'Contract terms and contingencies', check: true },
                  { text: 'Price negotiations over $10,000', check: true },
                  { text: 'Unusual property situations or red flags', check: true },
                  { text: 'Final closing documents', check: true },
                  { text: 'Any transaction you request review for', check: true },
                ].map((item) => (
                  <div key={item.text} className="flex items-center">
                    <span className="text-green-500 mr-3 text-xl">✓</span>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600">✓</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Human Review Complete</p>
                  <p className="text-sm text-gray-500">Reviewed by Sarah M., Licensed Agent</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">
                  "I've reviewed your offer for 123 Oak Street. The AI's price recommendation
                  looks solid based on comps. One suggestion: given the seller's timeline
                  mentioned in the listing, adding a flexible close date could strengthen your position."
                </p>
              </div>
              <div className="flex space-x-2">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Price Verified</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Terms Checked</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Security & Privacy</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Bank-level security for your most sensitive information
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '🔒',
                title: 'End-to-End Encryption',
                description: 'All data encrypted in transit and at rest using AES-256',
              },
              {
                icon: '🏦',
                title: 'SOC 2 Compliant',
                description: 'Enterprise-grade security controls and regular audits',
              },
              {
                icon: '🚫',
                title: 'Never Sold',
                description: 'Your data is never sold to third parties, ever',
              },
              {
                icon: '🗑️',
                title: 'Right to Delete',
                description: 'Request deletion of all your data at any time',
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-6 text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Ethics */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our AI Ethics Commitment</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="space-y-8">
              {[
                {
                  title: 'No Hidden Incentives',
                  description: 'Our AI is never incentivized to push you toward any particular property or decision. We don\'t receive kickbacks, referral fees, or commissions from sellers or lenders.',
                },
                {
                  title: 'Transparent Reasoning',
                  description: 'When our AI makes a recommendation, it explains why. You\'ll see the data, the logic, and the factors considered - not just a black-box answer.',
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
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Request Human Review */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-900 rounded-2xl p-8 md:p-12 text-white">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">
                  Request Human Review Anytime
                </h2>
                <p className="text-gray-300 mb-6">
                  Every screen in RealEstateAI includes a "Talk to a Human" button.
                  Whether you want a second opinion, have a complex question, or just
                  prefer human interaction - help is always one click away.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 rounded-lg px-4 py-2 flex items-center space-x-2">
                    <span>👤</span>
                    <span className="font-medium">Talk to a Human</span>
                  </div>
                  <span className="text-gray-400">Available on every page</span>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { time: '< 2 min', text: 'Average response time during business hours' },
                  { time: '24/7', text: 'Support available around the clock' },
                  { time: '100%', text: 'Of requests answered by real humans' },
                ].map((stat) => (
                  <div key={stat.text} className="flex items-center space-x-4">
                    <div className="text-2xl font-bold text-blue-400">{stat.time}</div>
                    <div className="text-gray-300">{stat.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compliance & Licensing</h2>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
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
                <div key={item.title} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Trustworthy AI?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join the thousands of buyers who trust RealEstateAI for their home search.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/sign-up"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
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
              <Link href="/meet-your-agent" className="hover:text-white">Meet Your Agent</Link>
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
