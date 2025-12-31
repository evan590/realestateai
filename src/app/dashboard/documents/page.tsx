'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  mockDocuments,
  Document,
  DocumentCategory,
  documentCategoryLabels,
  documentCategoryIcons,
  documentTypeLabels,
  getDocumentIcon,
  getStatusBadge,
  formatFileSize,
  getDocumentsByCategory,
  searchDocuments,
} from '@/lib/documents';

type ViewMode = 'grid' | 'list';
type FilterCategory = DocumentCategory | 'all';

export default function DocumentsPage() {
  const [documents] = useState<Document[]>(mockDocuments);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);

  // Filter and search documents
  const filteredDocuments = searchQuery
    ? searchDocuments(documents, searchQuery)
    : filterCategory === 'all'
    ? documents
    : documents.filter(doc => doc.category === filterCategory);

  const groupedDocuments = getDocumentsByCategory(filteredDocuments);

  const actionRequiredCount = documents.filter(d => d.status === 'requires_action').length;
  const pendingSignatures = documents.filter(d =>
    d.signers?.some(s => s.status === 'pending')
  ).length;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">📁</span>
            <h1 className="text-3xl font-bold text-white">Document Center</h1>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
          >
            <span>+</span>
            <span>Upload Document</span>
          </button>
        </div>
        <p className="text-slate-400">
          All your transaction documents in one place, with AI-powered summaries
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Total Documents</p>
              <p className="text-2xl font-bold text-white">{documents.length}</p>
            </div>
            <span className="text-3xl">📄</span>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Action Required</p>
              <p className="text-2xl font-bold text-yellow-400">{actionRequiredCount}</p>
            </div>
            <span className="text-3xl">⚠️</span>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Pending Signatures</p>
              <p className="text-2xl font-bold text-blue-400">{pendingSignatures}</p>
            </div>
            <span className="text-3xl">✍️</span>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">AI Summaries</p>
              <p className="text-2xl font-bold text-emerald-400">
                {documents.filter(d => d.aiSummary).length}
              </p>
            </div>
            <span className="text-3xl">🤖</span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
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
            placeholder="Search documents, content, or addresses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2">
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
          {(Object.keys(documentCategoryLabels) as DocumentCategory[]).map(category => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors hidden sm:block ${
                filterCategory === category
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {documentCategoryIcons[category]} {documentCategoryLabels[category]}
            </button>
          ))}
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-800 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'grid' ? 'bg-slate-700 text-white' : 'text-slate-400'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded transition-colors ${
              viewMode === 'list' ? 'bg-slate-700 text-white' : 'text-slate-400'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Documents Grid/List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Document List */}
        <div className={`${selectedDocument ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          {filterCategory === 'all' && !searchQuery ? (
            // Grouped by category
            <div className="space-y-8">
              {(Object.keys(groupedDocuments) as DocumentCategory[]).map(category => {
                const categoryDocs = groupedDocuments[category];
                if (categoryDocs.length === 0) return null;

                return (
                  <div key={category}>
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <span>{documentCategoryIcons[category]}</span>
                      <span>{documentCategoryLabels[category]}</span>
                      <span className="text-slate-500 font-normal">({categoryDocs.length})</span>
                    </h2>
                    <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}>
                      {categoryDocs.map(doc => (
                        <DocumentCard
                          key={doc.id}
                          document={doc}
                          viewMode={viewMode}
                          isSelected={selectedDocument?.id === doc.id}
                          onClick={() => setSelectedDocument(doc)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Flat list
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-3'}>
              {filteredDocuments.map(doc => (
                <DocumentCard
                  key={doc.id}
                  document={doc}
                  viewMode={viewMode}
                  isSelected={selectedDocument?.id === doc.id}
                  onClick={() => setSelectedDocument(doc)}
                />
              ))}
            </div>
          )}

          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <span className="text-4xl mb-4 block">📭</span>
              <p className="text-slate-400">No documents found</p>
            </div>
          )}
        </div>

        {/* Document Preview Panel */}
        {selectedDocument && (
          <div className="lg:col-span-1">
            <DocumentPreview
              document={selectedDocument}
              onClose={() => setSelectedDocument(null)}
              onSign={() => setShowSignatureModal(true)}
            />
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal onClose={() => setShowUploadModal(false)} />
      )}

      {/* Signature Modal */}
      {showSignatureModal && selectedDocument && (
        <SignatureModal
          document={selectedDocument}
          onClose={() => setShowSignatureModal(false)}
        />
      )}
    </div>
  );
}

function DocumentCard({
  document,
  viewMode,
  isSelected,
  onClick,
}: {
  document: Document;
  viewMode: ViewMode;
  isSelected: boolean;
  onClick: () => void;
}) {
  const statusBadge = getStatusBadge(document.status);

  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className={`bg-slate-800/50 border rounded-lg p-4 cursor-pointer transition-all hover:bg-slate-800 ${
          isSelected ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-700'
        }`}
      >
        <div className="flex items-center space-x-4">
          <span className="text-2xl">{getDocumentIcon(document.type)}</span>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">{document.name}</p>
            <p className="text-slate-400 text-sm">
              {documentTypeLabels[document.type]} • {formatFileSize(document.size)}
            </p>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs border ${statusBadge.color}`}>
            {statusBadge.label}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`bg-slate-800/50 border rounded-xl p-4 cursor-pointer transition-all hover:bg-slate-800 ${
        isSelected ? 'border-emerald-500 ring-1 ring-emerald-500' : 'border-slate-700'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{getDocumentIcon(document.type)}</span>
        <span className={`px-2 py-1 rounded-full text-xs border ${statusBadge.color}`}>
          {statusBadge.label}
        </span>
      </div>
      <h3 className="text-white font-medium mb-1 line-clamp-2">{document.name}</h3>
      <p className="text-slate-400 text-sm mb-3">
        {documentTypeLabels[document.type]}
      </p>
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>{formatFileSize(document.size)}</span>
        <span>{document.uploadedAt.toLocaleDateString()}</span>
      </div>
      {document.aiSummary && (
        <div className="mt-3 pt-3 border-t border-slate-700">
          <div className="flex items-center space-x-1 text-emerald-400 text-xs mb-1">
            <span>🤖</span>
            <span>AI Summary Available</span>
          </div>
        </div>
      )}
    </div>
  );
}

function DocumentPreview({
  document,
  onClose,
  onSign,
}: {
  document: Document;
  onClose: () => void;
  onSign: () => void;
}) {
  const statusBadge = getStatusBadge(document.status);
  const needsSignature = document.signers?.some(s => s.name === 'You' && s.status === 'pending');

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl sticky top-6">
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{getDocumentIcon(document.type)}</span>
            <div>
              <h2 className="text-white font-semibold">{document.name}</h2>
              <p className="text-slate-400 text-sm">{documentTypeLabels[document.type]}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 max-h-[600px] overflow-y-auto">
        {/* Status */}
        <div className="flex items-center space-x-2">
          <span className={`px-3 py-1 rounded-full text-sm border ${statusBadge.color}`}>
            {statusBadge.label}
          </span>
          {document.propertyAddress && (
            <span className="text-slate-400 text-sm">• {document.propertyAddress}</span>
          )}
        </div>

        {/* AI Summary */}
        {document.aiSummary && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-emerald-400 mb-2">
              <span>🤖</span>
              <span className="font-medium">AI Summary</span>
            </div>
            <p className="text-slate-300 text-sm">{document.aiSummary}</p>
          </div>
        )}

        {/* Important Items */}
        {document.importantItems && document.importantItems.length > 0 && (
          <div>
            <h3 className="text-white font-medium mb-2 flex items-center space-x-2">
              <span>📌</span>
              <span>Important Items</span>
            </h3>
            <ul className="space-y-2">
              {document.importantItems.map((item, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm">
                  <span className="text-slate-400 mt-0.5">•</span>
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Signers */}
        {document.signers && document.signers.length > 0 && (
          <div>
            <h3 className="text-white font-medium mb-2 flex items-center space-x-2">
              <span>✍️</span>
              <span>Signatures</span>
            </h3>
            <div className="space-y-2">
              {document.signers.map((signer) => (
                <div
                  key={signer.id}
                  className="flex items-center justify-between bg-slate-700/50 rounded-lg p-3"
                >
                  <div>
                    <p className="text-white text-sm font-medium">{signer.name}</p>
                    <p className="text-slate-400 text-xs">{signer.email}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      signer.status === 'signed'
                        ? 'bg-green-500/20 text-green-400'
                        : signer.status === 'declined'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {signer.status === 'signed'
                      ? '✓ Signed'
                      : signer.status === 'declined'
                      ? '✕ Declined'
                      : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Document Info */}
        <div className="pt-4 border-t border-slate-700">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400">Uploaded</p>
              <p className="text-white">{document.uploadedAt.toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-slate-400">Size</p>
              <p className="text-white">{formatFileSize(document.size)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        {needsSignature && (
          <button
            onClick={onSign}
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <span>✍️</span>
            <span>Sign Document</span>
          </button>
        )}
        <div className="flex space-x-2">
          <button className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
            View Full Document
          </button>
          <button className="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
            Download
          </button>
        </div>
        <button className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors flex items-center justify-center space-x-2">
          <span>📤</span>
          <span>Share Securely</span>
        </button>
      </div>
    </div>
  );
}

function UploadModal({ onClose }: { onClose: () => void }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-lg w-full">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Upload Document</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragging
                ? 'border-emerald-500 bg-emerald-500/10'
                : 'border-slate-600 hover:border-slate-500'
            }`}
          >
            <span className="text-4xl mb-4 block">📄</span>
            <p className="text-white font-medium mb-2">
              Drag and drop files here
            </p>
            <p className="text-slate-400 text-sm mb-4">
              or click to browse
            </p>
            <input
              type="file"
              className="hidden"
              accept=".pdf,.doc,.docx"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg cursor-pointer transition-colors"
            >
              Browse Files
            </label>
          </div>

          <p className="text-slate-500 text-sm mt-4 text-center">
            Supported formats: PDF, DOC, DOCX • Max size: 25MB
          </p>

          <div className="mt-6 bg-slate-700/50 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-emerald-400 mb-2">
              <span>🤖</span>
              <span className="font-medium">AI-Powered Analysis</span>
            </div>
            <p className="text-slate-300 text-sm">
              Once uploaded, our AI will automatically generate a summary and highlight
              important items for your review.
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-slate-700">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function SignatureModal({
  document,
  onClose,
}: {
  document: Document;
  onClose: () => void;
}) {
  const [signatureType, setSignatureType] = useState<'type' | 'draw'>('type');
  const [typedSignature, setTypedSignature] = useState('');
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Sign Document</h2>
              <p className="text-slate-400 text-sm">{document.name}</p>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-white">
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* AI Explanation */}
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 text-blue-400 mb-2">
              <span>🤖</span>
              <span className="font-medium">AI Explains What You're Signing</span>
            </div>
            <p className="text-slate-300 text-sm mb-3">{document.aiSummary}</p>
            {document.importantItems && (
              <div className="space-y-1">
                <p className="text-slate-400 text-xs font-medium">Key Terms:</p>
                {document.importantItems.slice(0, 3).map((item, i) => (
                  <p key={i} className="text-slate-300 text-xs">• {item}</p>
                ))}
              </div>
            )}
          </div>

          {/* Signature Type Toggle */}
          <div>
            <p className="text-white font-medium mb-3">Choose signature method:</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setSignatureType('type')}
                className={`flex-1 py-3 rounded-lg border transition-colors ${
                  signatureType === 'type'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-600 text-slate-400'
                }`}
              >
                ⌨️ Type Signature
              </button>
              <button
                onClick={() => setSignatureType('draw')}
                className={`flex-1 py-3 rounded-lg border transition-colors ${
                  signatureType === 'draw'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                    : 'border-slate-600 text-slate-400'
                }`}
              >
                ✍️ Draw Signature
              </button>
            </div>
          </div>

          {/* Signature Input */}
          {signatureType === 'type' ? (
            <div>
              <label className="text-slate-400 text-sm block mb-2">
                Type your full legal name:
              </label>
              <input
                type="text"
                value={typedSignature}
                onChange={(e) => setTypedSignature(e.target.value)}
                placeholder="John Smith"
                className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              {typedSignature && (
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <p
                    className="text-3xl text-slate-900"
                    style={{ fontFamily: 'cursive' }}
                  >
                    {typedSignature}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div>
              <label className="text-slate-400 text-sm block mb-2">
                Draw your signature below:
              </label>
              <div className="bg-white rounded-lg h-32 flex items-center justify-center border-2 border-dashed border-slate-300">
                <p className="text-slate-400">Click and drag to sign</p>
              </div>
              <button className="mt-2 text-slate-400 text-sm hover:text-white">
                Clear signature
              </button>
            </div>
          )}

          {/* Agreement */}
          <label className="flex items-start space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-slate-600 bg-slate-700 text-emerald-500 focus:ring-emerald-500"
            />
            <span className="text-slate-300 text-sm">
              I agree that this electronic signature is the legal equivalent of my
              manual signature and I consent to be bound by the terms of this document.
            </span>
          </label>
        </div>

        <div className="p-6 border-t border-slate-700 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            disabled={!typedSignature || !agreed}
            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <span>✍️</span>
            <span>Sign Document</span>
          </button>
        </div>
      </div>
    </div>
  );
}
