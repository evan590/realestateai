'use client';

import Link from "next/link";
import {
  Bot, Home as HomeIcon, Zap, Search, BarChart3, MessageSquare, Check,
  DollarSign, FolderOpen, PenTool, Brain, HardHat, Landmark,
  AlertTriangle, AlertCircle, Mic, Camera, Lightbulb,
  ClipboardList, FileText, FileCheck, FilePlus, Scale,
  Wrench, Shield, Users, Lock, Clock, Mail, Calendar,
  Banknote, CreditCard, PartyPopper, Eye,
} from 'lucide-react';
import { FadeInView } from '@/components/ui/AnimatedSection';
import MarketingNav from '@/components/layout/MarketingNav';
import MarketingFooter from '@/components/layout/MarketingFooter';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <MarketingNav />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeInView>
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
                <Link href="/how-it-works" className="border border-white/10 hover:border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:bg-white/5 text-center">
                  See How It Works
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-8 pt-8 border-t border-white/10">
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
            </FadeInView>

            {/* Agent Chat Preview */}
            <FadeInView delay={0.2}>
              <div className="relative">
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
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
                    <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
                      <p className="text-slate-200 text-sm">Hi! I&apos;m Alex, your personal AI real estate agent. I&apos;m here 24/7 to help you find your perfect home. What are you looking for?</p>
                    </div>
                    <div className="bg-emerald-500 rounded-2xl rounded-tr-sm p-4 max-w-[85%] ml-auto">
                      <p className="text-white text-sm">I&apos;m looking for a 3 bedroom house in Austin under $500k</p>
                    </div>
                    <div className="bg-white/5 rounded-2xl rounded-tl-sm p-4 max-w-[85%]">
                      <p className="text-slate-200 text-sm">Great choice! I found 47 properties matching your criteria. I&apos;ve already identified 5 that are priced below market value. Want me to schedule tours for this weekend?</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 backdrop-blur-sm">
                  <p className="text-emerald-400 text-sm font-medium">No commission. No phone tag. No BS.</p>
                </div>
              </div>
            </FadeInView>
          </div>
        </div>

        {/* Decorative gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* How It Works Section */}
      <FadeInView>
        <section id="how-it-works" className="py-20 relative bg-white/[0.02]">
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
                  icon: <Users className="w-8 h-8" />,
                },
                {
                  step: "2",
                  title: "Tell It What You Want",
                  description: "Describe your dream home. Your agent remembers everything.",
                  icon: <MessageSquare className="w-8 h-8" />,
                },
                {
                  step: "3",
                  title: "Your Agent Does the Work",
                  description: "It searches, contacts sellers, schedules tours, and negotiates",
                  icon: <Bot className="w-8 h-8" />,
                },
                {
                  step: "4",
                  title: "Experts Verify Everything",
                  description: "Licensed professionals review all contracts and legal docs",
                  icon: <Check className="w-8 h-8" />,
                },
                {
                  step: "5",
                  title: "Close on Your New Home",
                  description: "Your agent guides you through closing day",
                  icon: <HomeIcon className="w-8 h-8" />,
                },
              ].map((item, index) => (
                <FadeInView key={index} delay={index * 0.1}>
                  <div className="relative">
                    <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 text-center h-full hover:border-emerald-500/50 transition-all">
                      <div className="text-emerald-400 flex justify-center mb-4">{item.icon}</div>
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
                </FadeInView>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/how-it-works" className="text-emerald-400 hover:text-emerald-300 font-medium">
                Learn more about the process →
              </Link>
            </div>
          </div>
        </section>
      </FadeInView>

      {/* What Your AI Agent Does Section */}
      <FadeInView>
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
                  icon: <Search className="w-8 h-8" />,
                },
                {
                  title: "Contacts Sellers",
                  description: "Reaches out to sellers and listing agents on your behalf",
                  icon: <Mail className="w-8 h-8" />,
                },
                {
                  title: "Schedules Tours",
                  description: "Books property tours around your schedule",
                  icon: <Calendar className="w-8 h-8" />,
                },
                {
                  title: "Analyzes Market Data",
                  description: "Recommends offer prices based on real data and comps",
                  icon: <BarChart3 className="w-8 h-8" />,
                },
                {
                  title: "Negotiates Offers",
                  description: "Handles counteroffers and negotiations objectively",
                  icon: <DollarSign className="w-8 h-8" />,
                },
                {
                  title: "Explains Documents",
                  description: "Breaks down contracts and legal docs in plain English",
                  icon: <FileText className="w-8 h-8" />,
                },
                {
                  title: "Guides Closing",
                  description: "Walks you through inspections, appraisals, and closing",
                  icon: <ClipboardList className="w-8 h-8" />,
                },
                {
                  title: "Available 24/7",
                  description: "Nights, weekends, holidays — your agent never sleeps",
                  icon: <Clock className="w-8 h-8" />,
                },
              ].map((feature, index) => (
                <FadeInView key={index} delay={index * 0.08}>
                  <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/5">
                    <div className="text-emerald-400 mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-slate-400 text-sm">{feature.description}</p>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>
      </FadeInView>

      {/* Your AI Transaction Partner Section */}
      <FadeInView>
        <section className="py-20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-1.5 mb-6">
                <span className="text-emerald-400 text-sm font-medium">Full-Stack AI Platform</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                More Than an Agent —<br />
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">A Full-Stack AI Transaction Partner</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                From first showing to closing day, your AI agent walks you through every step.
                Walkthrough guidance, document management, e-signatures, expert recommendations — all in one platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <HomeIcon className="w-8 h-8" />, title: "AI-Guided Walkthroughs", desc: "Room-by-room inspection guidance when you tour properties" },
                { icon: <FolderOpen className="w-8 h-8" />, title: "Document Command Center", desc: "All your docs in one place, explained in plain English" },
                { icon: <PenTool className="w-8 h-8" />, title: "Built-In E-Signatures", desc: "Sign offers and contracts without leaving the app" },
                { icon: <Brain className="w-8 h-8" />, title: "Proactive AI Advisor", desc: "Your agent tells you what to do next, before you ask" },
                { icon: <HardHat className="w-8 h-8" />, title: "Vetted Professionals", desc: "Connect with inspectors, attorneys, and contractors" },
                { icon: <Landmark className="w-8 h-8" />, title: "Mortgage Tools", desc: "Compare rates and track your loan application" },
              ].map((item, index) => (
                <FadeInView key={index} delay={index * 0.1}>
                  <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 hover:border-emerald-500/50 transition-all">
                    <div className="text-emerald-400 mb-4">{item.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </FadeInView>
              ))}
            </div>
          </div>
        </section>
      </FadeInView>

      {/* AI-Guided Walkthroughs Section */}
      <FadeInView>
        <section className="py-20 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-6">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 text-sm font-medium">Never Miss a Red Flag</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  AI-Guided Property Walkthroughs
                </h2>
                <p className="text-slate-400 text-lg mb-8">
                  When you tour a property, your AI agent guides you room-by-room, telling you exactly what to look for.
                  Foundation issues, roof problems, plumbing red flags — your agent catches what you&apos;d miss.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "Voice-enabled — talk hands-free while walking through",
                    "Snap photos of issues and get instant AI assessment",
                    "Dynamic checklists based on home type, age, and location",
                    "Repair cost estimates and negotiation leverage",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>

                <Link href="/dashboard/walkthrough" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium">
                  Try a walkthrough →
                </Link>
              </div>

              {/* Walkthrough UI Mockup */}
              <FadeInView delay={0.2}>
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center">
                        <Mic className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Kitchen Inspection</p>
                        <p className="text-slate-400 text-sm">Room 3 of 8</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-emerald-400">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                      <span className="text-sm">Listening...</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                      <Check className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-white text-sm font-medium">Appliances - Normal Wear</p>
                        <p className="text-slate-400 text-xs">Stainless steel appliances, ~5 years old</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                      <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-yellow-400 text-sm font-medium">Under-Sink Plumbing</p>
                        <p className="text-slate-400 text-xs">Minor water staining detected. Worth monitoring.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-red-400 text-sm font-medium">Electrical Panel - Red Flag</p>
                        <p className="text-slate-400 text-xs">Outdated Federal Pacific panel. Est. replacement: $2,500-$4,000</p>
                        <p className="text-emerald-400 text-xs mt-1 flex items-center gap-1"><Lightbulb className="w-3 h-3" /> Use this for $3,000+ negotiation leverage</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 flex gap-3">
                    <button className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
                      <Camera className="w-4 h-4" /> Take Photo
                    </button>
                    <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg text-sm transition-colors">
                      Next Room →
                    </button>
                  </div>
                </div>
              </FadeInView>
            </div>
          </div>
        </section>
      </FadeInView>

      {/* Document Command Center Section */}
      <FadeInView>
        <section className="py-20 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Document UI Mockup */}
              <FadeInView delay={0.1} className="order-2 lg:order-1">
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                    <h3 className="text-white font-medium">Document Center</h3>
                    <button className="bg-emerald-500 text-white px-3 py-1 rounded-lg text-sm">+ Upload</button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Home Inspection Report.pdf", status: "Reviewed", icon: <ClipboardList className="w-6 h-6 text-slate-300" />, alert: true },
                      { name: "Seller Disclosure.pdf", status: "Reviewed", icon: <FileText className="w-6 h-6 text-slate-300" />, alert: false },
                      { name: "Purchase Agreement.pdf", status: "Pending Signature", icon: <PenTool className="w-6 h-6 text-slate-300" />, alert: false },
                      { name: "Title Report.pdf", status: "New", icon: <FilePlus className="w-6 h-6 text-slate-300" />, alert: false },
                    ].map((doc, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                        {doc.icon}
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{doc.name}</p>
                          <p className="text-slate-400 text-xs">{doc.status}</p>
                        </div>
                        {doc.alert && (
                          <span className="bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" /> 2 flags
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <p className="text-emerald-400 text-sm font-medium mb-1 flex items-center gap-1"><Bot className="w-4 h-4" /> AI Summary</p>
                    <p className="text-slate-300 text-xs">The inspection report notes foundation concerns on page 12. I recommend getting a structural engineer&apos;s opinion before proceeding.</p>
                  </div>
                </div>
              </FadeInView>

              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Every Document. One Place.<br />
                  <span className="text-emerald-400">Zero Confusion.</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8">
                  Inspections, contracts, disclosures — all stored securely and explained in plain English by your AI agent.
                  Sign everything without leaving the app.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "AI-generated plain English summaries for every document",
                    "Important items highlighted and explained",
                    "Search across all documents instantly",
                    "Built-in e-signatures — no DocuSign needed",
                    "Share securely with your team",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>

                <Link href="/dashboard/documents" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium">
                  Explore the document center →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeInView>

      {/* Proactive AI Advisor Section */}
      <FadeInView>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  AI That Advises,<br />
                  <span className="text-emerald-400">Not Just Assists</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8">
                  Your AI agent doesn&apos;t wait for you to ask. It analyzes your walkthrough findings, reviews your documents,
                  and tells you exactly what to do next — and when to call in an expert.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                    <Check className="w-6 h-6 text-emerald-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-white font-medium">Normal for homes this age</p>
                      <p className="text-slate-400 text-sm">No action needed — proceed with confidence</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                    <AlertTriangle className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-yellow-400 font-medium">Worth investigating</p>
                      <p className="text-slate-400 text-sm">Here&apos;s what I recommend and who to call</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                    <AlertCircle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-red-400 font-medium">Potential deal-breaker</p>
                      <p className="text-slate-400 text-sm">Do not proceed without expert review</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Advisor Mockup */}
              <FadeInView delay={0.2}>
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-white/10">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">A</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Alex&apos;s Recommendations</p>
                      <p className="text-slate-400 text-sm">Based on your 123 Oak St walkthrough</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-red-400" />
                        <span className="text-red-400 font-semibold">Action Required</span>
                      </div>
                      <p className="text-white text-sm mb-2">Based on the foundation cracks you photographed, I recommend getting a structural engineer inspection before proceeding.</p>
                      <button className="bg-emerald-500 text-white text-sm px-4 py-2 rounded-lg">Find Structural Engineers →</button>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-400 font-semibold">Negotiation Leverage</span>
                      </div>
                      <p className="text-white text-sm">The electrical panel issue could be worth <span className="text-emerald-400 font-bold">$3,000-$4,000</span> off the asking price.</p>
                    </div>
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <p className="text-emerald-400 font-semibold mb-1 flex items-center gap-1"><BarChart3 className="w-4 h-4" /> Overall Risk Assessment</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white/10 rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '60%' }}></div>
                        </div>
                        <span className="text-yellow-400 text-sm font-medium">Medium Risk</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeInView>
            </div>
          </div>
        </section>
      </FadeInView>

      {/* Connect with Trusted Pros Section */}
      <FadeInView>
        <section className="py-20 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                When You Need a Human,<br />
                <span className="text-emerald-400">We&apos;ve Got You</span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Your AI handles the legwork, but some things need a human touch. Instantly connect with
                top-rated local inspectors, attorneys, contractors, and mortgage brokers — all vetted and ready to help.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Search className="w-8 h-8" />, title: "Home Inspectors", desc: "Certified professionals for thorough inspections" },
                { icon: <HardHat className="w-8 h-8" />, title: "Structural Engineers", desc: "Foundation and structural assessments" },
                { icon: <Scale className="w-8 h-8" />, title: "Real Estate Attorneys", desc: "Contract review and legal guidance" },
                { icon: <Wrench className="w-8 h-8" />, title: "Contractors", desc: "Roof, plumbing, electrical, and more" },
                { icon: <DollarSign className="w-8 h-8" />, title: "Mortgage Brokers", desc: "Best rates from multiple lenders" },
                { icon: <ClipboardList className="w-8 h-8" />, title: "Appraisers", desc: "Professional property valuations" },
                { icon: <HomeIcon className="w-8 h-8" />, title: "Title Companies", desc: "Title search and insurance" },
                { icon: <Shield className="w-8 h-8" />, title: "Insurance Agents", desc: "Home insurance quotes and coverage" },
              ].map((pro, index) => (
                <FadeInView key={index} delay={index * 0.08}>
                  <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 hover:border-emerald-500/50 transition-all text-center">
                    <div className="text-emerald-400 flex justify-center mb-4">{pro.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{pro.title}</h3>
                    <p className="text-slate-400 text-sm">{pro.desc}</p>
                  </div>
                </FadeInView>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/dashboard/professionals" className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl font-medium transition-colors">
                Browse Professionals →
              </Link>
            </div>
          </div>
        </section>
      </FadeInView>

      {/* Financing Built In Section */}
      <FadeInView>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                  Mortgage Tools<br />
                  <span className="text-emerald-400">Inside the Platform</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8">
                  Compare rates, track your loan application, and get pre-approval guidance — all without leaving the app.
                  Your AI agent even explains mortgage terms in plain English.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: <BarChart3 className="w-6 h-6" />, title: "Rate Comparison", desc: "See rates from multiple lenders" },
                    { icon: <Banknote className="w-6 h-6" />, title: "Affordability Calc", desc: "Know your buying power" },
                    { icon: <ClipboardList className="w-6 h-6" />, title: "Loan Tracking", desc: "Monitor application status" },
                    { icon: <FileText className="w-6 h-6" />, title: "Doc Upload", desc: "Submit lender requirements" },
                  ].map((item, index) => (
                    <div key={index} className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-xl p-4">
                      <div className="text-emerald-400 mb-2">{item.icon}</div>
                      <p className="text-white font-medium text-sm">{item.title}</p>
                      <p className="text-slate-400 text-xs">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <Link href="/dashboard/mortgage" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 font-medium">
                  Explore mortgage tools →
                </Link>
              </div>

              {/* Mortgage UI Mockup */}
              <FadeInView delay={0.2}>
                <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-2xl">
                  <h3 className="text-white font-semibold mb-4">Your Mortgage Snapshot</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl">
                      <p className="text-slate-400 text-sm mb-1">Pre-Approved Amount</p>
                      <p className="text-3xl font-bold text-emerald-400">$485,000</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-slate-400 text-sm mb-1">Best Rate Found</p>
                        <p className="text-xl font-bold text-white">6.25%</p>
                        <p className="text-emerald-400 text-xs">30-yr fixed</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-xl">
                        <p className="text-slate-400 text-sm mb-1">Est. Monthly</p>
                        <p className="text-xl font-bold text-white">$2,984</p>
                        <p className="text-slate-400 text-xs">Principal + Interest</p>
                      </div>
                    </div>
                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                      <p className="text-emerald-400 text-sm flex items-start gap-1"><Bot className="w-4 h-4 mt-0.5 shrink-0" /> Alex says: &quot;Based on your income and the current rates, I recommend locking in soon. Rates are expected to rise next month.&quot;</p>
                    </div>
                  </div>
                </div>
              </FadeInView>
            </div>
          </div>
        </section>
      </FadeInView>

      {/* Comparison Section */}
      <FadeInView>
        <section className="py-20 bg-white/[0.02]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Why AI Beats Traditional Agents
              </h2>
              <p className="text-slate-400 text-lg">
                Fire your real estate agent. Hire an AI.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 bg-white/5">
                <div className="p-4"></div>
                <div className="p-4 text-center border-l border-white/10">
                  <p className="text-slate-400 text-sm">Traditional Agent</p>
                </div>
                <div className="p-4 text-center border-l border-white/10 bg-emerald-500/10">
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
                <div key={index} className="grid grid-cols-3 border-t border-white/10">
                  <div className="p-4 text-white font-medium">{row.label}</div>
                  <div className="p-4 text-center border-l border-white/10 text-slate-400">{row.traditional}</div>
                  <div className="p-4 text-center border-l border-white/10 text-emerald-400 font-medium bg-emerald-500/5">{row.ai}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </FadeInView>

      {/* Trust & Security Section */}
      <FadeInView>
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
                        <Check className="w-4 h-4 text-emerald-400" />
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
                {[
                  { icon: <Shield className="w-8 h-8 text-emerald-400" />, title: "Licensed Pros", desc: "Review all documents" },
                  { icon: <Lock className="w-8 h-8 text-emerald-400" />, title: "Secure", desc: "Encrypted transactions" },
                  { icon: <Users className="w-8 h-8 text-emerald-400" />, title: "Human Support", desc: "Available 24/7" },
                  { icon: <Scale className="w-8 h-8 text-emerald-400" />, title: "Legal Review", desc: "Real attorney access" },
                ].map((card, index) => (
                  <FadeInView key={index} delay={index * 0.1}>
                    <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                      <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        {card.icon}
                      </div>
                      <h3 className="text-white font-semibold mb-2">{card.title}</h3>
                      <p className="text-slate-400 text-sm">{card.desc}</p>
                    </div>
                  </FadeInView>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInView>

      {/* One Platform Journey Section */}
      <FadeInView>
        <section className="py-20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                One Platform. Entire Transaction.
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                This isn&apos;t just an AI assistant — it&apos;s a full-stack AI transaction partner that replaces confusion,
                reduces risk, and walks you from first showing to closing, all in one place.
              </p>
            </div>

            {/* Journey Timeline */}
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-white/10 -translate-y-1/2"></div>
              <div className="grid md:grid-cols-6 gap-6">
                {[
                  { icon: <Search className="w-7 h-7" />, title: "Search", desc: "Find properties" },
                  { icon: <HomeIcon className="w-7 h-7" />, title: "Tour", desc: "AI-guided walkthroughs" },
                  { icon: <BarChart3 className="w-7 h-7" />, title: "Analyze", desc: "Get AI insights" },
                  { icon: <FileText className="w-7 h-7" />, title: "Documents", desc: "Store & sign" },
                  { icon: <HardHat className="w-7 h-7" />, title: "Experts", desc: "Connect with pros" },
                  { icon: <PartyPopper className="w-7 h-7" />, title: "Close", desc: "Get your keys" },
                ].map((step, index) => (
                  <FadeInView key={index} delay={index * 0.1}>
                    <div className="relative text-center">
                      <div className="w-16 h-16 bg-slate-800 border-2 border-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-400 relative z-10">
                        {step.icon}
                      </div>
                      <h3 className="text-white font-semibold">{step.title}</h3>
                      <p className="text-slate-400 text-sm">{step.desc}</p>
                    </div>
                  </FadeInView>
                ))}
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/sign-up" className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:scale-105">
                Start Your Journey →
              </Link>
            </div>
          </div>
        </section>
      </FadeInView>

      {/* Savings Calculator Section */}
      <FadeInView>
        <section className="py-20 bg-white/[0.02]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                See How Much You&apos;ll Save
              </h2>
              <p className="text-slate-400 text-lg">
                Traditional agents charge 5-6% commission. You keep that money.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8">
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
              <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <Link href="/pricing" className="text-emerald-400 hover:text-emerald-300 font-medium">
                  Calculate your exact savings →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </FadeInView>

      {/* Meet Your Agent Preview Section */}
      <FadeInView>
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
                <FadeInView key={index} delay={index * 0.1}>
                  <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:border-emerald-500/50 transition-all">
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
                </FadeInView>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/meet-your-agent" className="text-emerald-400 hover:text-emerald-300 font-medium">
                Learn more about our AI agents →
              </Link>
            </div>
          </div>
        </section>
      </FadeInView>

      {/* Testimonials Section */}
      <FadeInView>
        <section className="py-20 bg-white/[0.02]">
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
                <FadeInView key={index} delay={index * 0.1}>
                  <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-6">
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
                </FadeInView>
              ))}
            </div>
          </div>
        </section>
      </FadeInView>

      {/* Final CTA Section */}
      <FadeInView>
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
      </FadeInView>

      {/* For Sellers Banner */}
      <section className="py-12 bg-white/[0.03]">
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
      <MarketingFooter />
    </div>
  );
}
