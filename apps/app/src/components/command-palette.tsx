'use client';

import React from 'react';
import { Search, Workflow, ListChecks, ShieldCheck, Siren, FileText, Sparkles, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = React.useState('');

  if (!open) return null;

  const items = [
    { type: 'Workflow', title: 'Vendor Onboarding & ERP PO Trigger', href: '/workflows', icon: Workflow },
    { type: 'Task', title: 'Review Tax ID & Compliance Attachments', href: '/tasks', icon: ListChecks },
    { type: 'Approval', title: 'PO #1042 - SAP Purchase Order Request', href: '/approvals', icon: ShieldCheck },
    { type: 'Incident', title: 'SEV2 Database Query Latency Spike', href: '/incidents', icon: Siren },
    { type: 'Document', title: 'Standard Operating Procedure - Vendor Audit', href: '/documents', icon: FileText },
    { type: 'AI Action', title: 'Ask Assistant: Summarize overdue approvals', href: '/ai-assistant', icon: Sparkles }
  ];

  const filtered = items.filter(
    (i) => i.title.toLowerCase().includes(query.toLowerCase()) || i.type.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 bg-canvas/80 backdrop-blur-md flex items-start justify-center pt-20 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-surface-3 border border-border-strong shadow-2xl overflow-hidden">
        {/* Input */}
        <div className="p-3.5 border-b border-border-subtle flex items-center gap-3">
          <Search className="h-5 w-5 text-text-muted" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          />
          <button onClick={onClose} className="p-1 rounded hover:bg-surface-2 text-text-muted">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-text-muted">No results found for "{query}"</div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.href)}
                  className="w-full text-left p-2.5 rounded-lg hover:bg-surface-1 flex items-center justify-between group transition-colors text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded bg-surface-2 text-brand-primary group-hover:bg-brand-primary/20">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-text-primary">{item.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted bg-bg-input px-2 py-0.5 rounded border border-border-subtle">
                    {item.type}
                  </span>
                </button>
              );
            })
          )}
        </div>

        <div className="p-2 border-t border-border-subtle bg-surface-1 text-[11px] text-text-muted flex justify-between px-4">
          <span>Navigate with ↑ ↓ and Enter</span>
          <span>Esc to close</span>
        </div>
      </div>
    </div>
  );
}
