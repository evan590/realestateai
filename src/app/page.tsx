import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">RE</span>
              </div>
              <span className="text-xl font-bold text-white">
                RealEstate<span className="text-emerald-400">AI</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/how-it-works" className="text-slate-300 hover:text-white transition-colors">How It Works</Link>
              <Link href="/meet-your-agent" className="text-slate-300 hover:text-white transition-colors">Meet Your Agent</Link>
              <Link href="/pricing" className="text-slate-300 hover:text-white transition-colors">Pricing</Link>
              <Link href="/trust" className="text-slate-300 hover:text-white transition-colors">Trust & Security</Link>
              <Link href="/sign-in" className="text-slate-300 hover:text-white transition-colors">Sign In</Link>
              <Link href="/sign-up" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                Meet Your AI Agent
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-emerald-400 text-sm font-medium">The Future of Home Buying is Here</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Your Personal AI Real Estate Agent
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"> — Available 24/7</span>
              </h1>

              <p className="text-xl text-slate-400 mb-4">
                An Agent That Works for You, Not Commission.
              </p>

              <p className="text-lg text-slate-400 mb-8">
                Meet your AI agent that searches properties, contacts sellers, negotiates offers,
                and guides you through closing — all without the 6% commission.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/sign-up" className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105 shadow-lg shadow-emerald-500/25 text-center">
                  Meet Your AI Agent — It&apos;s Free
                </Link>
                <Link href="/how-it-works" className="border border-slate-600 hover:border-slate-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-slate-800 text-center">
                  See How It Works
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-slate-700/50">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">$0</p>
                  <p className="text-slate-400 text-sm">Commission</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">24/7</p>
                  <p className="text-slate-400 text-sm">Availability</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">100%</p>
                  <p className="text-slate-400 text-sm">For You</p>
                </div>
              </div>
            </div>

            {/* Agent Chat Preview */}
            <div className="relative">
              <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-4 shadow-2xl">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-700">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">A</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">Alex - Your AI Agent</p>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                      <span className="text-emerald-400 text-sm">Online now</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-700/50 rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
                    <p className="text-slate-200 text-sm">Hi! I&apos;m Alex, your personal AI real estate agent. I&apos;m here 24/7 to help you find your perfect home. What are you looking for?</p>
                  </div>
                  <div className="bg-emerald-500 rounded-2xl rounded-tr-sm p-4 max-w-[85%] ml-auto">
                    <p className="text-white text-sm">I&apos;m looking for a 3 bedroom house in Austin under $500k</p>
                  </div>
                  <div className="bg-slate-700/50 rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
                    <p className="text-slate-200 text-sm">Great choice! I found 47 properties matching your criteria. I&apos;ve already identified 5 that are priced below market value. Want me to schedule tours for this weekend?</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 backdrop-blur-sm">
                <p className="text-emerald-400 text-sm font-medium">No commission. No phone tag. No BS.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From signup to closing, your AI agent handles everything
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              {
                step: "1",
                title: "Sign Up & Meet Your Agent",
                description: "Get matched with your personal AI agent in seconds",
                icon: "👋",
              },
              {
                step: "2",
                title: "Tell It What You Want",
                description: "Describe your dream home. Your agent remembers everything.",
                icon: "💬",
              },
              {
                step: "3",
                title: "Your Agent Does the Work",
                description: "It searches, contacts sellers, schedules tours, and negotiates",
                icon: "🤖",
              },
              {
                step: "4",
                title: "Experts Verify Everything",
                description: "Licensed professionals review all contracts and legal docs",
                icon: "✅",
              },
              {
                step: "5",
                title: "Close on Your New Home",
                description: "Your agent guides you through closing day",
                icon: "🏠",
              },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center h-full hover:border-emerald-500/50 transition-all">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-sm">{item.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
                {index < 4 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/how-it-works" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Learn more about the process →
            </Link>
          </div>
        </div>
      </section>

      {/* What Your AI Agent Does Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What Your AI Agent Does
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Everything a traditional agent does, but faster, cheaper, and available 24/7
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Searches Instantly",
                description: "Scans thousands of listings in seconds, finding exactly what you want",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                ),
              },
              {
                title: "Contacts Sellers",
                description: "Reaches out to sellers and listing agents on your behalf",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: "Schedules Tours",
                description: "Books property tours around your schedule",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
              },
              {
                title: "Analyzes Market Data",
                description: "Recommends offer prices based on real data and comps",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
              },
              {
                title: "Negotiates Offers",
                description: "Handles counteroffers and negotiations objectively",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ),
              },
              {
                title: "Explains Documents",
                description: "Breaks down contracts and legal docs in plain English",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ),
              },
              {
                title: "Guides Closing",
                description: "Walks you through inspections, appraisals, and closing",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                ),
              },
              {
                title: "Available 24/7",
                description: "Nights, weekends, holidays — your agent never sleeps",
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/5"
              >
                <div className="text-emerald-400 mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Why AI Beats Traditional Agents
            </h2>
            <p className="text-slate-400 text-lg">
              Fire your real estate agent. Hire an AI.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-700/50">
              <div className="p-4"></div>
              <div className="p-4 text-center border-l border-slate-600">
                <p className="text-slate-400 text-sm">Traditional Agent</p>
              </div>
              <div className="p-4 text-center border-l border-slate-600 bg-emerald-500/10">
                <p className="text-emerald-400 font-semibold">Your AI Agent</p>
              </div>
            </div>
            {[
              { label: "Commission", traditional: "5-6% ($15k-$30k)", ai: "$0" },
              { label: "Availability", traditional: "Business hours", ai: "24/7/365" },
              { label: "Response Time", traditional: "Hours or days", ai: "Instant" },
              { label: "Bias", traditional: "Pushes higher prices", ai: "100% objective" },
              { label: "Memory", traditional: "Forgets details", ai: "Remembers everything" },
              { label: "Negotiations", traditional: "Emotionally driven", ai: "Data-driven" },
              { label: "Market Analysis", traditional: "Limited data", ai: "Millions of data points" },
              { label: "Scheduling", traditional: "Back-and-forth calls", ai: "Instant booking" },
            ].map((row, index) => (
              <div key={index} className="grid grid-cols-3 border-t border-slate-700">
                <div className="p-4 text-white font-medium">{row.label}</div>
                <div className="p-4 text-center border-l border-slate-700 text-slate-400">{row.traditional}</div>
                <div className="p-4 text-center border-l border-slate-700 text-emerald-400 font-medium bg-emerald-500/5">{row.ai}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Security Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                AI Does the Legwork.<br />
                <span className="text-emerald-400">Experts Verify Everything.</span>
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Your AI agent handles the time-consuming work, but licensed professionals
                review all legal documents, contracts, and major decisions. The best of
                both worlds: AI efficiency + human expertise when it matters.
              </p>

              <div className="space-y-4">
                {[
                  "Licensed professionals review all contracts",
                  "Real humans available whenever you need them",
                  "Legal questions answered by real attorneys",
                  "Secure, encrypted transactions",
                  "Your data is never sold",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-slate-300">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/trust" className="inline-block mt-8 text-emerald-400 hover:text-emerald-300 font-medium">
                Learn more about our trust & security →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Licensed Pros</h3>
                <p className="text-slate-400 text-sm">Review all documents</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Secure</h3>
                <p className="text-slate-400 text-sm">Encrypted transactions</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Human Support</h3>
                <p className="text-slate-400 text-sm">Available 24/7</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold mb-2">Legal Review</h3>
                <p className="text-slate-400 text-sm">Real attorney access</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Calculator Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              See How Much You&apos;ll Save
            </h2>
            <p className="text-slate-400 text-lg">
              Traditional agents charge 5-6% commission. You keep that money.
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-slate-400 mb-2">Home Price</p>
                <p className="text-4xl font-bold text-white">$500,000</p>
              </div>
              <div>
                <p className="text-slate-400 mb-2">Traditional Commission (6%)</p>
                <p className="text-4xl font-bold text-red-400">-$30,000</p>
              </div>
              <div>
                <p className="text-slate-400 mb-2">Your Savings</p>
                <p className="text-4xl font-bold text-emerald-400">$30,000</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-700 text-center">
              <Link href="/pricing" className="text-emerald-400 hover:text-emerald-300 font-medium">
                Calculate your exact savings →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Your Agent Preview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Meet Your AI Agent
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              When you sign up, you&apos;ll be matched with your own personal AI agent
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Alex", personality: "Analytical & Detail-Oriented", avatar: "A", color: "from-emerald-400 to-cyan-500" },
              { name: "Jordan", personality: "Friendly & Supportive", avatar: "J", color: "from-purple-400 to-pink-500" },
              { name: "Sam", personality: "Fast & Efficient", avatar: "S", color: "from-orange-400 to-red-500" },
            ].map((agent, index) => (
              <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 text-center hover:border-emerald-500/50 transition-all">
                <div className={`w-20 h-20 bg-gradient-to-br ${agent.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-white font-bold text-2xl">{agent.avatar}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{agent.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{agent.personality}</p>
                <div className="flex items-center justify-center gap-1">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full"></span>
                  <span className="text-emerald-400 text-sm">Ready to help</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/meet-your-agent" className="text-emerald-400 hover:text-emerald-300 font-medium">
              Learn more about our AI agents →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "My AI agent found me the perfect home in 2 weeks. I saved $22,000 in commissions.",
                name: "Sarah M.",
                location: "Austin, TX",
              },
              {
                quote: "I was skeptical, but the AI agent negotiated better than any human agent I've worked with.",
                name: "James T.",
                location: "Denver, CO",
              },
              {
                quote: "Available at midnight when I had questions. Try getting that from a traditional agent.",
                name: "Michelle R.",
                location: "Seattle, WA",
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>
                <p className="text-slate-300 mb-4">&quot;{testimonial.quote}&quot;</p>
                <div>
                  <p className="text-white font-medium">{testimonial.name}</p>
                  <p className="text-slate-400 text-sm">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Meet Your AI Agent?
            </h2>
            <p className="text-slate-300 text-lg mb-2">
              No commissions. No phone tag. No BS.
            </p>
            <p className="text-slate-400 mb-8">
              Join thousands of homebuyers who are saving money with AI
            </p>
            <Link href="/sign-up" className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-slate-100 transition-all hover:scale-105">
              Get Started Free
            </Link>
            <p className="text-slate-500 text-sm mt-4">
              No credit card required. Meet your agent in 30 seconds.
            </p>
          </div>
        </div>
      </section>

      {/* For Sellers Banner */}
      <section className="py-12 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold">Selling your home?</p>
              <p className="text-slate-400">AI agents for sellers coming soon.</p>
            </div>
            <Link href="/for-sellers" className="text-emerald-400 hover:text-emerald-300 font-medium whitespace-nowrap">
              Join the waitlist →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">RE</span>
                </div>
                <span className="text-lg font-bold text-white">
                  RealEstate<span className="text-emerald-400">AI</span>
                </span>
              </div>
              <p className="text-slate-400 text-sm">
                The future of home buying is here. AI agents that work for you, not commission.
              </p>
            </div>
            <div>
              <p className="text-white font-semibold mb-4">Product</p>
              <ul className="space-y-2">
                <li><Link href="/how-it-works" className="text-slate-400 hover:text-white text-sm">How It Works</Link></li>
                <li><Link href="/meet-your-agent" className="text-slate-400 hover:text-white text-sm">Meet Your Agent</Link></li>
                <li><Link href="/pricing" className="text-slate-400 hover:text-white text-sm">Pricing</Link></li>
                <li><Link href="/for-sellers" className="text-slate-400 hover:text-white text-sm">For Sellers</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-4">Company</p>
              <ul className="space-y-2">
                <li><Link href="/trust" className="text-slate-400 hover:text-white text-sm">Trust & Security</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white text-sm">About Us</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white text-sm">Careers</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white text-sm">Contact</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-4">Legal</p>
              <ul className="space-y-2">
                <li><Link href="#" className="text-slate-400 hover:text-white text-sm">Privacy Policy</Link></li>
                <li><Link href="#" className="text-slate-400 hover:text-white text-sm">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 RealEstateAI. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm">
              Your AI agent works for you, not commission.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
