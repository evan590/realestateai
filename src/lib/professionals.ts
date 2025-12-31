// Service Provider Marketplace - Types and mock data

export interface Professional {
  id: string;
  name: string;
  company: string;
  category: ProfessionalCategory;
  specialties: string[];
  rating: number;
  reviewCount: number;
  yearsExperience: number;
  verified: boolean;
  aiRecommended?: boolean;
  aiRecommendReason?: string;
  location: string;
  distance: number; // in miles
  availability: 'available_now' | 'available_soon' | 'busy';
  priceRange: '$' | '$$' | '$$$';
  phone: string;
  email: string;
  bio: string;
  avatar: string;
  licenses?: string[];
  insuranceVerified: boolean;
  responseTime: string;
  completedJobs: number;
}

export type ProfessionalCategory =
  | 'inspector'
  | 'electrician'
  | 'plumber'
  | 'roofer'
  | 'hvac'
  | 'general_contractor'
  | 'appraiser'
  | 'attorney'
  | 'title_company'
  | 'mortgage_lender'
  | 'pest_control'
  | 'surveyor';

export const categoryLabels: Record<ProfessionalCategory, string> = {
  inspector: 'Home Inspector',
  electrician: 'Electrician',
  plumber: 'Plumber',
  roofer: 'Roofer',
  hvac: 'HVAC Technician',
  general_contractor: 'General Contractor',
  appraiser: 'Appraiser',
  attorney: 'Real Estate Attorney',
  title_company: 'Title Company',
  mortgage_lender: 'Mortgage Lender',
  pest_control: 'Pest Control',
  surveyor: 'Surveyor',
};

export const categoryIcons: Record<ProfessionalCategory, string> = {
  inspector: '🔍',
  electrician: '⚡',
  plumber: '🔧',
  roofer: '🏠',
  hvac: '🌡️',
  general_contractor: '🔨',
  appraiser: '💲',
  attorney: '⚖️',
  title_company: '📋',
  mortgage_lender: '🏦',
  pest_control: '🐜',
  surveyor: '📐',
};

export const mockProfessionals: Professional[] = [
  {
    id: 'pro-1',
    name: 'Mike Chen',
    company: 'Austin Home Inspections',
    category: 'inspector',
    specialties: ['Pre-Purchase Inspections', 'Foundation Analysis', 'Thermal Imaging'],
    rating: 4.9,
    reviewCount: 328,
    yearsExperience: 15,
    verified: true,
    aiRecommended: true,
    aiRecommendReason: 'Top-rated inspector with foundation expertise - ideal for Texas clay soil concerns',
    location: 'Austin, TX',
    distance: 3.2,
    availability: 'available_soon',
    priceRange: '$$',
    phone: '(512) 555-0123',
    email: 'mike@austinhomeinspections.com',
    bio: 'Licensed TREC inspector with over 15 years of experience. Specializing in Texas foundations and older homes. I provide detailed reports with photos and repair estimates.',
    avatar: '👨‍🔧',
    licenses: ['TREC #12345', 'InterNACHI Certified'],
    insuranceVerified: true,
    responseTime: '< 1 hour',
    completedJobs: 2450,
  },
  {
    id: 'pro-2',
    name: 'Sarah Williams',
    company: 'Spark Electric Solutions',
    category: 'electrician',
    specialties: ['Panel Upgrades', 'Code Compliance', 'Residential Rewiring'],
    rating: 4.8,
    reviewCount: 156,
    yearsExperience: 12,
    verified: true,
    aiRecommended: true,
    aiRecommendReason: 'Panel upgrade specialist - perfect match for your walkthrough findings',
    location: 'Austin, TX',
    distance: 5.1,
    availability: 'available_now',
    priceRange: '$$',
    phone: '(512) 555-0456',
    email: 'sarah@sparkelectric.com',
    bio: 'Master electrician specializing in residential panel upgrades and code compliance. We handle everything from simple repairs to complete rewiring of older homes.',
    avatar: '👩‍🔧',
    licenses: ['TX Master Electrician #E-78901'],
    insuranceVerified: true,
    responseTime: '< 2 hours',
    completedJobs: 890,
  },
  {
    id: 'pro-3',
    name: 'Rodriguez Roofing',
    company: 'Rodriguez Roofing Co.',
    category: 'roofer',
    specialties: ['Roof Inspections', 'Storm Damage', 'Full Replacements'],
    rating: 4.7,
    reviewCount: 203,
    yearsExperience: 20,
    verified: true,
    location: 'Round Rock, TX',
    distance: 8.4,
    availability: 'available_soon',
    priceRange: '$$$',
    phone: '(512) 555-0789',
    email: 'info@rodriguezroofing.com',
    bio: 'Family-owned roofing company serving Central Texas for 20 years. Specialists in hail damage assessment and insurance claims.',
    avatar: '🏠',
    licenses: ['TX Roofing Contractor'],
    insuranceVerified: true,
    responseTime: 'Same day',
    completedJobs: 3200,
  },
  {
    id: 'pro-4',
    name: 'James Thompson',
    company: 'Thompson Law Group',
    category: 'attorney',
    specialties: ['Contract Review', 'Title Issues', 'Closing Representation'],
    rating: 5.0,
    reviewCount: 89,
    yearsExperience: 25,
    verified: true,
    location: 'Austin, TX',
    distance: 4.0,
    availability: 'available_now',
    priceRange: '$$$',
    phone: '(512) 555-1234',
    email: 'james@thompsonlawgroup.com',
    bio: 'Board certified real estate attorney with 25 years experience. I help buyers navigate complex transactions and protect their interests.',
    avatar: '⚖️',
    licenses: ['TX Bar #456789', 'Board Certified - Real Estate Law'],
    insuranceVerified: true,
    responseTime: '< 4 hours',
    completedJobs: 1500,
  },
  {
    id: 'pro-5',
    name: 'Capital Title',
    company: 'Capital Title of Texas',
    category: 'title_company',
    specialties: ['Title Insurance', 'Escrow Services', 'Mobile Closings'],
    rating: 4.6,
    reviewCount: 412,
    yearsExperience: 30,
    verified: true,
    location: 'Austin, TX',
    distance: 2.1,
    availability: 'available_now',
    priceRange: '$$',
    phone: '(512) 555-5678',
    email: 'closings@capitaltitle.com',
    bio: 'Full-service title company offering competitive rates and mobile closing services. We make the closing process smooth and stress-free.',
    avatar: '📋',
    licenses: ['TX Title Insurance Agent'],
    insuranceVerified: true,
    responseTime: '< 2 hours',
    completedJobs: 8900,
  },
  {
    id: 'pro-6',
    name: 'David Park',
    company: 'Lone Star Plumbing',
    category: 'plumber',
    specialties: ['Sewer Inspections', 'Leak Detection', 'Water Heater Replacement'],
    rating: 4.8,
    reviewCount: 234,
    yearsExperience: 18,
    verified: true,
    location: 'Austin, TX',
    distance: 6.2,
    availability: 'busy',
    priceRange: '$$',
    phone: '(512) 555-9012',
    email: 'david@lonestarplumbing.com',
    bio: 'Master plumber with sewer scope camera equipment. We can identify hidden plumbing issues before you buy.',
    avatar: '🔧',
    licenses: ['TX Master Plumber #M-34567'],
    insuranceVerified: true,
    responseTime: 'Next day',
    completedJobs: 1875,
  },
  {
    id: 'pro-7',
    name: 'Jennifer Martinez',
    company: 'First Choice Mortgage',
    category: 'mortgage_lender',
    specialties: ['First-Time Buyers', 'Conventional Loans', 'FHA/VA Loans'],
    rating: 4.9,
    reviewCount: 567,
    yearsExperience: 12,
    verified: true,
    aiRecommended: true,
    aiRecommendReason: 'Competitive rates and excellent first-time buyer programs',
    location: 'Austin, TX',
    distance: 3.8,
    availability: 'available_now',
    priceRange: '$$',
    phone: '(512) 555-3456',
    email: 'jennifer@firstchoicemortgage.com',
    bio: 'Dedicated to helping first-time buyers navigate the mortgage process. I offer competitive rates and personalized service.',
    avatar: '🏦',
    licenses: ['NMLS #123456'],
    insuranceVerified: true,
    responseTime: '< 1 hour',
    completedJobs: 2100,
  },
  {
    id: 'pro-8',
    name: 'Cool Breeze HVAC',
    company: 'Cool Breeze HVAC Services',
    category: 'hvac',
    specialties: ['AC Repair', 'System Replacement', 'Duct Cleaning'],
    rating: 4.7,
    reviewCount: 189,
    yearsExperience: 14,
    verified: true,
    location: 'Pflugerville, TX',
    distance: 7.5,
    availability: 'available_now',
    priceRange: '$$',
    phone: '(512) 555-7890',
    email: 'service@coolbreezehvac.com',
    bio: 'Full-service HVAC company specializing in Texas heat. We offer 24/7 emergency service and competitive pricing.',
    avatar: '🌡️',
    licenses: ['TACLA #67890'],
    insuranceVerified: true,
    responseTime: '< 2 hours',
    completedJobs: 3450,
  },
  {
    id: 'pro-9',
    name: 'Texas Pest Solutions',
    company: 'Texas Pest Solutions',
    category: 'pest_control',
    specialties: ['Termite Inspections', 'WDI Reports', 'Prevention Plans'],
    rating: 4.6,
    reviewCount: 298,
    yearsExperience: 22,
    verified: true,
    location: 'Austin, TX',
    distance: 4.5,
    availability: 'available_soon',
    priceRange: '$',
    phone: '(512) 555-2345',
    email: 'info@texaspestsolutions.com',
    bio: 'Licensed pest control company offering WDI reports for real estate transactions. Fast turnaround on inspection reports.',
    avatar: '🐜',
    licenses: ['TDA Business License #12345'],
    insuranceVerified: true,
    responseTime: 'Same day',
    completedJobs: 5600,
  },
  {
    id: 'pro-10',
    name: 'Mark Stevens',
    company: 'Austin Appraisals',
    category: 'appraiser',
    specialties: ['Residential Appraisals', 'Estate Valuations', 'Pre-Listing Appraisals'],
    rating: 4.8,
    reviewCount: 145,
    yearsExperience: 16,
    verified: true,
    location: 'Austin, TX',
    distance: 5.0,
    availability: 'available_soon',
    priceRange: '$$',
    phone: '(512) 555-6789',
    email: 'mark@austinappraisals.com',
    bio: 'Certified residential appraiser with deep knowledge of the Austin market. Fast turnaround times with detailed reports.',
    avatar: '💲',
    licenses: ['TX Certified Residential Appraiser'],
    insuranceVerified: true,
    responseTime: '< 4 hours',
    completedJobs: 4200,
  },
];

export function getAvailabilityBadge(availability: Professional['availability']): { label: string; color: string } {
  switch (availability) {
    case 'available_now':
      return { label: 'Available Now', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
    case 'available_soon':
      return { label: 'Available This Week', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    case 'busy':
      return { label: 'Limited Availability', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
  }
}

export function getProfessionalsByCategory(category: ProfessionalCategory): Professional[] {
  return mockProfessionals.filter(p => p.category === category);
}

export function getAIRecommendedProfessionals(): Professional[] {
  return mockProfessionals.filter(p => p.aiRecommended);
}

export function searchProfessionals(query: string): Professional[] {
  const lowerQuery = query.toLowerCase();
  return mockProfessionals.filter(
    p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.company.toLowerCase().includes(lowerQuery) ||
      p.specialties.some(s => s.toLowerCase().includes(lowerQuery)) ||
      categoryLabels[p.category].toLowerCase().includes(lowerQuery)
  );
}
