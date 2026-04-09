'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createListing } from '@/lib/seller-store';
import { SellerListing } from '@/types';
import { formatPrice } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Camera, Tag, Check, Zap } from '@/lib/icons';

type Step = 1 | 2 | 3 | 4 | 5;

const propertyTypes = [
  { value: 'single_family', label: 'Single Family' },
  { value: 'condo', label: 'Condo' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'multi_family', label: 'Multi-Family' },
  { value: 'land', label: 'Land' },
];

const featureOptions = [
  'Central AC', 'Hardwood Floors', 'Smart Home', 'Garage', 'Pool',
  'Backyard', 'Solar Panels', 'Home Office', 'Fireplace', 'Updated Kitchen',
  'Stainless Appliances', 'Granite Counters', 'Walk-in Closet', 'Laundry Room',
  'Covered Patio', 'Fence', 'Sprinkler System', 'Security System',
];

export default function NewListingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [isGeneratingPrice, setIsGeneratingPrice] = useState(false);
  const [form, setForm] = useState({
    address: '', city: '', state: 'TX', zip: '',
    propertyType: 'single_family' as SellerListing['propertyType'],
    bedrooms: 3, bathrooms: 2, sqft: 1800, yearBuilt: 2015, lotSize: 6000,
    features: [] as string[],
    description: '',
    photos: [] as string[],
    askingPrice: 0,
    aiSuggestedPrice: undefined as number | undefined,
  });

  const update = (field: string, value: any) => setForm((f) => ({ ...f, [field]: value }));

  const toggleFeature = (feature: string) => {
    setForm((f) => ({
      ...f,
      features: f.features.includes(feature)
        ? f.features.filter((ft) => ft !== feature)
        : [...f.features, feature],
    }));
  };

  const generateDescription = async () => {
    setIsGeneratingDesc(true);
    try {
      const res = await fetch('/api/ai/seller/description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.description) update('description', data.description);
    } catch {
      update('description', `Beautiful ${form.bedrooms}-bedroom, ${form.bathrooms}-bathroom ${form.propertyType.replace('_', ' ')} in ${form.city}, ${form.state}. This ${form.sqft.toLocaleString()} sqft home built in ${form.yearBuilt} features ${form.features.slice(0, 3).join(', ')}. Located in a desirable neighborhood with easy access to local amenities.`);
    }
    setIsGeneratingDesc(false);
  };

  const generatePricing = async () => {
    setIsGeneratingPrice(true);
    try {
      const res = await fetch('/api/ai/seller/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.suggestedPrice) {
        update('aiSuggestedPrice', data.suggestedPrice);
        if (!form.askingPrice) update('askingPrice', data.suggestedPrice);
      }
    } catch {
      const basePrice = form.sqft * 350;
      const suggested = Math.round(basePrice / 5000) * 5000;
      update('aiSuggestedPrice', suggested);
      if (!form.askingPrice) update('askingPrice', suggested);
    }
    setIsGeneratingPrice(false);
  };

  const handleSubmit = () => {
    createListing({
      userId: 'demo-user',
      address: form.address,
      city: form.city,
      state: form.state,
      zip: form.zip,
      propertyType: form.propertyType,
      bedrooms: form.bedrooms,
      bathrooms: form.bathrooms,
      sqft: form.sqft,
      yearBuilt: form.yearBuilt,
      lotSize: form.lotSize,
      features: form.features,
      description: form.description,
      photos: form.photos,
      askingPrice: form.askingPrice,
      aiSuggestedPrice: form.aiSuggestedPrice,
      status: 'active',
    });
    router.push('/dashboard/seller/listings');
  };

  const steps = [
    { num: 1, label: 'Details' },
    { num: 2, label: 'Features' },
    { num: 3, label: 'Photos' },
    { num: 4, label: 'Pricing' },
    { num: 5, label: 'Review' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Create New Listing</h1>
        <p className="text-slate-400 mt-1">List your property with AI-powered optimization</p>
      </div>

      {/* Steps */}
      <div className="flex items-center gap-2">
        {steps.map((s) => (
          <div key={s.num} className="flex items-center gap-2 flex-1">
            <button
              onClick={() => setStep(s.num as Step)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                s.num === step
                  ? 'bg-amber-500 text-white'
                  : s.num < step
                  ? 'bg-emerald-500 text-white'
                  : 'bg-slate-700 text-slate-400'
              }`}
            >
              {s.num < step ? <Check className="w-4 h-4" /> : s.num}
            </button>
            <span className={`text-sm ${s.num === step ? 'text-white' : 'text-slate-500'}`}>{s.label}</span>
            {s.num < 5 && <div className={`flex-1 h-px ${s.num < step ? 'bg-emerald-500' : 'bg-slate-700'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Details */}
      {step === 1 && (
        <Card>
          <CardHeader><CardTitle>Property Details</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input label="Street Address" placeholder="123 Main St" value={form.address} onChange={(e) => update('address', e.target.value)} />
              <div className="grid grid-cols-3 gap-4">
                <Input label="City" placeholder="Austin" value={form.city} onChange={(e) => update('city', e.target.value)} />
                <Input label="State" placeholder="TX" value={form.state} onChange={(e) => update('state', e.target.value)} />
                <Input label="ZIP" placeholder="78704" value={form.zip} onChange={(e) => update('zip', e.target.value)} />
              </div>
              <Select label="Property Type" options={propertyTypes} value={form.propertyType} onChange={(e) => update('propertyType', e.target.value)} />
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Input label="Bedrooms" type="number" value={form.bedrooms} onChange={(e) => update('bedrooms', Number(e.target.value))} />
                <Input label="Bathrooms" type="number" step="0.5" value={form.bathrooms} onChange={(e) => update('bathrooms', Number(e.target.value))} />
                <Input label="Sqft" type="number" value={form.sqft} onChange={(e) => update('sqft', Number(e.target.value))} />
                <Input label="Year Built" type="number" value={form.yearBuilt} onChange={(e) => update('yearBuilt', Number(e.target.value))} />
              </div>
              <Input label="Lot Size (sqft)" type="number" value={form.lotSize} onChange={(e) => update('lotSize', Number(e.target.value))} />
              <Button onClick={() => setStep(2)} className="w-full">Next: Features</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Features & Description */}
      {step === 2 && (
        <Card>
          <CardHeader><CardTitle>Features & Description</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Features</label>
                <div className="flex flex-wrap gap-2">
                  {featureOptions.map((f) => (
                    <button
                      key={f}
                      onClick={() => toggleFeature(f)}
                      className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                        form.features.includes(f)
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-slate-300">Description</label>
                  <Button variant="ghost" size="sm" onClick={generateDescription} disabled={isGeneratingDesc}>
                    {isGeneratingDesc ? 'Generating...' : <><Zap className="w-4 h-4 mr-1 inline" /> AI Generate</>}
                  </Button>
                </div>
                <Textarea
                  rows={6}
                  placeholder="Describe your property..."
                  value={form.description}
                  onChange={(e) => update('description', e.target.value)}
                />
              </div>
              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)} className="flex-1">Next: Photos</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Photos */}
      {step === 3 && (
        <Card>
          <CardHeader><CardTitle>Photos</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-white/5 rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-white font-medium mb-1">Drag & drop photos here</p>
                <p className="text-slate-400 text-sm mb-4">or click to browse</p>
                <Button variant="secondary" size="sm">Upload Photos</Button>
                <p className="text-slate-500 text-xs mt-2">Photo upload is simulated in demo mode</p>
              </div>

              {/* Demo photos */}
              <div>
                <p className="text-slate-400 text-sm mb-2">Demo photos (click to add):</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400',
                    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400',
                    'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=400',
                    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400',
                  ].map((url) => (
                    <button
                      key={url}
                      onClick={() => {
                        if (!form.photos.includes(url)) update('photos', [...form.photos, url]);
                      }}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        form.photos.includes(url) ? 'border-amber-500' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${url})` }} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={() => setStep(4)} className="flex-1">Next: Pricing</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Pricing */}
      {step === 4 && (
        <Card>
          <CardHeader><CardTitle>Pricing Strategy</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber-400 font-medium flex items-center gap-1.5"><Tag className="w-4 h-4" /> AI Pricing Analysis</span>
                </div>
                <p className="text-slate-300 text-sm mb-3">
                  Let our AI analyze comparable sales and market conditions to suggest an optimal listing price.
                </p>
                <Button variant="secondary" size="sm" onClick={generatePricing} disabled={isGeneratingPrice}>
                  {isGeneratingPrice ? 'Analyzing...' : <><Zap className="w-4 h-4 mr-1 inline" /> Get AI Price Suggestion</>}
                </Button>
                {form.aiSuggestedPrice && (
                  <div className="mt-3 p-3 bg-slate-800/50 rounded-lg">
                    <p className="text-amber-400 font-bold text-xl">{formatPrice(form.aiSuggestedPrice)}</p>
                    <p className="text-slate-400 text-xs">AI suggested price based on market analysis</p>
                  </div>
                )}
              </div>

              <Input
                label="Your Asking Price"
                type="number"
                placeholder="Enter asking price"
                value={form.askingPrice || ''}
                onChange={(e) => update('askingPrice', Number(e.target.value))}
              />
              {form.askingPrice > 0 && (
                <p className="text-slate-400 text-sm">
                  ${Math.round(form.askingPrice / form.sqft)}/sqft
                </p>
              )}

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(3)}>Back</Button>
                <Button onClick={() => setStep(5)} className="flex-1">Next: Review</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 5: Review */}
      {step === 5 && (
        <Card>
          <CardHeader><CardTitle>Review & Publish</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-slate-400 text-xs mb-1">Address</p>
                  <p className="text-white">{form.address || 'Not set'}</p>
                  <p className="text-slate-400">{form.city}, {form.state} {form.zip}</p>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-slate-400 text-xs mb-1">Price</p>
                  <p className="text-white font-bold">{form.askingPrice ? formatPrice(form.askingPrice) : 'Not set'}</p>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-slate-400 text-xs mb-1">Property</p>
                  <p className="text-white">{form.bedrooms}bd / {form.bathrooms}ba / {form.sqft.toLocaleString()} sqft</p>
                </div>
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-slate-400 text-xs mb-1">Photos</p>
                  <p className="text-white">{form.photos.length} photo{form.photos.length !== 1 ? 's' : ''}</p>
                </div>
              </div>

              {form.features.length > 0 && (
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-slate-400 text-xs mb-2">Features</p>
                  <div className="flex flex-wrap gap-1.5">
                    {form.features.map((f) => (
                      <span key={f} className="px-2 py-0.5 text-xs bg-amber-500/10 text-amber-400 rounded-full">{f}</span>
                    ))}
                  </div>
                </div>
              )}

              {form.description && (
                <div className="p-3 bg-slate-700/30 rounded-lg">
                  <p className="text-slate-400 text-xs mb-1">Description</p>
                  <p className="text-slate-300 text-sm">{form.description}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(4)}>Back</Button>
                <Button onClick={handleSubmit} className="flex-1 bg-amber-500 hover:bg-amber-600">
                  Publish Listing
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
