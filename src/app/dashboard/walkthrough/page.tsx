'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { mockProperties } from '@/lib/mock-properties';
import {
  getWalkthroughChecklist,
  WalkthroughRoom,
  WalkthroughItem,
  getStatusIcon,
  getStatusColor,
  calculateOverallRisk,
  calculateTotalRepairCosts,
} from '@/lib/walkthrough';

export default function WalkthroughPage() {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [rooms, setRooms] = useState<WalkthroughRoom[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [walkthroughStarted, setWalkthroughStarted] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const property = selectedProperty
    ? mockProperties.find(p => p.id === selectedProperty)
    : null;

  useEffect(() => {
    if (property) {
      const checklist = getWalkthroughChecklist(
        property.property_type,
        property.year_built,
        `${property.city}, ${property.state}`
      );
      setRooms(checklist);
    }
  }, [property]);

  const startWalkthrough = () => {
    setWalkthroughStarted(true);
    setActiveRoomIndex(0);
  };

  const updateItemStatus = (roomId: string, itemId: string, status: WalkthroughItem['status'], notes?: string) => {
    setRooms(prevRooms =>
      prevRooms.map(room => {
        if (room.id !== roomId) return room;
        return {
          ...room,
          items: room.items.map(item => {
            if (item.id !== itemId) return item;

            // Auto-generate repair estimates for issues
            let estimatedRepairCost: { min: number; max: number } | undefined;
            let negotiationLeverage: string | undefined;

            if (status === 'critical') {
              if (itemId.includes('roof')) {
                estimatedRepairCost = { min: 8000, max: 15000 };
                negotiationLeverage = 'Major roof issues - request $10,000+ off asking price';
              } else if (itemId.includes('foundation') || itemId.includes('foundation-cracks')) {
                estimatedRepairCost = { min: 5000, max: 25000 };
                negotiationLeverage = 'Foundation concerns - request structural engineer inspection and $15,000+ credit';
              } else if (itemId.includes('panel')) {
                estimatedRepairCost = { min: 2500, max: 4000 };
                negotiationLeverage = 'Electrical panel replacement needed - request $3,000-$4,000 credit';
              } else if (itemId.includes('hvac') || itemId.includes('ac')) {
                estimatedRepairCost = { min: 4000, max: 8000 };
                negotiationLeverage = 'HVAC replacement needed - request $5,000+ credit';
              } else if (itemId.includes('water-heater')) {
                estimatedRepairCost = { min: 1200, max: 2500 };
                negotiationLeverage = 'Water heater replacement - request $1,500-$2,000 credit';
              } else {
                estimatedRepairCost = { min: 1000, max: 3000 };
                negotiationLeverage = 'Use this issue for negotiation leverage';
              }
            } else if (status === 'warning') {
              if (itemId.includes('roof')) {
                estimatedRepairCost = { min: 500, max: 2000 };
              } else {
                estimatedRepairCost = { min: 200, max: 1000 };
              }
            }

            return {
              ...item,
              status,
              notes,
              estimatedRepairCost,
              negotiationLeverage,
            };
          }),
        };
      })
    );
  };

  const markRoomComplete = () => {
    setRooms(prevRooms =>
      prevRooms.map((room, idx) => {
        if (idx !== activeRoomIndex) return room;
        return { ...room, completed: true };
      })
    );

    if (activeRoomIndex < rooms.length - 1) {
      setActiveRoomIndex(activeRoomIndex + 1);
    } else {
      setShowReport(true);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real app, this would trigger voice recognition
  };

  const overallRisk = calculateOverallRisk(rooms);
  const repairCosts = calculateTotalRepairCosts(rooms);

  if (!walkthroughStarted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">AI-Guided Walkthrough</h1>
          <p className="text-slate-400">Select a property to start your guided inspection</p>
        </div>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Select Property</h2>
          <div className="grid gap-4">
            {mockProperties.slice(0, 5).map(prop => (
              <button
                key={prop.id}
                onClick={() => setSelectedProperty(prop.id)}
                className={`flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                  selectedProperty === prop.id
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-slate-700 hover:border-slate-600'
                }`}
              >
                <div
                  className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${prop.images[0]})` }}
                />
                <div className="flex-1">
                  <p className="text-white font-medium">{prop.address}</p>
                  <p className="text-slate-400 text-sm">{prop.city}, {prop.state}</p>
                  <p className="text-slate-500 text-xs mt-1">
                    {prop.property_type} • Built {prop.year_built} • {prop.sqft.toLocaleString()} sqft
                  </p>
                </div>
                {selectedProperty === prop.id && (
                  <span className="text-emerald-400">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {property && (
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">Walkthrough Preview</h2>
            <p className="text-slate-400 mb-4">
              Based on this property&apos;s characteristics, your walkthrough will include:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {rooms.map(room => (
                <div key={room.id} className="bg-slate-700/50 rounded-lg p-3 text-center">
                  <span className="text-2xl">{room.icon}</span>
                  <p className="text-white text-sm mt-1">{room.name}</p>
                  <p className="text-slate-400 text-xs">{room.items.length} items</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 mb-6">
          <h3 className="text-emerald-400 font-semibold mb-2">🎤 Voice-Enabled Walkthrough</h3>
          <p className="text-slate-300 text-sm">
            Enable voice mode to talk hands-free while walking through the property.
            Your AI agent will guide you room by room and record your observations.
          </p>
        </div>

        <button
          onClick={startWalkthrough}
          disabled={!selectedProperty}
          className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
            selectedProperty
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
              : 'bg-slate-700 text-slate-400 cursor-not-allowed'
          }`}
        >
          {selectedProperty ? 'Start Walkthrough' : 'Select a Property to Continue'}
        </button>
      </div>
    );
  }

  if (showReport) {
    const criticalItems = rooms.flatMap(r => r.items.filter(i => i.status === 'critical'));
    const warningItems = rooms.flatMap(r => r.items.filter(i => i.status === 'warning'));

    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Walkthrough Report</h1>
          <p className="text-slate-400">{property?.address}</p>
        </div>

        {/* Summary Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Summary</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl ${
              overallRisk === 'low' ? 'bg-green-500/10 border border-green-500/20' :
              overallRisk === 'medium' ? 'bg-yellow-500/10 border border-yellow-500/20' :
              'bg-red-500/10 border border-red-500/20'
            }`}>
              <p className="text-slate-400 text-sm mb-1">Overall Risk</p>
              <p className={`text-2xl font-bold capitalize ${
                overallRisk === 'low' ? 'text-green-400' :
                overallRisk === 'medium' ? 'text-yellow-400' :
                'text-red-400'
              }`}>{overallRisk}</p>
            </div>
            <div className="p-4 bg-slate-700/50 rounded-xl">
              <p className="text-slate-400 text-sm mb-1">Estimated Repairs</p>
              <p className="text-2xl font-bold text-white">
                ${repairCosts.min.toLocaleString()} - ${repairCosts.max.toLocaleString()}
              </p>
            </div>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <p className="text-slate-400 text-sm mb-1">Negotiation Leverage</p>
              <p className="text-2xl font-bold text-emerald-400">
                ${Math.round((repairCosts.min + repairCosts.max) / 2).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Critical Issues */}
        {criticalItems.length > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 mb-6">
            <h2 className="text-red-400 font-semibold mb-4">🚨 Critical Issues ({criticalItems.length})</h2>
            <div className="space-y-3">
              {criticalItems.map(item => (
                <div key={item.id} className="bg-slate-800 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-slate-400 text-sm">{item.notes || item.description}</p>
                    </div>
                    {item.estimatedRepairCost && (
                      <p className="text-red-400 font-semibold whitespace-nowrap">
                        ${item.estimatedRepairCost.min.toLocaleString()} - ${item.estimatedRepairCost.max.toLocaleString()}
                      </p>
                    )}
                  </div>
                  {item.negotiationLeverage && (
                    <p className="text-emerald-400 text-sm mt-2">💡 {item.negotiationLeverage}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warning Issues */}
        {warningItems.length > 0 && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 mb-6">
            <h2 className="text-yellow-400 font-semibold mb-4">⚠️ Worth Monitoring ({warningItems.length})</h2>
            <div className="space-y-3">
              {warningItems.map(item => (
                <div key={item.id} className="bg-slate-800 rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-white font-medium">{item.name}</p>
                      <p className="text-slate-400 text-sm">{item.notes || item.description}</p>
                    </div>
                    {item.estimatedRepairCost && (
                      <p className="text-yellow-400 font-semibold whitespace-nowrap">
                        ${item.estimatedRepairCost.min.toLocaleString()} - ${item.estimatedRepairCost.max.toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* AI Recommendations */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <div>
              <p className="text-white font-medium">Alex&apos;s Recommendations</p>
              <p className="text-slate-400 text-sm">Based on this walkthrough</p>
            </div>
          </div>
          <div className="space-y-3">
            {criticalItems.length > 0 && (
              <div className="p-4 bg-slate-700/50 rounded-xl">
                <p className="text-white">🔍 <strong>Get Professional Inspections</strong></p>
                <p className="text-slate-400 text-sm mt-1">
                  Based on the critical issues found, I recommend getting a professional inspection before proceeding.
                </p>
                <Link href="/dashboard/professionals" className="inline-block mt-2 text-emerald-400 text-sm">
                  Find inspectors →
                </Link>
              </div>
            )}
            <div className="p-4 bg-slate-700/50 rounded-xl">
              <p className="text-white">💰 <strong>Negotiation Strategy</strong></p>
              <p className="text-slate-400 text-sm mt-1">
                Use the estimated repair costs (${repairCosts.min.toLocaleString()} - ${repairCosts.max.toLocaleString()}) as leverage to negotiate the asking price down.
              </p>
            </div>
            {overallRisk === 'low' && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                <p className="text-emerald-400">✅ <strong>Good Condition Overall</strong></p>
                <p className="text-slate-300 text-sm mt-1">
                  This property appears to be in good condition. You can proceed with confidence to the next steps.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            href="/dashboard/documents"
            className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium text-center"
          >
            Save to Documents
          </Link>
          <button
            onClick={() => {
              setShowReport(false);
              setWalkthroughStarted(false);
              setSelectedProperty(null);
            }}
            className="flex-1 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium"
          >
            New Walkthrough
          </button>
        </div>
      </div>
    );
  }

  const currentRoom = rooms[activeRoomIndex];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">{currentRoom?.name} Inspection</h1>
          <p className="text-slate-400">Room {activeRoomIndex + 1} of {rooms.length}</p>
        </div>
        <button
          onClick={toggleListening}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
            isListening
              ? 'bg-emerald-500 text-white'
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          <span>🎤</span>
          {isListening ? 'Listening...' : 'Voice Mode'}
        </button>
      </div>

      {/* Room Progress */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {rooms.map((room, idx) => (
          <button
            key={room.id}
            onClick={() => setActiveRoomIndex(idx)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              idx === activeRoomIndex
                ? 'bg-emerald-500 text-white'
                : room.completed
                ? 'bg-slate-700 text-emerald-400'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <span>{room.icon}</span>
            <span className="text-sm">{room.name}</span>
            {room.completed && <span>✓</span>}
          </button>
        ))}
      </div>

      {/* Checklist */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 mb-6">
        <div className="space-y-4">
          {currentRoom?.items.map(item => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-colors ${
                item.status === 'critical'
                  ? 'bg-red-500/10 border-red-500/20'
                  : item.status === 'warning'
                  ? 'bg-yellow-500/10 border-yellow-500/20'
                  : item.status === 'normal'
                  ? 'bg-green-500/10 border-green-500/20'
                  : 'bg-slate-700/50 border-slate-600'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className={`font-medium ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)} {item.name}
                  </p>
                  <p className="text-slate-400 text-sm">{item.description}</p>
                </div>
              </div>

              {/* Status buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => updateItemStatus(currentRoom.id, item.id, 'normal')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    item.status === 'normal'
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                  }`}
                >
                  ✅ Normal
                </button>
                <button
                  onClick={() => updateItemStatus(currentRoom.id, item.id, 'warning')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    item.status === 'warning'
                      ? 'bg-yellow-500 text-white'
                      : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                  }`}
                >
                  ⚠️ Monitor
                </button>
                <button
                  onClick={() => updateItemStatus(currentRoom.id, item.id, 'critical')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    item.status === 'critical'
                      ? 'bg-red-500 text-white'
                      : 'bg-slate-600 text-slate-300 hover:bg-slate-500'
                  }`}
                >
                  🚨 Red Flag
                </button>
                <button className="px-3 py-1.5 bg-slate-600 text-slate-300 rounded-lg text-sm hover:bg-slate-500">
                  📷 Photo
                </button>
              </div>

              {/* Show repair estimate if flagged */}
              {item.estimatedRepairCost && (
                <div className="mt-3 p-2 bg-slate-700/50 rounded-lg">
                  <p className="text-slate-300 text-sm">
                    💰 Est. repair: ${item.estimatedRepairCost.min.toLocaleString()} - ${item.estimatedRepairCost.max.toLocaleString()}
                  </p>
                  {item.negotiationLeverage && (
                    <p className="text-emerald-400 text-sm mt-1">💡 {item.negotiationLeverage}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveRoomIndex(Math.max(0, activeRoomIndex - 1))}
          disabled={activeRoomIndex === 0}
          className="px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-medium"
        >
          ← Previous
        </button>
        <button
          onClick={markRoomComplete}
          className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium"
        >
          {activeRoomIndex === rooms.length - 1 ? 'Finish & View Report' : 'Complete & Next Room →'}
        </button>
      </div>
    </div>
  );
}
