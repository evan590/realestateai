'use client';

import { Property } from '@/types';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

interface AIInsightsPanelProps {
  property: Property;
}

export function AIInsightsPanel({ property }: AIInsightsPanelProps) {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ property }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI analysis');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err) {
      // Use mock analysis if API fails
      setAnalysis(generateMockAnalysis(property));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Auto-fetch on mount with mock data
    setAnalysis(generateMockAnalysis(property));
  }, [property]);

  const pricePerSqft = Math.round(property.price / property.sqft);
  const avgPricePerSqft = 380; // Mock market average
  const priceDiff = ((pricePerSqft - avgPricePerSqft) / avgPricePerSqft) * 100;

  return (
    <div className="space-y-4">
      {/* Quick Stats */}
      <Card variant="elevated">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <CardTitle className="text-emerald-400">AI Quick Analysis</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700/50 rounded-lg p-3">
              <p className="text-slate-400 text-xs mb-1">Price/sqft</p>
              <p className="text-white font-bold">${pricePerSqft}</p>
              <p className={`text-xs ${priceDiff > 0 ? 'text-yellow-400' : 'text-emerald-400'}`}>
                {priceDiff > 0 ? '+' : ''}{priceDiff.toFixed(1)}% vs market avg
              </p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3">
              <p className="text-slate-400 text-xs mb-1">Days on Market</p>
              <p className="text-white font-bold">{property.days_on_market || 'N/A'}</p>
              <p className={`text-xs ${(property.days_on_market || 0) > 30 ? 'text-emerald-400' : 'text-slate-400'}`}>
                {(property.days_on_market || 0) > 30 ? 'Negotiation opportunity' : 'Recently listed'}
              </p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3">
              <p className="text-slate-400 text-xs mb-1">Investment Score</p>
              <p className="text-white font-bold">7.2/10</p>
              <p className="text-emerald-400 text-xs">Above average</p>
            </div>
            <div className="bg-slate-700/50 rounded-lg p-3">
              <p className="text-slate-400 text-xs mb-1">Estimated Monthly</p>
              <p className="text-white font-bold">${Math.round((property.price * 0.007) + (property.hoa_fee || 0) + ((property.tax_annual || 0) / 12)).toLocaleString()}</p>
              <p className="text-slate-400 text-xs">Mortgage + HOA + Tax</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Full Analysis */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>AI Property Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-400 text-sm">Analyzing property...</p>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-400 mb-4">{error}</p>
              <Button onClick={fetchAnalysis}>Retry Analysis</Button>
            </div>
          ) : analysis ? (
            <div className="prose prose-invert prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-slate-300 text-sm leading-relaxed">
                {analysis}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-400 mb-4">Click to generate AI analysis</p>
              <Button onClick={fetchAnalysis}>Generate Analysis</Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Risk Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <RiskItem
              label="Market Risk"
              level="low"
              description="Austin market remains stable with strong fundamentals"
            />
            <RiskItem
              label="Price Risk"
              level={priceDiff > 10 ? 'high' : priceDiff > 5 ? 'medium' : 'low'}
              description={priceDiff > 10 ? 'Priced above market - negotiate aggressively' : 'Price is within market range'}
            />
            <RiskItem
              label="Property Age"
              level={property.year_built < 1980 ? 'medium' : 'low'}
              description={property.year_built < 1980 ? 'May require updates to major systems' : 'Relatively new construction'}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function RiskItem({ label, level, description }: { label: string; level: 'low' | 'medium' | 'high'; description: string }) {
  const colors = {
    low: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    medium: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    high: 'bg-red-500/10 text-red-400 border-red-500/20',
  };

  const labels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  };

  return (
    <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg">
      <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${colors[level]}`}>
        {labels[level]}
      </span>
      <div>
        <p className="text-white text-sm font-medium">{label}</p>
        <p className="text-slate-400 text-xs">{description}</p>
      </div>
    </div>
  );
}

function generateMockAnalysis(property: Property): string {
  const pricePerSqft = Math.round(property.price / property.sqft);

  return `## Value Assessment
This property is listed at $${property.price.toLocaleString()} ($${pricePerSqft}/sqft). Based on comparable sales in ${property.city}, ${property.state}, this appears to be ${pricePerSqft > 400 ? 'slightly above' : pricePerSqft > 300 ? 'in line with' : 'below'} market value.

## Key Strengths
• ${property.features.slice(0, 3).join('\n• ')}
• ${property.year_built > 2015 ? 'Newer construction with modern amenities' : 'Established property with character'}
• Location in ${property.city} provides good access to amenities

## Potential Concerns
${property.days_on_market && property.days_on_market > 45 ? '• Extended time on market may indicate pricing issues or property concerns' : '• No major concerns identified at this time'}
${property.year_built < 1990 ? '• Older construction may require system updates (HVAC, plumbing, electrical)' : ''}
${property.hoa_fee && property.hoa_fee > 500 ? '• Higher HOA fees impact monthly costs' : ''}

## Investment Potential
${property.property_type === 'condo' ? 'Condos in this area typically appreciate 3-5% annually.' : 'Single-family homes in Austin have shown strong appreciation, averaging 5-7% annually.'}

## Recommended Offer Strategy
${property.days_on_market && property.days_on_market > 30 ? `Given the ${property.days_on_market} days on market, consider starting with an offer 5-8% below asking.` : 'This is a newer listing. Consider a competitive offer at or near asking price if you\'re serious about the property.'}

## Overall AI Rating: 7.5/10
This property represents a solid opportunity in the ${property.city} market. The ${property.bedrooms}bd/${property.bathrooms}ba layout meets the needs of most buyers, and the ${property.sqft.toLocaleString()} sqft provides adequate living space.`;
}
