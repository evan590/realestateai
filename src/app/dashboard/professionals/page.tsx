'use client';

import { useState } from 'react';
import {
  mockProfessionals,
  Professional,
  ProfessionalCategory,
  categoryLabels,
  categoryIcons,
  getAvailabilityBadge,
  getAIRecommendedProfessionals,
  searchProfessionals,
} from '@/lib/professionals';

type FilterCategory = ProfessionalCategory | 'all' | 'ai_recommended';

export default function ProfessionalsPage() {
  const [professionals] = useState<Professional[]>(mockProfessionals);
  const [selectedPro, setSelectedPro] = useState<Professional | null>(null);
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'experience'>('rating');

  // Filter and search
  let filteredPros = searchQuery
    ? searchProfessionals(searchQuery)
    : filterCategory === 'all'
    ? professionals
    : filterCategory === 'ai_recommended'
    ? getAIRecommendedProfessionals()
    : professionals.filter(p => p.category === filterCategory);

  // Sort
  filteredPros = [...filteredPros].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return a.distance - b.distance;
      case 'experience':
        return b.yearsExperience - a.yearsExperience;
      default:
        return b.rating - a.rating;
    }
  });

  const aiRecommendedCount = getAIRecommendedProfessionals().length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🔧</span>
            <h1 className="text-3xl font-bold text-white">Find Professionals</h1>
          </div>
        </div>
        <p className="text-slate-400">
          Vetted local professionals recommended by AI based on your needs
        </p>
      </div>

      {/* AI Recommendations Banner */}
      <div className="bg-gradient-to-r from-emerald-900/50 to-slate-800 border border-emerald-700/50 rounded-xl p-6 mb-8">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center text-2xl">
            🤖
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white mb-2">AI Recommendations for You</h2>
            <p className="text-slate-300 text-sm mb-4">
              Based on your walkthrough findings and transaction needs, I've identified
              {aiRecommendedCount} professionals who are perfect matches for your situation.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                🚨 Electrician needed for panel upgrade
              </span>
              <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                🔍 Inspector for foundation check
              </span>
            </div>
          </div>
          <button
            onClick={() => setFilterCategory('ai_recommended')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
          >
            View AI Picks
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        {/* Search */}
        <div className="flex-1 relative">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search by name, company, or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="rating">Sort by Rating</option>
          <option value="distance">Sort by Distance</option>
          <option value="experience">Sort by Experience</option>
        </select>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            filterCategory === 'all'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterCategory('ai_recommended')}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
            filterCategory === 'ai_recommended'
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <span>🤖</span>
          <span>AI Recommended</span>
        </button>
        {(Object.keys(categoryLabels) as ProfessionalCategory[]).slice(0, 8).map(category => (
          <button
            key={category}
            onClick={() => setFilterCategory(category)}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterCategory === category
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {categoryIcons[category]} {categoryLabels[category]}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Professionals List */}
        <div className={`${selectedPro ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPros.map(pro => (
              <ProfessionalCard
                key={pro.id}
                professional={pro}
                isSelected={selectedPro?.id === pro.id}
                onClick={() => setSelectedPro(pro)}
              />
            ))}
          </div>

          {filteredPros.length === 0 && (
            <div className="text-center py-12">
              <span className="text-4xl mb-4 block">🔍</span>
              <p className="text-slate-400">No professionals found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedPro && (
          <div className="lg:col-span-1">
            <ProfessionalDetail
              professional={selectedPro}
              onClose={() => setSelectedPro(null)}
              onContact={() => setShowContactModal(true)}
            />
          </div>
        )}
      </div>

      {/* Contact Modal */}
      {showContactModal && selectedPro && (
        <ContactModal
          professional={selectedPro}
          onClose={() => setShowContactModal(false)}
        />
      )}
    </div>
  );
}

function ProfessionalCard({
  professional,
  isSelected,
  onClick,
}: {
  professional: Professional;
  isSelected: boolean;
  onClick: () => void;
}) {
  const availabilityBadge = getAvailabilityBadge(professional.availability);

  return (
    <div
      onClick={onClick}
      className={`bg-slate-800/50 border rounded-xl p-5 cursor-pointer transition-all hover:bg-slate-800 ${
        isSelected ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-2xl">
            {professional.avatar}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-white font-semibold">{professional.name}</h3>
              {professional.verified && (
                <span className="text-emerald-400 text-sm">✓</span>
              )}
            </div>
            <p className="text-slate-400 text-sm">{professional.company}</p>
          </div>
        </div>
        {professional.aiRecommended && (
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
            AI Pick
          </span>
        )}
      </div>

      <div className="flex items-center space-x-3 mb-3">
        <span className="text-slate-400 text-sm">
          {categoryIcons[professional.category]} {categoryLabels[professional.category]}
        </span>
        <span className="text-slate-600">•</span>
        <span className="text-slate-400 text-sm">{professional.distance} mi</span>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-1">
          <span className="text-yellow-400">★</span>
          <span className="text-white font-medium">{professional.rating}</span>
          <span className="text-slate-500 text-sm">({professional.reviewCount})</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs border ${availabilityBadge.color}`}>
          {availabilityBadge.label}
        </span>
      </div>

      <div className="flex flex-wrap gap-1">
        {professional.specialties.slice(0, 2).map(specialty => (
          <span
            key={specialty}
            className="px-2 py-0.5 bg-slate-700/50 text-slate-400 rounded text-xs"
          >
            {specialty}
          </span>
        ))}
        {professional.specialties.length > 2 && (
          <span className="px-2 py-0.5 bg-slate-700/50 text-slate-400 rounded text-xs">
            +{professional.specialties.length - 2}
          </span>
        )}
      </div>

      {professional.aiRecommended && professional.aiRecommendReason && (
        <div className="mt-3 pt-3 border-t border-slate-700">
          <p className="text-emerald-300 text-xs">
            🤖 {professional.aiRecommendReason}
          </p>
        </div>
      )}
    </div>
  );
}

function ProfessionalDetail({
  professional,
  onClose,
  onContact,
}: {
  professional: Professional;
  onClose: () => void;
  onContact: () => void;
}) {
  const availabilityBadge = getAvailabilityBadge(professional.availability);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl sticky top-6">
      {/* Header */}
      <div className="p-5 border-b border-slate-700">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center text-3xl">
              {professional.avatar}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl font-bold text-white">{professional.name}</h2>
                {professional.verified && (
                  <span className="text-emerald-400">✓ Verified</span>
                )}
              </div>
              <p className="text-slate-400">{professional.company}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-5 max-h-[500px] overflow-y-auto">
        {/* AI Recommendation */}
        {professional.aiRecommended && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-emerald-400 mb-2">
              <span>🤖</span>
              <span className="font-medium">AI Recommended</span>
            </div>
            <p className="text-slate-300 text-sm">{professional.aiRecommendReason}</p>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <span className="text-yellow-400">★</span>
              <span className="text-xl font-bold text-white">{professional.rating}</span>
            </div>
            <p className="text-slate-400 text-xs">{professional.reviewCount} reviews</p>
          </div>
          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
            <p className="text-xl font-bold text-white">{professional.yearsExperience}+</p>
            <p className="text-slate-400 text-xs">Years exp.</p>
          </div>
          <div className="text-center p-3 bg-slate-700/30 rounded-lg">
            <p className="text-xl font-bold text-white">{professional.completedJobs.toLocaleString()}</p>
            <p className="text-slate-400 text-xs">Jobs done</p>
          </div>
        </div>

        {/* Availability & Response */}
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-sm border ${availabilityBadge.color}`}>
            {availabilityBadge.label}
          </span>
          <span className="text-slate-400 text-sm">
            Response: {professional.responseTime}
          </span>
        </div>

        {/* Bio */}
        <div>
          <h3 className="text-white font-medium mb-2">About</h3>
          <p className="text-slate-300 text-sm">{professional.bio}</p>
        </div>

        {/* Specialties */}
        <div>
          <h3 className="text-white font-medium mb-2">Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {professional.specialties.map(specialty => (
              <span
                key={specialty}
                className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-sm"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Licenses */}
        {professional.licenses && (
          <div>
            <h3 className="text-white font-medium mb-2">Licenses & Certifications</h3>
            <div className="space-y-1">
              {professional.licenses.map(license => (
                <div key={license} className="flex items-center space-x-2 text-sm">
                  <span className="text-emerald-400">✓</span>
                  <span className="text-slate-300">{license}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Insurance */}
        {professional.insuranceVerified && (
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-emerald-400">🛡️</span>
            <span className="text-slate-300">Insurance Verified</span>
          </div>
        )}

        {/* Pricing */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Price Range</span>
          <span className="text-white font-medium">{professional.priceRange}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 border-t border-slate-700 space-y-3">
        <button
          onClick={onContact}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <span>📞</span>
          <span>Contact {professional.name.split(' ')[0]}</span>
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button className="py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
            View Reviews
          </button>
          <button className="py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
            Save Pro
          </button>
        </div>
      </div>
    </div>
  );
}

function ContactModal({
  professional,
  onClose,
}: {
  professional: Professional;
  onClose: () => void;
}) {
  const [contactMethod, setContactMethod] = useState<'call' | 'message' | 'schedule'>('message');
  const [message, setMessage] = useState('');

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-lg w-full">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center text-2xl">
                {professional.avatar}
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Contact {professional.name}</h2>
                <p className="text-slate-400 text-sm">{categoryLabels[professional.category]}</p>
              </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Contact Method */}
          <div>
            <p className="text-white font-medium mb-3">How would you like to reach out?</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setContactMethod('call')}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  contactMethod === 'call'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-600 text-slate-400 hover:border-slate-500'
                }`}
              >
                <span className="text-2xl block mb-1">📞</span>
                <span className="text-sm">Call Now</span>
              </button>
              <button
                onClick={() => setContactMethod('message')}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  contactMethod === 'message'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-600 text-slate-400 hover:border-slate-500'
                }`}
              >
                <span className="text-2xl block mb-1">💬</span>
                <span className="text-sm">Message</span>
              </button>
              <button
                onClick={() => setContactMethod('schedule')}
                className={`p-3 rounded-lg border text-center transition-colors ${
                  contactMethod === 'schedule'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-600 text-slate-400 hover:border-slate-500'
                }`}
              >
                <span className="text-2xl block mb-1">📅</span>
                <span className="text-sm">Schedule</span>
              </button>
            </div>
          </div>

          {contactMethod === 'call' && (
            <div className="text-center py-4">
              <p className="text-slate-300 mb-4">Ready to call?</p>
              <a
                href={`tel:${professional.phone}`}
                className="inline-flex items-center space-x-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
              >
                <span>📞</span>
                <span>{professional.phone}</span>
              </a>
            </div>
          )}

          {contactMethod === 'message' && (
            <div>
              <label className="text-slate-400 text-sm block mb-2">Your Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi, I'm interested in your services for my home purchase..."
                rows={4}
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-slate-500 text-xs mt-2">
                Your contact info will be shared so they can respond
              </p>
            </div>
          )}

          {contactMethod === 'schedule' && (
            <div className="space-y-4">
              <p className="text-slate-300">Select a time that works for you:</p>
              <div className="grid grid-cols-2 gap-2">
                {['Tomorrow 9am', 'Tomorrow 2pm', 'Wed 10am', 'Wed 3pm'].map(time => (
                  <button
                    key={time}
                    className="p-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-700 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
            {contactMethod === 'call' ? 'Call' : contactMethod === 'message' ? 'Send Message' : 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
