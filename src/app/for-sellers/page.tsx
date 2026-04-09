'use client';

import Link from 'next/link';
import { BarChart3, Camera, Calendar, MessageSquare, FileText, Handshake, Search, DollarSign, Bot, Home } from 'lucide-react';
import MarketingNav from '@/components/layout/MarketingNav';
import MarketingFooter from '@/components/layout/MarketingFooter';
import { FadeInView } from '@/components/ui/AnimatedSection';

const features = [
  {
    icon: BarChart3,
    title: 'Smart Pricing',
    description: 'AI analyzes thousands of comparable sales to recommend the optimal listing price - maximizing your return while ensuring competitive positioning.',
  },
  {
    icon: Camera,
    title: 'Listing Optimization',
    description: 'AI-crafted descriptions, photo recommendations, and listing strategies tailored to highlight what buyers in your market are looking for.',
  },
  {
    icon: Calendar,
    title: 'Showing Coordination',
    description: "Automated scheduling, buyer screening, and follow-up. Your AI agent handles the logistics so you don't have to.",
  },
  {
    icon: MessageSquare,
    title: 'Buyer Communication',
    description: 'Your AI agent responds to inquiries 24/7, answers questions about your property, and qualifies interested buyers.',
  },
  {
    icon: FileText,
    title: 'Offer Analysis',
    description: 'Side-by-side comparison of offers with AI insights on terms, buyer strength, and likelihood to close. Never miss a detail.',
  },
  {
    icon: Handshake,
    title: 'Negotiation Support',
    description: 'Strategic counter-offer recommendations based on market data and buyer behavior. Maximize your sale price with data-driven tactics.',
  },
];

const buyerFeatures = [
  { icon: Search, text: 'Smart Search' },
  { icon: BarChart3, text: 'Market Analysis' },
  { icon: DollarSign, text: 'Offer Strategy' },
  { icon: Bot, text: 'AI Assistant' },
];

export default function ForSellersPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <MarketingNav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-600 to-cyan-600 text-white py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInView>
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <span className="text-emerald-100">Now Available</span>
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
                href="/dashboard/seller/listings/new"
                className="px-8 py-4 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-white/90 transition-colors"
              >
                Start Selling
              </Link>
              <Link
                href="/"
                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Explore Buyer Agent
              </Link>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">What&apos;s Coming</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Everything you need to sell your home, powered by AI
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <FadeInView key={item.title} delay={index * 0.1}>
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400">{item.description}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Preview */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-2xl p-8 md:p-12 text-white">
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
          </FadeInView>
        </div>
      </section>

      {/* How It Will Work */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">How It Will Work</h2>
            </div>
          </FadeInView>

          <div className="space-y-8">
            {[
              { step: 1, title: 'Tell Us About Your Property', description: 'Answer a few questions about your home. Upload photos, share details about recent updates, and set your timeline.' },
              { step: 2, title: 'Get Your AI Pricing Analysis', description: 'Receive a comprehensive market analysis with a recommended listing price, supported by comparable sales data and market trends.' },
              { step: 3, title: 'Launch Your Listing', description: "Your AI agent creates an optimized listing and syndicates it across major platforms. Professional photos? We'll connect you with vetted local photographers." },
              { step: 4, title: 'Let AI Handle the Day-to-Day', description: 'Your agent manages inquiries, schedules showings, and keeps you updated. Human experts available for complex situations.' },
              { step: 5, title: 'Review Offers with AI Insights', description: 'When offers come in, your AI provides analysis on each one - price, terms, contingencies, and buyer strength.' },
              { step: 6, title: 'Close with Confidence', description: 'Your AI guides you through negotiations and closing, with human transaction coordinators ensuring everything goes smoothly.' },
            ].map((item, index) => (
              <FadeInView key={item.step} delay={index * 0.08}>
                <div className="flex gap-6">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400">{item.description}</p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Start Selling */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInView>
            <h2 className="text-3xl font-bold mb-4">Ready to Sell Smarter?</h2>
            <p className="text-slate-400 mb-8">
              List your property with AI-powered tools and save thousands on commissions.
            </p>
            <Link
              href="/dashboard/seller/listings/new"
              className="inline-block px-8 py-4 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
            >
              Start Selling
            </Link>
          </FadeInView>
        </div>
      </section>

      {/* Current Offering */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="bg-emerald-500/10 border border-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    Looking to Buy Instead?
                  </h2>
                  <p className="text-slate-400 mb-6">
                    Our Buyer Agent is available now. Get AI-powered property search,
                    analysis, and negotiation support today.
                  </p>
                  <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                  >
                    Explore Buyer Agent
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {buyerFeatures.map((item) => (
                    <div key={item.text} className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
                      <div className="w-10 h-10 mx-auto bg-emerald-500/10 rounded-lg flex items-center justify-center mb-2">
                        <item.icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <p className="text-slate-200 font-medium text-sm">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
