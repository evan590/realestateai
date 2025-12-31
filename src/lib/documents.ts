// Document Management System - Types and mock data

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  category: DocumentCategory;
  uploadedAt: Date;
  size: number; // in bytes
  status: 'pending' | 'reviewed' | 'signed' | 'requires_action';
  propertyId?: string;
  propertyAddress?: string;
  aiSummary?: string;
  importantItems?: string[];
  signers?: Signer[];
  url?: string;
}

export interface Signer {
  id: string;
  name: string;
  email: string;
  status: 'pending' | 'signed' | 'declined';
  signedAt?: Date;
}

export type DocumentType =
  | 'purchase_agreement'
  | 'disclosure'
  | 'inspection_report'
  | 'appraisal'
  | 'title_report'
  | 'mortgage_docs'
  | 'addendum'
  | 'walkthrough_report'
  | 'other';

export type DocumentCategory =
  | 'contracts'
  | 'inspections'
  | 'financing'
  | 'title'
  | 'disclosures'
  | 'reports';

export const documentTypeLabels: Record<DocumentType, string> = {
  purchase_agreement: 'Purchase Agreement',
  disclosure: 'Seller Disclosure',
  inspection_report: 'Inspection Report',
  appraisal: 'Appraisal',
  title_report: 'Title Report',
  mortgage_docs: 'Mortgage Documents',
  addendum: 'Addendum',
  walkthrough_report: 'Walkthrough Report',
  other: 'Other',
};

export const documentCategoryLabels: Record<DocumentCategory, string> = {
  contracts: 'Contracts',
  inspections: 'Inspections',
  financing: 'Financing',
  title: 'Title & Escrow',
  disclosures: 'Disclosures',
  reports: 'Reports',
};

export const documentCategoryIcons: Record<DocumentCategory, string> = {
  contracts: '📝',
  inspections: '🔍',
  financing: '💰',
  title: '🏠',
  disclosures: '📋',
  reports: '📊',
};

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

export function getDocumentIcon(type: DocumentType): string {
  switch (type) {
    case 'purchase_agreement':
      return '📄';
    case 'disclosure':
      return '📋';
    case 'inspection_report':
      return '🔍';
    case 'appraisal':
      return '💲';
    case 'title_report':
      return '🏠';
    case 'mortgage_docs':
      return '🏦';
    case 'addendum':
      return '📎';
    case 'walkthrough_report':
      return '🚶';
    default:
      return '📁';
  }
}

export function getStatusBadge(status: Document['status']): { label: string; color: string } {
  switch (status) {
    case 'signed':
      return { label: 'Signed', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
    case 'reviewed':
      return { label: 'Reviewed', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    case 'requires_action':
      return { label: 'Action Required', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
    default:
      return { label: 'Pending', color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' };
  }
}

// Mock documents for demo
export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    name: 'Purchase Agreement - 742 Evergreen Terrace.pdf',
    type: 'purchase_agreement',
    category: 'contracts',
    uploadedAt: new Date('2024-01-15'),
    size: 2457600,
    status: 'requires_action',
    propertyId: '1',
    propertyAddress: '742 Evergreen Terrace, Springfield, IL',
    aiSummary: 'This is a standard residential purchase agreement for a single-family home. The offer price is $485,000 with a 20% down payment. Closing is scheduled for 45 days from acceptance.',
    importantItems: [
      'Purchase price: $485,000',
      'Earnest money deposit: $15,000 due within 3 days',
      'Financing contingency: 21 days',
      'Inspection contingency: 10 days',
      'Closing date: 45 days from acceptance',
      'Seller to provide home warranty (1 year)',
    ],
    signers: [
      { id: 's1', name: 'You', email: 'buyer@email.com', status: 'pending' },
      { id: 's2', name: 'Jane Seller', email: 'seller@email.com', status: 'pending' },
    ],
  },
  {
    id: 'doc-2',
    name: 'Seller Disclosure Statement.pdf',
    type: 'disclosure',
    category: 'disclosures',
    uploadedAt: new Date('2024-01-14'),
    size: 1843200,
    status: 'reviewed',
    propertyId: '1',
    propertyAddress: '742 Evergreen Terrace, Springfield, IL',
    aiSummary: 'The seller has disclosed known issues with the property. Most items are routine maintenance. There are a few items worth noting during your inspection.',
    importantItems: [
      'HVAC system replaced in 2019 (5 years old)',
      'Minor foundation crack repaired in 2021',
      'Water heater is original (15 years old) - may need replacement soon',
      'No known pest issues',
      'Roof replaced in 2018 with 25-year warranty',
    ],
  },
  {
    id: 'doc-3',
    name: 'Home Inspection Report.pdf',
    type: 'inspection_report',
    category: 'inspections',
    uploadedAt: new Date('2024-01-12'),
    size: 5242880,
    status: 'reviewed',
    propertyId: '1',
    propertyAddress: '742 Evergreen Terrace, Springfield, IL',
    aiSummary: 'The inspection found the home to be in generally good condition with some maintenance items. Two items were flagged as needing attention before closing.',
    importantItems: [
      '⚠️ Electrical panel needs upgrading ($2,000-3,500)',
      '⚠️ GFCI outlets missing in bathrooms (code violation)',
      'Minor grading issues causing water pooling',
      'Deck boards showing wear - cosmetic',
      'Attic insulation below current code standards',
    ],
  },
  {
    id: 'doc-4',
    name: 'Title Commitment Report.pdf',
    type: 'title_report',
    category: 'title',
    uploadedAt: new Date('2024-01-10'),
    size: 1024000,
    status: 'reviewed',
    propertyId: '1',
    propertyAddress: '742 Evergreen Terrace, Springfield, IL',
    aiSummary: 'Title is clear with no liens or encumbrances that would prevent transfer. Standard exceptions for utility easements and subdivision restrictions apply.',
    importantItems: [
      '✅ No outstanding liens or judgments',
      '✅ Property taxes current through 2023',
      '✅ HOA dues current (no HOA for this property)',
      'Standard utility easement along rear property line',
      'Subdivision restrictions prohibit commercial use',
    ],
  },
  {
    id: 'doc-5',
    name: 'Pre-Approval Letter.pdf',
    type: 'mortgage_docs',
    category: 'financing',
    uploadedAt: new Date('2024-01-08'),
    size: 512000,
    status: 'signed',
    aiSummary: 'Pre-approval letter from First National Bank confirming loan eligibility up to $550,000 based on credit score and income verification.',
    importantItems: [
      'Pre-approved amount: Up to $550,000',
      'Interest rate: 6.875% (rate lock available)',
      'Loan type: 30-year fixed conventional',
      'Pre-approval valid for 90 days',
      'Conditions: Employment and income verification at closing',
    ],
  },
  {
    id: 'doc-6',
    name: 'Inspection Addendum - Repair Request.pdf',
    type: 'addendum',
    category: 'contracts',
    uploadedAt: new Date('2024-01-16'),
    size: 307200,
    status: 'requires_action',
    propertyId: '1',
    propertyAddress: '742 Evergreen Terrace, Springfield, IL',
    aiSummary: 'Addendum requesting repairs based on home inspection findings. Seller has 5 days to respond to repair requests.',
    importantItems: [
      'Request: Electrical panel upgrade or $3,000 credit',
      'Request: Install GFCI outlets in all bathrooms',
      'Request: Correct grading around foundation',
      'Seller response deadline: January 21, 2024',
    ],
    signers: [
      { id: 's1', name: 'You', email: 'buyer@email.com', status: 'signed', signedAt: new Date('2024-01-16') },
      { id: 's2', name: 'Jane Seller', email: 'seller@email.com', status: 'pending' },
    ],
  },
  {
    id: 'doc-7',
    name: 'Walkthrough Report - 2024-01-10.pdf',
    type: 'walkthrough_report',
    category: 'reports',
    uploadedAt: new Date('2024-01-10'),
    size: 3145728,
    status: 'reviewed',
    propertyId: '1',
    propertyAddress: '742 Evergreen Terrace, Springfield, IL',
    aiSummary: 'AI-guided walkthrough completed with 2 warning items and 0 critical items identified. Overall risk assessment: Low.',
    importantItems: [
      '✅ 28 items checked across 7 rooms',
      '⚠️ Kitchen sink shows minor corrosion (cosmetic)',
      '⚠️ Exterior paint peeling on north side',
      'Estimated repair costs: $500-1,200',
      'Potential negotiation leverage: $1,000',
    ],
  },
];

export function getDocumentsByCategory(documents: Document[]): Record<DocumentCategory, Document[]> {
  const grouped: Record<DocumentCategory, Document[]> = {
    contracts: [],
    inspections: [],
    financing: [],
    title: [],
    disclosures: [],
    reports: [],
  };

  documents.forEach(doc => {
    grouped[doc.category].push(doc);
  });

  return grouped;
}

export function searchDocuments(documents: Document[], query: string): Document[] {
  const lowerQuery = query.toLowerCase();
  return documents.filter(doc =>
    doc.name.toLowerCase().includes(lowerQuery) ||
    doc.aiSummary?.toLowerCase().includes(lowerQuery) ||
    doc.importantItems?.some(item => item.toLowerCase().includes(lowerQuery)) ||
    doc.propertyAddress?.toLowerCase().includes(lowerQuery)
  );
}
