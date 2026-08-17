'use client';

import React from 'react';
import { FileText, Folder, Plus, Search, Sparkles, Download, Eye, FileCode, CheckCircle2 } from 'lucide-react';

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedDoc, setSelectedDoc] = React.useState<any>(null);

  const docs = [
    { id: 'doc-1', title: 'SOP - Vendor Compliance & Tax Verification', kind: 'sop', version: 3, owner: 'Eve Polastri', updated: '2 days ago', summary: 'Standard operating procedure detailing step-by-step verification of vendor tax identification, W-9/W-8BEN forms, and OFAC sanction checks.' },
    { id: 'doc-2', title: 'Policy - Financial Expenditure & Approval Thresholds', kind: 'policy', version: 2, owner: 'Mike Ross', updated: '1 week ago', summary: 'Mandatory financial policy defining single-approver caps, CFO sign-off thresholds ($5k+), and audit logging requirements.' },
    { id: 'doc-3', title: 'Master Service Agreement - CloudScale Inc.', kind: 'contract', version: 1, owner: 'Sara Connor', updated: 'Aug 10', summary: 'Binding enterprise cloud hosting agreement including 99.95% uptime guarantees, DPA terms, and liability limits.' },
    { id: 'doc-4', title: 'Template - SEV1 Incident Postmortem Report', kind: 'template', version: 4, owner: 'Jonas Kahn', updated: 'Aug 05', summary: 'Standardized postmortem structure detailing timeline of events, root cause analysis, contributing factors, and CAPA item assignments.' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-2">
            <FileText className="h-6 w-6 text-brand-primary" /> Document & SOP Management
          </h1>
          <p className="text-xs text-text-secondary mt-1">
            Enterprise knowledge repository with versioning, OCR, BM25 + pgvector hybrid search, and AI summaries.
          </p>
        </div>

        <button className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary">
          <Plus className="h-4 w-4" /> Upload Document
        </button>
      </div>

      {/* Hybrid Search Bar */}
      <div className="p-3 rounded-xl bg-surface-1 border border-border-subtle flex items-center gap-3">
        <Search className="h-4 w-4 text-text-muted" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Hybrid BM25 + Vector RAG Search (e.g. 'tax verification SOP', 'CFO approval threshold')..."
          className="w-full bg-transparent text-xs text-text-primary placeholder:text-text-muted focus:outline-none"
        />
        <span className="text-[10px] font-mono bg-surface-2 px-2 py-1 rounded text-brand-tertiary">pgvector + BM25</span>
      </div>

      {/* Folders & File Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Folder Tree */}
        <div className="lg:col-span-3 p-4 rounded-xl bg-surface-1 border border-border-subtle space-y-3 text-xs">
          <p className="font-bold text-text-muted uppercase tracking-wider text-[10px]">Folders</p>
          <div className="space-y-1">
            {['Standard Operating Procedures', 'Financial & HR Policies', 'Vendor & Client Contracts', 'Templates & Checklists'].map((f, i) => (
              <div key={i} className="p-2 rounded-lg hover:bg-surface-2 cursor-pointer flex items-center gap-2 text-text-secondary hover:text-text-primary">
                <Folder className="h-4 w-4 text-brand-primary" />
                <span className="truncate">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right File Grid */}
        <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-4">
          {docs.map((doc) => (
            <div key={doc.id} className="p-5 rounded-2xl bg-surface-1 border border-border-subtle space-y-3 hover:border-brand-primary/40 transition-all flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-2 text-brand-tertiary border border-border-subtle">{doc.kind}</span>
                  <span className="font-mono text-text-muted">v{doc.version}.0</span>
                </div>

                <h3 className="font-bold text-sm text-text-primary">{doc.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed line-clamp-2">{doc.summary}</p>
              </div>

              <div className="pt-3 border-t border-border-subtle space-y-2">
                <div className="flex justify-between items-center text-[11px] text-text-muted">
                  <span>Owner: {doc.owner}</span>
                  <span>Updated {doc.updated}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedDoc(doc)}
                    className="flex-1 py-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 border border-border-subtle text-xs font-semibold text-text-primary flex items-center justify-center gap-1"
                  >
                    <Eye className="h-3.5 w-3.5" /> View / Edit
                  </button>
                  <button
                    onClick={() => alert(`AI Executive Summary for ${doc.title}:\n\n${doc.summary}`)}
                    className="py-1.5 px-3 rounded-lg bg-brand-primary/20 text-brand-primary hover:bg-brand-primary hover:text-text-inverse text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <Sparkles className="h-3.5 w-3.5" /> AI Summary
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
