'use client';

import React from 'react';
import { FileText, Folder, Plus, Search, Sparkles, Download, Eye, FileCode, CheckCircle2, X, Trash2 } from 'lucide-react';
import { dataStore, DocumentItem } from '../../../lib/data-store';

export default function DocumentsPage() {
  const [docs, setDocs] = React.useState<DocumentItem[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedDoc, setSelectedDoc] = React.useState<DocumentItem | null>(null);
  const [selectedFolder, setSelectedFolder] = React.useState<string>('all');
  const [modalOpen, setModalOpen] = React.useState(false);

  // Form State
  const [formTitle, setFormTitle] = React.useState('');
  const [formKind, setFormKind] = React.useState<DocumentItem['kind']>('sop');
  const [formTags, setFormTags] = React.useState('compliance, operations');
  const [formSummary, setFormSummary] = React.useState('');

  React.useEffect(() => {
    const syncData = () => {
      setDocs(dataStore.listDocuments());
    };
    syncData();
    return dataStore.subscribe(syncData);
  }, []);

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    dataStore.createDocument({
      title: formTitle,
      kind: formKind,
      tags: formTags.split(',').map((t) => t.trim()).filter(Boolean),
      summary: formSummary || 'Document ingested and indexed for hybrid BM25 + Vector RAG search.'
    });

    setFormTitle('');
    setFormSummary('');
    setModalOpen(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Delete this document?')) {
      dataStore.deleteDocument(id);
      if (selectedDoc?.id === id) setSelectedDoc(null);
    }
  };

  const filteredDocs = docs.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFolder =
      selectedFolder === 'all' ||
      (selectedFolder === 'sop' && doc.kind === 'sop') ||
      (selectedFolder === 'policy' && doc.kind === 'policy') ||
      (selectedFolder === 'contract' && doc.kind === 'contract') ||
      (selectedFolder === 'template' && doc.kind === 'template');

    return matchesSearch && matchesFolder;
  });

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

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-brand-primary hover:bg-brand-primary-hover text-text-inverse font-semibold text-xs transition-all flex items-center gap-1.5 shadow-glow-primary"
        >
          <Plus className="h-4 w-4" /> Upload Document
        </button>
      </div>

      {/* Hybrid Search Bar */}
      <div className="p-3.5 rounded-xl bg-surface-1 border border-border-subtle flex items-center gap-3 shadow-sm">
        <Search className="h-4 w-4 text-brand-primary" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Hybrid BM25 + Vector RAG Search (e.g. 'tax verification SOP', 'CFO approval threshold')..."
          className="w-full bg-transparent text-xs text-text-primary placeholder:text-text-muted focus:outline-none"
        />
        <span className="text-[10px] font-mono bg-surface-2 px-2 py-1 rounded text-brand-tertiary font-bold">
          pgvector + BM25
        </span>
      </div>

      {/* Folders & File Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Folder Tree */}
        <div className="lg:col-span-3 p-4 rounded-2xl bg-surface-1 border border-border-subtle space-y-3 text-xs">
          <p className="font-bold text-text-muted uppercase tracking-wider text-[10px]">Folders</p>
          <div className="space-y-1">
            {[
              { id: 'all', label: 'All Documents' },
              { id: 'sop', label: 'Standard Operating Procedures' },
              { id: 'policy', label: 'Financial & HR Policies' },
              { id: 'contract', label: 'Vendor & Client Contracts' },
              { id: 'template', label: 'Templates & Checklists' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFolder(f.id)}
                className={`w-full text-left p-2.5 rounded-lg flex items-center gap-2 transition-all ${
                  selectedFolder === f.id
                    ? 'bg-brand-primary text-text-inverse font-semibold'
                    : 'hover:bg-surface-2 text-text-secondary'
                }`}
              >
                <Folder className="h-4 w-4 shrink-0" />
                <span className="truncate">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Documents List */}
        <div className="lg:col-span-9 space-y-3">
          {filteredDocs.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-surface-1 border border-dashed border-border-subtle text-text-muted text-xs">
              No documents match your query.
            </div>
          ) : (
            filteredDocs.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs shadow-sm ${
                  selectedDoc?.id === doc.id
                    ? 'bg-surface-1 border-brand-primary ring-1 ring-brand-primary'
                    : 'bg-surface-1 border-border-subtle hover:border-brand-primary/40'
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-text-primary text-sm">{doc.title}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-surface-2 text-brand-primary border border-border-subtle">
                      {doc.kind}
                    </span>
                    <span className="text-[10px] font-mono text-text-muted">v{doc.version}.0</span>
                  </div>

                  <p className="text-text-muted line-clamp-2">{doc.summary}</p>

                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] text-text-secondary">Owner: {doc.owner_name}</span>
                    <span className="text-text-muted">•</span>
                    <span className="text-[11px] text-text-muted font-mono">{doc.updated_at}</span>
                    <div className="flex gap-1 ml-2">
                      {doc.tags.map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-surface-2 text-text-muted">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      alert(`Downloading "${doc.title}"...`);
                    }}
                    className="p-2 rounded-lg bg-surface-2 hover:bg-surface-3 text-text-muted hover:text-text-primary transition-colors"
                    title="Download Document"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(doc.id, e)}
                    className="p-2 rounded-lg bg-surface-2 hover:bg-status-danger-bg hover:text-status-danger text-text-muted transition-colors"
                    title="Delete Document"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upload Document Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-canvas/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-surface-1 border border-border-strong p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-border-subtle pb-3">
              <h3 className="font-bold text-lg text-text-primary">Upload & Index Document (SOP / Policy)</h3>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded hover:bg-surface-2 text-text-muted">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUploadDocument} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-text-secondary mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SOP - Incident SEV1 Escalation & On-Call Paging"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Document Type</label>
                  <select
                    value={formKind}
                    onChange={(e) => setFormKind(e.target.value as any)}
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  >
                    <option value="sop">SOP (Standard Operating Procedure)</option>
                    <option value="policy">Governance / Policy</option>
                    <option value="contract">Vendor / Client Contract</option>
                    <option value="template">Template / Postmortem</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-text-secondary mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="sop, security, incident"
                    className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-text-secondary mb-1">Document Summary / Extracted Text</label>
                <textarea
                  rows={3}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Provide executive summary or paste markdown text for vector embedding..."
                  className="w-full px-3 py-2 bg-bg-input border border-border-default rounded-lg text-text-primary"
                />
              </div>

              <div className="pt-4 border-t border-border-subtle flex justify-end gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-surface-2 text-text-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-brand-primary text-text-inverse font-bold shadow-glow-primary"
                >
                  Ingest & Embed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
