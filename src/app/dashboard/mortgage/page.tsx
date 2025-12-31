'use client';

import { useState } from 'react';
import Link from 'next/link';

interface LoanOption {
  id: string;
  lender: string;
  lenderLogo: string;
  type: string;
  rate: number;
  apr: number;
  monthlyPayment: number;
  points: number;
  closingCosts: number;
  features: string[];
  aiRecommended?: boolean;
  aiReason?: string;
}

interface PreApprovalStatus {
  status: 'not_started' | 'in_progress' | 'approved' | 'expired';
  amount?: number;
  expiration?: Date;
  lender?: string;
  nextSteps?: string[];
}

const mockLoanOptions: LoanOption[] = [
  {
    id: 'loan-1',
    lender: 'First National Bank',
    lenderLogo: '🏦',
    type: '30-Year Fixed',
    rate: 6.75,
    apr: 6.92,
    monthlyPayment: 2530,
    points: 0,
    closingCosts: 8500,
    features: ['No PMI with 20% down', 'Rate lock available', 'First-time buyer friendly'],
    aiRecommended: true,
    aiReason: 'Best overall value based on your profile and down payment',
  },
  {
    id: 'loan-2',
    lender: 'Credit Union Plus',
    lenderLogo: '🏧',
    type: '30-Year Fixed',
    rate: 6.625,
    apr: 6.85,
    monthlyPayment: 2490,
    points: 0.5,
    closingCosts: 9200,
    features: ['Lower rate with points', 'Member benefits', 'Flexible underwriting'],
  },
  {
    id: 'loan-3',
    lender: 'Quicken Loans',
    lenderLogo: '⚡',
    type: '30-Year Fixed',
    rate: 6.875,
    apr: 7.05,
    monthlyPayment: 2565,
    points: 0,
    closingCosts: 7800,
    features: ['Fast closing', 'Online process', 'Lower closing costs'],
  },
  {
    id: 'loan-4',
    lender: 'First National Bank',
    lenderLogo: '🏦',
    type: '15-Year Fixed',
    rate: 6.0,
    apr: 6.15,
    monthlyPayment: 3290,
    points: 0,
    closingCosts: 8200,
    features: ['Build equity faster', 'Lower total interest', 'Same great service'],
  },
  {
    id: 'loan-5',
    lender: 'Navy Federal',
    lenderLogo: '⚓',
    type: 'VA Loan',
    rate: 6.25,
    apr: 6.45,
    monthlyPayment: 2405,
    points: 0,
    closingCosts: 6500,
    features: ['No down payment', 'No PMI', 'Veterans only'],
  },
];

const mockPreApproval: PreApprovalStatus = {
  status: 'approved',
  amount: 550000,
  expiration: new Date('2024-04-15'),
  lender: 'First National Bank',
  nextSteps: [
    'Lock your rate when ready',
    'Submit full application after offer accepted',
    'Provide updated income verification',
  ],
};

export default function MortgagePage() {
  const [preApproval] = useState<PreApprovalStatus>(mockPreApproval);
  const [loanOptions] = useState<LoanOption[]>(mockLoanOptions);
  const [selectedLoan, setSelectedLoan] = useState<LoanOption | null>(null);
  const [loanType, setLoanType] = useState<'all' | '30-year' | '15-year' | 'other'>('all');
  const [showCalculator, setShowCalculator] = useState(false);

  // Calculator state
  const [homePrice, setHomePrice] = useState(485000);
  const [downPayment, setDownPayment] = useState(97000);
  const [interestRate, setInterestRate] = useState(6.75);
  const [loanTerm, setLoanTerm] = useState(30);

  const downPaymentPercent = Math.round((downPayment / homePrice) * 100);
  const loanAmount = homePrice - downPayment;
  const monthlyRate = interestRate / 100 / 12;
  const numPayments = loanTerm * 12;
  const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
  const totalInterest = (monthlyPayment * numPayments) - loanAmount;

  const filteredLoans = loanType === 'all'
    ? loanOptions
    : loanType === '30-year'
    ? loanOptions.filter(l => l.type.includes('30'))
    : loanType === '15-year'
    ? loanOptions.filter(l => l.type.includes('15'))
    : loanOptions.filter(l => !l.type.includes('30') && !l.type.includes('15'));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🏦</span>
            <h1 className="text-3xl font-bold text-white">Mortgage Center</h1>
          </div>
          <button
            onClick={() => setShowCalculator(!showCalculator)}
            className="flex items-center space-x-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            <span>🧮</span>
            <span>Calculator</span>
          </button>
        </div>
        <p className="text-slate-400">
          Compare rates, track pre-approval, and find the best mortgage for your home
        </p>
      </div>

      {/* Pre-Approval Status Card */}
      <div className={`rounded-xl p-6 mb-8 ${
        preApproval.status === 'approved'
          ? 'bg-gradient-to-r from-emerald-900/50 to-slate-800 border border-emerald-700/50'
          : 'bg-slate-800 border border-slate-700'
      }`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
              preApproval.status === 'approved' ? 'bg-emerald-500/20' : 'bg-slate-700'
            }`}>
              {preApproval.status === 'approved' ? '✅' : '📋'}
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-xl font-bold text-white">
                  {preApproval.status === 'approved' ? 'Pre-Approved!' : 'Get Pre-Approved'}
                </h2>
                {preApproval.status === 'approved' && (
                  <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
                    Active
                  </span>
                )}
              </div>
              {preApproval.status === 'approved' ? (
                <div className="space-y-2">
                  <p className="text-slate-300">
                    You're approved for up to{' '}
                    <span className="text-2xl font-bold text-emerald-400">
                      ${preApproval.amount?.toLocaleString()}
                    </span>
                  </p>
                  <p className="text-slate-400 text-sm">
                    From {preApproval.lender} • Valid until {preApproval.expiration?.toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <p className="text-slate-400">
                  Know your buying power before you start shopping
                </p>
              )}
            </div>
          </div>
          {preApproval.status === 'approved' ? (
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
              Lock Rate
            </button>
          ) : (
            <Link
              href="/dashboard/professionals"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              Start Pre-Approval
            </Link>
          )}
        </div>

        {preApproval.status === 'approved' && preApproval.nextSteps && (
          <div className="mt-6 pt-6 border-t border-slate-700">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">
              Next Steps
            </h3>
            <div className="flex flex-wrap gap-3">
              {preApproval.nextSteps.map((step, i) => (
                <div key={i} className="flex items-center space-x-2 bg-slate-700/50 rounded-lg px-3 py-2">
                  <span className="w-5 h-5 bg-slate-600 rounded-full flex items-center justify-center text-xs font-medium text-white">
                    {i + 1}
                  </span>
                  <span className="text-slate-300 text-sm">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Affordability Calculator */}
      {showCalculator && (
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Affordability Calculator</h2>
            <button
              onClick={() => setShowCalculator(false)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-6">
              <div>
                <label className="text-slate-400 text-sm block mb-2">
                  Home Price: ${homePrice.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="100000"
                  max="1000000"
                  step="5000"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">
                  Down Payment: ${downPayment.toLocaleString()} ({downPaymentPercent}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max={homePrice * 0.5}
                  step="1000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">
                  Interest Rate: {interestRate}%
                </label>
                <input
                  type="range"
                  min="4"
                  max="10"
                  step="0.125"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 text-sm block mb-2">Loan Term</label>
                <div className="flex space-x-3">
                  {[15, 20, 30].map(term => (
                    <button
                      key={term}
                      onClick={() => setLoanTerm(term)}
                      className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                        loanTerm === term
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-700 text-slate-400 hover:text-white'
                      }`}
                    >
                      {term} years
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-slate-700/30 rounded-xl p-6">
              <div className="text-center mb-6">
                <p className="text-slate-400 text-sm mb-1">Estimated Monthly Payment</p>
                <p className="text-4xl font-bold text-emerald-400">
                  ${Math.round(monthlyPayment).toLocaleString()}
                </p>
                <p className="text-slate-500 text-sm">Principal & Interest only</p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Loan Amount</span>
                  <span className="text-white font-medium">${loanAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Interest</span>
                  <span className="text-white font-medium">${Math.round(totalInterest).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Total Cost</span>
                  <span className="text-white font-medium">${Math.round(loanAmount + totalInterest).toLocaleString()}</span>
                </div>
              </div>

              {downPaymentPercent < 20 && (
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-400 text-sm">
                    ⚠️ With less than 20% down, you'll likely need PMI (Private Mortgage Insurance),
                    adding ~$100-200/month to your payment.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Rate Comparison */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Compare Rates</h2>
          <div className="flex space-x-2">
            {(['all', '30-year', '15-year', 'other'] as const).map(type => (
              <button
                key={type}
                onClick={() => setLoanType(type)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  loanType === type
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {type === 'all' ? 'All' : type === '30-year' ? '30-Year' : type === '15-year' ? '15-Year' : 'Other'}
              </button>
            ))}
          </div>
        </div>

        <p className="text-slate-400 text-sm mb-4">
          Based on ${loanAmount.toLocaleString()} loan amount with {downPaymentPercent}% down
        </p>
      </div>

      {/* Loan Options Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {filteredLoans.map(loan => (
          <LoanCard
            key={loan.id}
            loan={loan}
            isSelected={selectedLoan?.id === loan.id}
            onClick={() => setSelectedLoan(loan)}
          />
        ))}
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-br from-blue-900/30 to-slate-800 border border-blue-700/30 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-xl">
            🤖
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Rate Insights</h3>
            <div className="space-y-3 text-slate-300 text-sm">
              <p>
                📈 <strong>Rate Trend:</strong> Mortgage rates have stabilized this week. Based on
                Fed signals, rates may remain steady through Q1 2024.
              </p>
              <p>
                💡 <strong>Recommendation:</strong> With your pre-approval amount of $550,000 and
                target home price of $485,000, you have comfortable headroom. Consider locking
                your rate once your offer is accepted.
              </p>
              <p>
                ⏰ <strong>Timing:</strong> Rate locks typically last 30-60 days. Given your
                timeline, a 45-day lock would provide flexibility without significant cost.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lender Partners */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-white mb-4">Our Lender Partners</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'First National Bank', logo: '🏦', feature: 'First-Time Buyer Specialist' },
            { name: 'Credit Union Plus', logo: '🏧', feature: 'Member Rates' },
            { name: 'Quicken Loans', logo: '⚡', feature: 'Fast Closing' },
            { name: 'Navy Federal', logo: '⚓', feature: 'VA Loan Experts' },
          ].map(lender => (
            <Link
              key={lender.name}
              href="/dashboard/professionals"
              className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-colors text-center"
            >
              <span className="text-3xl block mb-2">{lender.logo}</span>
              <p className="text-white font-medium text-sm">{lender.name}</p>
              <p className="text-slate-400 text-xs mt-1">{lender.feature}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function LoanCard({
  loan,
  isSelected,
  onClick,
}: {
  loan: LoanOption;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`bg-slate-800/50 border rounded-xl p-5 cursor-pointer transition-all hover:bg-slate-800 ${
        isSelected ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-700'
      } ${loan.aiRecommended ? 'ring-1 ring-emerald-500/30' : ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center text-xl">
            {loan.lenderLogo}
          </div>
          <div>
            <h3 className="text-white font-semibold">{loan.lender}</h3>
            <p className="text-slate-400 text-sm">{loan.type}</p>
          </div>
        </div>
        {loan.aiRecommended && (
          <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-medium">
            AI Pick
          </span>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div>
          <p className="text-slate-400 text-xs uppercase">Rate</p>
          <p className="text-xl font-bold text-white">{loan.rate}%</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase">APR</p>
          <p className="text-xl font-bold text-slate-300">{loan.apr}%</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase">Monthly</p>
          <p className="text-xl font-bold text-emerald-400">${loan.monthlyPayment.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm mb-4">
        <span className="text-slate-400">
          {loan.points > 0 ? `${loan.points} points` : 'No points'}
        </span>
        <span className="text-slate-400">
          Closing: ${loan.closingCosts.toLocaleString()}
        </span>
      </div>

      <div className="flex flex-wrap gap-1 mb-3">
        {loan.features.slice(0, 2).map(feature => (
          <span
            key={feature}
            className="px-2 py-0.5 bg-slate-700/50 text-slate-400 rounded text-xs"
          >
            {feature}
          </span>
        ))}
      </div>

      {loan.aiRecommended && loan.aiReason && (
        <div className="pt-3 border-t border-slate-700">
          <p className="text-emerald-300 text-xs">🤖 {loan.aiReason}</p>
        </div>
      )}

      <div className="mt-4 pt-4 border-t border-slate-700 flex space-x-2">
        <button className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
          Get Quote
        </button>
        <button className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
          Compare
        </button>
      </div>
    </div>
  );
}
