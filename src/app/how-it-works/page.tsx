'use client';

import Link from 'next/link';
import { User, MessageSquare, Search, BarChart3, FileText, PartyPopper, Clock, Target, Shield, Scale, Check } from 'lucide-react';
import MarketingNav from '@/components/layout/MarketingNav';
import MarketingFooter from '@/components/layout/MarketingFooter';
import { FadeInView } from '@/components/ui/AnimatedSection';

const steps = [
  {
    number: 1,
    title: 'Sign Up & Get Matched',
    description: "Create your free account and tell us about your real estate goals. We'll match you with an AI agent that fits your style.",
    details: [
      'Answer a few questions about your preferences',
      'Choose your agent personality (Analyst, Guide, or Negotiator)',
      'Your agent is ready to work in under 2 minutes',
    ],
    Icon: User,
  },
  {
    number: 2,
    title: 'Tell Your Agent What You Need',
    description: "Chat naturally with your AI agent about what you're looking for. No forms, no pressure - just a conversation.",
    details: [
      'Describe your ideal property in plain English',
      'Set your budget and must-haves',
      'Get instant clarifying questions to refine the search',
    ],
    Icon: MessageSquare,
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
    Icon: Search,
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
    Icon: BarChart3,
  },
  {
    number: 5,
    title: 'Strategic Offer Preparation',
    description: "When you're ready to make an offer, your agent crafts a data-backed strategy designed to win at the right price.",
    details: [
      'Optimal offer price recommendation',
      'Contingency and terms strategy',
      'Negotiation playbook based on seller signals',
      'Human expert review before submission',
    ],
    Icon: FileText,
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
    Icon: PartyPopper,
  },
];

const faqs = [
  {
    question: 'How is this different from Zillow or Redfin?',
    answer: "Those platforms show you listings. We give you a dedicated AI agent that actively helps you evaluate, negotiate, and close - without the bias of commission-driven human agents. Your agent's only goal is helping you make the right decision.",
  },
  {
    question: 'Do I still need a real estate agent?',
    answer: 'For most transactions, your AI agent handles everything a traditional agent would - searching, analyzing, negotiating, and guiding you through closing. For complex situations or when you want human consultation, licensed experts are always available.',
  },
  {
    question: "How do you make money if you're unbiased?",
    answer: "We charge a flat fee or subscription (see pricing). Unlike traditional agents who earn more when you pay more, our revenue doesn't depend on your purchase price. This aligns our interests with yours.",
  },
  {
    question: 'Can the AI actually negotiate?',
    answer: 'Your AI agent provides negotiation strategy, optimal pricing, and prepared responses. For the actual back-and-forth with sellers/agents, you can communicate directly with our guidance, or request a human agent to handle negotiations on your behalf.',
  },
  {
    question: "What if I have questions the AI can't answer?",
    answer: 'Human experts are always available. Click "Talk to a Human" anytime to connect with a licensed real estate professional. Complex legal or financial questions are automatically escalated for human review.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes. We use bank-level encryption, never sell your data, and you can delete your account and all associated data at any time. See our Trust & Safety page for details.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <MarketingNav />

      {/* Hero */}
      <section className="bg-gradient-to-br from-emerald-500 to-cyan-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInView>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How RealEstateAI Works
            </h1>
            <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
              From first search to closing day, your AI agent guides you through
              every step - with data, not sales pitches.
            </p>
          </FadeInView>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <FadeInView key={step.number} delay={index * 0.08}>
                <div className="relative">
                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-full bg-white/10 -z-10" />
                  )}

                  <div className="flex gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
                        <step.Icon className="w-7 h-7 text-white" />
                      </div>
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl shadow-lg shadow-black/20 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                          Step {step.number}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-slate-400 mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-slate-200">
                            <Check className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* The AI Advantage */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">The AI Advantage</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                See how AI-powered real estate compares to the traditional process
              </p>
            </div>
          </FadeInView>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                Icon: Clock,
                title: 'Faster Response',
                rows: [
                  { label: 'Traditional Agent', value: 'Hours to days' },
                  { label: 'AI Agent', value: 'Instant', highlight: true },
                ],
              },
              {
                Icon: BarChart3,
                title: 'Data Analysis',
                rows: [
                  { label: 'Traditional Agent', value: 'Manual, limited' },
                  { label: 'AI Agent', value: 'Thousands of data points', highlight: true },
                ],
              },
              {
                Icon: Target,
                title: 'Bias Level',
                rows: [
                  { label: 'Traditional Agent', value: 'Commission-driven' },
                  { label: 'AI Agent', value: 'Zero bias', highlight: true },
                ],
              },
            ].map((card, index) => (
              <FadeInView key={card.title} delay={index * 0.1}>
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
                    <card.Icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{card.title}</h3>
                  <div className="space-y-2 text-sm">
                    {card.rows.map((row) => (
                      <div key={row.label} className="flex justify-between">
                        <span className="text-slate-400">{row.label}</span>
                        <span className={row.highlight ? 'text-emerald-400 font-semibold' : 'text-white'}>
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* Human Backup Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Human Experts, When You Need Them</h2>
                <p className="text-slate-300 mb-8">
                  AI handles the routine. Humans handle the complex. Our hybrid approach
                  gives you the best of both worlds.
                </p>
                <div className="space-y-4">
                  {[
                    { Icon: User, text: 'Licensed agents review every offer' },
                    { Icon: Scale, text: 'Legal experts for contract questions' },
                    { Icon: MessageSquare, text: '24/7 human support available' },
                    { Icon: Shield, text: 'Automatic escalation for unusual situations' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.Icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <span className="text-slate-200">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-700/50 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-slate-300 text-sm">Example human escalation</span>
                </div>
                <div className="space-y-4">
                  <div className="bg-emerald-500 rounded-lg p-3 ml-8">
                    <p className="text-sm">This property has some unusual deed restrictions. Can I talk to someone about this?</p>
                  </div>
                  <div className="bg-slate-600 rounded-lg p-3 mr-8">
                    <p className="text-sm">Absolutely. I&apos;m connecting you with Sarah, one of our licensed experts who specializes in title issues. She&apos;ll be with you in under 2 minutes.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInView>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            </div>
          </FadeInView>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FadeInView key={faq.question} delay={index * 0.08}>
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-slate-400">{faq.answer}</p>
                </div>
              </FadeInView>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-emerald-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInView>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-emerald-100 mb-8">
              Join thousands of buyers who&apos;ve found their perfect home with AI-powered guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="px-8 py-4 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-white/90 transition-colors"
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
          </FadeInView>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
