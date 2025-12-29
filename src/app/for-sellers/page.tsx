import Link from 'next/link';

export default function ForSellersPage() {
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
      <section className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/30 px-4 py-2 rounded-full mb-8">
            <span className="text-emerald-100">Coming Soon</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            AI Seller Agent
          </h1>
          <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto mb-8">
            List smarter, sell faster. Your AI agent handles pricing strategy,
            marketing, showings, and negotiations - saving you thousands in commissions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#notify"
              className="px-8 py-4 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Notified at Launch
            </Link>
            <Link
              href="/"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Explore Buyer Agent
            </Link>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What's Coming</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to sell your home, powered by AI
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📊',
                title: 'Smart Pricing',
                description: 'AI analyzes thousands of comparable sales to recommend the optimal listing price - maximizing your return while ensuring competitive positioning.',
              },
              {
                icon: '📸',
                title: 'Listing Optimization',
                description: 'AI-crafted descriptions, photo recommendations, and listing strategies tailored to highlight what buyers in your market are looking for.',
              },
              {
                icon: '📅',
                title: 'Showing Coordination',
                description: 'Automated scheduling, buyer screening, and follow-up. Your AI agent handles the logistics so you don\'t have to.',
              },
              {
                icon: '💬',
                title: 'Buyer Communication',
                description: 'Your AI agent responds to inquiries 24/7, answers questions about your property, and qualifies interested buyers.',
              },
              {
                icon: '📝',
                title: 'Offer Analysis',
                description: 'Side-by-side comparison of offers with AI insights on terms, buyer strength, and likelihood to close. Never miss a detail.',
              },
              {
                icon: '🤝',
                title: 'Negotiation Support',
                description: 'Strategic counter-offer recommendations based on market data and buyer behavior. Maximize your sale price with data-driven tactics.',
              },
            ].map((item) => (
              <div key={item.title} className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 md:p-12 text-white">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">Save on Commissions</h2>
              <p className="text-emerald-100">
                Traditional listing agent commissions are typically 2.5-3% of your sale price.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 rounded-xl p-6">
                <p className="text-emerald-200 mb-2">On a $500k Home</p>
                <p className="text-4xl font-bold">$15,000</p>
                <p className="text-sm text-emerald-200 mt-2">Traditional Agent Fee</p>
              </div>
              <div className="bg-white/10 rounded-xl p-6">
                <p className="text-emerald-200 mb-2">RealEstateAI Fee</p>
                <p className="text-4xl font-bold">$499</p>
                <p className="text-sm text-emerald-200 mt-2">Flat Rate (Expected)</p>
              </div>
              <div className="bg-white rounded-xl p-6 text-emerald-600">
                <p className="text-emerald-500 mb-2">Your Savings</p>
                <p className="text-4xl font-bold">$14,500</p>
                <p className="text-sm text-emerald-500 mt-2">More in Your Pocket</p>
              </div>
            </div>

            <p className="text-center text-emerald-200 mt-6 text-sm">
              * Final pricing to be announced at launch. Buyer agent commission still applies.
            </p>
          </div>
        </div>
      </section>

      {/* How It Will Work */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Will Work</h2>
          </div>

          <div className="space-y-8">
            {[
              {
                step: 1,
                title: 'Tell Us About Your Property',
                description: 'Answer a few questions about your home. Upload photos, share details about recent updates, and set your timeline.',
              },
              {
                step: 2,
                title: 'Get Your AI Pricing Analysis',
                description: 'Receive a comprehensive market analysis with a recommended listing price, supported by comparable sales data and market trends.',
              },
              {
                step: 3,
                title: 'Launch Your Listing',
                description: 'Your AI agent creates an optimized listing and syndicates it across major platforms. Professional photos? We\'ll connect you with vetted local photographers.',
              },
              {
                step: 4,
                title: 'Let AI Handle the Day-to-Day',
                description: 'Your agent manages inquiries, schedules showings, and keeps you updated. Human experts available for complex situations.',
              },
              {
                step: 5,
                title: 'Review Offers with AI Insights',
                description: 'When offers come in, your AI provides analysis on each one - price, terms, contingencies, and buyer strength.',
              },
              {
                step: 6,
                title: 'Close with Confidence',
                description: 'Your AI guides you through negotiations and closing, with human transaction coordinators ensuring everything goes smoothly.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notify Form */}
      <section id="notify" className="py-20 bg-gray-900 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Be First to Know</h2>
          <p className="text-gray-400 mb-8">
            Join the waitlist and get early access when our Seller Agent launches.
          </p>

          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition-colors whitespace-nowrap"
            >
              Notify Me
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-4">
            No spam. We'll only email you about the Seller Agent launch.
          </p>
        </div>
      </section>

      {/* Current Offering */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Looking to Buy Instead?
                </h2>
                <p className="text-gray-600 mb-6">
                  Our Buyer Agent is available now. Get AI-powered property search,
                  analysis, and negotiation support today.
                </p>
                <Link
                  href="/"
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Explore Buyer Agent
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🔍', text: 'Smart Search' },
                  { icon: '📊', text: 'Market Analysis' },
                  { icon: '💰', text: 'Offer Strategy' },
                  { icon: '🤖', text: 'AI Assistant' },
                ].map((item) => (
                  <div key={item.text} className="bg-white rounded-lg p-4 text-center shadow-sm">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <p className="text-gray-700 font-medium text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
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
